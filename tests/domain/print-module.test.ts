import { describe, expect, it } from "vitest";
import { expandDetailsForPrint } from "@/lib/print-module";

describe("module printing", () => {
  it("opens every detail and restores its original state", () => {
    const details = [{ open: false }, { open: true }, { open: false }];
    const restore = expandDetailsForPrint(details);
    expect(details.map((detail) => detail.open)).toEqual([true, true, true]);
    restore();
    expect(details.map((detail) => detail.open)).toEqual([false, true, false]);
  });
});
