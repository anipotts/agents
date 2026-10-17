---
title: working on a project
description: everyday, parallel, long running, and handed off codex work.
products: [codex]
updatedAt: "2026-10-17T18:23:26-04:00"
checkedAt: "2026-09-07T15:01:58-04:00"
status: pending
completion: outline
draft: true
evidence: [official-source, analysis]
sources: [openai-codex-worktrees, openai-codex-automations, openai-remote-connections, openai-codex-cloud, openai-codex-image-generation, karpathy-autoresearch-post, karpathy-autoresearch-repository]
redirects: []
voice: evidence
navigation:
  scope: codex
  order: 40
---

## how do i scope a task?

start with a result you can inspect. “fix the save button losing the selected
workspace” gives the task a behavior to reproduce. include the failing route,
what you expected, and any work already in progress. let the agent locate the
implementation and propose the narrowest useful verification.

keep the evidence with the task: reproduction steps, changed files, commands,
and results. when the work moves to another conversation, those details let
the next agent continue without rediscovering the same failure.

### can it keep improving the result?

Karpathy’s [autoresearch](https://github.com/karpathy/autoresearch) gives an
agent a training experiment it can edit, run, and score repeatedly. the human
sets the research instructions; the agent keeps or discards changes based on
the measured result. it is an external project that can use Codex or another
coding agent.

the transferable idea is to define what better means before starting the
loop. for a performance task, keep the input and measurement method fixed,
set a time budget, and preserve the baseline for comparison. autoresearch’s
GPU training setup has its own requirements; the repository explains those.

<div class="publication-embed" data-media-id="karpathy-autoresearch-post">
  <iframe src="https://platform.twitter.com/embed/Tweet.html?id=2030371219518931079&amp;dnt=true&amp;hideThread=true&amp;theme=dark" title="Karpathy introduces autoresearch (March 2026)" width="360" height="701" style="--embed-height: 701px; --embed-height-mobile: 566px" loading="lazy" allow="autoplay 'none'" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" referrerpolicy="no-referrer"></iframe>
  <p class="publication-embed-credit"><a href="https://x.com/karpathy/status/2030371219518931079" target="_blank" rel="noopener noreferrer">Andrej Karpathy (@karpathy)</a>, march 2026.</p>
</div>

## how do i keep parallel edits separate?

[worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees) let
separate tasks work on separate checkouts of one Git repository. they share
Git history, while each checkout has its own files. dependencies, environment
files, and running services may still need setup in the new checkout.

for example, split a settings feature into API validation and UI behavior:

```text
create separate implementation tasks for API validation and the settings UI.
agree on the request and response shape before either changes it.
each task owns its assigned files and returns its branch, changed behavior,
tests, and any contract change. integrate and check the complete save flow afterward.
```

a shared checkout can also work when file ownership is clear. whichever setup
you choose, tell each agent what the other owns and preserve existing changes.
run the combined behavior after integration: each half can pass its own checks
while disagreeing about the shape of the data between them.

### what belongs in the coordinator?

the [coordinator example](/guides/codex/extensions/#task-coordination-and-subagents)
keeps routing and project state in one conversation. send concise updates:
what changed, whether verification passed, and what decision comes next. the
implementation task retains the detailed debugging conversation.

ask for parallel work where the questions can advance independently. an agent
waiting for another agent's answer adds little capacity. when several results
arrive together, review the most consequential dependency first.

## how do i schedule repeated work?

[scheduled tasks](https://learn.chatgpt.com/docs/automations) can run a saved
prompt in a new chat for each run or return to an existing chat with its context.
create and manage them from the desktop app or web; CLI and IDE lack that
management interface. desktop project schedules need the project on disk,
the computer on, and the app running. Git projects can use the local checkout
or an isolated worktree. web tasks use uploads and connections, with no direct
access to local folders. supported app event triggers on web and mobile have
separate plan and workspace availability.

unattended runs retain the default sandbox. they gain no extra access;
organization policy also constrains approval behavior.

a useful first automation is a report with a narrow scope:

```text
each weekday morning, check the latest CI run for this repository's default branch.
report a new failure with the job, failed step, and run link.
stay quiet when the state is unchanged. keep this task limited to inspection.
```

run it once while you are present. confirm the repository identity, the
information it can read, and the result it produces when a run is unavailable.
then decide whether it should ever propose or implement a fix. expanding the
job changes both its required access and the evidence you need back.

## where should the work run?

local execution uses your current machine. [Remote](https://learn.chatgpt.com/docs/remote-connections)
lets another supported device steer a connected host; that host supplies the
files, tools, credentials, and permissions. an SSH project runs commands on the
SSH host. [Codex cloud](https://learn.chatgpt.com/docs/cloud) runs in a separate
hosted environment with its own setup.

mobile access steers work on its connected host. moving a chat to another host
uses [handoff](https://learn.chatgpt.com/docs/remote-connections#hand-off-a-chat-between-hosts),
which requires a matching saved Git project and transfers chat and Git state
into a destination worktree. it interrupts active work. request it from another
chat or use the desktop location control; the requesting chat cannot move
itself. Codex Cloud is outside this handoff workflow.

check the destination, checkout, and latest diff. remote access stops while
the host is unavailable; a separately configured Codex Cloud task can continue
while your laptop sleeps.

## image generation

Codex can [generate and edit images](https://learn.chatgpt.com/docs/image-generation)
from a prompt and reference material. describe the asset's purpose, dimensions,
composition, and the parts that need to stay fixed. measure the output before
using it: requested dimensions still need checking. review the generated image
before integrating it, then inspect it in the actual page at the sizes readers
will see.

for example, a background illustration can look good on its own while making
overlaid text unreadable. keep the original, prepare the required derivative,
and check loading cost, contrast, cropping, and alternative text in the page.
visual review and code verification answer different parts of whether it works.

## what belongs in a handoff?

finish with the repository and branch, changed behavior, verification results,
known gaps, and next action. distinguish a local patch, a pushed branch, an
opened pull request, and a deployed change. the next person should be able to
see exactly where the work reached and continue from there.
