import { describe, expect, it } from "vitest";
import { evaluateCheckoutReadiness } from "@/lib/checkout-readiness";

const ready = {
  provider: "hotmart",
  webhookEnabled: true,
  hottok: "configured-secret",
  checkoutUrl: "https://pay.hotmart.com/ABC123",
  productSlug: "nexo-21",
  mappedProductSlugs: ["nexo-21", "mensajes-esenciales"],
  active: true,
  recurring: false,
};

describe("checkout readiness", () => {
  it("allows a mapped active one-time product with authenticated fulfillment", () => {
    expect(evaluateCheckoutReadiness(ready)).toMatchObject({ ready: true, checkoutUrl: "https://pay.hotmart.com/ABC123" });
  });

  it("fails closed when HOTTOK, mapping or URL is missing", () => {
    expect(evaluateCheckoutReadiness({ ...ready, hottok: "" }).ready).toBe(false);
    expect(evaluateCheckoutReadiness({ ...ready, mappedProductSlugs: [] }).ready).toBe(false);
    expect(evaluateCheckoutReadiness({ ...ready, checkoutUrl: "" }).ready).toBe(false);
  });

  it("keeps recurring checkout disabled until subscription lifecycle is ready", () => {
    expect(evaluateCheckoutReadiness({ ...ready, productSlug: "circulo-nexo", mappedProductSlugs: ["circulo-nexo"], recurring: true }).ready).toBe(false);
  });
});
