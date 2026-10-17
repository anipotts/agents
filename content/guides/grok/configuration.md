---
title: settings and access
description: configure grok build by scope, inspect what it loads, and give grok bots a clear role.
products: [grok]
updatedAt: "2026-10-17T18:23:26-04:00"
status: pending
evidence: [tested, official-source, analysis]
sources: [grok-build, grok-build-cli, grok-build-settings, grok-build-settings-reference, grok-build-permissions, grok-build-sandbox, grok-bot-profiles, grok-bot-approvals]
redirects: []
voice: evidence
navigation:
  scope: grok
  order: 30
---

<span id="put-each-setting-where-it-belongs" class="heading-alias" aria-hidden="true"></span>

## where do the settings go?

Grok Build loads configuration from your machine and the current project.
Grok Bot uses profiles and account settings for persistent agents. start by
identifying which one you are changing.

| scope | canonical place |
|---|---|
| personal defaults | `~/.grok/config.toml` |
| repository MCP servers, plugins, and permission rules | `.grok/config.toml` |
| shared agent instructions | `AGENTS.md` |
| extensions | `.grok/` skills, plugins, and hooks; MCP servers in `.grok/config.toml` |

the [settings guide](https://docs.x.ai/build/settings) limits project
configuration to those three jobs. model choices and interface preferences
belong in your user configuration. `GROK_HOME` can change the location of that
personal directory. managed configuration and requirements can also constrain
the effective settings on an organization managed machine.

<span id="try-one-inspectable-configuration" class="heading-alias" aria-hidden="true"></span>

## which settings did it load?

for a session where you want to review tool approvals, the documented user
setting is:

```toml
# ~/.grok/config.toml
[ui]
permission_mode = "ask"
```

a repository can add a targeted command rule:

```toml
# .grok/config.toml
[permission]
rules = [
  { action = "deny", tool = "bash", pattern = "git push *" }
]
```

then use the [CLI commands](https://docs.x.ai/build/cli/reference) to inspect
discovery from that repository:

```sh
grok version
grok inspect
```

check the listed user configuration, project configuration, instructions, and
permission sources. the rule above demonstrates command matching. publishing
can happen through other commands or tools, so a repository policy needs to
cover the actual available paths. the [permission documentation](https://docs.x.ai/build/features/permissions)
explains how deny, ask, and allow rules interact.

on September 7, 2026, an agent run for this guide tested configuration discovery
with Grok Build `0.2.22` on macOS, using a disposable project and a separate
`GROK_HOME`. `grok inspect` found the project rule and both configuration files.
it also discovered existing compatibility settings from the host. this was a
discovery test; enforcement and model behavior were outside its scope.

that extra discovery matters when a fresh directory behaves like an old setup.
Grok can also load Claude and Cursor configuration through compatibility
scanners. inspect the loaded sources before assuming a setting came from
`.grok/`. the [settings reference](https://docs.x.ai/build/settings/reference)
lists those scanners and their controls.

<span id="check-permission-and-sandbox-separately" class="heading-alias" aria-hidden="true"></span>

## what can it actually access?

ask, auto, and `always-approve` control tool permission decisions. auto uses a
classifier where the feature is available; deny rules and PreToolUse hooks still apply.
a [sandbox](https://docs.x.ai/build/features/sandbox) limits access when active
and is off by default. filesystem enforcement uses Landlock on Linux and
Seatbelt on macOS. the `workspace` profile permits network access; the
`read-only` and `strict` profiles block child process network access on Linux.
that network restriction has no effect on macOS, and model API calls and web
tools are outside it. built in profiles also leave `~/.grok/` writable.
credential paths such as `~/.ssh` need separately configured protection.
inspect the profile and platform limits before unattended work.

<span id="give-a-bot-a-role-and-a-task-a-finish-line" class="heading-alias" aria-hidden="true"></span>

## how should i set up a Bot?

Grok Bot [profiles](https://docs.x.ai/grok-bot/bots) hold a name, label, description,
and avatar. the description can hold ongoing instructions. a useful role might
be “collect documentation
changes for these three libraries.” put the specific libraries, date range,
and expected output in the conversation for this run.

for example, after supplying the three changelog links:

> check these three official changelogs since last friday. save a summary with
> links and dates. flag anything that could change our setup. return the file
> for review before sending it anywhere.

keep the Bot's identity separate from its access. names and avatars help you
recognize the worker; [account permissions and connected sessions](https://docs.x.ai/grok-bot/approvals-security-and-privacy)
determine what it can do. hiding a Bot keeps its history and can leave ongoing
work running. use the actual work controls when you intend to stop a task.
