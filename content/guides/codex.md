---
title: codex
description: a practical map of the codex terminal, app, editor, cloud, and mobile surfaces.
products: [codex]
updatedAt: "2026-10-17T18:23:26-04:00"
checkedAt: "2026-09-07T15:01:58-04:00"
status: current
completion: complete
evidence: [official-source, analysis]
sources: [openai-codex-cli, openai-codex-cloud, openai-codex-worktrees, openai-remote-connections, openai-codex-app-server, openai-codex-agents-md, openai-codex-open-source, openai-codex-app-walkthrough-post]
redirects: []
voice: personal
navigation:
  scope: codex
  order: 10
---

## this is codex

<div class="surface-bento intro-visual">
  <figure><img src="/media/guides/codex-handbook-workspace.png" srcset="/media/publications/codex-handbook-workspace-640.webp 640w, /media/publications/codex-handbook-workspace-1200.webp 1200w" sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1151px) calc(100vw - 320px), 832px" data-full-src="/media/guides/codex-handbook-workspace.png" alt="Codex beside a coding agent tips task and its GitHub pull request with passing checks" loading="eager" fetchpriority="high" decoding="async" width="3600" height="2260" /><figcaption>a screenshot of me working on some personal projects and some content for a brand deal.</figcaption></figure>
</div>

Codex is OpenAI's agent for software development and technical work. it reads
project context, works through tools, changes files, and checks the result.
you can use it through the [terminal](https://learn.chatgpt.com/docs/codex/cli),
an editor, the desktop app, or a [cloud environment](https://learn.chatgpt.com/docs/cloud).
the surface changes how you steer and inspect the work.

on the spectrum of how personified these products feel to me, Codex sits
somewhere between Claude Code and Grok Bot. the main tasks get descriptive
titles, but then i've seen a subagent show up named Casper or Socrates.
some fucking random names. that small detail gives the agents a bit of
personality alongside the work they're doing.

<span id="where-codex-lives" class="heading-alias" aria-hidden="true"></span>

## where can i use Codex?

<span id="terminal-and-editor-keep-the-code-close" class="heading-alias" aria-hidden="true"></span>

### terminal and editor

the CLI puts the conversation beside commands, output, and the current
directory. an editor adds selected code, diagnostics, and inline review. both
are useful for a change whose behavior and verification are already clear.

for example, “find why this test fails and fix the implementation” gives the
agent a specific path through the repository. inspect the changed code and
rerun the command after the fix. the interface helps you see the work; the
check explains what the change actually achieved.

<span id="desktop-coordinates-parallel-work" class="heading-alias" aria-hidden="true"></span>

### desktop and parallel tasks

i use one authoritative Codex thread to keep track of multiple projects,
tasks, and contexts running in parallel. it turns what i want into clearer
instructions and routes them to the right tasks. i explain that setup in
[the delegation section](/guides/codex/extensions/#task-coordination-and-subagents).

the desktop app brings conversations, terminals, previews, and review together.
[worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees) give
independent changes separate checkouts. each still needs an owner, a clear
outcome, and any local setup needed to run its checks.

this February 2026 walkthrough shows the Codex app’s approach to supervising
several tasks.

<div class="publication-embed publication-post-link" data-media-id="openai-codex-app-walkthrough-post">
  <a class="publication-post-action" href="https://x.com/OpenAIDevs/status/2018385663457116379" target="_blank" rel="noopener noreferrer">watch the Codex walkthrough ↗</a>
  <p class="publication-embed-credit">OpenAI Developers (@OpenAIDevs), february 2026.</p>
</div>

<span id="cloud-and-mobile-change-where-you-steer" class="heading-alias" aria-hidden="true"></span>

### cloud work and mobile access

cloud tasks use published environments with repository setup and dependencies.
create and publish an environment on the web or desktop; mobile can select an
existing one. each task has its own workspace and can continue while your
computer sleeps.
[Remote](https://learn.chatgpt.com/docs/remote-connections) lets a phone or another
supported device steer work on a connected host. the host retains its files,
credentials, tools, and permissions. an SSH project uses the remote machine's
environment. mobile reaches that SSH environment through the desktop host.
remote access needs the host awake, online, and running the app; supported
devices and controls vary by rollout.

check where a task runs before choosing how to control it. a phone can be
convenient for answering a narrow question; a wide diff may be easier to review
on a larger display. a hosted task needs its own setup even when the same
repository already works on your laptop.

eligible Work chats created after enabling local computer access use cloud
coordination with connected computer tools. if that computer is unavailable
at the start of a later turn, the chat can continue in the cloud without its
local resources. this mode has separate setup from Codex mobile host access.

<span id="the-architecture-behind-the-conversation" class="heading-alias" aria-hidden="true"></span>

## how does Codex run a task?

the [app server](https://learn.chatgpt.com/docs/app-server) exposes the agent
loop to clients. a thread holds a conversation, a turn represents a request
and the work it causes, and items describe messages, commands, tool calls, or
file changes. the client receives events as that work progresses and responds
to approval requests when required.

this is useful when building an interface or coordinator around Codex. reading
history shows what happened; current status and incoming events show how work
is progressing. the client can present those details and route the next
instruction to the appropriate thread. use the schema generated by the
installed version when an integration depends on particular fields. OpenAI
labels the app server experimental and unsupported for production workloads.

<span id="instructions-tools-and-permissions-shape-the-loop" class="heading-alias" aria-hidden="true"></span>

### instructions, tools, and permissions

repository [instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
provide conventions and verification commands. skills provide procedures.
MCP connections provide operations in other systems. hooks run handlers at
defined events. subagents handle delegated parts of a task. permissions
constrain the actions available to the running session.

for a concrete example, an instruction file can point to the project's check
command, a review skill can explain what to inspect, and a subagent can
investigate a particular failure. their roles are explained in
[extensions](/guides/codex/extensions/) and
[configuration](/guides/codex/configuration/).

<span id="some-of-the-harness-can-be-changed" class="heading-alias" aria-hidden="true"></span>

### can i change Codex itself?

OpenAI publishes the CLI, SDK, and app server as
[open source](https://learn.chatgpt.com/docs/open-source). that makes source
changes possible alongside ordinary configuration and extensions. changing
source involves building or running that version; editing a config file adjusts
the behavior exposed by the installed version. the cloud service and IDE
extension are closed source.

<span id="finish-with-an-artifact-you-can-inspect" class="heading-alias" aria-hidden="true"></span>

## how do i check the result?

a useful task ends in something you can evaluate: a reproduced bug, an
explained code path, a patch with checks, or a working interface you can use.
name that result in the prompt. include constraints that change the work,
such as preserving an existing API or keeping another task's files intact.

then inspect the result at the level the task requires. passing unit tests
support the behavior they exercise. a visual change needs a browser check.
a pushed branch still needs review and integration before it becomes the
version users see.

the [configuration guide](/guides/codex/configuration/#instructions-or-memory)
explains what belongs in project instructions and what memory carries forward.
the [coordination example](/guides/codex/extensions/#task-coordination-and-subagents)
shows how one task can route work to others and check what comes back.
