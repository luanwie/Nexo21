import { describe, expect, it } from "vitest";
import { resolveEmailReplyTo, resolveSupportContact } from "@/lib/contact";

describe("support contact", () => {
  it("normalizes configured public support details", () => {
    expect(resolveSupportContact({ email: "  LISTENGHUST.IA@gmail.com ", name: " Luan " })).toEqual({
      email: "listenghust.ia@gmail.com",
      name: "Luan",
    });
  });

  it("fails closed when the support email is invalid", () => {
    expect(() => resolveSupportContact({ email: "not-an-email", name: "Luan" })).toThrow("SUPPORT_EMAIL");
  });

  it("normalizes reply-to and falls back when blank", () => {
    expect(resolveEmailReplyTo("  REPLY@example.com ", "support@example.com")).toBe("reply@example.com");
    expect(resolveEmailReplyTo("  ", "support@example.com")).toBe("support@example.com");
    expect(() => resolveEmailReplyTo("invalid", "support@example.com")).toThrow("EMAIL_REPLY_TO");
  });
});
