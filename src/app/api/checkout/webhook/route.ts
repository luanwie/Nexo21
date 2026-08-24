import { timingSafeEqual } from "node:crypto";
import { processCheckoutEvent } from "@/lib/checkout-service";
import { PayloadTooLargeError, readJsonBody } from "@/lib/http-body";

export const runtime = "nodejs";

function validSecret(received: string | null) {
  const expected = process.env.CHECKOUT_WEBHOOK_SECRET;
  if (!expected || !received) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(received);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production" && process.env.CHECKOUT_WEBHOOK_MODE !== "internal-signed") {
    return Response.json({ error: "Webhook adapter not configured" }, { status: 503 });
  }
  if (!validSecret(request.headers.get("x-checkout-secret"))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const result = await processCheckoutEvent(await readJsonBody(request, 64_000));
    return Response.json({ ok: true, ...result });
  } catch (error) {
    if (error instanceof PayloadTooLargeError) return Response.json({ error: error.message }, { status: 413 });
    const message = error instanceof Error ? error.message : "Invalid checkout event";
    return Response.json({ error: message }, { status: 400 });
  }
}
