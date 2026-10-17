---
title: settings and memory
description: where codex instructions, permissions, tools, and reusable workflows belong.
products: [codex]
updatedAt: "2026-10-17T18:23:26-04:00"
checkedAt: "2026-09-07T15:01:58-04:00"
status: current
completion: complete
evidence: [official-source, analysis]
sources: [openai-codex-agents-md, openai-codex-config, openai-codex-config-basic, openai-codex-config-advanced, openai-codex-memories, openai-codex-approvals, openai-codex-permissions]
redirects: []
voice: evidence
navigation:
  scope: codex
  order: 30
---

<span id="put-each-kind-of-context-in-the-right-place" class="heading-alias" aria-hidden="true"></span>

## where do instructions and settings go?

the configuration gets easier to follow when each file has a job:

| thing you want to preserve | place it belongs |
| --- | --- |
| repository conventions and verification commands | `AGENTS.md` |
| personal runtime defaults | `~/.codex/config.toml` |
| supported settings shared by a trusted project | `.codex/config.toml` |
| a procedure used for a particular kind of task | a skill |
| the current bug, desired change, and finish line | the task prompt |

[`AGENTS.md`](https://learn.chatgpt.com/docs/agent-configuration/agents-md) gives
the model instructions. config files select runtime behavior. writing “ask
before using the network” in a paragraph and configuring network restrictions
have different effects: one guides the agent; the other constrains commands.

<span id="configuration-precedence" class="heading-alias" aria-hidden="true"></span>

## which setting wins?

as of October 17, 2026, the documented
[configuration order](https://learn.chatgpt.com/docs/config-file/config-basic)
is command line overrides, trusted project configuration, a selected profile,
user configuration, cloud managed defaults when supplied by the workspace,
system defaults, then built in defaults. project settings
closer to the working directory take precedence over those higher up the tree.
managed requirements can restrict the values a session may use.

Codex skips project `.codex/` layers until the project is trusted. review the
repository's config, hooks, and rules before granting that trust. some settings,
including provider and authentication choices, are reserved for configuration
outside the project. use the
[reference](https://learn.chatgpt.com/docs/config-file/config-reference) when a
repository setting appears to be ignored.

<span id="try-a-temporary-override-first" class="heading-alias" aria-hidden="true"></span>

### try a temporary setting

for a local inspection session, start from the repository root:

```sh
codex --sandbox read-only --ask-for-approval on-request
```

this sets the sandbox and approval policy for that invocation. it leaves the
saved config alone. ask Codex to locate the relevant code and explain its
verification path before deciding whether to start an editing session.

when several defaults belong together, a
[profile](https://learn.chatgpt.com/docs/config-file/config-advanced#profiles)
can collect them. the current format uses a sibling file such as
`~/.codex/inspect.config.toml`, selected with `codex --profile inspect`:

```toml
sandbox_mode = "read-only"
approval_policy = "on-request"
```

trusted project config can override profile values. the explicit command line
flags above take higher precedence. inspect the active session after switching
profiles, especially when the app and CLI use different installed versions.

<span id="separate-instructions-from-memory" class="heading-alias" aria-hidden="true"></span>

## instructions or memory?

project instructions should explain what applies now. memory can supply useful
context from earlier work: a failed approach, a preference, or a pointer to an
investigation. [local Codex memories](https://learn.chatgpt.com/docs/customization/memories)
are off by default. once enabled, they draw from eligible prior chats and
update in the background; active or short chats can be skipped.

`/memories` controls whether the current chat uses or contributes memories.
global enablement is separate. the IDE uses its connected host's store;
ChatGPT on the web uses separate ChatGPT memory controls.

check remembered facts against the current checkout and the user's latest
instructions. a memory saying a test uses one command can become stale when
the project changes package managers. update the canonical project instruction
so every new task can find the correction.

<span id="permissions-describe-reach-and-interruption" class="heading-alias" aria-hidden="true"></span>

## when will Codex ask for approval?

the sandbox controls filesystem and network reach for commands. approval
policy controls when execution needs a decision. `never` means Codex cannot
ask for a new approval; restricted commands can still fail. it does not grant
extra access. the [approval guide](https://learn.chatgpt.com/docs/agent-approvals-security)
explains these combinations.

the beta [permission profiles](https://learn.chatgpt.com/docs/permissions) provide
another way to describe filesystem and network policy. they are separate from
the config profiles above. follow one supported permission configuration
format, and check the active policy before assuming a directory or destination
is reachable.

<span id="diagnose-the-environment-before-expanding-access" class="heading-alias" aria-hidden="true"></span>

## why is a command failing?

when an operation fails, check which host ran it, the working directory, the
loaded config layer, and the service identity. a missing executable on a remote
machine needs an environment fix. a request to a service under the wrong
account needs an identity fix. changing permissions would leave either cause
unresolved.

keep credentials in the service's authentication flow or an appropriate secret
store. use config to name the connection and its scope. verify a harmless read
before depending on it for a write.
