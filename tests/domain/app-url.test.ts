import { describe, expect, it } from "vitest";
import { resolveAppUrl, resolvePublicAppUrl } from "@/lib/app-url";

describe("canonical app URL", () => {
  it("ignores a blank configured URL and uses the Vercel host", () => {
    expect(resolveAppUrl({ configured: "  ", vercelHost: "nexo21.example.vercel.app" })).toBe("https://nexo21.example.vercel.app");
  });

  it("uses localhost only when no public host exists", () => {
    expect(resolveAppUrl({ configured: undefined, vercelHost: "" })).toBe("http://localhost:3000");
  });

  it("skips a whitespace production host and uses the deployment host", () => {
    expect(resolveAppUrl({ configured: "", vercelProjectHost: "  ", vercelHost: "preview.vercel.app" })).toBe("https://preview.vercel.app");
  });

  it("does not invent a public production origin", () => {
    expect(resolvePublicAppUrl({ configured: "", vercelProjectHost: " ", vercelHost: "" })).toBeUndefined();
  });
});
