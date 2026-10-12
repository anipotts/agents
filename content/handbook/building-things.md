---
title: building things
description: choose a curiosity project or prepare for people depending on what you build.
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
  order: 21
---

the consequence of a mistake changes how you should build. choose a path for
this project, then reassess when other people, money, or important work begin
to depend on it.

## building for fun

start with something you want to see exist: a tiny game, a visual explanation,
or a tool for a harmless personal task. name one thing it should do and a way
you can check it. use sample data for the first experiment.

### make a small first version

for a reading group, try a page that lists three sample stories and lets you
mark one as a favorite. ask the agent to explain how to run it and where it
saves the choice. open it yourself, change the choice, and reload the page.

keep a recoverable version before trying a larger change. tell the agent what
surprised you and what you want to try next. the experiment can change direction
as you learn what interests you.

### understand what you are keeping

ask which files belong to the project, what runs on your computer, and whether
anything leaves it. inspect the result and the explanation together. write down
how to start it again so you can return after the initial chat.

## building seriously

when customers, money, a business, or consequential decisions depend on the
result, begin with the people and the failure cases. describe who will use it,
what promise you are making, and what a mistake would cost them.

### establish the behavior that matters

turn those promises into checks. for a paid booking system, that could mean
confirming a booking is recorded once, the amount is correct, and a failed
payment leaves a clear state. use test accounts and sample records while
developing. examine the actual result, including the failure path.

ask the agent to identify assumptions about access, storage, external services,
and ongoing costs. resolve the ones that affect the product before real users
depend on it. a working screen is one piece of that evidence.

### release with a way back

keep changes reviewable and require the project's release checks. identify who
owns integration when several people or agents contribute. preserve current
user data and verify recovery before relying on a backup.

after a release, open the deployed version and check the behavior that matters.
record which version was checked and what remains uncertain. keep a way to
notice failures and someone responsible for responding to them.

## choose the next guide

use [start here](/handbook/operating-agents/) for task context and review, then
choose a product guide for its actual controls. the coding exercises in Codex
and Claude Code are optional starting points with their own prerequisites.
keep reusable project notes with the work, using the
personal infrastructure draft (`content/handbook/personal-infrastructure.md`) as a small
starting layout.
