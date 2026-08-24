import { redirect } from "next/navigation";
import { claimPurchasesForUser } from "@/lib/checkout-service";
import { prisma } from "@/lib/prisma";
import type { CurrentUser } from "@/lib/session";

function canClaimByEmail(user: CurrentUser) {
  return user.emailVerified || (process.env.NODE_ENV !== "production" && process.env.REQUIRE_EMAIL_VERIFICATION !== "true");
}

const effectiveWindow = () => ({
  OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
});

export async function listEntitlements(user: CurrentUser) {
  if (canClaimByEmail(user)) await claimPurchasesForUser(user.id, user.email);
  return prisma.entitlement.findMany({
    where: {
      userId: user.id,
      status: "ACTIVE",
      ...effectiveWindow(),
    },
    include: { product: true },
    orderBy: { grantedAt: "desc" },
  });
}

export async function hasEntitlement(user: CurrentUser, productSlug: string) {
  const entitlement = await prisma.entitlement.findFirst({
    where: {
      userId: user.id,
      status: "ACTIVE",
      ...effectiveWindow(),
      product: { slug: productSlug, active: true },
    },
  });
  return Boolean(entitlement);
}

export async function requireEntitlement(user: CurrentUser, productSlug = "nexo-21") {
  if (canClaimByEmail(user)) await claimPurchasesForUser(user.id, user.email);
  if (!(await hasEntitlement(user, productSlug)) && user.role !== "ADMIN") {
    redirect(`/app/tienda?bloqueado=${productSlug}`);
  }
}
