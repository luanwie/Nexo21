import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { POST } from "@/app/api/checkout/start/route";

const original = { ...process.env };

function request() {
  return new Request("http://localhost/api/checkout/start", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ items: ["nexo-21"] }),
  });
}

describe("checkout start boundary", () => {
  beforeEach(() => {
    process.env.CHECKOUT_PROVIDER = "hotmart";
    process.env.CHECKOUT_URL_NEXO_21 = "https://pay.hotmart.com/ABC123";
    process.env.HOTMART_WEBHOOK_ENABLED = "false";
  });

  afterEach(() => {
    process.env = { ...original };
  });

  it("refuses to take a buyer to payment while fulfillment is disabled", async () => {
    const response = await POST(request());
    expect(response.status).toBe(503);
  });

  it("redirects without collecting email when Hotmart fulfillment is ready", async () => {
    process.env.HOTMART_WEBHOOK_ENABLED = "true";
    const response = await POST(request());
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      mode: "external",
      next: "https://pay.hotmart.com/ABC123",
    });
  });

  it("rejects an untrusted checkout destination", async () => {
    process.env.HOTMART_WEBHOOK_ENABLED = "true";
    process.env.CHECKOUT_URL_NEXO_21 = "https://evil.example/collect";
    const response = await POST(request());
    expect(response.status).toBe(400);
  });
});