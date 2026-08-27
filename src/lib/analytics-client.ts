"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export type ClientEventName =
  | "PageView"
  | "ViewContent"
  | "Scroll"
  | "CTA"
  | "InitiateCheckout"
  | "UseTool"
  | "ViewUpsell";

const standardMetaEvents = new Set<ClientEventName>(["PageView", "ViewContent", "InitiateCheckout"]);

export function metaEventMethod(name: ClientEventName) {
  return standardMetaEvents.has(name) ? "track" : "trackCustom";
}

export function trackEvent(name: ClientEventName, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.fbq?.(metaEventMethod(name), name, payload);
  window.gtag?.("event", name, payload);
  const body = JSON.stringify({ name, path: window.location.pathname, payload });
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics", new Blob([body], { type: "application/json" }));
  } else {
    void fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  }
}
