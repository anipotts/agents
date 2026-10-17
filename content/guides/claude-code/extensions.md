---
title: what else can it do?
description: choosing and combining claude code extensions by the job they do.
products: [claude-code]
updatedAt: "2026-10-17T18:23:26-04:00"
checkedAt: "2026-09-07T15:02:34-04:00"
status: current
completion: complete
draft: false
evidence: [official-source, analysis, open-question]
sources: [anthropic-features-overview, anthropic-skills, anthropic-subagents, anthropic-mcp, anthropic-hooks, anthropic-plugins, anthropic-function-hooks-proposal, anthropic-mods-overview, anthropic-mods-events, anthropic-plugins-reference, alex-albert-mcp-github-demo-post]
redirects: []
voice: personal
navigation:
  scope: claude-code
  order: 50
---

<span id="choosing-an-extension" class="heading-alias" aria-hidden="true"></span>

## what do i want to add?

an extension should have a specific job. instructions provide context, a skill
carries a procedure, MCP connects a system, a subagent owns a separate problem,
and a hook responds to an event. a plugin can package those pieces for reuse.
Anthropic’s [feature overview](https://code.claude.com/docs/en/features-overview)
explains how they compose.

start with a repeated problem from actual work. “the agent keeps missing the
same review step” gives you something to improve and a result to evaluate.
“add more extensions” leaves both of those unclear.

<span id="a-scratch-project-for-the-examples" class="heading-alias" aria-hidden="true"></span>

### a project to try this in

create an empty folder with Node available. save this as `label.mjs`:

```js
export function displayLabel(value) {
  return value.replace(/\s+/g, ' ').trim();
}
```

save this as `label.test.mjs`:

```js
import assert from 'node:assert/strict';
import test from 'node:test';
import { displayLabel } from './label.mjs';

test('labels preserve words and normalize whitespace', () => {
  assert.equal(displayLabel('  two   words  '), 'two words');
  assert.equal(displayLabel('already clear'), 'already clear');
});
```

run `node --test label.test.mjs` once before adding an extension. these are
small instructional fixtures, so you can see exactly which behavior each
extension adds.

<span id="turn-a-procedure-into-a-skill" class="heading-alias" aria-hidden="true"></span>

## how do i teach it a repeatable task?

[skills](https://code.claude.com/docs/en/skills) use `SKILL.md` with a name,
description, and instructions. supporting files can carry examples or scripts.
write a description that makes the intended task recognizable.

for a manually invoked review of the label exercise, save this at
`.claude/skills/check-label/SKILL.md`:

```markdown
---
name: check-label
description: Review displayLabel against its string input contract and tests.
disable-model-invocation: true
---

Read label.mjs and label.test.mjs.
Check edge whitespace, internal whitespace, empty output, and unchanged casing.
Run node --test label.test.mjs.
Return the command result and any missing behavioral case with an example input.
Keep this pass limited to inspection and reporting.
```

invoke it with `/check-label`. the explicit invocation setting keeps this
procedure under your control; it does not establish a tool permission boundary.
review the actual result to see whether the skill gave a clearer report than
the ordinary prompt. keep it when repeated use justifies the extra file.

<span id="give-a-subagent-a-bounded-question" class="heading-alias" aria-hidden="true"></span>

## when should i bring in a subagent?

[subagents](https://code.claude.com/docs/en/sub-agents) can have their own prompt
and tool list. a project definition belongs under `.claude/agents/`. for
example, `.claude/agents/contract-reviewer.md` can contain:

```markdown
---
name: contract-reviewer
description: Inspect the label function and tests for a mismatch with the stated contract.
tools: Read, Grep, Glob
---

Inspect label.mjs and label.test.mjs using the contract supplied with the task.
Return a concrete counterexample for each mismatch, with file references.
If the stated cases are covered, say which cases you checked.
```

ask Claude to use `contract-reviewer` for the label function. the narrow tool
list supports a source inspection. this agent has no shell tool for executing
the test; the main session can run it and compare the evidence. label those
two kinds of review accurately.

separate context is useful for a question whose investigation would otherwise
crowd the main conversation. include the exact contract and files in the
handoff. a worker can only use the context and tools it receives.

<span id="connect-the-service-the-task-needs" class="heading-alias" aria-hidden="true"></span>

## how do i connect another service?

[MCP](https://code.claude.com/docs/en/mcp) exposes tools and resources from other
systems. a skill can explain how to use an issue tracker; its MCP server
provides the operations that read or change issues.

use `claude mcp list` to inspect configured servers and `/mcp` inside a session
to inspect connections and authenticate supported services. local, project,
and user MCP scopes control where a server is configured. approving a project
server and approving its tool calls are separate steps. interactive sessions
ask before loading project servers; `claude -p`, SDK, and cloud sessions can
load them without that prompt.

begin with one inspectable operation, such as reading a known issue by its
identifier. check the active account, expected result, and permissions in the
environment where Claude runs. a connector configured locally can need separate
setup in a cloud session.

then decide whether the workflow needs writes. adding access to comments,
records, or messages changes what the session can do on another system. match
the service permissions to the intended operations, and keep returned content
separate from instructions that authorize the task.

Alex Albert’s 2024 demo shows Claude desktop using MCP to create a GitHub
repository and pull request.

<div class="publication-embed" data-media-id="alex-albert-mcp-github-demo-post">
  <iframe src="https://platform.twitter.com/embed/Tweet.html?id=1861079874385203522&amp;dnt=true&amp;hideThread=true&amp;theme=dark" title="Alex Albert demonstrates MCP with GitHub (November 2024)" width="360" height="730" style="--embed-height: 730px; --embed-height-mobile: 593px" loading="lazy" allow="fullscreen; autoplay 'none'" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" referrerpolicy="no-referrer"></iframe>
  <p class="publication-embed-credit"><a href="https://x.com/alexalbert__/status/1861079874385203522" target="_blank" rel="noopener noreferrer">Alex Albert (@alexalbert__)</a>, november 2024.</p>
</div>

<span id="run-hooks-at-meaningful-events" class="heading-alias" aria-hidden="true"></span>

## can it run a check after each edit?

[hooks](https://code.claude.com/docs/en/hooks) attach handlers to lifecycle events.
`PreToolUse` runs before a tool action; `PostToolUse` runs after a successful
one. current handlers include command, HTTP, MCP tool, prompt, and agent types,
with event specific support. command handlers suit deterministic checks;
model based handlers add judgment and another model call.

<span id="a-small-hook-you-can-exercise" class="heading-alias" aria-hidden="true"></span>

### try a hook

in the scratch project, this `.claude/settings.json` entry runs the label test
after an Edit or Write tool call:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "node --test \"$CLAUDE_PROJECT_DIR/label.test.mjs\" >&2 || exit 2"
          }
        ]
      }
    ]
  }
}
```

this deliberately small example runs after every matching edit in the scratch
project. Bash commands and other processes that edit the same files do not
match `Edit|Write`. exit code 2 shows the failed check’s stderr to Claude;
the edit has already happened. running the command directly checks the test and shell
behavior. triggering an actual Edit call is a separate check of the hook’s
registration and delivery.

for a real repository, narrow the event or script to the relevant files and
measure the delay it adds. a slow hook makes each matching action slower.
record success, failure, and timeout behavior so a quiet handler has an
explanation.

## plugins

[plugins](https://code.claude.com/docs/en/plugins) distribute related skills,
agents, hooks, and MCP configuration. begin with standalone files while the
workflow is changing. package them when several projects need the same tested
procedure and you can describe what updating it will change.

a small plugin might contain a manifest in `.claude-plugin/plugin.json`, a
review skill under `skills/`, a specialist under `agents/`, and event handlers
under `hooks/`. the manifest names the plugin; these component directories
belong at the plugin root.

use the [manifest reference](https://code.claude.com/docs/en/plugins-reference)
and `claude plugin validate ./my-plugin` to check the package, then load it in
a disposable project with `claude --plugin-dir ./my-plugin`. test one expected
invocation and one failure. package validation checks structure; an actual run
checks whether the pieces work together.

<span id="function-hooks-are-a-proposal" class="heading-alias" aria-hidden="true"></span>

## mods extend the harness

i'm interested in how much an agent can change about its own setup, including
the harness around it. that's why the Function Hooks proposal caught my
attention: it described deeper access to Claude Code's internals.

that [discussion](https://github.com/anthropics/claude-code/issues/91870) now
tracks Mods. [Mods](https://code.claude.com/docs/en/plugins/mods/overview) are
plugins with JavaScript or TypeScript event handlers that run inside Claude
Code. they are enabled by default in terminal v2.1.287 and later and Desktop
Code v2.1.286 and later, subject to organization controls. the earlier
`CLAUDE_CODE_ENABLE_FUNCTION_HOOKS` variable is ignored from v2.1.287.

mods can change tool calls, requests, and parts of the interface. they run
with your user permissions, outside the Bash sandbox. inspect the code before
loading one. the [event reference](https://code.claude.com/docs/en/plugins/mods/events)
documents the `$` capabilities, event, and `next` continuation. handler failures
can skip a handler, so a guard needs deliberate failure handling and a test.

the interesting test for deeper customization is concrete: can a plugin observe
one intended event, make a visible change, and recover cleanly when its callback
fails? the settings hooks above and Mods have separate APIs. this page documents
the distinction; it does not report a firsthand Mods runtime test.
