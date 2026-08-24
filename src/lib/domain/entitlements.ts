export type EntitlementLike = {
  productSlug: string;
  status: "ACTIVE" | "REFUNDED" | "REVOKED" | "EXPIRED";
};

export function canAccessProduct(
  entitlements: EntitlementLike[],
  productSlug: string,
): boolean {
  return entitlements.some(
    (entitlement) =>
      entitlement.productSlug === productSlug && entitlement.status === "ACTIVE",
  );
}

export function entitlementKey(provider: string, transactionId: string): string {
  return `${provider.trim().toLowerCase()}:${transactionId.trim()}`;
}

export function hasEffectiveEntitlement(
  sources: Array<{ status: "ACTIVE" | "REFUNDED" | "REVOKED" | "EXPIRED"; expiresAt: Date | null }>,
  now = new Date(),
) {
  return sources.some((source) =>
    source.status === "ACTIVE" && (!source.expiresAt || source.expiresAt.getTime() > now.getTime()),
  );
}
