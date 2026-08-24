import { describe, expect, it } from "vitest";
import { maskEmail, normalizeAdminMetrics } from "@/lib/domain/admin";

describe("admin presentation helpers", () => {
  it("masks the buyer identity while keeping the email domain useful", () => {
    expect(maskEmail("Maria.Silva@Example.com")).toBe("m***@example.com");
    expect(maskEmail("a@example.com")).toBe("a***@example.com");
  });

  it("does not reveal malformed email-like values", () => {
    expect(maskEmail("not-an-email")).toBe("••••");
    expect(maskEmail("  ")).toBe("••••");
  });

  it("maps complete aggregate results without a recent-record limit", () => {
    expect(normalizeAdminMetrics({
      totalUsers: 142,
      paidPurchases: 87,
      paidRevenueUsdCents: 456_789,
      refundsAndChargebacks: 9,
      activeAccesses: 73,
    })).toEqual({
      totalUsers: 142,
      paidPurchases: 87,
      paidRevenueUsdCents: 456_789,
      refundsAndChargebacks: 9,
      activeAccesses: 73,
    });
  });

  it("normalizes a null paid revenue aggregate to zero", () => {
    expect(normalizeAdminMetrics({
      totalUsers: 0,
      paidPurchases: 0,
      paidRevenueUsdCents: null,
      refundsAndChargebacks: 0,
      activeAccesses: 0,
    }).paidRevenueUsdCents).toBe(0);
  });

});
