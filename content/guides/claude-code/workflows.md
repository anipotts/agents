---
title: working on a project
description: everyday, parallel, long running, and handed off claude code work.
products: [claude-code]
updatedAt: "2026-10-17T18:23:26-04:00"
checkedAt: "2026-09-07T15:02:34-04:00"
status: pending
completion: outline
draft: true
evidence: [official-source, analysis, open-question]
sources: [anthropic-agents, anthropic-subagents, anthropic-agent-teams, anthropic-scheduled-tasks, anthropic-session-scheduling, anthropic-routines, anthropic-remote-control, anthropic-web]
redirects: []
voice: evidence
navigation:
  scope: claude-code
  order: 40
---

## how much should i ask for at once?

start with the outcome, the checkout, and the evidence that will settle the
task. an investigation might end with a failing input and a diagnosis. an
implementation should also return a diff and the relevant checks. separate
those outcomes when one depends on a decision the investigation has yet to
resolve.

for example, a search bug can begin with:

```text
reproduce the empty search response in this checkout. trace the request from
the UI through the handler and report the failing assumption with file
references. finish this pass with a diagnosis and a proposed test.
```

once that result is clear, the implementation prompt can name the specific
behavior to change. this prevents a vague request from turning into several
unrelated fixes that happen to touch the same feature.

## how do agents work together?

Anthropic documents several [ways to run agents](https://code.claude.com/docs/en/agents).
they give the coordinator different responsibilities:

| approach | useful when |
| --- | --- |
| subagents | the current conversation delegates a bounded question and collects the answer |
| independent sessions and agent view (research preview) | separate tasks should keep running with their own state |
| agent teams | a lead needs communicating teammates and a shared task list; currently experimental |
| dynamic workflows | a repeatable sequence should coordinate several agents through a script |

subagents work inside one session in separate context and return their
findings. independent sessions and agent teams have their own coordination
controls; teams are disabled by default. worktrees
separate filesystem edits. communication and isolation solve different parts
of the same problem: workers need to know what changed, and they need a place
to change their own files.

### give each task its own job

suppose a settings page needs new form behavior and an updated help article.
one worker can own the form and its tests; another can own the documentation.
settle the field names and behavior first, then let the two work independently.

```text
split this into two tasks. the implementation task owns the settings form and
its tests. the documentation task owns the help article and uses the agreed
field names. preserve existing changes. each task returns its files, checks,
and unresolved assumptions. integrate after both finish.
```

if both tasks need to redesign the same interface, resolve that decision before
splitting them. a worktree gives each task its own files while the shared
product decision still needs an owner.

### what's still running?

`claude agents` opens agent view, currently a research preview, for background sessions.
`/tasks` shows background work associated with the current session. the
`/agents` command manages subagent definitions. use the
[agent reference](https://code.claude.com/docs/en/agents) for the current controls.

look for work waiting on input as well as work consuming time. another active
agent adds another stream of output to review. use parallelism where the saved
waiting time exceeds the coordination it introduces.

## can it keep working while i'm away?

| mechanism | where it runs | what keeps it available |
| --- | --- | --- |
| `/loop` | the current local session | the running session and machine |
| desktop scheduled task | a local task session | the desktop app and an awake machine |
| cloud routine | configured cloud infrastructure | the routine’s environment and account |

[desktop scheduled tasks](https://code.claude.com/docs/en/desktop-scheduled-tasks)
can use local tools and worktrees. by default they use the current working
directory, including uncommitted changes; enable worktree isolation per task.
on wake or app startup, Desktop starts one catchup run for the latest missed
time within seven days. a morning prompt may execute later than its scheduled
time. write a time boundary when the distinction matters.

[routines](https://code.claude.com/docs/en/routines) can respond to schedules,
API calls, and GitHub events. Anthropic labels them research preview. they run
autonomously without interactive permission prompts, so select the repositories,
network access, and connectors before relying on the routine.

a useful first automation is an inspection with a clear output: “check whether
the latest dependency update passes the existing tests; return the failing
command and relevant output.” run it once while present and inspect which
identity, environment, and tools it actually used. add an external write only
when its authority and failure behavior are understood.

## can i pick this up on another device?

[Remote Control](https://code.claude.com/docs/en/remote-control) keeps execution
on the host. a [web task](https://code.claude.com/docs/en/claude-code-on-the-web)
has a cloud environment. moving between those arrangements requires checking
which files, uncommitted changes, dependencies, and accounts are available at
the destination.

to continue a cloud session locally, use `claude --teleport` from a checkout
of the same repository, signed in to the same account. it fetches the pushed
branch and copies the conversation; later terminal work stays local.
`claude --cloud "describe the task"` starts a fresh cloud conversation.
the Desktop Code tab also has a local to
cloud option in its Open in menu. inspect what that workflow transfers before
depending on local files at the destination.

a handoff should name the branch or revision, what changed, what passed, and
the next concrete step. for example: “the form fix is on this branch; its unit
test passes; the remaining check is keyboard navigation in the rendered page.”
that is enough to resume useful work without reconstructing the entire chat.
