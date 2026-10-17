---
title: your first task
description: a first useful codex loop with one repository, one task, and one way to verify it.
products: [codex]
updatedAt: "2026-10-17T18:23:26-04:00"
checkedAt: "2026-09-07T15:01:58-04:00"
status: pending
completion: outline
draft: true
evidence: [official-source, analysis]
sources: [openai-codex-cli, openai-codex-agents-md]
redirects: []
voice: evidence
navigation:
  scope: codex
  order: 20
---

## what should i try first?

choose a small behavior you can describe and check yourself. a failing test,
a broken keyboard shortcut, or a confusing error message gives you something
to compare before and after the agent works. start in a repository whose
contents and setup you recognize.

open that repository in the desktop app, your editor, or the
[Codex CLI](https://learn.chatgpt.com/docs/codex/cli). pick the surface where you
can inspect the result comfortably. check the working directory, branch, and
existing changes before the first edit. in a shared checkout, those changes
may belong to someone else.

## example: fix a retry count

this coding exercise assumes basic JavaScript and Git knowledge. follow the
[CLI setup](https://learn.chatgpt.com/docs/codex/cli) to install and sign in if
needed. check `node --version` and `git --version` before creating a new scratch
directory. the example deliberately
starts with a bug: `0` gets replaced by the default retry count.

```sh
mkdir codex-retry-demo
cd codex-retry-demo
git init
```

create `retry.mjs`:

```js
export function retryCount(value) {
  return value || 3;
}
```

then create `retry.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { retryCount } from './retry.mjs';

test('keeps an explicit zero', () => {
  assert.equal(retryCount(0), 0);
});

test('defaults only when no value is supplied', () => {
  assert.equal(retryCount(undefined), 3);
  assert.equal(retryCount(null), 3);
  assert.equal(retryCount(2), 2);
});
```

run `node --test retry.test.mjs`. the zero case should fail. now give Codex this
prompt in the same directory:

```text
fix retryCount so an explicit 0 is preserved, while null and undefined use 3.
keep the existing tests and run node --test retry.test.mjs.
explain the cause and show the change. finish with local files only.
```

the expected fix uses `value ?? 3`. `||` replaces every falsy value, including
zero; `??` uses the default only for `null` or `undefined`. inspect the function
and rerun the test.
that demonstrates one complete loop: observed failure, a bounded request, a
change, and a check you can repeat. it proves the listed inputs; validation of
negative numbers or strings would be a separate requirement.

## what should go in AGENTS.md?

once you move into a real project, put recurring setup and verification
instructions in [`AGENTS.md`](https://learn.chatgpt.com/docs/agent-configuration/agents-md).
for this exercise, that could be as short as:

```md
# retry demo

Run node --test retry.test.mjs after changing retry behavior.
Keep the module dependency free.
```

the bug description belongs in the current prompt. the test command belongs
in repository guidance because the next task will need it too. a short file
with correct commands saves more time than a long file full of stale advice.

## reviewing the change

read the changed files, inspect the result, and check any behavior the test
cannot show. a visual change needs a look at the running page. a database
change needs the actual query or migration result. the agent's final message
should tell you what changed, what ran, and what is still unresolved.

if a check cannot run because a service is missing, retain that limitation in
the handoff. decide whether another check is enough for the current task or
whether the environment needs fixing first.

the [configuration guide](/guides/codex/configuration/#try-a-temporary-setting)
shows how to try a sandbox and approval setting for one session, then save
a reusable profile when you want those defaults again.
