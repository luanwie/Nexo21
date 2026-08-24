import { describe, expect, it } from "vitest";
import { normalizeHotmartPurchase, validHotmartHottok } from "@/lib/hotmart";

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

const config = { productUcode: "product-ucode", offerCode: "offer-code", productSlug: "nexo-21" };

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
    expect(() => normalizeHotmartPurchase(approved, { ...config, productUcode: "other" })).toThrow(/product/i);
    expect(() => normalizeHotmartPurchase(approved, { ...config, offerCode: "other" })).toThrow(/offer/i);
  });

  it("compares HOTTOK without accepting missing or different values", () => {
    expect(validHotmartHottok("secret-token", "secret-token")).toBe(true);
    expect(validHotmartHottok("different", "secret-token")).toBe(false);
    expect(validHotmartHottok(null, "secret-token")).toBe(false);
  });
});
