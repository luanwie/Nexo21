import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const bonusFile = path.join(root, "content", "included-bonuses.json");
const landingFile = path.join(root, "src", "components", "landing", "landing-page.tsx");

describe("included Nexo 21 bonuses", () => {
  it("ships the five promised ebooks and exposes them in the offer", () => {
    const bonuses = JSON.parse(fs.readFileSync(bonusFile, "utf8")) as Array<{
      slug: string;
      title: string;
      format: string;
      sections: Array<{ items: unknown[] }>;
    }>;
    const landing = fs.readFileSync(landingFile, "utf8");

    expect(bonuses).toHaveLength(5);
    expect(new Set(bonuses.map((bonus) => bonus.slug)).size).toBe(5);
    expect(bonuses.every((bonus) => bonus.format.includes("PDF") && bonus.sections.length >= 3 && bonus.sections.every((section) => section.items.length >= 3))).toBe(true);
    expect(landing).toContain("5 ebooks incluidos");
    expect(landing).toContain("US$9.90");
  });
});
