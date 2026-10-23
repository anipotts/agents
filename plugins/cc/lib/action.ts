// tested with: claude code v2.1.122
/**
 * cc verb surface — single source of truth.
 *
 * The MCP tool exposes one tool ("cc") with action-discriminated args.
 * Adding/removing/renaming a verb means editing this file and nothing else;
 * the dispatcher's exhaustive switch in server.ts will refuse to compile if a
 * verb is missing a branch.
 *
 * Why a discriminated union (not 5 tools): byte-stable across sessions, so
 * Anthropic's prompt cache hits across every session that uses cc within the
 * 5-min TTL window; subagent contexts pay one tool's worth of schema bytes
 * instead of five; tool-list response is a single JSON Schema with `oneOf`
 * branches that the model navigates by the `action` discriminator.
 */

import { z } from "zod";

// --- args schema (zod, single source of truth) ------------------------------

const urgencySchema = z.enum(["low", "normal", "urgent", "question"]);

// Default scope for `sessions` and `check` is "project": peers whose
// project_root matches mine. Most cross-session coordination happens inside
// one repo, so this drops noise on a machine running 5 claudes across 3
// repos. "global" opts back into the v3 behavior of listing every peer on
// the machine. Non-git cwds fall back to global automatically.
const scopeSchema = z
  .enum(["project", "global"])
  .optional()
  .describe(
    "project (default): peers in my git project_root. global: every peer on this machine.",
  );

export const ActionSchema = z.discriminatedUnion("action", [
  z
    .object({
      action: z.literal("sessions"),
      include_self: z
        .boolean()
        .optional()
        .describe("include your own session in the result (default false)"),
      scope: scopeSchema,
    })
    .strict(),

  z
    .object({
      action: z.literal("send"),
      to: z
        .string()
        .min(1)
        .describe("target peer: short id (8 hex), full session id, or cwd basename"),
      message: z.string().min(1).describe("message body the recipient will read"),
      subject: z.string().optional().describe("optional one-line subject"),
      urgency: urgencySchema
        .optional()
        .describe("priority hint; default normal. 'question' signals a reply is expected"),
      meta: z
        .record(z.string(), z.unknown())
        .optional()
        .describe("optional structured metadata; recipient can read this verbatim"),
    })
    .strict(),

  z
    .object({
      action: z.literal("announce"),
      summary: z.string().min(1).describe("one-line status broadcast (required)"),
      detail: z.string().optional().describe("optional longer body"),
    })
    .strict(),

  z
    .object({
      action: z.literal("check"),
      since_s: z
        .number()
        .positive()
        .optional()
        .describe("lookback window in seconds; defaults to since-last-check"),
      scope: scopeSchema,
    })
    .strict(),

  // Wave C: declarative subscriptions. Replaces v2 topics.
  z
    .object({
      action: z.literal("subscribe"),
      files: z
        .string()
        .optional()
        .describe(
          "file path glob (e.g. 'src/auth/**'); matches edited file paths from digest_delta. ** = any depth, * = single segment.",
        ),
      peers: z
        .string()
        .optional()
        .describe(
          "peer match: 'any', short id (8 hex), or full session id; restricts the subscription to this peer's activity",
        ),
      urgency_min: z
        .enum(["low", "normal", "urgent", "question"])
        .optional()
        .describe(
          "minimum urgency for DM matches; ignored for file/announcement events",
        ),
    })
    .strict(),

  z
    .object({
      action: z.literal("unsubscribe"),
      id: z
        .string()
        .min(1)
        .describe("subscription id from cc(action='subscribe') response"),
    })
    .strict(),
]);

export type Action = z.infer<typeof ActionSchema>;
export type ActionName = Action["action"];

export const ACTION_NAMES: readonly ActionName[] = [
  "sessions",
  "send",
  "announce",
  "check",
  "subscribe",
  "unsubscribe",
] as const;

// --- MCP tool description ---------------------------------------------------
//
// Kept terse: this string lands in every system prompt for every cc session.
// The model gets full verb routing from skills/sessions/SKILL.md; this string
// only needs to convey what the tool *is*, the four actions, and the push
// guarantee for DM arrival. Disambiguating tokens up front so ToolSearch on
// "session mesh" / "peer messaging" / "multi-agent coordination" matches — a
// bare "cc" collides with Slack mention syntax, MCP server prefixes, and AWS
// service codes.
export const TOOL_DESCRIPTION =
  "cc — Claude Code session mesh, peer messaging, multi-agent coordination on this machine. " +
  "Actions: sessions (list peers), send (DM peer), announce (broadcast status), check (pull digest), " +
  "subscribe / unsubscribe (declarative match rules surfaced as subscription_matches). " +
  "DM arrival push-delivered via the channel; digest_delta piggybacks every cc call. " +
  "Default scope is the current git project_root.";

// --- pre-built JSON Schema (cached at module load) --------------------------
//
// Computed once when this module is first imported. Identical bytes across
// every session and every subagent for prompt-cache stability. Stripping the
// $schema field shaves ~50B and removes a meta key the MCP client ignores.

const _raw = z.toJSONSchema(ActionSchema, {
  target: "draft-7",
  io: "input",
});

// Keep the existing draft-7 tool contract without the schema meta field.
const { $schema: _drop, anyOf: _branches, ...stripped } = _raw as {
  $schema?: string;
  anyOf?: unknown[];
} & Record<string, unknown>;

// Discriminated unions SHOULD use `oneOf` per JSON Schema 2020-12 + OpenAPI.
// Some MCP clients treat `anyOf` permissively (multi-branch match) whereas
// `oneOf` is exclusive -- closer to the discriminated-union semantic.
const withOneOf =
  _branches !== undefined ? { ...stripped, oneOf: _branches } : stripped;

// Every action branch is an object; MCP clients also require this root type.
export const ACTION_JSON_SCHEMA = {
  ...withOneOf,
  type: "object" as const,
};

// --- runtime helpers --------------------------------------------------------

/**
 * Parse + validate an inbound MCP tool-call argument blob.
 * Returns either a typed Action or a list of human-readable error strings.
 */
export function parseAction(
  raw: unknown,
): { ok: true; action: Action } | { ok: false; errors: string[] } {
  const parsed = ActionSchema.safeParse(raw);
  if (parsed.success) return { ok: true, action: parsed.data };
  return {
    ok: false,
    errors: parsed.error.issues.map((i) => {
      const path = i.path.length ? i.path.join(".") + ": " : "";
      return path + i.message;
    }),
  };
}
