import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { PayloadTooLargeError, readJsonBody } from "@/lib/http-body";

export const runtime = "nodejs";

const publicEvents = [
  "PageView",
  "ViewContent",
  "Scroll",
  "CTA",
  "InitiateCheckout",
  "UseTool",
  "ViewUpsell",
] as const;

const eventSchema = z.object({
  name: z.enum(publicEvents),
  path: z.string().max(300).optional(),
  payload: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) return new Response(null, { status: 204 });
  try {
    const event = eventSchema.parse(await readJsonBody(request, 16_000));
    await prisma.analyticsEvent.create({
      data: {
        userId: session.user.id,
        name: event.name,
        path: event.path,
        payloadJson: event.payload ? JSON.stringify(event.payload) : null,
      },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof PayloadTooLargeError) return new Response(null, { status: 413 });
    return new Response(null, { status: 400 });
  }
}
