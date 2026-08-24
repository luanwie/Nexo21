import { describe, expect, it } from "vitest";
import { canAccessProduct, entitlementKey, hasEffectiveEntitlement } from "@/lib/domain/entitlements";

describe("entitlements", () => {
  it("grants only active purchased products and included bonuses", () => {
    const owned = [
      { productSlug: "nexo-21", status: "ACTIVE" as const },
      { productSlug: "mensajes-365", status: "REFUNDED" as const },
    ];
    expect(canAccessProduct(owned, "nexo-21")).toBe(true);
    expect(canAccessProduct(owned, "mensajes-365")).toBe(false);
    expect(canAccessProduct(owned, "jornada-gratitud")).toBe(false);
  });

  it("builds a stable provider transaction key", () => {
    expect(entitlementKey("mock", " tx_123 ")).toBe("mock:tx_123");
  });

  it("keeps access while any independent source is active and unexpired", () => {
    const now = new Date("2026-08-23T12:00:00Z");
    expect(hasEffectiveEntitlement([
      { status: "REVOKED", expiresAt: null },
      { status: "ACTIVE", expiresAt: new Date("2026-08-24T12:00:00Z") },
    ], now)).toBe(true);
    expect(hasEffectiveEntitlement([
      { status: "ACTIVE", expiresAt: new Date("2026-08-22T12:00:00Z") },
      { status: "REVOKED", expiresAt: null },
    ], now)).toBe(false);
  });
});
