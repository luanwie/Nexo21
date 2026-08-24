import { describe, expect, it } from "vitest";
import {
  loadActions,
  loadConversations,
  loadDevotionals,
  loadJourney,
  loadMessages,
  loadPrayers,
} from "@/lib/content";

describe("product content catalog", () => {
  it("loads a complete and ordered 21-day journey", () => {
    const days = loadJourney();
    expect(days).toHaveLength(21);
    expect(days.map((day) => day.day)).toEqual(Array.from({ length: 21 }, (_, index) => index + 1));
    expect(days.every((day) => day.reading.split(/\s+/).length >= 500)).toBe(true);
  });

  it("meets the launch inventory minimums", () => {
    expect(loadMessages().length).toBeGreaterThanOrEqual(150);
    expect(loadConversations().length).toBeGreaterThanOrEqual(30);
    expect(loadActions().length).toBeGreaterThanOrEqual(100);
    expect(loadDevotionals()).toHaveLength(30);
    expect(loadPrayers().length).toBeGreaterThanOrEqual(36);
  });
});
