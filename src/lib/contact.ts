import { z } from "zod";

const supportSchema = z.object({
  email: z.email(),
  name: z.string().trim().min(2).max(80),
}).strict();

export function resolveSupportContact(input: { email?: string; name?: string }) {
  const parsed = supportSchema.safeParse({
    email: input.email?.trim().toLowerCase(),
    name: input.name?.trim(),
  });
  if (!parsed.success) throw new Error("SUPPORT_EMAIL and SUPPORT_NAME must be valid");
  return parsed.data;
}

export function getSupportContact() {
  return resolveSupportContact({
    email: process.env.SUPPORT_EMAIL ?? "listenghust.ia@gmail.com",
    name: process.env.SUPPORT_NAME ?? "Luan",
  });
}

export function resolveEmailReplyTo(value: string | undefined, fallback: string) {
  const candidate = value?.trim() || fallback.trim();
  const parsed = z.email().safeParse(candidate.toLowerCase());
  if (!parsed.success) throw new Error("EMAIL_REPLY_TO must be a valid email");
  return parsed.data;
}
