import { describe, expect, it } from "vitest";
import { secureSessionConfig } from "@/lib/auth-policy";

describe("authentication session policy", () => {
  it("requires database-backed session checks so revocation is immediate", () => {
    expect(secureSessionConfig.cookieCache.enabled).toBe(false);
  });
});
