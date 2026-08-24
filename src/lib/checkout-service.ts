import { createHash } from "node:crypto";
import {
  EntitlementSourceType,
  Prisma,
  PurchaseStatus,
} from "@/generated/prisma-v2";
import {
  canAcceptBuyerIdentity,
  canApplyPurchaseEvent,
  normalizeCheckoutEvent,
} from "@/lib/domain/checkout";
import { prisma } from "@/lib/prisma";

const purchaseStatus: Record<string, PurchaseStatus> = {
  PENDING: "PENDING",
  PAID: "PAID",
  REFUNDED: "REFUNDED",
  CHARGEBACK: "CHARGEBACK",
  CANCELLED: "CANCELLED",
};


function normalizedPayload(event: ReturnType<typeof normalizeCheckoutEvent>) {
  return JSON.stringify({
    provider: event.provider,
    eventId: event.eventId,
    transactionId: event.transactionId,
    occurredAt: event.occurredAt.toISOString(),
    email: event.email,
    status: event.status,
    products: [...event.products].sort(),
    amountCents: event.amountCents,
    currency: event.currency,
  });
}

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function emailOwnershipRequired() {
  return process.env.NODE_ENV === "production" || process.env.REQUIRE_EMAIL_VERIFICATION === "true";
}

async function eligibleUser(
  tx: Prisma.TransactionClient,
  email: string,
) {
  const user = await tx.user.findUnique({ where: { email } });
  if (!user) return null;
  if (emailOwnershipRequired() && !user.emailVerified) return null;
  return user;
}

function purchaseSourceKey(purchaseId: string, productId: string) {
  return `purchase:${purchaseId}:${productId}`;
}

function isWriteConflict(error: unknown): error is { code: string } {
  return typeof error === "object" && error !== null && "code" in error && (error as { code?: unknown }).code === "P2034";
}

async function serializableTransaction<T>(operation: (tx: Prisma.TransactionClient) => Promise<T>) {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      return await prisma.$transaction(operation, {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 5_000,
        timeout: 20_000,
      });
    } catch (error) {
      if (!isWriteConflict(error) || attempt === 3) throw error;
    }
  }
  throw new Error("Serializable transaction retry exhausted");
}

