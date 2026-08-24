import { describe, expect, it } from "vitest";
import { readJsonBody } from "@/lib/http-body";

describe("bounded JSON request bodies", () => {
  it("parses a body without relying on Content-Length", async () => {
    const request = new Request("http://local.test", { method: "POST", body: JSON.stringify({ ok: true }) });
    await expect(readJsonBody(request, 100)).resolves.toEqual({ ok: true });
  });

  it("rejects an oversized body even when Content-Length is absent", async () => {
    const request = new Request("http://local.test", { method: "POST", body: JSON.stringify({ value: "x".repeat(200) }) });
    await expect(readJsonBody(request, 50)).rejects.toThrow(/too large/i);
  });
});
