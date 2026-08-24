import { timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { getOffer } from "@/lib/offers";

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

export type HotmartProductMapping = {
  productUcode: string;
  offerCodes: string[];
  productSlug: string;
};

export type HotmartConfig = {
  products: HotmartProductMapping[];
};

const environmentProductMap = z.record(
  z.string().regex(/^[a-z0-9-]+$/),
  z.object({
    productUcode: z.string().trim().min(1),
    offerCodes: z.array(z.string().trim().min(1)).min(1),
  }).strict(),
);

export class UnmappedHotmartProductError extends Error {}
export class UnmappedHotmartOfferError extends Error {}
export class UnsupportedHotmartSubscriptionError extends Error {}

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
  const mapping = config.products.find((product) => product.productUcode === event.data.product.ucode);
  if (!mapping) {
    throw new UnmappedHotmartProductError("Hotmart product is not mapped to Nexo 21");
  }
  if (getOffer(mapping.productSlug)?.type === "SUBSCRIPTION") {
    throw new UnsupportedHotmartSubscriptionError("Hotmart subscription lifecycle is not enabled");
  }
  if (!mapping.offerCodes.includes(event.data.purchase.offer.code)) {
    throw new UnmappedHotmartOfferError("Hotmart offer is not mapped to Nexo 21");
  }

  return {
    provider: "hotmart",
    eventId: event.id,
    transactionId: event.data.purchase.transaction,
    occurredAt: new Date(event.creation_date),
    email: event.data.buyer.email.trim().toLowerCase(),
    status: eventStatus[event.event],
    items: [mapping.productSlug],
    amountCents: Math.round(event.data.purchase.price.value * 100),
    currency: event.data.purchase.price.currency_value.toUpperCase(),
  };
}

export function getHotmartConfigFromEnvironment(): HotmartConfig {
  const encodedMap = process.env.HOTMART_PRODUCT_MAP_JSON?.trim();
  if (encodedMap) {
    const parsed = environmentProductMap.parse(JSON.parse(encodedMap));
    const products = Object.entries(parsed).map(([productSlug, mapping]) => ({ productSlug, ...mapping }));
    for (const product of products) {
      if (!getOffer(product.productSlug)) throw new Error(`Hotmart product slug is not in the offer catalog: ${product.productSlug}`);
      if (new Set(product.offerCodes).size !== product.offerCodes.length) throw new Error(`Hotmart offer codes must be unique for ${product.productSlug}`);
    }
    if (new Set(products.map((product) => product.productUcode)).size !== products.length) {
      throw new Error("Hotmart product UCODEs must be unique");
    }
    return { products };
  }
  const productUcode = process.env.HOTMART_PRODUCT_UCODE?.trim();
  const offerCode = process.env.HOTMART_OFFER_CODE?.trim();
  if (!productUcode || !offerCode) throw new Error("Hotmart product and offer mapping are not configured");
  return { products: [{ productUcode, offerCodes: [offerCode], productSlug: "nexo-21" }] };
}
