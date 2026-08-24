import { describe, expect, it } from "vitest";
import { OFFERS, getOffer } from "@/lib/offers";

describe("offer catalog", () => {
  it("keeps one main offer, three low-friction bumps and one upsell", () => {
    expect(OFFERS.filter((offer) => offer.type === "MAIN")).toHaveLength(1);
    expect(OFFERS.filter((offer) => offer.type === "BUMP")).toHaveLength(3);
    expect(OFFERS.filter((offer) => offer.type === "UPSELL")).toHaveLength(1);
    expect(getOffer("nexo-21")?.priceCents).toBe(990);
  });

  it("defines at least ten unlockable DLC experiences", () => {
    const dlcs = OFFERS.filter((offer) => offer.type === "DLC");
    expect(dlcs.length).toBeGreaterThanOrEqual(10);
    expect(new Set(OFFERS.map((offer) => offer.slug)).size).toBe(OFFERS.length);
  });

  it("publishes the complete 16-product catalog", () => {
    expect(OFFERS).toHaveLength(16);
    expect(OFFERS.every((offer) => offer.launchReady)).toBe(true);
  });
});
