import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (file: string) => readFileSync(file, "utf8");

describe("Nexo 21 brand surfaces", () => {
  it("keeps login reachable without replacing the purchase CTA", () => {
    const landing = read("src/components/landing/landing-page.tsx");
    expect(landing).toContain('href="/login"');
    expect(landing).toMatch(/>\s*Ingresar\s*</);
  });

  it("uses the official logo in the auth shell", () => {
    const auth = read("src/components/auth/auth-shell.tsx");
    expect(auth).toContain('import { BrandLogo }');
    expect(auth).toContain("<BrandLogo");
  });

  it("gives the internal navigation a branded progress cue", () => {
    const sidebar = read("src/components/app-sidebar.tsx");
    expect(sidebar).toContain("Tu espacio de hoy");
  });
});
