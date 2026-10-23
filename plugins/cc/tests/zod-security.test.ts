import { describe, expect, it } from "bun:test";
import { createRequire } from "node:module";
import { z } from "zod";
import { CompleteResultSchema } from "@modelcontextprotocol/sdk/types.js";
import legacySchema from "./fixtures/action-schema-v3.json";
import { ACTION_JSON_SCHEMA, parseAction } from "../lib/action.ts";

// JSON object keys are strings already. Native Zod adds this redundant
// constraint; retain every substantive field from the pre-migration schema.
function withoutStringKeyAnnotation(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(withoutStringKeyAnnotation);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).filter(([key, item]) =>
      !(key === "propertyNames" && JSON.stringify(item) === '{"type":"string"}')
    ).map(([key, item]) => [key, withoutStringKeyAnnotation(item)]));
  }
  return value;
}

describe("patched Zod runtime and action compatibility", () => {
  it("resolves the same patched v4 parser for cc and the MCP SDK", () => {
    const require = createRequire(import.meta.url);
    const sdkRequire = createRequire(require.resolve("@modelcontextprotocol/sdk/types.js"));
    expect(require("zod/package.json").version).toBe("4.6.7");
    expect(sdkRequire("zod/package.json").version).toBe("4.6.7");
    expect(require.resolve("zod/v4")).toBe(sdkRequire.resolve("zod/v4"));
  });

  it("retains the previous model-facing action schema semantics", () => {
    expect(withoutStringKeyAnnotation(ACTION_JSON_SCHEMA)).toEqual({ type: "object", ...legacySchema });
  });

  it("preserves nested arbitrary metadata and strict action rejection", () => {
    const action = { action: "send" as const, to: "synthetic-peer", message: "hello",
      meta: { items: [1, null, { enabled: true }], nested: { label: "fixture" } } };
    expect(parseAction(action)).toEqual({ ok: true, action });
    for (const raw of [[], null, { action: "send", to: [], message: "hello" },
      { action: "send", to: "peer", message: "hello", meta: [] },
      { action: "sessions", unexpected: true }]) {
      expect(parseAction(raw).ok).toBe(false);
    }
  });

  it("rejects oversized constrained collections before visiting elements", () => {
    let visits = 0;
    const element = z.string().refine(() => { visits++; return true; });
    const values = Array(8).fill("fixture");
    for (const result of [z.array(element).max(2).safeParse(values),
      z.array(element).length(2).safeParse(values),
      z.set(element).max(2).safeParse(new Set(values.map((_, i) => String(i)))),
      z.map(element, element).max(2).safeParse(new Map(values.map((_, i) => [String(i), "fixture"])))]) {
      expect(result.success).toBe(false);
      if (!result.success) expect(result.error.issues.map(issue => issue.code)).toEqual(["too_big"]);
    }
    expect(visits).toBe(0);
    expect(z.array(element).max(2).safeParse(["fixture"]).success).toBe(true);
    expect(visits).toBe(1);
  });

  it("uses the SDK's patched constrained-array path", () => {
    let reads = 0;
    const values = Array(101);
    Object.defineProperty(values, 0, { get() { reads++; return 42; } });
    const result = CompleteResultSchema.safeParse({ completion: { values } });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues.map(issue => issue.code)).toEqual(["too_big"]);
    expect(reads).toBe(0);
    expect(CompleteResultSchema.safeParse({ completion: { values: ["fixture"] } }).success).toBe(true);
  });
});
