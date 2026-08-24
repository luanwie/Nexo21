import { describe, expect, it } from "vitest";
import { summarizeProgress } from "@/lib/domain/progress";

describe("journey progress", () => {
  it("summarizes completed days without childish points", () => {
    expect(summarizeProgress([1, 2, 4], 21)).toEqual({
      completedDays: 3,
      currentDay: 3,
      percent: 14,
      streak: 2,
      totalDays: 21,
    });
  });

  it("caps invalid and duplicated days", () => {
    expect(summarizeProgress([1, 1, 0, 22, 2, 3], 21)).toMatchObject({
      completedDays: 3,
      currentDay: 4,
      percent: 14,
      streak: 3,
    });
  });
});
