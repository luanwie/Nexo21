export type AdminMetricInput = {
  totalUsers: number;
  paidPurchases: number;
  paidRevenueUsdCents: number | null;
  refundsAndChargebacks: number;
  activeAccesses: number;
};

export type AdminMetrics = Omit<AdminMetricInput, "paidRevenueUsdCents"> & {
  paidRevenueUsdCents: number;
};

export function normalizeAdminMetrics(input: AdminMetricInput): AdminMetrics {
  return {
    ...input,
    paidRevenueUsdCents: input.paidRevenueUsdCents ?? 0,
  };
}

export function maskEmail(value: string): string {
  const normalized = value.trim().toLowerCase();
  const separator = normalized.lastIndexOf("@");
  if (separator < 1 || separator === normalized.length - 1) return "••••";

  const local = normalized.slice(0, separator);
  const domain = normalized.slice(separator + 1);
  return `${local[0]}***@${domain}`;
}
