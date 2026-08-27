"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { requireEntitlement } from "@/lib/access";

async function record(userId: string, name: string, path: string, payload?: unknown) {
  await prisma.analyticsEvent.create({
    data: { userId, name, path, payloadJson: payload ? JSON.stringify(payload) : null },
  });
}

export async function setDayComplete(day: number, complete: boolean) {
  const user = await requireUser();
  await requireEntitlement(user);
  const parsed = z.number().int().min(1).max(21).parse(day);
  await prisma.journeyProgress.upsert({
    where: { userId_day: { userId: user.id, day: parsed } },
    update: { completedAt: complete ? new Date() : null },
    create: { userId: user.id, day: parsed, completedAt: complete ? new Date() : null },
  });
  if (complete) await record(user.id, "CompleteDay", `/app/jornada/${parsed}`, { day: parsed });
  revalidatePath("/app");
  revalidatePath("/app/jornada");
  revalidatePath(`/app/jornada/${parsed}`);
}

export async function saveDayNote(day: number, note: string) {
  const user = await requireUser();
  await requireEntitlement(user);
  const parsedDay = z.number().int().min(1).max(21).parse(day);
  const parsedNote = z.string().trim().max(8_000).parse(note);
  await prisma.journeyProgress.upsert({
    where: { userId_day: { userId: user.id, day: parsedDay } },
    update: { note: parsedNote },
    create: { userId: user.id, day: parsedDay, note: parsedNote },
  });
  revalidatePath(`/app/jornada/${parsedDay}`);
}

export async function saveJournalEntry(formData: FormData) {
  const user = await requireUser();
  await requireEntitlement(user);
  const values = z.object({
    id: z.string().optional(),
    title: z.string().trim().min(1).max(120),
    body: z.string().trim().min(1).max(12_000),
    entryDate: z.coerce.date(),
    mood: z.string().max(10).optional(),
    tags: z.string().max(200).optional(),
    prompt: z.string().max(200).optional(),
  }).parse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    body: formData.get("body"),
    entryDate: formData.get("entryDate"),
    mood: formData.get("mood") || undefined,
    tags: formData.get("tags") || undefined,
    prompt: formData.get("prompt") || undefined,
  });

  if (values.id) {
    const result = await prisma.journalEntry.updateMany({
      where: { id: values.id, userId: user.id },
      data: { title: values.title, body: values.body, entryDate: values.entryDate, mood: values.mood, tags: values.tags, prompt: values.prompt },
    });
    if (!result.count) throw new Error("Entrada no encontrada");
  } else {
    await prisma.journalEntry.create({ data: { userId: user.id, title: values.title, body: values.body, entryDate: values.entryDate, mood: values.mood, tags: values.tags, prompt: values.prompt } });
  }
  await record(user.id, "UseTool", "/app/diario", { tool: "journal" });
  revalidatePath("/app/diario");
  revalidatePath("/app");
}

export async function deleteJournalEntry(id: string) {
  const user = await requireUser();
  await prisma.journalEntry.deleteMany({ where: { id, userId: user.id } });
  revalidatePath("/app/diario");
}

export async function toggleFavorite(resourceType: string, resourceId: string) {
  const user = await requireUser();
  await requireEntitlement(user);
  const parsed = z.object({ resourceType: z.string().max(30), resourceId: z.string().max(100) }).parse({ resourceType, resourceId });
  const key = { userId_resourceType_resourceId: { userId: user.id, ...parsed } };
  const existing = await prisma.favorite.findUnique({ where: key });
  if (existing) await prisma.favorite.delete({ where: key });
  else await prisma.favorite.create({ data: { userId: user.id, ...parsed } });
  revalidatePath("/app/favoritos");
  revalidatePath(`/app/${resourceType}`);
  return !existing;
}

export async function markMessageUsed(messageId: string) {
  const user = await requireUser();
  await requireEntitlement(user);
  z.string().regex(/^msg-\d{3}$/).parse(messageId);
  await prisma.messageUse.create({ data: { userId: user.id, messageId } });
  await record(user.id, "UseTool", "/app/mensajes", { tool: "message", messageId });
  revalidatePath("/app/mensajes");
}

export async function completeSmallAction(actionId: string) {
  const user = await requireUser();
  await requireEntitlement(user);
  z.string().regex(/^act-\d{3}$/).parse(actionId);
  await prisma.actionCompletion.create({ data: { userId: user.id, actionId } });
  await record(user.id, "UseTool", "/app/acciones", { tool: "small-action", actionId });
  revalidatePath("/app/acciones");
  revalidatePath("/app");
}
