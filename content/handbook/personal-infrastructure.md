---
title: personal infrastructure
description: a small system for recurring work, readable context, and recovery.
products: [codex, claude-code, grok]
updatedAt: "2026-10-12T13:00:00-04:00"
status: current
completion: complete
draft: false
evidence: [analysis]
sources: []
voice: evidence
navigation:
  scope: handbook
  order: 22
---

say an agent helps you plan a project. a week later, you want to pick it back up. keeping the notes and decisions somewhere you can find makes that easier, especially when you start a fresh chat or switch agents.

personal infrastructure is the setup around that ongoing work. we’ll start with one useful task, give it somewhere to live, and work toward a setup you can keep using.

use [choosing an agent setup](/handbook/choosing-a-setup/) if you’re still deciding where to start.

## start with one small hassle

pick something that’s annoying to do and easy to check when it’s done. start there.

say you keep rereading your project notes to remember where you left off. give the agent a copy and ask for a short update:

```text
tell me where i left off based on these notes. keep unanswered questions open, and suggest one next step for me to review.
```

compare the update with your notes. if it leaves out an important decision or fills in a gap with a guess, correct it and try again. once the result is useful, save the request with the notes so you can repeat it.

## give your work a home

keep the notes and the request together somewhere you already use. a single document is enough to start. give it a name you’ll recognize later, like “project updates.”

keep the notes current and save useful updates with a date so you can see what changed.

when you want help again, paste the relevant part into a fresh chat or attach a copy if your agent supports it. if it can read the document through a file or app connection, check that it’s reading the current version.

## make your notes easy to follow

use a few headings inside your document so it’s clear what each part is for.

context explains what the project is about and the decisions you’ve already made.

instructions explain how you want the agent to help. the request we saved earlier belongs here.

current state explains where you left off and what still needs your attention. update this as the work changes so an old plan doesn’t get mistaken for what’s happening now.

these can stay in one document. split them into separate files when that makes the work easier to manage.

## connect an app when it helps

if you keep copying the same notes into chat, connecting the app where you keep them might save you some work. check whether your agent supports that connection and which account you’re connecting.

try one small request: ask it to find your project document and summarize the latest update. open the document yourself and compare, so you can check that it found the right thing.

look at the permissions the connection asks for. where you have a choice, start with read access. decide separately what the agent can change on its own and what should wait for your approval.

## put it on your calendar

once the task works when you ask for it, decide whether it’s worth scheduling. if your setup supports recurring tasks, choose a time and timezone, and somewhere you’ll actually see the result. tell it which notes and instructions to use.

after the first scheduled run, open the result and compare it with your notes. check that it used the current information and did what you asked.

decide how you’ll notice a missed or failed run. use failure notifications where available, or check the run history regularly. if the task can’t read your notes, have it report that and leave the existing notes alone. keep a way to pause it when you want to make changes.

## have a backup you trust

choose one backup workflow and practice getting your work back. know what it covers, how recent the backup is, and what you’d do if your computer stopped working.

that gives you more room to try things. when you know how to recover, you can make changes with a clearer idea of what’s at stake.

use [backups and getting your work back](/handbook/backups-and-recovery/) to choose and test your recovery workflow.
