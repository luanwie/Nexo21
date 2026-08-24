import { processCheckoutEvent } from "@/lib/checkout-service";
import {
  getHotmartConfigFromEnvironment,
  normalizeHotmartPurchase,
  UnmappedHotmartOfferError,
  UnmappedHotmartProductError,
  UnsupportedHotmartSubscriptionError,
  validHotmartHottok,
} from "@/lib/hotmart";
import { PayloadTooLargeError, readJsonBody } from "@/lib/http-body";
import { ZodError } from "zod";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (process.env.CHECKOUT_PROVIDER !== "hotmart" || process.env.HOTMART_WEBHOOK_ENABLED !== "true") {
    return Response.json({ error: "Hotmart webhook is not enabled" }, { status: 503 });
  }
  if (!validHotmartHottok(request.headers.get("x-hotmart-hottok"), process.env.HOTMART_HOTTOK)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await readJsonBody(request, 64_000);
    const event = normalizeHotmartPurchase(payload, getHotmartConfigFromEnvironment());
    const result = await processCheckoutEvent(event);
    return Response.json({ ok: true, ...result });
  } catch (error) {
    if (error instanceof PayloadTooLargeError) return Response.json({ error: error.message }, { status: 413 });
    if (error instanceof UnmappedHotmartProductError) return Response.json({ ok: true, ignored: "unmapped_product" });
    if (error instanceof UnmappedHotmartOfferError) return Response.json({ error: error.message }, { status: 422 });
    if (error instanceof UnsupportedHotmartSubscriptionError) return Response.json({ error: error.message }, { status: 422 });
    if (error instanceof ZodError) return Response.json({ error: "Invalid Hotmart event" }, { status: 400 });
    if (error instanceof Error && /identity|amount|currency|unknown|inactive/i.test(error.message)) {
      return Response.json({ error: error.message }, { status: 422 });
    }
    console.error("Hotmart webhook processing failed", error instanceof Error ? error.name : "UnknownError");
    return Response.json({ error: "Temporary webhook processing failure" }, { status: 500 });
  }
}