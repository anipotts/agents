---
title: choosing your setup
description: source based starting points for claude code, with a practical way to compare and extend a setup.
products: [claude-code]
updatedAt: "2026-10-17T18:23:26-04:00"
checkedAt: "2026-09-07T15:02:34-04:00"
status: current
completion: complete
evidence: [official-source, analysis, open-question]
sources: [anthropic-claude-overview, anthropic-platforms, anthropic-desktop, anthropic-remote-control, anthropic-web, anthropic-agents, anthropic-agent-teams, anthropic-mods-overview, anthropic-routines, boris-parallel-claude-post]
redirects: []
voice: evidence
navigation:
  scope: claude-code
  order: 70
---

<span id="choose-a-setup-for-the-work-in-front-of-you" class="heading-alias" aria-hidden="true"></span>

## where should i start?

these are source based starting points for different workflows. the useful
question is which arrangement makes your next task easy to steer and verify.

<dl class="editorial-rows recommendation-rows">
  <div>
    <dt>you want a visible task and diff workflow</dt>
    <dd><span class="row-label">begin here</span><a href="https://code.claude.com/docs/en/desktop">Claude Code on desktop</a>, with one repository and a check you can rerun</dd>
  </div>
  <div>
    <dt>you already work through shell tools</dt>
    <dd><span class="row-label">begin here</span>the <a href="https://code.claude.com/docs/en/overview">terminal</a>, using the same scripts and branch you would inspect yourself</dd>
  </div>
  <div>
    <dt>the task begins with selected code or diagnostics</dt>
    <dd><span class="row-label">begin here</span>the <a href="https://code.claude.com/docs/en/platforms">editor integration</a>, with the failing behavior stated in the prompt</dd>
  </div>
  <div>
    <dt>you need to steer a local task from another device</dt>
    <dd><span class="row-label">begin here</span><a href="https://code.claude.com/docs/en/remote-control">Remote Control</a>, after checking host availability and account access</dd>
  </div>
  <div>
    <dt>the task needs a separate cloud environment</dt>
    <dd><span class="row-label">begin here</span><a href="https://code.claude.com/docs/en/claude-code-on-the-web">Claude Code on the web</a>, with reproducible setup and explicit network access</dd>
  </div>
</dl>

<span id="change-one-part-of-the-setup-at-a-time" class="heading-alias" aria-hidden="true"></span>

### add one thing at a time

start with a repository instruction file, the project’s actual check commands,
and permissions that fit the task. finish one useful change before adding a
collection of skills, connections, and background agents.

then follow a repeated friction. if the same review procedure needs explaining
every time, put it in a skill. if a task repeatedly needs a service, evaluate
its MCP connection. if independent investigations keep filling the main
conversation, try a bounded subagent. each addition should solve a problem you
can name and produce an outcome you can inspect.

<span id="compare-setups-using-the-same-task" class="heading-alias" aria-hidden="true"></span>

## how do i compare two setups?

a small repeatable exercise makes comparisons useful. use the same repository
revision, the same request, and the same acceptance criteria in each setup.
record the surface, model, permissions, and extra context supplied to each run.

for example, ask two fresh sessions to fix the same input validation bug. check
whether each found the actual failure, preserved the intended behavior, ran a
meaningful test, and left a readable diff. note the interventions you made.
a faster first answer may still leave more review work.

one task gives evidence about that task. try a different kind of work before
generalizing from the result: investigation, implementation, and review can
favor different arrangements.

<span id="add-parallelism-when-the-tasks-separate-cleanly" class="heading-alias" aria-hidden="true"></span>

## would more agents help?

an interface change and a documentation update can progress together once
the behavior is agreed. two workers redesigning the same module need more
coordination. use [separate worktrees](https://code.claude.com/docs/en/desktop)
for independent edits and assign one owner to combine and verify the result.

start with a small number of tasks you can actually review. track those waiting
on decisions as carefully as those still running. useful parallelism ends in
work you can integrate.

Boris Cherny shared his own setup in January 2026: five Claude sessions in
numbered terminal tabs, with notifications when one needs input. the useful
detail is how he keeps track of work that needs his attention.

<div class="publication-embed" data-media-id="boris-parallel-claude-post">
  <iframe src="https://platform.twitter.com/embed/Tweet.html?id=2007179833990885678&amp;dnt=true&amp;hideThread=true&amp;theme=light" title="Boris Cherny shows five parallel Claude sessions (January 2026)" width="360" height="572" style="--embed-height: 572px; --embed-height-mobile: 487px" loading="lazy" allow="autoplay 'none'" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" referrerpolicy="no-referrer"></iframe>
  <p class="publication-embed-credit"><a href="https://x.com/bcherny/status/2007179833990885678" target="_blank" rel="noopener noreferrer">Boris Cherny (@bcherny)</a>, january 2026.</p>
</div>

<span id="evaluate-previews-with-their-limits-visible" class="heading-alias" aria-hidden="true"></span>

## should i rely on a preview?

Claude Code’s [agent guidance](https://code.claude.com/docs/en/agents) includes
[experimental agent teams](https://code.claude.com/docs/en/agent-teams),
disabled by default, and agent view in research preview.
[routines](https://code.claude.com/docs/en/routines) also remain in research
preview. [Mods](/guides/claude-code/extensions/#mods-extend-the-harness) now
provide the deeper customization introduced in the Function Hooks discussion.
check each feature’s current status and your account’s availability before
building a workflow around it.

use a disposable project for an experiment, capture the version and expected
result, and keep a way to return to the supported setup. a reproducible small
test gives a feature somewhere concrete to prove useful.
