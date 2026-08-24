import { randomUUID } from "node:crypto";
import { processCheckoutEvent } from "@/lib/checkout-service";
import { OFFERS } from "@/lib/offers";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if ((process.env.NODE_ENV === "production" && process.env.ENABLE_MOCK_CHECKOUT !== "true") || process.env.CHECKOUT_PROVIDER !== "mock") {
    return Response.json({ error: "Mock checkout is disabled" }, { status: 404 });
  }

  try {
    const input = (await request.json()) as { email?: string; items?: string[] };
    const items = [...new Set(input.items ?? [])];
    const selected = OFFERS.filter((offer) => offer.launchReady && items.includes(offer.slug));
    if (!input.email || selected.length !== items.length || items.length === 0) {
      return Response.json({ error: "Email and valid products are required" }, { status: 400 });
    }
    const total = selected.reduce((sum, offer) => sum + offer.priceCents, 0);
    const transactionId = randomUUID();
    const result = await processCheckoutEvent({
      provider: "mock",
      eventId: `evt:${transactionId}`,
      transactionId,
      occurredAt: new Date(),
      email: input.email,
      status: "paid",
      items,
      amountCents: total,
      currency: "USD",
    });
    return Response.json({ ok: true, ...result, next: "/registro" });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Checkout failed" },
      { status: 400 },
    );
  }
}
