---
title: start here
description: "the foundations of working with agents: models, harnesses, better prompts, and checking the result."
products: [codex, claude-code]
updatedAt: "2026-10-12T13:00:00-04:00"
checkedAt: "2026-09-07T16:55:21-04:00"
status: current
evidence: [official-source, analysis]
sources: [openai-codex-prompting, anthropic-best-practices, anthropic-how-claude-code-works, openai-work-and-codex, anthropic-features-overview, openai-codex-agents-md, anthropic-memory, github-protected-branches, openai-codex-approvals, anthropic-permissions, git-worktrees, karpathy-programming-english, ricky-cursor-coding-session]
redirects: [/guides/operating-system/]
voice: evidence
navigation:
  scope: handbook
  order: 10
---

think of an agent as a ridiculously smart friend you can work with from your
laptop or phone. depending on the tools you give it, it can read your code
and documents, connect to your apps, and use a browser. you explain what
you want, watch it work, and step in when you need to.

if getting it to understand what you want is the frustrating part, the
[good and bad prompt examples](#what-should-i-ask-first) show which details
help it get the job done.

<span id="the-agent-crash-course" class="heading-alias" aria-hidden="true"></span>

## the foundations

### the model

you already know the names: ChatGPT, Claude, Grok, Gemini. those names mix
apps and models together. ChatGPT is the app; OpenAI's models run inside it.
Claude, Grok, and Gemini also name families of models.

the [model](https://code.claude.com/docs/en/how-claude-code-works#models) is
what interprets your request, reasons through the problem, and generates
a response or chooses a tool to call.

### the harness

the harness is the software wrapped around that model. Claude Code wraps
Claude; Codex wraps OpenAI's models. it supplies tools, manages context,
and handles permissions. the model chooses an action, the harness runs
the tool, and the result goes back to the model.

that's how “fix the search bug” can turn into reading files, editing code,
running a test, seeing an error, and trying again. this is the
[agent loop](https://code.claude.com/docs/en/how-claude-code-works#the-agentic-loop).
you can interrupt it with more context or a correction along the way.

what you give it matters: [context](https://code.claude.com/docs/en/how-claude-code-works#the-context-window)
is the information available for the current response. [instructions and memory](#why-does-my-agent-forget)
help carry useful details forward. [permissions](#will-it-ask-before-acting)
control which actions it can take. those are the foundations for working
with it, and each link goes deeper when you need it.

Karpathy captured the language shift in one sentence back in 2023.

<div class="publication-embed" data-media-id="karpathy-programming-english">
  <iframe src="https://platform.twitter.com/embed/Tweet.html?id=1617979122625712128&amp;dnt=true&amp;hideThread=true&amp;theme=dark" title="Karpathy on programming in English (January 2023)" width="360" height="249" style="--embed-height: 249px; --embed-height-mobile: 228px" loading="lazy" allow="autoplay 'none'" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" referrerpolicy="no-referrer"></iframe>
  <p class="publication-embed-credit"><a href="https://x.com/karpathy/status/1617979122625712128" target="_blank" rel="noopener noreferrer">Andrej Karpathy (@karpathy)</a>, january 2023.</p>
</div>

<span id="begin-with-a-behavior-you-can-check" class="heading-alias" aria-hidden="true"></span>

## what should i ask first?

say you have a page of rough project notes. paste a copy into the chat and ask:

```text
turn these notes into a short plan for this week. keep the decisions i’ve already made, flag questions that need my answer, and reply with a draft i can review.
```

compare the draft with your notes, then tell it what you’d change.

consider a search box that loses its query when you open a result and return.
here are two example prompts for that same bug.

<div class="example-block example-bad">
<p class="example-label">example prompt: too vague</p>

```text
fix search
```

</div>

<div class="example-block example-good">
<p class="example-label">example prompt: enough context</p>

```text
fix /search losing my query when i search permissions, open a result and go back
keep the query and filters. add a test and check it in the browser
keep the fix small and local for review
```

</div>

with no other context, the first prompt <mark class="example-bad">leaves the bug and expected behavior unspecified</mark>.
the useful details in the second are <mark class="example-good">how to reproduce it, what should change, and how to check the fix</mark>.
the agent can choose where to inspect and how to implement the change. you can judge whether it
preserves the state and still handles a fresh visit, an empty query, and a
shared search URL correctly.

use your own words. [OpenAI’s prompting guide](https://learn.chatgpt.com/docs/prompting)
emphasizes ordinary language and useful context. for a small change with clear
scope, [Anthropic recommends asking for the fix directly](https://code.claude.com/docs/en/best-practices).
when the approach is uncertain, a short investigation or plan can resolve that
before editing.

if the agent finds that the requested behavior conflicts with the product's
existing rules, resolve that decision before it builds around an assumption.
a clear prompt leaves room to discover the cause.

for a longer example to watch, Ricky Robinett shared highlights of his daughter
building a chatbot with Cursor. you can follow the conversation and the code
together.

<div class="publication-embed" data-media-id="ricky-cursor-coding-session">
  <iframe src="https://platform.twitter.com/embed/Tweet.html?id=1825581674870055189&amp;dnt=true&amp;hideThread=true&amp;theme=light" title="Ricky Robinett shares a Cursor coding session (August 2024)" width="360" height="696" style="--embed-height: 696px; --embed-height-mobile: 581px" loading="lazy" allow="fullscreen; autoplay 'none'" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" referrerpolicy="no-referrer"></iframe>
  <p class="publication-embed-credit"><a href="https://x.com/rickyrobinett/status/1825581674870055189" target="_blank" rel="noopener noreferrer">Ricky Robinett (@rickyrobinett)</a>, august 2024.</p>
</div>

<span id="make-project-context-easy-to-find" class="heading-alias" aria-hidden="true"></span>

<span id="why-am-i-repeating-myself" class="heading-alias" aria-hidden="true"></span>

## why does my agent forget?

start with the repository's current state: branch, existing edits, setup,
relevant code, and checks. preserve work that belongs to other people or tasks.
put recurring project facts in the readme, package scripts, tests, and
architecture notes where every contributor can find them.

[`AGENTS.md`](https://learn.chatgpt.com/docs/agent-configuration/agents-md) and
[`CLAUDE.md`](https://code.claude.com/docs/en/memory) can point the agent toward
that context. Claude Code supports importing a shared `AGENTS.md` from
`CLAUDE.md` using `@AGENTS.md`. keep instructions specific to each runtime
beside that shared material when needed.

record the details that change behavior: which package owns routing, how to run
its checks, and which generated files come from another source. move procedures
used only for particular jobs into skills or focused references. update the
canonical command when it changes so the next task can find it.

<span id="separate-guidance-from-enforcement" class="heading-alias" aria-hidden="true"></span>

## will it ask before acting?

instructions guide the agent's judgment. runtime settings and permissions
constrain actions. hooks run handlers at specific events. provider controls
can enforce requirements when a change reaches a shared system.

for example, asking the agent to run tests helps it follow the repository's
process. [required status checks](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
can make passing checks a condition of merging. inspect which branches and
actors the protection covers, including any bypass permissions.

choose access for the actual job. a local UI fix needs different capabilities
from a production deployment. [Codex permissions](https://learn.chatgpt.com/docs/agent-approvals-security)
and [Claude Code permissions](https://code.claude.com/docs/en/permissions)
expose different controls; connected services also enforce their own account
permissions. credentials being available tells you what a tool may be able to
do. the task and applicable policy establish what it should do.

<span id="split-work-where-it-can-advance-independently" class="heading-alias" aria-hidden="true"></span>

## when should i use more agents?

an agent can investigate the search state while another reviews keyboard and
browser navigation behavior. both can return findings to the task implementing
the fix. decide who owns any edits before asking both to change the same area.

[Git worktrees](https://git-scm.com/docs/git-worktree) provide separate checkouts
for independent branches. runtime resources can still overlap: ports,
databases, browser sessions, generated output, and external accounts. configure separate
databases or ports explicitly when the tasks need them.

keep coordination focused on the outcome, dependencies, decisions, and results.
implementation tasks retain the detailed debugging work. a useful update says
what changed and what the coordinator needs to do next. repeated progress
messages without a changed state add reading work.

parallelism helps when those results can be combined cheaply. when both agents
need the same unresolved contract, settle the contract first. review the
combined behavior after integration, including interactions that neither task
could test alone.

<span id="verify-the-claim-you-are-making" class="heading-alias" aria-hidden="true"></span>

## it says it’s done. now what?

use evidence at the layer the claim describes:

| claim | evidence to inspect |
| --- | --- |
| the parser handles an empty query | a focused test with the expected result |
| returning to search preserves state | the actual browser navigation flow |
| the fix is ready for integration | the diff and applicable checks for that revision |
| the change is deployed | the deployed revision and behavior on the public route |
| an external action completed | the destination system's resulting state |

when a check fails, establish whether it exposes a regression, an existing
failure, or an unavailable dependency. keep the reason with the result. a
passing substitute check can support a narrower claim; state that scope.

review the implementation as well as the output. check error handling, fit with
the existing code, security implications, and the maintenance the change adds.
tests can pass around an unnecessary abstraction or a misunderstood requirement.

<span id="hand-off-a-state-someone-can-continue" class="heading-alias" aria-hidden="true"></span>

## how do i pick this up later?

finish with the changed behavior, files or revision, verification, unresolved
gaps, and next action. for the hypothetical search fix, compare these example
handoffs:

<div class="example-block example-bad">
<p class="example-label">example handoff: missing detail</p>

```text
all done, everything works
```

</div>

<div class="example-block example-good">
<p class="example-label">example handoff: enough to continue</p>

```text
the query and filters stay put now when you open a result and go back.
the routing test and browser check passed. the changes are still local.
next up is reviewing the URL behavior before opening a PR.
```

</div>

the first handoff leaves <mark class="example-bad">the checks and current state unclear</mark>.
the useful version says <mark class="example-good">what passed and where the work stopped</mark>.
use the actual results in a real handoff. keep private transcripts,
credentials, and unrelated context out of public project notes.

when a task changes host, agent, or conversation, recheck the repository and
external state before continuing. a useful handoff provides the starting point;
the current environment tells you whether that starting point still holds.
