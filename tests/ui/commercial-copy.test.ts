import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const files = [
  "src/components/landing/landing-page.tsx",
  "src/components/checkout-form.tsx",
  "src/app/terminos/page.tsx",
  "src/app/soporte/page.tsx",
];

describe("commercial copy", () => {
  it("states a seven-day refund period everywhere buyers see it", () => {
    const copy = files.map((file) => readFileSync(file, "utf8")).join("\n");
    expect(copy).toContain("7 días");
    expect(copy).not.toContain("15 días de garantía");
    expect(copy).not.toContain("primeros 15 días");
  });
});