export async function processCheckoutEvent(input: unknown) {
  const event = normalizeCheckoutEvent(input);
  const status = purchaseStatus[event.status];
  const payloadJson = normalizedPayload(event);
  const payloadHash = sha256(payloadJson);

  return serializableTransaction(
    async (tx) => {
      const priorEvent = await tx.paymentEvent.findUnique({
        where: {
          provider_eventId: {
            provider: event.provider,
            eventId: event.eventId,
          },
        },
      });
      if (priorEvent) {
        if (priorEvent.payloadHash !== payloadHash) {
          throw new Error("Payment event ID was reused with a different payload");
        }
        return {
          purchaseId: priorEvent.purchaseId,
          linked: Boolean(priorEvent.purchaseId),
          duplicate: true,
          ignored: false,
        };
      }

      const existing = await tx.purchase.findUnique({
        where: {
          provider_transactionId: {
            provider: event.provider,
            transactionId: event.transactionId,
          },
        },
        include: { items: { include: { product: true } } },
      });

      const products = await tx.product.findMany({
        where: {
          slug: { in: event.products },
          ...(existing ? {} : { active: true }),
        },
      });
      if (products.length !== event.products.length) {
        throw new Error("One or more checkout products are unknown or inactive");
      }

      const expectedTotal = products.reduce((sum, product) => sum + product.priceCents, 0);
      if (!existing && (event.amountCents !== expectedTotal || event.currency !== "USD")) {
        throw new Error("Checkout amount or currency does not match the offer catalog");
      }

      if (existing) {
        const existingSlugs = existing.items.map((item) => item.product.slug).sort();
        const incomingSlugs = [...event.products].sort();
        if (
          JSON.stringify(existingSlugs) !== JSON.stringify(incomingSlugs) ||
          existing.amountCents !== event.amountCents ||
          existing.currency !== event.currency
        ) {
          throw new Error("Transaction identity conflicts with the original purchase");
        }
        if (!canAcceptBuyerIdentity(existing.purchaserEmail, event.email, status)) {
          throw new Error("Purchase buyer identity conflicts with the original purchase");
        }
      }

      const existingOwner = existing?.userId ? await tx.user.findUnique({ where: { id: existing.userId } }) : null;
      const claimableEmail = existing?.purchaserEmail ?? event.email;
      const user = existingOwner ?? (status === "PAID" ? await eligibleUser(tx, claimableEmail) : null);
      let purchaseId: string;
      let ignored = false;

      if (existing) {
        purchaseId = existing.id;
        const shouldApply = canApplyPurchaseEvent(
          existing.status,
          status,
          event.occurredAt,
          existing.providerOccurredAt,
        );
        ignored = !shouldApply;
        if (shouldApply) {
          await tx.purchase.update({
            where: { id: existing.id },
            data: {
              status,
              providerOccurredAt: event.occurredAt,
              userId: existing.userId ?? user?.id,
            },
          });
        }
      } else {
        const created = await tx.purchase.create({
          data: {
            provider: event.provider,
            transactionId: event.transactionId,
            purchaserEmail: event.email,
            status,
            amountCents: event.amountCents,
            currency: event.currency,
            rawPayload: payloadJson,
            providerOccurredAt: event.occurredAt,
            userId: status === "PAID" ? user?.id : undefined,
            items: {
              create: products.map((product) => ({
                productId: product.id,
                priceCents: product.priceCents,
              })),
            },
          },
        });
        purchaseId = created.id;
      }

      await tx.paymentEvent.create({
        data: {
          provider: event.provider,
          eventId: event.eventId,
          transactionId: event.transactionId,
          status,
          payloadHash,
          payloadJson,
          occurredAt: event.occurredAt,
          purchaseId: purchaseId,
        },
      });

      if (!ignored) {
        if (status !== "PAID") {
          await tx.entitlement.updateMany({
            where: { sourcePurchaseId: purchaseId },
            data: { status: "REVOKED" },
          });
        } else if (user) {
          await tx.entitlement.updateMany({
            where: { sourcePurchaseId: purchaseId, userId: { not: user.id } },
            data: { status: "REVOKED" },
          });
          for (const product of products) {
            const sourceKey = purchaseSourceKey(purchaseId, product.id);
            await tx.entitlement.upsert({
              where: {
                userId_productId_sourceKey: {
                  userId: user.id,
                  productId: product.id,
                  sourceKey,
                },
              },
              update: { status: "ACTIVE" },
              create: {
                userId: user.id,
                productId: product.id,
                status: "ACTIVE",
                sourceType: EntitlementSourceType.PURCHASE,
                sourceKey,
                sourcePurchaseId: purchaseId,
              },
            });
          }
        }
      }

      if (!ignored) {
        await tx.analyticsEvent.create({
          data: {
            userId: user?.id,
            name:
              status === "PAID"
                ? "Purchase"
                : status === "REFUNDED"
                  ? "Refund"
                  : status === "CHARGEBACK"
                    ? "Chargeback"
                    : "PurchaseStatusChanged",
            path: "/api/checkout/webhook",
            payloadJson: JSON.stringify({
              provider: event.provider,
              eventId: event.eventId,
              transactionId: event.transactionId,
              status,
              amountCents: event.amountCents,
              currency: event.currency,
            }),
          },
        });
      }

      return {
        purchaseId: purchaseId,
        linked: Boolean(user),
        duplicate: false,
        ignored,
      };
    },
  );
}

export async function claimPurchasesForUser(userId: string, email: string) {
  return serializableTransaction(async (tx) => {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await tx.user.findUnique({ where: { id: userId } });
    if (!user || user.email.toLowerCase() !== normalizedEmail) return 0;
    if (emailOwnershipRequired() && !user.emailVerified) return 0;

    const purchases = await tx.purchase.findMany({
      where: {
        purchaserEmail: normalizedEmail,
        status: "PAID",
        OR: [{ userId: null }, { userId }],
      },
      include: { items: true },
    });

    let claimed = 0;
    for (const purchase of purchases) {
      const locked = await tx.purchase.updateMany({
        where: {
          id: purchase.id,
          status: "PAID",
          OR: [{ userId: null }, { userId }],
        },
        data: { userId },
      });
      if (locked.count !== 1) continue;

      for (const item of purchase.items) {
        const sourceKey = purchaseSourceKey(purchase.id, item.productId);
        await tx.entitlement.upsert({
          where: {
            userId_productId_sourceKey: {
              userId,
              productId: item.productId,
              sourceKey,
            },
          },
          update: { status: "ACTIVE" },
          create: {
            userId,
            productId: item.productId,
            status: "ACTIVE",
            sourceType: "PURCHASE",
            sourceKey,
            sourcePurchaseId: purchase.id,
          },
        });
      }
      claimed += 1;
    }
    return claimed;
  });
}
