---
title: grok
description: a current source based map of grok build, grok bot, and the wider grok product surface.
products: [grok]
updatedAt: "2026-10-17T18:23:26-04:00"
status: pending
evidence: [official-source, analysis, open-question]
sources: [grok-build, grok-bot, grok-bot-mobile, grok-bot-computer, grok-bot-approvals, grok-bot-profiles, grok-bot-mobile-trackpad-capture, openai-remote-connections, anthropic-remote-control, x-api, grok-assistant]
redirects: []
voice: evidence
navigation:
  scope: grok
  order: 10
---

## this is grok

<div class="surface-bento intro-visual source-image" data-media-id="grok-bot-mobile-trackpad">
  <figure><a href="https://x.com/old_pgmrs_will/status/2094265782054367651"><img src="https://pbs.twimg.com/media/HRBSyy5bcAAh2mc?format=jpg&amp;name=small" alt="Grok Bot mobile computer view with a file browser, Chrome icon, and trackpad controls in Japanese" width="680" height="646" loading="eager" fetchpriority="high" decoding="async" referrerpolicy="no-referrer" /></a><figcaption>Grok Bot's mobile computer and trackpad menu. screenshot shared by <a href="https://x.com/old_pgmrs_will/status/2094265782054367651" target="_blank" rel="noopener noreferrer">Will Oldgram (@old_pgmrs_will) on X</a>.</figcaption></figure>
</div>

Grok now offers an assistant accessible through the web or X, a coding agent called Grok Build, and persistent
cloud agents called Grok Bot. this section keeps those products separate so a
model comparison does not get confused with a harness or a cloud computer.

as of september 7, 2026, [Grok Build provides](https://docs.x.ai/build/overview) an interactive terminal CLI,
headless scripting, ACP integration, custom models, skills, plugins, hooks, MCP,
subagents, and workflows. [Grok Bot](https://docs.x.ai/grok-bot/overview) offers
persistent Grok agents on a shared cloud computer that you can oversee from your computer or phone.

i use Grok drastically less than Codex and Claude Code, so these pages won't
give you the perspective of an extreme power user. for most of Grok's life,
i've used it through the X app or watched people bring it into comment replies
to argue with people who definitely don't go outside of their house ever.

i haven't had much personal need for real time social context. if that's what
you're looking for, [Grok and SuperGrok](https://x.ai/grok) are worth exploring. for programmatic
access to posts and other X platform data, there's the
[X API](https://docs.x.com/x-api/introduction).

what interests me about Grok Bot is the polished mobile experience: chat with
an agent, see the computer it's using, step in yourself, then hand it back.
it brings to mind the promise of Claude Cowork, ChatGPT Agent, and
especially OpenClaw. i think of OpenClaw as an agent you give “claws” to.
right now, a browser and the ability to coordinate other agents might be the
most useful claws: create them, message them, read their histories, check what
they're doing, and archive them when the work is done.

if you're a creator, influencer, or voice making your living primarily on X,
there's also the appeal of working within the broader X and xAI ecosystem.

Grok Bot also feels the most personified to me out of these three products,
with Codex somewhere in the middle and Claude Code at the other end. the
names and customizable appearances make individual Bots feel more like
characters. the icons, shapes, and colors i've seen are part of that
impression. xAI documents [editable names and avatars](https://docs.x.ai/grok-bot/bots),
and Bots can [message each other and pass work between them](https://docs.x.ai/grok-bot/overview).
those details give the whole experience a different personality.

## cooperative computer use

### computer view

you can literally see the browser the agent is working in. it's like being
on a Zoom call where the speaker is sharing their screen: you can focus on
the presentation when you want to see what they're doing. with Grok Bot,
you swipe from the conversation into the computer view, with its terminal
and browser.

when you don't need to watch the screen, you can go back to chatting with
other agents while the virtual computer keeps working in the
[background](https://docs.x.ai/grok-bot/computer-and-apps). you choose when
to watch, when to step in, and when to let it keep going.

### taking control

you can control the virtual mouse/cursor with your fingertip and use your
phone's keyboard on the agent's computer. if it reaches a login screen, you can
[type your password](https://docs.x.ai/grok-bot/mobile) into the site yourself,
then hand control back and tell the agent to keep going. the controls are built
into the same interface you use to work with the agent.

when you're letting the agent drive, you can just watch. for me, seeing the
browser move through the actual page is much easier to follow than reading
action summaries as they arrive in the conversation.

that's the difference i'm pointing to with Codex and Claude Code on mobile
as of september 8, 2026: their mobile interfaces don't give me the same live
browser view with fingertip control. [Codex Remote](https://learn.chatgpt.com/docs/remote-connections)
and [Claude Code Remote Control](https://code.claude.com/docs/en/remote-control)
let you follow and steer work through conversations, outputs, and approvals.
Grok Bot also puts the computer itself on your phone.

some connections also offer [masked secret requests](https://docs.x.ai/grok-bot/approvals-security-and-privacy).
signing in and approving the agent's next action are separate decisions.

### shared computer

each Bot has its own screen for computer work, with access to the terminal
and browser. xAI documents those screens on [one shared cloud computer](https://docs.x.ai/grok-bot/computer-and-apps)
for your account. files, browser sessions, and command line credentials are
available across your Bots.

if you choose to stay signed in to a site in that browser, another Bot can
use the saved session and pick up the work. for that workflow, you can skip
setting up something like 1Password just to hand the same login to every
agent. the browser keeps the session, and your other Bots can use it too.
a site can still expire that session or ask you to sign in again.

the [Bot configuration example](/guides/grok/configuration/#how-should-i-set-up-a-bot)
shows how to give an agent an ongoing job, such as watching a few changelogs.
the [browser handoff exercise](/guides/grok/recommendations/#can-i-take-over-the-computer)
walks through comparing two options, changing a filter yourself, and letting
the Bot finish from there.
