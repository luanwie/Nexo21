import { describe, expect, it } from "vitest";
import { metaEventMethod } from "@/lib/analytics-client";

describe("Meta event mapping", () => {
  it("uses standard Meta events only where Meta supports them", () => {
    expect(metaEventMethod("PageView")).toBe("track");
    expect(metaEventMethod("ViewContent")).toBe("track");
    expect(metaEventMethod("InitiateCheckout")).toBe("track");
    expect(metaEventMethod("CTA")).toBe("trackCustom");
  });
});
