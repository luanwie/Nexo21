import { describe, expect, it } from "vitest";
import { getHotmartConfigFromEnvironment, normalizeHotmartPurchase, validHotmartHottok } from "@/lib/hotmart";

const approved = {
  id: "evt-hotmart-1",
  creation_date: 1787520000000,
  event: "PURCHASE_APPROVED",
  version: "2.0.0",
  data: {
    product: { ucode: "product-ucode", name: "Nexo 21" },
    buyer: { email: "MARIA@EXAMPLE.COM" },
    purchase: {
      transaction: "HP123",
      status: "APPROVED",
      price: { value: 9.9, currency_value: "USD" },
      offer: { code: "offer-code" },
    },
  },
};

const config = {
  products: [
    { productUcode: "product-ucode", offerCodes: ["offer-code"], productSlug: "nexo-21" },
    { productUcode: "gratitude-ucode", offerCodes: ["gratitude-offer"], productSlug: "desafio-gratitud-30" },
  ],
};

describe("Hotmart purchase adapter", () => {
  it("normalizes an approved purchase into the internal payment contract", () => {
    expect(normalizeHotmartPurchase(approved, config)).toMatchObject({
      provider: "hotmart",
      eventId: "evt-hotmart-1",
      transactionId: "HP123",
      email: "maria@example.com",
      status: "paid",
      items: ["nexo-21"],
      amountCents: 990,
      currency: "USD",
    });
  });

  it("maps refund and chargeback events to terminal reversals", () => {
    expect(normalizeHotmartPurchase({ ...approved, id: "evt-2", event: "PURCHASE_REFUNDED" }, config).status).toBe("refunded");
    expect(normalizeHotmartPurchase({ ...approved, id: "evt-3", event: "PURCHASE_CHARGEBACK" }, config).status).toBe("chargeback");
  });

  it("rejects a different Hotmart product or offer", () => {
    expect(() => normalizeHotmartPurchase(approved, { products: [] })).toThrow(/product/i);
    expect(() => normalizeHotmartPurchase(approved, { products: [{ ...config.products[0], offerCodes: ["other"] }] })).toThrow(/offer/i);
  });

  it("selects the internal product from a multi-product mapping", () => {
    const payload = {
      ...approved,
      data: {
        ...approved.data,
        product: { ucode: "gratitude-ucode", name: "Gratitud" },
        purchase: { ...approved.data.purchase, offer: { code: "gratitude-offer" } },
      },
    };
    expect(normalizeHotmartPurchase(payload, config).items).toEqual(["desafio-gratitud-30"]);
  });

  it("refuses subscription purchases until lifecycle support exists", () => {
    const subscriptionPayload = {
      ...approved,
      data: {
        ...approved.data,
        product: { ucode: "circle-ucode", name: "Círculo Nexo" },
        purchase: { ...approved.data.purchase, offer: { code: "circle-offer" } },
      },
    };
    expect(() => normalizeHotmartPurchase(subscriptionPayload, {
      products: [{ productUcode: "circle-ucode", offerCodes: ["circle-offer"], productSlug: "circulo-nexo" }],
    })).toThrow(/subscription lifecycle/i);
  });

  it("loads a JSON mapping for all Hotmart products", () => {
    const previous = process.env.HOTMART_PRODUCT_MAP_JSON;
    process.env.HOTMART_PRODUCT_MAP_JSON = JSON.stringify({
      "nexo-21": { productUcode: "p1", offerCodes: ["o1"] },
      "circulo-nexo": { productUcode: "p2", offerCodes: ["o2", "o3"] },
    });
    try {
      expect(getHotmartConfigFromEnvironment().products).toEqual([
        { productSlug: "nexo-21", productUcode: "p1", offerCodes: ["o1"] },
        { productSlug: "circulo-nexo", productUcode: "p2", offerCodes: ["o2", "o3"] },
      ]);
    } finally {
      if (previous === undefined) delete process.env.HOTMART_PRODUCT_MAP_JSON;
      else process.env.HOTMART_PRODUCT_MAP_JSON = previous;
    }
  });

  it("rejects unknown catalog slugs and duplicate offer codes", () => {
    const previous = process.env.HOTMART_PRODUCT_MAP_JSON;
    try {
      process.env.HOTMART_PRODUCT_MAP_JSON = JSON.stringify({
        "unknown-product": { productUcode: "p1", offerCodes: ["o1"] },
      });
      expect(() => getHotmartConfigFromEnvironment()).toThrow(/catalog/i);
      process.env.HOTMART_PRODUCT_MAP_JSON = JSON.stringify({
        "nexo-21": { productUcode: "p1", offerCodes: ["o1", "o1"] },
      });
      expect(() => getHotmartConfigFromEnvironment()).toThrow(/offer/i);
    } finally {
      if (previous === undefined) delete process.env.HOTMART_PRODUCT_MAP_JSON;
      else process.env.HOTMART_PRODUCT_MAP_JSON = previous;
    }
  });

  it("compares HOTTOK without accepting missing or different values", () => {
    expect(validHotmartHottok("secret-token", "secret-token")).toBe(true);
    expect(validHotmartHottok("different", "secret-token")).toBe(false);
    expect(validHotmartHottok(null, "secret-token")).toBe(false);
  });
});
