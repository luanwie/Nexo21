import { timingSafeEqual } from "node:crypto";
import { z } from "zod";

const purchaseEvent = z.object({
  id: z.string().min(1),
  creation_date: z.number().int().positive(),
  event: z.enum([
    "PURCHASE_CANCELED",
    "PURCHASE_COMPLETE",
    "PURCHASE_BILLET_PRINTED",
    "PURCHASE_APPROVED",
    "PURCHASE_PROTEST",
    "PURCHASE_REFUNDED",
    "PURCHASE_CHARGEBACK",
    "PURCHASE_EXPIRED",
    "PURCHASE_DELAYED",
  ]),
  version: z.literal("2.0.0"),
  data: z.object({
    product: z.object({
      ucode: z.string().min(1),
      name: z.string().optional(),
    }),
    buyer: z.object({
      email: z.email(),
    }),
    purchase: z.object({
      transaction: z.string().min(1),
      status: z.string().min(1),
      price: z.object({
        value: z.number().nonnegative(),
        currency_value: z.string().length(3),
      }),
      offer: z.object({
        code: z.string().min(1),
      }),
    }),
  }),
});

export type HotmartConfig = {
  productUcode: string;
  offerCode: string;
  productSlug: string;
};

export class UnmappedHotmartProductError extends Error {}
export class UnmappedHotmartOfferError extends Error {}

const eventStatus = {
  PURCHASE_APPROVED: "paid",
  PURCHASE_COMPLETE: "paid",
  PURCHASE_REFUNDED: "refunded",
  PURCHASE_CHARGEBACK: "chargeback",
  PURCHASE_CANCELED: "cancelled",
  PURCHASE_EXPIRED: "cancelled",
  PURCHASE_BILLET_PRINTED: "pending",
  PURCHASE_PROTEST: "pending",
  PURCHASE_DELAYED: "pending",
} as const;

export function validHotmartHottok(received: string | null, expected: string | undefined) {
  if (!received || !expected) return false;
  const actualBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

export function normalizeHotmartPurchase(input: unknown, config: HotmartConfig) {
  const event = purchaseEvent.parse(input);
  if (event.data.product.ucode !== config.productUcode) {
    throw new UnmappedHotmartProductError("Hotmart product is not mapped to Nexo 21");
  }
  if (event.data.purchase.offer.code !== config.offerCode) {
    throw new UnmappedHotmartOfferError("Hotmart offer is not mapped to Nexo 21");
  }

  return {
    provider: "hotmart",
    eventId: event.id,
    transactionId: event.data.purchase.transaction,
    occurredAt: new Date(event.creation_date),
    email: event.data.buyer.email.trim().toLowerCase(),
    status: eventStatus[event.event],
    items: [config.productSlug],
    amountCents: Math.round(event.data.purchase.price.value * 100),
    currency: event.data.purchase.price.currency_value.toUpperCase(),
  };
}

export function getHotmartConfigFromEnvironment(): HotmartConfig {
  const productUcode = process.env.HOTMART_PRODUCT_UCODE?.trim();
  const offerCode = process.env.HOTMART_OFFER_CODE?.trim();
  if (!productUcode || !offerCode) throw new Error("Hotmart product and offer mapping are not configured");
  return { productUcode, offerCode, productSlug: "nexo-21" };
}
