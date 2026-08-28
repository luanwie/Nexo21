import { z } from "zod";
import catalog from "@/generated/content.json";

const itemSchema = z.object({
  title: z.string().min(3).max(120),
  body: z.string().min(120).max(2_500),
  prompt: z.string().min(20).max(500),
  action: z.string().min(20).max(500),
}).strict();

const sectionSchema = z.object({
  title: z.string().min(3).max(120),
  summary: z.string().min(70).max(800),
  items: z.array(itemSchema).min(3).max(20),
}).strict();

export const includedBonusSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(3).max(160),
  subtitle: z.string().min(40).max(400),
  format: z.string().min(10).max(160),
  description: z.string().min(40).max(600),
  sections: z.array(sectionSchema).min(3).max(12),
}).strict();

export type IncludedBonus = z.infer<typeof includedBonusSchema>;

const source = (catalog as unknown as { includedBonuses?: unknown }).includedBonuses ?? [];
export const INCLUDED_BONUSES = z.array(includedBonusSchema).length(5).parse(source);
const bySlug = new Map(INCLUDED_BONUSES.map((bonus) => [bonus.slug, bonus]));

export function getIncludedBonus(slug: string) {
  return bySlug.get(slug);
}
