import { z } from "zod";
import catalog from "@/generated/content.json";

const productModuleItemSchema = z.object({
  title: z.string().min(3).max(120),
  body: z.string().min(120).max(2_500),
  prompt: z.string().min(20).max(500),
  action: z.string().min(20).max(500),
}).strict();

const productModuleSectionSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(3).max(120),
  summary: z.string().min(70).max(800),
  items: z.array(productModuleItemSchema).min(3).max(40),
}).strict();

export const productModuleSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(3).max(160),
  format: z.enum(["guided-journey", "interactive-library", "workbook", "monthly-membership"]),
  version: z.literal("1.0"),
  intro: z.string().min(140).max(1_500),
  safetyNotice: z.string().min(80).max(1_000),
  library: z.object({
    source: z.enum(["messages", "conversations", "devotionals", "actions"]),
    limit: z.number().int().min(1).max(200),
    title: z.string().min(3).max(120),
  }).strict().optional(),
  sections: z.array(productModuleSectionSchema).min(3).max(20),
}).strict();

export type ProductModule = z.infer<typeof productModuleSchema>;

export type ModuleLibraryItem = {
  id: string;
  title: string;
  body: string;
  meta: string;
};

const source = (catalog as unknown as { productModules?: unknown }).productModules ?? [];
const modules = z.array(productModuleSchema).parse(source);
const bySlug = new Map(modules.map((module) => [module.slug, module]));

export function loadProductModules() {
  return modules;
}

export function getProductModule(slug: string) {
  return bySlug.get(slug);
}

export function loadModuleLibrary(module: ProductModule): ModuleLibraryItem[] {
  if (!module.library) return [];
  const data = catalog as unknown as {
    messages: Array<{ id: string; text: string; category: string; objective: string }>;
    conversations: Array<{ id: string; situation: string; opening: string; recommendedPhrases: string[]; closing: string }>;
    devotionals: Array<{ day: number; title: string; reading: string; reflection: string; prayer: string; action: string }>;
    actions: Array<{ id: string; text: string; category: string; objective: string }>;
  };
  const normalized: Record<NonNullable<ProductModule["library"]>["source"], ModuleLibraryItem[]> = {
    messages: data.messages.map((item, index) => ({
      id: item.id,
      title: `Mensaje ${index + 1} · ${item.category}`,
      body: item.text,
      meta: item.objective,
    })),
    conversations: data.conversations.map((item) => ({
      id: item.id,
      title: item.situation,
      body: [item.opening, ...item.recommendedPhrases, item.closing].join(" "),
      meta: "Guía de conversación",
    })),
    devotionals: data.devotionals.map((item) => ({
      id: `devotional-${item.day}`,
      title: `Día ${item.day} · ${item.title}`,
      body: `${item.reading} ${item.reflection} ${item.prayer}`,
      meta: item.action,
    })),
    actions: data.actions.map((item) => ({
      id: item.id,
      title: item.text,
      body: item.objective,
      meta: item.category,
    })),
  };
  return normalized[module.library.source].slice(0, module.library.limit);
}
