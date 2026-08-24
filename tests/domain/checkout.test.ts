import { describe, expect, it } from "vitest";
import { canApplyPurchaseEvent, normalizeCheckoutEvent } from "@/lib/domain/checkout";

describe("checkout event normalization", () => {
  it("maps a paid transaction to explicit entitlements", () => {
    const event = normalizeCheckoutEvent({
      provider: "mock",
      eventId: "evt-1",
      transactionId: "abc-1",
      occurredAt: "2026-08-23T12:00:00.000Z",
      email: "MARIA@EXAMPLE.COM ",
      status: "paid",
      items: ["nexo-21", "mensajes-esenciales"],
      amountCents: 1240,
      currency: "USD",
    });
    expect(event).toMatchObject({
      idempotencyKey: "mock:abc-1",
      email: "maria@example.com",
      status: "PAID",
      products: ["nexo-21", "mensajes-esenciales"],
      amountCents: 1240,
      currency: "USD",
    });
  });

  it("rejects unknown checkout states", () => {
    expect(() => normalizeCheckoutEvent({
      provider: "mock",
      eventId: "evt-2",
      transactionId: "abc-2",
      occurredAt: "2026-08-23T12:00:00.000Z",
      email: "maria@example.com",
      status: "maybe" as never,
      items: ["nexo-21"],
      amountCents: 990,
      currency: "USD",
    })).toThrow(/status/i);
  });

  it("applies a later refund but never reactivates a terminal refund", () => {
    expect(canApplyPurchaseEvent("PAID", "REFUNDED", new Date("2026-08-23T13:00:00Z"), new Date("2026-08-23T12:00:00Z"))).toBe(true);
    expect(canApplyPurchaseEvent("REFUNDED", "PAID", new Date("2026-08-23T14:00:00Z"), new Date("2026-08-23T13:00:00Z"))).toBe(false);
  });

  it("ignores events older than the latest provider event", () => {
    expect(canApplyPurchaseEvent("PAID", "CHARGEBACK", new Date("2026-08-23T11:00:00Z"), new Date("2026-08-23T12:00:00Z"))).toBe(false);
  });
});
