import { expect, it } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { ACTION_JSON_SCHEMA } from "../lib/action.ts";

it("preserves initialize, tool listing, and valid/invalid calls in isolated state", async () => {
  const root = mkdtempSync(join(tmpdir(), "cc-mcp-compatibility-"));
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [join(import.meta.dir, "..", "server.ts")],
    cwd: root,
    env: {
      PATH: process.env.PATH ?? "",
      HOME: root,
      CLAUDE_CONFIG_DIR: join(root, "claude"),
      CC_STATE_DIR: join(root, "state"),
      CLAUDE_CODE_SESSION_ID: "synthetic-zod-compatibility",
    },
    stderr: "pipe",
  });
  const client = new Client({ name: "synthetic-compatibility-test", version: "1.0.0" });
  try {
    await client.connect(transport);
    expect(client.getServerVersion()?.name).toBe("cc");
    const { tools } = await client.listTools();
    expect(tools).toHaveLength(1);
    expect(tools[0].name).toBe("cc");
    expect(tools[0].inputSchema).toEqual(ACTION_JSON_SCHEMA);
    const valid = await client.callTool({ name: "cc", arguments: { action: "sessions" } });
    expect(valid.isError).not.toBe(true);
    const invalid = await client.callTool({ name: "cc", arguments: { action: "send", to: "peer" } });
    expect(invalid.isError).toBe(true);
    expect(JSON.stringify(invalid.content)).toContain("message");
    const unknown = await client.callTool({ name: "unknown", arguments: {} });
    expect(unknown.isError).toBe(true);
  } finally {
    await client.close();
    await transport.close();
    rmSync(root, { recursive: true, force: true });
  }
}, 15_000);
