import { randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { claimPurchasesForUser, processCheckoutEvent } from "@/lib/checkout-service";
import { prisma } from "@/lib/prisma";

const runDatabaseTests = process.env.RUN_DATABASE_TESTS === "true";
if (runDatabaseTests) vi.setConfig({ testTimeout: 30_000, hookTimeout: 30_000 });
const provider = `integration-hotmart-${Date.now()}`;
const buyerA = `buyer-a-${Date.now()}@nexo21.test`;
const buyerB = `buyer-b-${Date.now()}@nexo21.test`;
const raceBuyer = `race-buyer-${Date.now()}@nexo21.test`;
let productId = "";

function event({
  eventId,
  transactionId,
  email,
  status,
  occurredAt,
}: {
  eventId: string;
  transactionId: string;
  email: string;
  status: "paid" | "refunded" | "chargeback" | "cancelled";
  occurredAt: Date;
}) {
  return { provider, eventId, transactionId, occurredAt, email, status, items: ["nexo-21"], amountCents: 990, currency: "USD" };
}

async function clean() {
  await prisma.paymentEvent.deleteMany({ where: { provider } });
  await prisma.purchase.deleteMany({ where: { provider } });
  await prisma.user.deleteMany({ where: { email: { in: [buyerA, buyerB, raceBuyer] } } });
}

describe.skipIf(!runDatabaseTests)("checkout service against PostgreSQL", () => {
  beforeAll(async () => {
    await clean();
    const product = await prisma.product.findUniqueOrThrow({ where: { slug: "nexo-21" } });
    productId = product.id;
    await prisma.user.createMany({
      data: [
        { id: randomUUID(), name: "Buyer A", email: buyerA, emailVerified: true },
        { id: randomUUID(), name: "Buyer B", email: buyerB, emailVerified: true },
      ],
    });
  });

  afterAll(async () => {
    await clean();
    await prisma.$disconnect();
  });

  it("does not move an existing paid transaction to another buyer", async () => {
    const transactionId = "ownership-transaction";
    await processCheckoutEvent(event({ eventId: "ownership-approved", transactionId, email: buyerA, status: "paid", occurredAt: new Date("2026-08-23T12:00:00Z") }));

    await expect(processCheckoutEvent(event({ eventId: "ownership-complete", transactionId, email: buyerB, status: "paid", occurredAt: new Date("2026-08-23T13:00:00Z") }))).rejects.toThrow(/buyer|identity/i);

    const purchase = await prisma.purchase.findUniqueOrThrow({ where: { provider_transactionId: { provider, transactionId } } });
    const userA = await prisma.user.findUniqueOrThrow({ where: { email: buyerA } });
    const userB = await prisma.user.findUniqueOrThrow({ where: { email: buyerB } });
    expect(purchase.userId).toBe(userA.id);
    expect(await prisma.entitlement.count({ where: { userId: userB.id, productId, status: "ACTIVE" } })).toBe(0);
  });

  it("revokes purchase-derived access even when a reversal carries another email", async () => {
    const transactionId = "reversal-transaction";
    await processCheckoutEvent(event({ eventId: "reversal-approved", transactionId, email: buyerA, status: "paid", occurredAt: new Date("2026-08-23T14:00:00Z") }));
    const purchase = await prisma.purchase.findUniqueOrThrow({ where: { provider_transactionId: { provider, transactionId } } });

    await processCheckoutEvent(event({ eventId: "reversal-refund", transactionId, email: "changed@nexo21.test", status: "refunded", occurredAt: new Date("2026-08-23T15:00:00Z") }));

    expect((await prisma.purchase.findUniqueOrThrow({ where: { id: purchase.id } })).status).toBe("REFUNDED");
    expect(await prisma.entitlement.count({ where: { sourcePurchaseId: purchase.id, status: "ACTIVE" } })).toBe(0);
  });

  it("cannot claim a purchase after its terminal reversal", async () => {
    const transactionId = "claim-after-refund";
    const unclaimedEmail = `unclaimed-${Date.now()}@nexo21.test`;
    await processCheckoutEvent(event({ eventId: "claim-approved", transactionId, email: unclaimedEmail, status: "paid", occurredAt: new Date("2026-08-23T16:00:00Z") }));
    await processCheckoutEvent(event({ eventId: "claim-refunded", transactionId, email: unclaimedEmail, status: "refunded", occurredAt: new Date("2026-08-23T17:00:00Z") }));
    const user = await prisma.user.create({ data: { id: randomUUID(), name: "Late Buyer", email: unclaimedEmail, emailVerified: true } });

    expect(await claimPurchasesForUser(user.id, unclaimedEmail)).toBe(0);
    expect(await prisma.entitlement.count({ where: { userId: user.id, status: "ACTIVE" } })).toBe(0);
    await prisma.user.delete({ where: { id: user.id } });
  });

  it("finishes revoked when claim and refund race", async () => {
    const transactionId = "claim-refund-race";
    await processCheckoutEvent(event({ eventId: "race-approved", transactionId, email: raceBuyer, status: "paid", occurredAt: new Date("2026-08-23T18:00:00Z") }));
    const user = await prisma.user.create({ data: { id: randomUUID(), name: "Race Buyer", email: raceBuyer, emailVerified: true } });

    await Promise.all([
      claimPurchasesForUser(user.id, raceBuyer),
      processCheckoutEvent(event({ eventId: "race-refunded", transactionId, email: raceBuyer, status: "refunded", occurredAt: new Date("2026-08-23T19:00:00Z") })),
    ]);

    const purchase = await prisma.purchase.findUniqueOrThrow({ where: { provider_transactionId: { provider, transactionId } } });
    expect(purchase.status).toBe("REFUNDED");
    expect(await prisma.entitlement.count({ where: { sourcePurchaseId: purchase.id, status: "ACTIVE" } })).toBe(0);
  });
});
