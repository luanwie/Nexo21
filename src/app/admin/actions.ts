"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export async function grantAccess(formData: FormData) {
  const admin = await requireAdmin();
  const input = z.object({
    email: z.email(),
    productSlug: z.string().min(1),
  }).parse({
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    productSlug: formData.get("productSlug"),
  });
  const [user, product] = await Promise.all([
    prisma.user.findUnique({ where: { email: input.email } }),
    prisma.product.findUnique({ where: { slug: input.productSlug } }),
  ]);
  if (!user || !product) throw new Error("Usuario o producto no encontrado");

  await prisma.entitlement.create({
    data: {
      userId: user.id,
      productId: product.id,
      status: "ACTIVE",
      sourceType: "MANUAL",
      sourceKey: `manual:${admin.id}:${randomUUID()}`,
    },
  });
  revalidatePath("/admin");
}

export async function revokeAccess(formData: FormData) {
  await requireAdmin();
  const id = z.string().min(1).parse(formData.get("entitlementId"));
  await prisma.entitlement.update({ where: { id }, data: { status: "REVOKED" } });
  revalidatePath("/admin");
}

export async function toggleProduct(formData: FormData) {
  await requireAdmin();
  const input = z.object({
    id: z.string().min(1),
    active: z.enum(["true", "false"]),
  }).parse({ id: formData.get("id"), active: formData.get("active") });
  await prisma.product.update({
    where: { id: input.id },
    data: { active: input.active !== "true" },
  });
  revalidatePath("/admin");
  revalidatePath("/app/tienda");
}
