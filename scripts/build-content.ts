import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const contentDir = path.join(root, "content");
const generatedDir = path.join(root, "src", "generated");

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(contentDir, file), "utf8")) as T;
}

const journey = Array.from({ length: 21 }, (_, index) =>
  readJson<Record<string, unknown>>(`journey/day-${String(index + 1).padStart(2, "0")}.json`),
);

for (const [index, day] of journey.entries()) {
  if (day.day !== index + 1) throw new Error(`Journey day ${index + 1} is out of order`);
  const words = String(day.reading ?? "").trim().split(/\s+/).filter(Boolean).length;
  if (words < 500) throw new Error(`Journey day ${index + 1} has only ${words} reading words`);
}

const journeyIndex = readJson<{
  totalDays: number;
  days: Array<{ day: number; slug: string; file: string }>;
}>("journey/index.json");
if (journeyIndex.totalDays !== journey.length || journeyIndex.days.length !== journey.length) {
  throw new Error("Journey index count does not match the 21 source files");
}
for (const day of journeyIndex.days) {
  const source = journey[day.day - 1];
  if (!source || source.slug !== day.slug || day.file !== `day-${String(day.day).padStart(2, "0")}.json`) {
    throw new Error(`Journey index is stale at day ${day.day}`);
  }
}

const prayerCatalog = readJson<{
  title: string;
  disclaimer: string;
  themes: Array<{ id: string; theme: string; description: string; prayers: unknown[] }>;
}>("prayers.json");

const prayers = prayerCatalog.themes.flatMap((theme) =>
  theme.prayers.map((prayer) => ({ ...prayer as object, themeId: theme.id, theme: theme.theme })),
);

const productModuleFiles = [
  "product-modules/01-core-addons.json",
  "product-modules/02-dlcs-a.json",
  "product-modules/03-dlcs-b.json",
  "product-modules/04-dlcs-subscription.json",
];
const productModules = productModuleFiles.flatMap((file) => readJson<unknown[]>(file));
if (productModules.length !== 15) throw new Error(`productModules has ${productModules.length}; expected 15`);
const productModuleSlugs = productModules.map((module) => String((module as { slug?: unknown }).slug ?? ""));
if (new Set(productModuleSlugs).size !== productModuleSlugs.length) throw new Error("productModules contains duplicate slugs");

const includedBonuses = readJson<Array<{ slug?: unknown }>>("included-bonuses.json");
if (includedBonuses.length !== 5) throw new Error(`includedBonuses has ${includedBonuses.length}; expected 5`);
const includedBonusSlugs = includedBonuses.map((bonus) => String(bonus.slug ?? ""));
if (new Set(includedBonusSlugs).size !== includedBonusSlugs.length || includedBonusSlugs.some((slug) => !/^[a-z0-9-]+$/.test(slug))) {
  throw new Error("includedBonuses requires unique safe slugs");
}

const output = {
  generatedAt: "deterministic-build",
  journey,
  messages: readJson<unknown[]>("messages.json"),
  conversations: readJson<unknown[]>("conversations.json"),
  actions: readJson<unknown[]>("actions.json"),
  devotionals: readJson<unknown[]>("devotionals.json"),
  prayerCatalog,
  prayers,
  continuity: readJson<Record<string, unknown>>("continuity-30.json"),
  storeProducts: readJson<unknown[]>("store-products.json"),
  productModules,
  includedBonuses,
};

const minimums: Array<[string, unknown[], number]> = [
  ["messages", output.messages, 150],
  ["conversations", output.conversations, 30],
  ["actions", output.actions, 100],
  ["devotionals", output.devotionals, 30],
  ["prayers", output.prayers, 36],
  ["storeProducts", output.storeProducts, 10],
  ["productModules", output.productModules, 15],
  ["includedBonuses", output.includedBonuses, 5],
];
for (const [name, items, minimum] of minimums) {
  if (items.length < minimum) throw new Error(`${name} has ${items.length}; expected at least ${minimum}`);
}

fs.mkdirSync(generatedDir, { recursive: true });
fs.writeFileSync(path.join(generatedDir, "content.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`Content built: ${journey.length} days, ${output.messages.length} messages, ${output.conversations.length} conversations, ${output.actions.length} actions, ${output.devotionals.length} devotionals, ${prayers.length} prayers.`);
