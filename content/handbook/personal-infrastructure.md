---
title: personal infrastructure
description: a small system for recurring work, readable context, and recovery.
products: [codex, claude-code, grok]
updatedAt: "2026-10-12T13:00:00-04:00"
status: pending
completion: outline
draft: true
evidence: [analysis]
sources: []
voice: evidence
navigation:
  scope: handbook
  order: 22
---

start with one job you keep returning to. this example uses a weekly project
review with made up notes. the first result is a useful review you can inspect;
scheduling it comes after that works.

## choose a recurring job

write down the input, output, and human decision. for a weekly review, the input
is your project notes, the output is a list of open decisions and next actions,
and you choose what to do. give it a time limit you can afford to review.

## give the work a home

use a folder or document collection you can open yourself. here is one possible
layout for the example:

```text
weekly-review/
  README.md
  context.md
  instructions.md
  projects.md
  reviews/
```

put the purpose and links to the other files in `README.md`. keep one current
project list. save dated review drafts in `reviews/` so the next run has a clear
starting point. a chat needs a supported way to read these files; attaching
copies also works for the first exercise.

## separate what each file means

`context.md` holds durable facts, such as what the project is for and who uses
it. `instructions.md` holds the procedure: read the project list, preserve its
decisions, list unresolved questions, and prepare a draft. `projects.md` holds
current state: what happened, what is blocked, and the next action.

try these made up project notes:

```text
project: neighborhood reading group
purpose: arrange one discussion of a short story
agreed: meet on a weekend; keep attendance free
open: date and location
next: compare two possible dates
```

ask the agent to read the procedure and notes, then prepare a weekly review.
check that the date and location remain questions. choosing an answer needs
more information than these notes provide.

## connect one app when it helps

identify the account, the information needed, and the operation. begin by
reading a small piece of relevant information. check the result before adding
write access or a recurring action. sending invitations is a separate decision
from preparing a draft invitation.

see [credentials and agent access](/handbook/credentials-and-access/) for the
hidden reference under review. product settings and access controls vary; use
the relevant product guide when implementing a connection.

## make recurring work visible

run the review manually and inspect its saved result. before scheduling it,
choose the timezone, input location, output location, and what should happen
when input is missing. a useful failure result names the missing input and
leaves the previous notes intact.

check the scheduler's run history and open the output after its first scheduled
run. a saved schedule establishes configuration; that first run establishes
whether this setup actually worked. keep a way to pause it and revise the
procedure when the review stops being useful.

## practice recovery and continuation

keep a backup you can restore independently of the chat. copy a sample note,
change the copy, and restore it from the backup. open the restored file and
compare its contents before trusting the recovery process.

finish a session with a short continuation note: current goal, decisions,
changed files, checks, and next action. ask a fresh chat to locate the notes and
explain what comes next. correct missing context in the files so the system
stays understandable when you change products.
