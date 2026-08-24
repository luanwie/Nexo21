import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { POST } from "@/app/api/checkout/webhook/route";

const original = { ...process.env };
const payload = {
  id: "evt-route-test",
  creation_date: 1787520000000,
  event: "PURCHASE_APPROVED",
  version: "2.0.0",
  data: {
    product: { ucode: "product-ucode", name: "Nexo 21" },
    buyer: { email: "buyer@example.com" },
    purchase: {
      transaction: "HP-ROUTE",
      status: "APPROVED",
      price: { value: 9.9, currency_value: "USD" },
      offer: { code: "offer-code" },
    },
  },
};

function request(body: unknown, token = "hottok-secret") {
  return new Request("http://localhost/api/checkout/webhook", {
    method: "POST",
    headers: { "content-type": "application/json", "x-hotmart-hottok": token },
    body: JSON.stringify(body),
  });
}

describe("Hotmart webhook HTTP boundary", () => {
  beforeEach(() => {
    process.env.CHECKOUT_PROVIDER = "hotmart";
    process.env.HOTMART_WEBHOOK_ENABLED = "true";
    process.env.HOTMART_HOTTOK = "hottok-secret";
    process.env.HOTMART_PRODUCT_UCODE = "product-ucode";
    process.env.HOTMART_OFFER_CODE = "offer-code";
  });

  afterEach(() => {
    process.env = { ...original };
  });

  it("fails closed while the Hotmart integration is disabled", async () => {
    process.env.HOTMART_WEBHOOK_ENABLED = "false";
    expect((await POST(request(payload))).status).toBe(503);
  });

  it("rejects an invalid HOTTOK before processing the payload", async () => {
    expect((await POST(request(payload, "wrong"))).status).toBe(401);
  });

  it("acknowledges an unrelated product without granting access", async () => {
    const response = await POST(request({ ...payload, data: { ...payload.data, product: { ucode: "other-product" } } }));
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ ok: true, ignored: "unmapped_product" });
  });

  it("quarantines an unmapped offer for the expected product", async () => {
    const response = await POST(request({ ...payload, data: { ...payload.data, purchase: { ...payload.data.purchase, offer: { code: "other-offer" } } } }));
    expect(response.status).toBe(422);
  });
});
