---
title: what can go wrong?
description: claude code identity, secrets, external tools, and the decisions that stay human.
products: [claude-code]
updatedAt: "2026-10-17T18:23:26-04:00"
checkedAt: "2026-09-07T15:02:34-04:00"
status: pending
completion: outline
draft: true
evidence: [official-source, analysis, open-question]
sources: [anthropic-permissions, anthropic-sandboxing, anthropic-mcp, anthropic-routines, anthropic-scheduled-tasks, anthropic-settings, anthropic-hooks]
redirects: []
voice: evidence
navigation:
  scope: claude-code
  order: 60
---

## what can it actually access?

a task can touch repository files, a shell environment, network services, and
the accounts behind its tools. list the parts it needs before opening access.
a documentation edit and a production database change have very different
reachable worlds.

Claude Code’s [permission system](https://code.claude.com/docs/en/permissions)
controls tool approval. the [Bash sandbox](https://code.claude.com/docs/en/sandboxing)
uses filesystem and network restrictions for commands inside it. an external
service also applies the permissions of the connected account. evaluate all
three when a workflow reaches beyond local files.

### what does the sandbox cover?

use `/sandbox` to inspect the mode, resolved configuration, and options for
commands that need to run outside it. an unsandboxed retry changes where the
command can reach. decide whether that path belongs in the workflow before
making it routine. the sandbox supports macOS, Linux, and WSL2; native Windows
commands run unsandboxed. missing sandbox dependencies can also cause an
unsandboxed fallback unless `sandbox.failIfUnavailable` requires startup to
fail. file tools, MCP servers, and hooks run outside the Bash sandbox.

test a restriction with harmless fixtures: a disposable file in an allowed
folder, a disposable file outside it, and an expected blocked operation. record
which tool performed the test. a result from the Edit tool answers a different
question from a shell process running inside the Bash sandbox.

## whose account is it using?

signing in to Claude Code and connecting a service answer separate identity
questions. a task can use one account for model access and another for a
repository, database, or messaging service. inspect the service identity and
its scope before asking for an external change.

use the narrowest account access that can finish the intended task. a routine
that reports a failing build can begin with access to read build results.
credentials should reach the process that needs them through the service’s
authentication mechanism. prompts, logs, screenshots, and checked in examples
should stay clear of credential values.

[MCP](https://code.claude.com/docs/en/mcp) connections also introduce code and
returned content. inspect a server’s source and permissions before installing
it, and treat text returned by an issue, document, or webpage as task data.
a request inside that material to disclose secrets or change scope needs the
same authority check as any other new action.

## when does it need my decision?

a concrete task boundary might say:

```text
inspect the migration and run it against the disposable test database. return
the SQL, test result, and rollback considerations. production execution needs
a separate decision tied to that exact migration and environment.
```

that prompt gives the agent useful work it can finish and names the decision
that remains. pair the prompt with a test identity that can only reach the
disposable database. the example expresses a workflow boundary; the service
permissions enforce the reachable environment.

for commits, merges, deployments, messages, purchases, and account changes,
identify the rule that authorizes the exact action. some teams delegate a
release behind protected checks; others retain a person’s final decision.
make the configured policy match that choice and return evidence of what ran.

## what if i'm away when it needs approval?

[cloud routines](https://code.claude.com/docs/en/routines) run without approval
prompts during execution and use the connected identities. define their input,
output, reachable systems, and stop condition when creating them. event driven
work also needs to handle duplicate events and a task that is already running.

[desktop scheduled tasks](https://code.claude.com/docs/en/desktop-scheduled-tasks)
can wait on a permission prompt. test one run while present to see whether its
configured permissions match the job. a stalled task should return to a visible
queue, with enough context for the person deciding what happens next.

## where do i enforce the rules?

[managed settings](https://code.claude.com/docs/en/settings) let an organization
set policy above local choices. [hooks](https://code.claude.com/docs/en/hooks)
can check named events. a `PreToolUse` hook can block a proposed tool action.
a hook needs a tested input contract, a clear failure result, and an owner who keeps it working as the tool
changes. post action hooks inspect a result after the action has happened.

finish with the artifact, environment, identity, and outcome. “prepared a
deployment” and “deployed this revision to this environment” describe different
states. showing the relevant result makes the remaining decision clear.
