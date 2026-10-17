---
title: claude code
description: a practical map of claude code across terminal, desktop, editor, web, and remote workflows.
products: [claude-code]
updatedAt: "2026-10-17T18:23:26-04:00"
checkedAt: "2026-09-07T15:02:34-04:00"
status: current
completion: complete
evidence: [official-source, analysis, open-question]
sources: [anthropic-claude-overview, anthropic-how-claude-code-works, anthropic-platforms, anthropic-desktop, anthropic-web, anthropic-remote-control, anthropic-features-overview, anthropic-subagents, anthropic-permissions, anthropic-sandboxing, anthropic-cowork]
redirects: []
voice: personal
navigation:
  scope: claude-code
  order: 10
---

## this is claude code

<div class="surface-bento intro-visual">
  <figure><a href="/media/guides/claude-terminal-recording.mp4"><video src="/media/guides/claude-terminal-recording.mp4" poster="/media/publications/claude-terminal-poster-1200.webp" aria-label="Claude Code terminal recording" autoplay muted loop playsinline preload="auto" width="2414" height="1392"></video></a><figcaption>a recording of Claude Code in the terminal.</figcaption></figure>
</div>

[Claude Code](https://code.claude.com/docs/en/overview) is Anthropic’s coding
agent. it can inspect a repository, change files, run commands, and use the
results to decide what to do next. you can work through a terminal, supported
editor, desktop app, or web session.

ironically, Anthropic's Claude Code feels the least personified to me out of
Claude Code, Codex, and Grok Bot. the agents i've seen tend to have names
describing their jobs: reviewer, infra engineer, things like that. Claude
Code supports [named agents](https://code.claude.com/docs/en/sub-agents);
the role focused presentation is what stands out in my own use.

<span id="one-request-can-become-several-rounds-of-work" class="heading-alias" aria-hidden="true"></span>

### what happens after a prompt?

Anthropic describes an [agent loop](https://code.claude.com/docs/en/how-claude-code-works)
that gathers context, acts, and checks the result. the model chooses an action;
the harness supplies tools, manages context, and returns what happened. a
failed test becomes useful information for the next attempt.

for example, “fix the empty search result” might involve finding the search
handler, reproducing the failure, changing the code, and running the relevant
test. those steps can all follow from one prompt. the finish line still needs
to be concrete: an empty result should render a useful message, and an ordinary
search should keep working.

### who's running twenty agents?

sometimes you'll see people doing this.

<div class="surface-bento">
  <figure><img src="/media/guides/claude-agent-wall.png" srcset="/media/publications/claude-agent-wall-640.webp 640w, /media/publications/claude-agent-wall-1200.webp 1200w" sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1151px) calc(100vw - 320px), 832px" data-full-src="/media/guides/claude-agent-wall.png" alt="a wall of Claude Code agents running in tiled terminal panes" loading="lazy" decoding="async" width="3840" height="1080" /><figcaption>i did this for a TikTok and went through my five hour usage window in 15 minutes.</figcaption></figure>
</div>

<span id="choose-where-the-work-runs" class="heading-alias" aria-hidden="true"></span>

## where does the work run?

### terminal, editor, and desktop

the [terminal and editor integrations](https://code.claude.com/docs/en/platforms)
keep Claude close to an existing development environment. selected code and
editor diagnostics can help locate a problem; shell output and the final diff
show what happened after it was located.

the [desktop app](https://code.claude.com/docs/en/desktop) adds a visual place
for sessions, diffs, previews, and parallel work. a worktree gives a session
its own checkout. two sessions that own different worktrees can still produce
conflicting changes when their branches are combined, so file ownership and a
final integration pass matter.

<div class="surface-bento">
  <figure><a href="https://code.claude.com/docs/en/desktop"><img src="/media/publications/claude-code-1200.webp" srcset="/media/publications/claude-code-640.webp 640w, /media/publications/claude-code-1200.webp 1200w" sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1151px) calc(100vw - 320px), 832px" alt="the Code tab in the Claude desktop app" loading="lazy" decoding="async" width="1200" height="728" /></a><figcaption>Claude Code in the desktop app. screenshot from <a href="https://code.claude.com/docs/en/overview">Anthropic’s overview</a>.</figcaption></figure>
</div>

choose the interface that makes your next decision easy to inspect. a CSS
change needs a rendered page; a parser change needs representative inputs and
outputs. either can also need a code review.

### web and Remote Control

[cloud sessions](https://code.claude.com/docs/en/claude-code-on-the-web) run in
a separate execution environment. [Remote Control](https://code.claude.com/docs/en/remote-control)
lets a browser or phone steer Claude Code running on your machine. local tools,
files, and configuration stay with that machine, and the local process needs
to remain available for work to continue there. the conversation synchronizes
through Anthropic’s servers. after an interruption, interactive sessions retry
the connection; a server mode process exits after roughly ten minutes of
network loss while the host is awake.

picture a bug that only reproduces with your local development database. Remote
Control can let you check on that investigation from your phone. a cloud task
needs its own reproducible environment and access to the relevant data. choose
the execution environment before choosing the screen you want to use.

<span id="extensions-and-permissions" class="heading-alias" aria-hidden="true"></span>

## what can i add or control?

Claude Code’s [extension system](https://code.claude.com/docs/en/features-overview)
gives different jobs to instructions, skills, tools, and events:

| the task needs | the relevant piece |
| --- | --- |
| repository conventions and durable context | `CLAUDE.md` and scoped rules |
| a repeatable procedure | a skill |
| access to an external system | MCP tools and resources |
| a separate investigation | a subagent with a defined task |
| code to run at a lifecycle event | a hook |
| related extensions to travel together | a plugin |

these pieces can compose. a repository instruction can point to a review skill;
that skill can use an issue tracker connection and delegate an investigation.
keep each piece small enough to explain what it contributes. adding a second
place for the same rule gives you a second place to keep it current.

[permissions](https://code.claude.com/docs/en/permissions) control whether tool
actions proceed. the [Bash sandbox](https://code.claude.com/docs/en/sandboxing)
constrains filesystem and network access for commands inside it. the account
behind an external tool adds another boundary: a service can only grant the
access that identity has.

<span id="follow-the-artifact-through-the-workflow" class="heading-alias" aria-hidden="true"></span>

## what should i get back?

<span id="repository-work-has-an-inspectable-ending" class="heading-alias" aria-hidden="true"></span>

### it says it’s done. now what?

a useful session returns the change, the checks it ran, and whatever is still
uncertain. “tests pass” needs the command and result behind it. a screenshot
needs the route and state it shows. a proposed fix needs the behavior it is
supposed to change.

for parallel work, add the checkout and owner. for work that moves between
machines, add the environment and any state that stayed behind. these details
make it possible to resume a task without guessing what the previous session
meant by “done.”

### Cowork

[Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork)
covers research, documents, organized files, and scheduled work. its cloud
sessions run code on Anthropic’s servers and can continue with your laptop
closed. local file, browser, and computer access require the Claude Desktop
app to stay open and connected. browser options vary during rollout.

Claude Code fits engineering work that needs project tools and verification.
a document or a collection of organized files has its own review criteria.
name the output first, then pick the workflow around it.

<div class="surface-bento">
  <figure><a href="https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork"><img src="/media/publications/claude-cowork-1200.webp" srcset="/media/publications/claude-cowork-640.webp 640w, /media/publications/claude-cowork-1200.webp 1200w" sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1151px) calc(100vw - 320px), 832px" alt="the Cowork tab in the Claude desktop app" loading="lazy" decoding="async" width="1200" height="842" /></a><figcaption>the Cowork task interface in Claude. <a href="https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork">Anthropic’s Cowork guide</a>.</figcaption></figure>
</div>

the [configuration guide](/guides/claude-code/configuration/#where-does-this-setting-go)
shows where to put personal settings and shared project instructions.
for a workflow you repeat, the [extensions example](/guides/claude-code/extensions/#a-project-to-try-this-in)
builds a project skill and checks it against a real command.
