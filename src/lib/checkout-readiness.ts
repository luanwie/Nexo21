import { getHotmartConfigFromEnvironment } from "@/lib/hotmart";
import { validateHotmartCheckoutUrl } from "@/lib/domain/checkout";
import { getOffer } from "@/lib/offers";
import { prisma } from "@/lib/prisma";

export type CheckoutReadinessInput = {
  provider: string | undefined;
  webhookEnabled: boolean;
  hottok: string | undefined;
  checkoutUrl: string | undefined;
  productSlug: string;
  mappedProductSlugs: string[];
  active: boolean;
  recurring: boolean;
};

export function evaluateCheckoutReadiness(input: CheckoutReadinessInput) {
  if (input.provider !== "hotmart") return { ready: false as const, reason: "provider" };
  if (!input.webhookEnabled) return { ready: false as const, reason: "webhook" };
  if (!input.hottok?.trim()) return { ready: false as const, reason: "hottok" };
  if (!input.active) return { ready: false as const, reason: "inactive" };
  if (!input.mappedProductSlugs.includes(input.productSlug)) return { ready: false as const, reason: "mapping" };
  if (input.recurring) return { ready: false as const, reason: "subscription_lifecycle" };
  if (!input.checkoutUrl?.trim()) return { ready: false as const, reason: "checkout_url" };
  try {
    return { ready: true as const, checkoutUrl: validateHotmartCheckoutUrl(input.checkoutUrl) };
  } catch {
    return { ready: false as const, reason: "checkout_url" };
  }
}

function checkoutEnvKey(slug: string) {
  return `CHECKOUT_URL_${slug.replace(/-/g, "_").toUpperCase()}`;
}

export async function getCheckoutReadiness(productSlug: string) {
  const offer = getOffer(productSlug);
  const product = await prisma.product.findUnique({ where: { slug: productSlug }, select: { active: true } });
  let mappedProductSlugs: string[] = [];
  try {
    mappedProductSlugs = getHotmartConfigFromEnvironment().products.map((mapping) => mapping.productSlug);
  } catch {
    mappedProductSlugs = [];
  }
  return evaluateCheckoutReadiness({
    provider: process.env.CHECKOUT_PROVIDER,
    webhookEnabled: process.env.HOTMART_WEBHOOK_ENABLED === "true",
    hottok: process.env.HOTMART_HOTTOK,
    checkoutUrl: process.env[checkoutEnvKey(productSlug)],
    productSlug,
    mappedProductSlugs,
    active: Boolean(offer?.launchReady && product?.active),
    recurring: offer?.type === "SUBSCRIPTION",
  });
}
