import { z } from "zod";
import { entitlementKey } from "./entitlements";

const checkoutInput = z.object({
  provider: z.string().min(1),
  eventId: z.string().min(1),
  transactionId: z.string().min(1),
  occurredAt: z.coerce.date(),
  email: z.preprocess(
    (value) => typeof value === "string" ? value.trim().toLowerCase() : value,
    z.email(),
  ),
  status: z.enum(["pending", "paid", "refunded", "chargeback", "cancelled"]),
  items: z.array(z.string().min(1)).min(1),
  amountCents: z.number().int().nonnegative(),
  currency: z.string().length(3),
});

const statusMap = {
  pending: "PENDING",
  paid: "PAID",
  refunded: "REFUNDED",
  chargeback: "CHARGEBACK",
  cancelled: "CANCELLED",
} as const;

export type CheckoutInput = z.input<typeof checkoutInput>;

export function normalizeCheckoutEvent(input: unknown) {
  const parsed = checkoutInput.parse(input);

  return {
    eventId: parsed.eventId.trim(),
    idempotencyKey: entitlementKey(parsed.provider, parsed.transactionId),
    provider: parsed.provider.trim().toLowerCase(),
    transactionId: parsed.transactionId.trim(),
    occurredAt: parsed.occurredAt,
    email: parsed.email,
    status: statusMap[parsed.status],
    products: [...new Set(parsed.items)],
    amountCents: parsed.amountCents,
    currency: parsed.currency.toUpperCase(),
  };
}

type PurchaseState = "PENDING" | "PAID" | "REFUNDED" | "CHARGEBACK" | "CANCELLED";

export function requiresPreCheckoutEmail(provider: string | undefined) {
  return provider === "mock";
}

export function shouldDisplayLocalBumps(provider: string | undefined) {
  return provider === "mock";
}

export function validateHotmartCheckoutUrl(value: string) {
  try {
    const url = new URL(value);
    if (
      url.origin !== "https://pay.hotmart.com" ||
      url.username ||
      url.password
    ) {
      throw new Error("Invalid Hotmart checkout URL");
    }
    return url.toString();
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid Hotmart checkout URL") throw error;
    throw new Error("Invalid Hotmart checkout URL");
  }
}

export function canAcceptBuyerIdentity(existingEmail: string, incomingEmail: string, incomingStatus: PurchaseState) {
  if (existingEmail.trim().toLowerCase() === incomingEmail.trim().toLowerCase()) return true;
  return incomingStatus === "REFUNDED" || incomingStatus === "CHARGEBACK" || incomingStatus === "CANCELLED";
}

const stateRank: Record<PurchaseState, number> = {
  PENDING: 0,
  PAID: 1,
  CANCELLED: 2,
  REFUNDED: 3,
  CHARGEBACK: 4,
};

export function canApplyPurchaseEvent(
  current: PurchaseState,
  incoming: PurchaseState,
  incomingAt: Date,
  currentAt: Date,
) {
  const incomingTime = incomingAt.getTime();
  const currentTime = currentAt.getTime();
  if (incomingTime < currentTime) return false;
  if (incomingTime === currentTime) return stateRank[incoming] > stateRank[current];
  return stateRank[incoming] >= stateRank[current];
}
