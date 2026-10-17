---
title: choosing your setup
description: evaluate grok on a real repository task or a browser handoff, then decide what deserves automation.
products: [grok]
updatedAt: "2026-10-17T18:23:26-04:00"
status: pending
evidence: [official-source, analysis, open-question]
sources: [grok-build, grok-bot, grok-bot-mobile, grok-bot-computer, grok-bot-routines]
redirects: []
voice: personal
navigation:
  scope: grok
  order: 70
---

<span id="begin-with-the-product-boundary" class="heading-alias" aria-hidden="true"></span>

## Grok Build or Grok Bot?

Grok Build fits work that lives in a repository: inspect files, make a change,
run a command, and review the diff. Grok Bot adds a persistent cloud computer,
browser sessions, connected apps, and named agents. those are different reasons
to try a product.

i use Grok much less than Codex and Claude Code. what interests me most here is
the mobile computer handoff and the ability to coordinate agents. the examples
below are ways to evaluate those features; they are proposed exercises, with
results still to establish.

<span id="give-build-one-small-repository-job" class="heading-alias" aria-hidden="true"></span>

## what should i try with Build?

choose a change whose expected behavior you already understand. for example:

> find why the empty search query shows every result. explain the cause, change
> it so an empty query shows the existing empty state, and run the relevant
> tests. return the diff and anything you could not verify.

substitute a real issue and your repository's test command. use
[`grok inspect`](/guides/grok/configuration/) first so you know which instructions
and tools the session discovered. the [Build guide](https://docs.x.ai/build/overview)
covers interactive use and headless execution if you later need scripting.

judge the result by the change you can inspect: does the original case now
work, do the surrounding cases still behave correctly, and can you follow the
explanation back to the code? an impressive transcript can still leave the
actual behavior unresolved.

<span id="testing-computer-takeover" class="heading-alias" aria-hidden="true"></span>

## can i take over the computer?

a useful browser exercise is collecting two comparable options from public
websites into a short table. ask for source links, the criteria you supplied,
and any missing information. keep the result as a file you can inspect.

while it works, open the [mobile computer view](https://docs.x.ai/grok-bot/mobile).
take control to change a search filter, then return control and explain what
you changed. watch whether the Bot understands the current page and continues
from there. that tests the takeover loop without needing a purchase or private
account.

the practical question is how much supervision this saves you. can you tell
what happened while you were away? can you correct one step and let it keep
going? do you get a usable result after the handoff?

<span id="add-another-bot-when-the-work-can-split" class="heading-alias" aria-hidden="true"></span>

## when would i need another Bot?

one Bot could collect the options while another checks the source links. give
each a distinct output and make the second report discrepancies to the first.
that is a concrete reason for them to communicate.

remember that their [cloud computer is shared](https://docs.x.ai/grok-bot/computer-and-apps).
separate screens can still touch the same files or signed in services. name the
files each worker owns. a second Bot is useful when it adds independent work
or review; overlapping edits add coordination you then have to untangle.

<span id="repeat-a-useful-method-before-scheduling-it" class="heading-alias" aria-hidden="true"></span>

## can it do this every week?

xAI separates [skills and routines](https://docs.x.ai/grok-bot/skills-routines-and-automations):
a skill describes a repeatable method, and a routine gives one Bot scheduled
work or, where supported, an event trigger. once the comparison exercise
produces the right result, a skill could
capture its inputs, steps, and verification. a routine could run it each week.

define the timezone, destination, and behavior when a source is missing or a
login expires. testing a routine performs real work, so check its access and
outputs before running it. editing a routine's schedule or instructions and
running its test currently require the desktop app. scheduling becomes
worthwhile when the repeated
result already meets your needs.
