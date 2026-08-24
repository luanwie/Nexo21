import { describe, expect, it } from "vitest";
import { OFFERS } from "@/lib/offers";
import { loadModuleLibrary, loadProductModules } from "@/lib/product-modules";

const addOnSlugs = OFFERS.filter((offer) => offer.slug !== "nexo-21").map((offer) => offer.slug).sort();

describe("paid product modules", () => {
  it("has one complete module for every add-on offer", () => {
    const modules = loadProductModules();
    expect(modules.map((module) => module.slug).sort()).toEqual(addOnSlugs);
    expect(new Set(modules.map((module) => module.slug)).size).toBe(modules.length);
    for (const productModule of modules) {
      expect(productModule.title, productModule.slug).toBe(OFFERS.find((offer) => offer.slug === productModule.slug)?.title);
    }
    expect(modules.find((module) => module.slug === "circulo-nexo")?.format).toBe("monthly-membership");
  });

  it("does not advertise an add-on before its module is launch ready", () => {
    expect(OFFERS.every((offer) => offer.launchReady)).toBe(true);
  });

  it("provides substantive, safe and structured content", () => {
    for (const productModule of loadProductModules()) {
      expect(productModule.intro.length, productModule.slug).toBeGreaterThanOrEqual(140);
      expect(productModule.safetyNotice, productModule.slug).toMatch(/violencia|coerci[oó]n|amenaza|riesgo/i);
      expect(productModule.sections.length, productModule.slug).toBeGreaterThanOrEqual(3);
      for (const section of productModule.sections) {
        expect(section.id, productModule.slug).toMatch(/^[a-z0-9-]+$/);
        expect(section.summary.length, `${productModule.slug}/${section.id}`).toBeGreaterThanOrEqual(70);
        expect(section.items.length, `${productModule.slug}/${section.id}`).toBeGreaterThanOrEqual(3);
        for (const item of section.items) {
          expect(item.body.length, `${productModule.slug}/${section.id}/${item.title}`).toBeGreaterThanOrEqual(120);
          expect(item.prompt.length).toBeGreaterThanOrEqual(20);
          expect(item.action.length).toBeGreaterThanOrEqual(20);
        }
      }
    }
  });

  it("connects numeric library offers to the validated source catalogs", () => {
    const expected = new Map<string, readonly ["messages" | "conversations" | "devotionals" | "actions", number]>([
      ["mensajes-esenciales", ["messages", 50]],
      ["conversaciones-sin-herir", ["conversations", 15]],
      ["devocional-30", ["devotionals", 30]],
      ["desafio-gratitud-30", ["actions", 30]],
      ["mensajes-365", ["messages", 150]],
    ] as const);
    for (const productModule of loadProductModules()) {
      const requirement = expected.get(productModule.slug);
      if (!requirement) continue;
      expect(productModule.library?.source, productModule.slug).toBe(requirement[0]);
      expect(productModule.library?.limit, productModule.slug).toBe(requirement[1]);
      expect(loadModuleLibrary(productModule).length, productModule.slug).toBe(requirement[1]);
    }
  });
});
