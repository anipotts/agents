# editorial review ledger

This file tracks Ani's manual review of every currently public canonical page and each H1, H2, and H3 block. It is editorial working state, not public content. A section stays `unreviewed` until Ani has directly reviewed it. Git history, validation, publication status, and a lack of recent changes do not count as approval.


## Grok and foundations voice pass: September 8, 2026

Ani requested a stronger mobile comparison, the ability to watch real browser
actions, direct workspace wording, and saved-login convenience. His wording
includes “much easier to visually follow compared to just reading action
summary lines” and “without needing to setup a developer friendly password
manager like 1pw.” The comparison is scoped to his stated mobile experience.
Current provider docs corroborate remote conversations and task control; they
do not establish universal absence of browser viewing across every rollout.
xAI explicitly documents separate Bot screens on one shared account computer.
The candidate states that directly rather than implying separate virtual machines.

For Start here, Ani described “a friend” and “a genius that you have accessible
in your pocket on your laptop” with files, documents, apps, and browser access.
He asked to separate model and harness and replace vague calls to action with
links that explain their destination. “the foundations” is the candidate frame.
The previous crash-course hash remains an alias. Only the introduction and
foundations body changed; the detailed prompt examples remain available below.

The original X screenshot is now an image-only Grok hero using its source URL.
The larger view retains creator credit and the original-post link. This is a
still image, not a recording, and no third-party file was rehosted. The source
registry and media inventory describe the exact presentation. Existing generic
endings in the three provider overviews and Codex first-task draft now name
concrete examples from their destination pages.

All new wording remains candidate material. The accepted Zoom body and
homepage remain unchanged. This review advances neither full-page acceptance
nor publication.

Validation passed: source/content checks, Astro diagnostics and build, 14
inventory regression tests, generated routes and agent surfaces, UI ownership,
and media/performance budgets. Chromium checks at 319, 759, and 1440 pixels in
light and dark passed for both changed pages: no app errors or overflow, no
accessibility violations, image enlargement and source credit, Escape/focus
return, descriptive destination links, and the old crash-course hash. Blocked
image checks kept the original source reachable with and without JavaScript.
The source-hosted screenshot transferred 41,593 bytes and was the observed LCP
element in these unthrottled local runs. This is targeted rendering evidence,
not a new full performance audit or deployment receipt. Artifacts:
`/tmp/handbook-voice-qa/results.json`.

## current implementation receipt: September 8, 2026

This receipt supersedes the earlier unresolved map and embed findings below.
The live map remains the current inventory; these are dated verification results.

- The inventory keeps the original Markdown parse context when assigning HTML
  to sections. Timeline paragraphs, dates, and links remain with their headings;
  literal code and split inline video tags keep their original meaning.
- Authored map links resolve against the chapter route. Unsafe schemes produce
  plain text. Hash navigation was clicked through to the actual target page.
- The `next` array in the live-map block is the only authored question queue.
  The map derives remaining page reviews, including new and hidden chapters.
  Review milestones close from matching acceptance records. Answered input
  requires a resolution and source and never approves neighboring prose.
- The pending first-prompt review now matches its heading to track the ongoing
  review location through candidate edits. This is a review-started record,
  not title or body acceptance. Its prior body record is retained in `47997d6`.
- Twelve native X posts remain embedded with tested per-post themes. X's dark
  theme resolves the show-more contrast failures, while the Ricky and Boris
  posts retain light mode for distinguishable inline links. The Codex app
  walkthrough uses the original credited link because its native affiliation
  control lacks an accessible name in both themes. Source dropdowns retain all
  original posts. The media checker validates both presentation types.
  Supported options: https://docs.x.com/x-for-websites/embedded-posts/guides/embedded-tweet-parameter-reference

Local verification passed: `bun run verify`, including all 306 accessibility
cases across 17 routes, nine widths, and both themes. No accessibility rules or
frames were excluded. Fourteen inventory, provenance, queue, and URL regression
tests pass and now run in the existing CI site job. The development test creates,
edits, and removes its own hidden fixture to check real save-to-map events.

Browser checks passed at 319 and 1440 pixels in light and dark: readable history
text, no overflow or application errors, question filtering, and map links that
open the correct chapter hash. A temporary canonical edit appeared through SSE
in 567 ms and in the normal route in 1073 ms, then was restored. The measured
inventory scan was 169 ms. Evidence: `/tmp/handbook-fixes-qa/results.json`.

Fresh performance audit passed with three cold mobile runs per route, verified
local HTTP/2, and no CDN caching or response compression. Median scores for home,
Codex, Claude, and Grok were 100, 97, 97, and 99; median LCP was 1516, 2412,
2408, and 1810 ms. The warm provider switch measured 48.4 ms to route paint,
a synthetic interaction measurement. Evidence: `/tmp/handbook-fixes-performance/summary.json`.

The next editorial milestone is Grok takeover and shared-computer wording,
Start here, and the two provider introductions, followed by their extensions.
The homepage, accepted Zoom body, and frozen archive remain preserved. Seven
chapters remain hidden; no full-page wording approval or production deployment
is implied by these technical checks. PR #319 remains a draft.

## embedded demonstrations: September 7, 2026

Ani approved the proposed distribution of 12 X posts across eight pages and
requested matching source dropdown entries. Eleven posts are on seven public
pages; autoresearch is in the hidden Codex workflow draft. The existing Grok
capture remains in place. Seven hidden chapters remain hidden.

The source registry records each original post, creator, date, and the scope
of its evidence. Each placement declares its source in page frontmatter. The
media manifest records native text, image, or video embeds, visible credits,
responsive dimensions, and original-post fallbacks. New explanatory bridges
remain agent proposals; this placement approval does not approve surrounding
chapter wording or establish Ani's experience with the demonstrations.

The live map derives the new media and links from Markdown. The first-task
section's existing review-started fingerprint becomes stale because it now
includes the Ricky Robinett demonstration. The reviewed Grok Zoom paragraph
and homepage wording are unchanged.

Verification: 24 public embed presentations passed source-dropdown, fallback,
width, and overflow checks at 319 and 1440 pixels. All seven video posts played
after a tap with autoplay disabled. Content, UI ownership, editorial inventory,
build, routes, source contracts, agent surfaces, navigation, and development
search passed. The compressed HTML cap increased from 24 to 25 KiB for the
expanded chapter content (Claude extensions: 24,717 bytes); CSS, JavaScript,
font, and image caps remain unchanged.

The full 306-case accessibility sweep reports vendor-owned failures inside
X's frames: low contrast on the show-more links in the claws, Devin, vibe
coding, and flight simulator posts, plus an unnamed affiliation link in the
OpenAI Developers post. Host-page checks passed. These failures remain in
`test:a11y`; no rule was disabled or exception added. Native embed settings
cannot repair the unnamed control. Launch accessibility remains unresolved
while these frames are included. The original-post fallbacks remain available.

Fresh performance audit passed: three cold mobile Lighthouse runs per homepage,
Codex, Claude Code, and Grok route over verified local HTTP/2, without CDN
caching or compression. Median scores were 100, 97, 97, and 99; median LCP was
1526, 2409, 2483, and 1957 ms. Warm Codex-to-Claude route paint was 44.1 ms
(synthetic interaction, not field INP). Artifacts are in
`/tmp/handbook-posts-performance/summary.json`.

## September 8 continuation

Rechecked the official Grok mobile, computer, and approvals pages for the
computer-use section. These support human takeover, returning control, work
continuing in the cloud, and one shared computer with separate Bot screens.
The source registry has the new checking date and explicit scope. Ani's exact
cursor and phone-keyboard wording remains the personal basis for those details.
The takeover paragraph was presented for wording review; no new acceptance is
recorded without his response. No additional anecdote is needed for the short
overview. After takeover wording, review the shared-computer explanation, then
the earlier introduction candidates before moving on to product defaults.

The previous CI site job exhausted its ten-minute limit in the accessibility
sweep. Browser waits now have explicit limits, every case reports its route,
width, duration, and findings as it completes, and a stopped run names its
current case. The site job has twenty minutes for setup and the full matrix.
A controlled blocked-X request failed after the expected fifteen seconds with
the Grok route identified. All existing accessibility rules remain enabled.
Browser plugin is absent in this session; validation uses the repository's
Playwright workflow. The X-controlled widget defects remain launch issues.
The full local rerun completed all 306 cases and reported the same 90
X-controlled findings, with no new site-owned violations. Source validation
passed for 123 entries and the editorial inventory tests passed all nine cases.

## September 8 compact examples and embeds

Applied Ani's layout annotations: example copy controls share the label row,
native X embeds use a 360px maximum width, and the shared handbook rail uses
“contents” without repeating the header logo. Remeasured all thirteen native
posts at 360px and 287px and updated their reserved dimensions and media
registry. Post sources, credit links, and publication boundaries are unchanged.

Shortened the first good prompt at `what-should-i-ask-first` into direct
instructions in response to Ani's text annotation. This is candidate wording;
the request to revise it does not approve the new text or surrounding section.
The previous prompt remains available in Git history.

The normal local preview was restarted to pick up the current Markdown.
Playwright checks passed at 319, 375, 939, and 1440px in light and dark themes:
exact clipboard output, compact cards, wrapping labels, keyboard rail collapse,
native video playback, visible credits, and no page overflow or app errors.
Scoped accessibility checks for the cards and sidebar passed. The navigation,
site, content, editorial inventory, and performance budget checks passed.
Browser plugin is unavailable; QA uses repository Playwright. Evidence is in
`/tmp/handbook-compact-qa/summary.json`. The prior X-owned accessibility findings
remain separate release issues; this pass does not claim a clean full audit.

## states

- `unreviewed`: Ani has not reviewed the current wording.
- `in progress`: Ani has started reviewing or left specific direction, but the block is not approved.
- `Ani reviewed`: Ani has explicitly approved the current wording and fingerprint.
- `ready`: wording, evidence, media, attribution, and follow-up work are complete for publication.

## review order

1. Grok cooperative computer use section
2. Codex and Claude defaults, workflow examples, and product chapters
3. credentials and access
4. shared operating and setup guidance
5. history and method
6. final review of hidden chapters and release checks

## full handbook implementation: September 7, 2026

This is the current inventory and supersedes the older audit's unfinished
outline and excerpt descriptions below. All 24 intended Markdown files now
contain substantive writing. Seven chapters remain hidden pending Ani's
review. The existing `outline` metadata on those seven files is the current
publication gate; it no longer describes their body content.

Writing, factual support, Ani's acceptance, and publication are separate.
“Source review” means an agent read the relevant primary material against the
claims. It does not imply a personal product test. These drafts are candidates;
this implementation request does not approve every newly written sentence.

| Page | Writing | Evidence | Ani review | Route |
| --- | --- | --- | --- | --- |
| [Homepage](../content/home.md) | ✅ preserved original | unchanged | preserve, as directed | public |
| [Operating agents](../content/handbook/operating-agents.md) | 🟦 written | source review | pending | public |
| [Choosing a setup](../content/handbook/choosing-a-setup.md) | 🟦 written | source review | pending | public |
| [Credentials and access](../content/handbook/credentials-and-access.md) | 🟦 written | sources + dummy fixture | pending | hidden |
| [History](../content/handbook/history.md) | 🟦 written | dated primary sources | pending | public |
| [Method and sources](../content/handbook/method-and-sources.md) | 🟦 written | actual workflow inspected | pending | public |
| [Codex: overview](../content/guides/codex.md) | 🟦 written | source review | pending; adopted passages preserved | public |
| [Codex: getting started](../content/guides/codex/getting-started.md) | 🟦 written | sources + local fixture | pending | hidden |
| [Codex: configuration](../content/guides/codex/configuration.md) | 🟦 written | source review | pending | public |
| [Codex: workflows](../content/guides/codex/workflows.md) | 🟦 written | source review | pending | hidden |
| [Codex: extensions](../content/guides/codex/extensions.md) | 🟦 written | source review | pending; adopted passages preserved | public |
| [Codex: safety](../content/guides/codex/safety.md) | 🟦 written | source review | pending | hidden |
| [Codex: recommendations](../content/guides/codex/recommendations.md) | 🟦 written | source review | pending | public |
| [Claude Code: overview](../content/guides/claude-code.md) | 🟦 written | source review | pending; adopted passages preserved | public |
| [Claude Code: getting started](../content/guides/claude-code/getting-started.md) | 🟦 written | sources + local fixture | pending | hidden |
| [Claude Code: configuration](../content/guides/claude-code/configuration.md) | 🟦 written | source review | pending | public |
| [Claude Code: workflows](../content/guides/claude-code/workflows.md) | 🟦 written | source review | pending | hidden |
| [Claude Code: extensions](../content/guides/claude-code/extensions.md) | 🟦 written | sources + local fixture | pending; adopted passages preserved | public |
| [Claude Code: safety](../content/guides/claude-code/safety.md) | 🟦 written | source review | pending | hidden |
| [Claude Code: recommendations](../content/guides/claude-code/recommendations.md) | 🟦 written | source review | pending | public |
| [Grok: overview](../content/guides/grok.md) | 🟦 written | sources + Ani dictation | Zoom paragraphs Ani reviewed; takeover next | public |
| [Grok: configuration](../content/guides/grok/configuration.md) | 🟦 written | sources + CLI discovery | pending | public |
| [Grok: recommendations](../content/guides/grok/recommendations.md) | 🟦 written | source based exercises | pending | public |
| [Archived Claude tools](../content/archive/claude-code-tools.md) | ✅ preserved compatibility text | 45 cc + 175 lore tests pass | preserve frozen scope | public |

### reader and heading direction: September 7, 2026

Ani clarified that readers know basic coding but are new to agents. He accepted
short, question led navigation and requested a brief crash course with embedded
references that technologically fluent readers can skip. The opening of
`content/handbook/operating-agents.md` now provides that optional primer and a
direct path to the first practical task. It is sourced candidate prose, not a
record of Ani's personal testing. Existing product introductions link to it.

Chapter labels and section headings now favor recognizable questions and
concrete topics. Ani specifically adopted “who's running twenty agents?” for
the wide Claude screenshot. The broader naming direction is accepted; the
individual agent proposed titles and new crash course still need wording review.
Grok's adopted headings and Zoom wording, personal anecdotes, and homepage prose
remain preserved. Renaming a section does not change its review state. Seven
hidden chapters remain hidden. Existing public heading fragments retain aliases.

### example presentation and prompt voice: September 7, 2026

Ani requested red and green highlighting to distinguish weak and useful examples,
explicit example labels, copy controls below code blocks, and prompts that sound
naturally dictated. His stated preference is to spend enough thought to make the
task clear, then act; rigid punctuation and prolonged prompt preparation get in
his way. This is task direction, not acceptance of the earlier example wording.

The first prompt and handoff on the operating agents page now have labeled
contrasts and highlighted explanations. The rewritten search prompt is a
hypothetical example, not a claim about Ani's project. OpenAI's prompting guide
supports ordinary language and useful context; Anthropic's best practices support
acting directly on small, clear fixes and planning when the approach is uncertain.
Candidate wording remains unreviewed. The 180-word primer is unchanged.

### preserve these passages

- September 7 media direction: Ani supplied a Claude Code terminal recording
  and a wide screenshot through Messages, and requested the recording in the
  introduction. The wide screenshot accompanies “sometimes you'll see people
  doing this.” Candidate caption, grounded in his direct account: “i did this
  for a TikTok and went through my five hour usage window in 15 minutes.”
  This describes that recording setup; it makes no general usage limit claim.
  Ani then requested GIF behavior: silent autoplay and looping, with no play
  button or playback controls. Captions remain visible only in the larger view.
  The supplied originals are preserved. The presentation and candidate wording
  still need Ani's visual review.

- Homepage is byte identical to the starting checkout: SHA256
  `d226dae5b9f915e44e59b59a0d4b18428a4e7bf81f657513fcc9256a26d89fe0`.
- Codex's original 3600 × 2260 screenshot and caption remain intact. Responsive
  WebP derivatives handle inline loading; enlargement uses the original.
- The three personification asides, Codex coordinator core and introduction,
  and Claude's reason for interest in Function Hooks remain grounded in Ani's
  supplied words. Their surrounding new factual prose still needs review.
- Grok's limited use, X replies joke, tentative “claws” idea, and X/xAI ecosystem
  meaning remain. The historical boundary ended “X dominant influencer/creator/voice.”
  The applied replacement ends “the broader X and xAI ecosystem.”
- The Zoom paragraphs under “computer view” are now Ani reviewed; the next
  block is “taking control.” The
  unsupported sentence attributing the exact swipe and
  cursor sequence to “my own use of the app” was removed. The analogy and
  documented takeover remain; describing an interface alone does not establish
  that Ani personally performed each action.

### what still needs Ani

The `next` entries in the live-map block below are the active question and
review queue. The local writing map derives the remaining page reviews from
current files and exact review records, including all seven hidden chapters.
Older checklists above are historical context.

No additional opinion or anecdote is required merely to fill an old heading.
The credentials chapter can remain source based guidance; a personal account
of subscriptions or purchases requires Ani's own words if he chooses to add it.
The Grok mobile recording remains optional for launch.

### material corrections and reproducible examples

- Unapproved first person claims about preferred surfaces, daily mobile use,
  personal tests, subscriptions, and password manager purchases were replaced
  with factual explanations or proposed exercises. Older committed scaffolds
  remain recoverable from `6f1d025`; this pass's incoming dirty snapshot is
  `/tmp/coding-agent-tips-before-full-handbook.patch`. Worker originals and
  source/test packets are in `/tmp/handbook-codex-packet.json`,
  `/tmp/handbook-claude-packet.json`, `/tmp/handbook-shared-setup-packet.json`,
  and `/tmp/handbook-shared-claude-packet.json`. These are reference material,
  not approved voice examples.
- Codex configuration now uses current profile and precedence documentation.
  Runtime approval guidance points to agent approvals; Codex Security is
  separately described as a scanning workflow.
- Claude's supported hooks, research previews, and Function Hooks proposal are
  distinguished. The old local preview loader experiment proves no supported
  interception API and has been removed from public guidance. Its original
  passage is retained in the Claude packet. Freshness watches now match the
  actual proposal's `Function Hooks`, `internal proposal`, and `ui.press` terms.
- On September 7, agent runs exercised the isolated Node examples on Node
  `v25.8.2`: Codex's two assertions failed before the fix and passed afterward;
  Claude's corrected exercise passed four assertions. Claude's standalone
  extension fixture passed two assertions; its hook command returned exit 2
  with stderr on failure and exit 0 on success. No product model invocation or
  actual hook event delivery is claimed by those checks.
- Grok Build `0.2.22`: an agent checked `grok inspect` with a disposable project
  and separate `GROK_HOME`. Both fixture config files and the rule were found;
  host compatibility settings were also discovered. This verifies discovery,
  with no claim to isolated tool enforcement or a model run.
- Credentials: dummy presence/absence branches passed, with no secret output,
  network requests, 1Password authentication, or real vault operation.
- Four unverified ar5iv image embeds were removed from history. The papers and
  their links remain. Original markup and identified figure candidates are in
  the shared Claude packet; no third party images were rehosted.
- `tested` now requires the named tester, environment, version, and limits.
  Method text describes the actual scheduled detection and optional draft PR
  workflow. Term matching and link availability do not certify source meaning.
- Registry versions were checked against npm and the official Claude changelog:
  Codex `0.153.4`, Claude Code `2.1.263`. Historical test versions stay historical.

### Grok Zoom correction: September 7, 2026

Ani's direct answer, retained as raw wording:

> i dont like saying imagining it, but rather more so like it literally is like being on a zoom call where the speaker is presenting and you can choose to focus and see what theyre presenting showing on their screen but if its not important at that specific moment in time for you to visualy oversee agent work in a browser computer interface then u can go back to chatting with otehr agents while this virtual computer stays on in the bg working

The superseded candidate described imagining a mobile Zoom call and sliding
through participants because they do not fit on one screen. That version is
rejected as the current analogy and remains recoverable in `f68158f`.
The revised candidate focuses on choosing when to watch a shared screen and
when to talk to other agents. It removes “i imagine” and keeps the literal
interface comparison. xAI's mobile and computer documentation were rechecked
on September 7 and explicitly support leaving the view while cloud work
continues.

Ani then answered **“Keep this wording”** to the complete two paragraph candidate.
Those paragraphs are now **Ani reviewed** and should be preserved. SHA256 of
the canonical Markdown body between “computer view” and “taking control”:
`2179eff97bd4c2a13e43d4503e34f3ebc58a3e12a4e70d1beece994f3b7ae4fa`.
This acceptance does not cover the neighboring takeover or shared computer
paragraphs, and it is separate from publication of the complete page.

### heading direction: September 7, 2026

Ani's direct correction:

> i dont like these super marketty titles, i prefer something very direct and opinionated like "cooperative computer use"

The active Grok H2 is now **cooperative computer use**, using Ani's suggested
title. The subheadings are **computer view**, **taking control**, and
**shared computer**. Only headings changed; the accepted Zoom paragraphs
retain the fingerprint above. This answer supplies heading direction and
does not approve the takeover prose. The earlier quoted titles below remain
historical review records, not current section names.

The same direction was applied to twelve clearly vague headings in the new
agent drafts, including “configuration precedence,” “settings precedence,”
“MCP connections,” “task coordination and subagents,” “image generation,”
“reviewing the change,” “extensions and permissions,” “Cowork,” “choosing an
extension,” “plugins,” “testing computer takeover,” and “credential access.”
Blueprint headings and three coordinator fragment links were updated together.
Paragraph wording, the homepage, archive, and dated timeline event titles were
preserved. These agent selected heading refinements remain reviewable choices;
they do not turn their paragraphs into accepted prose.

### release state

The local publication still has 17 routes; seven completed drafts remain hidden.
The signed [draft PR #319](https://github.com/anipotts/coding-agent-tips/pull/319)
on `codex/handbook-editorial-review` tracks the implementation. Its provider
checks apply to the exact PR head; the writing task supplies the local
verification receipt and performance measurements. This ledger tracks
authorship and wording acceptance;
full launch readiness still requires the review above. Production has not
changed in this pass.

The technical changes preserve the original image and version 1 agent API,
add responsive image loading and a progressive content catalog, and validate
development search and hidden page exclusion. Code copy tooltips, unused toast
actions, and dark history caption contrast were corrected through browser
checks. History's contrast regression now reports the affected theme and node.
Performance receipts identify local HTTP/2 transport, three cold mobile runs
per measured page, median results, and synthetic navigation timing. They make
no claim to production field INP.

Ani also requested independent right aligned chapter carets to inspect H2/H3
sections before navigating, then corrected their vertical padding and alignment.
The technical pass adds those disclosures to the existing navigation. Chapter
names remain links; caret buttons toggle outlines. These UI requests do not
change the review state of the chapter prose.

After review: promote only accepted hidden chapters, regenerate and verify all
24 routes, sign the exact release changes, and check the provider's required
checks. Use the existing protected PR → main → GitHub Pages path. After release,
verify the deployed SHA, public routes, search, metadata, and media.

## writing session checklist before the full draft: September 7, 2026

This checklist supersedes stale next actions in the earlier audit. It describes
authorship and remaining work, separately from deployment. Ani asked to apply
the writing session's answers and candidate prose to the site. That authorizes
the targeted amendments below; it does not approve neighboring agent drafts.

Legend: ✅ preserve; 🟦 supplied by Ani and applied with editorial help;
🟨 existing draft to vet; ⬜ writing still to develop. A preserved passage needs
no unsolicited rewrite. A new polish can still receive Ani's wording corrections.

| Status | Section | What is established | What remains |
| --- | --- | --- | --- |
| ✅ Preserve | Homepage title, introduction, and “why i made this” | Ani's original wording restored after rejecting the two additions; unchanged in this pass. | Leave alone unless Ani requests a specific change. No review of removed text remains. |
| ✅ Preserve | Codex overview image and caption | Ani supplied the image and directed placement/caption. | Keep the asset and wording; neighboring prose has separate provenance. |
| 🟦 Applied | Grok introduction: limited use, X replies, social context, claws, ecosystem | Raw manual writing plus explicit answers now polished. Joke and limited-use framing retained. “xapi” resolved to X API; ecosystem affinity replaces a technical infrastructure claim. | Quick read for the new phrasing. No need to repeat the answers. This does not establish use of every comparison product. |
| 🟦 Applied | Personification paragraph on each overview | Ani explicitly supplied the comparison and asked to apply the candidate. Names and appearance examples remain attributed to his observation. | Leave the underlying opinion alone; refine wording only from Ani's feedback. |
| 🟦 Applied | Codex extensions: “give work its own context” | Ani's coordinator example is now the main paragraph, with a short overview introduction and link. | Review the agent-written explanation of subagents, status, return updates, and source modification around the example. No further personal anecdote needed for the core point. |
| 🟦 Applied | Claude extensions: reason for interest in Function Hooks | Ani's interest in changing the harness now introduces the proposal. | Vet the pre-existing technical discussion and any remaining claims about his own defaults. |
| 🟨 Vet | Grok: “grok bot puts the computer beside the conversation” | Zoom analogy and takeover actions came from Ani. Existing polished paragraphs and shared-computer explanation were authored by an agent. | Read the three subsections: swipe, takeover, shared computer. This is the next continuous manual review point. |
| 🟨 Vet | Codex and Claude overviews, outside the new personal paragraphs | Existing surfaces, architecture, remote/mobile, and product-boundary prose remains a draft for human review. | Check first-person claims against actual experience. Current metadata or previous publication does not establish acceptance. |
| 🟨 Vet | Codex and Claude extensions already written | Instructions, skills, MCP, Codex coordination, and Claude hooks now have substantive prose. | Vet explanations and defaults. Function Hooks experiment is explicitly agent-run; model/tool interception remains untested. |
| 🟨 Vet + ⬜ develop | Configuration and recommendations for all three products | All six pages have text; Codex/Claude pages are excerpts, Grok pages are brief source summaries. | Establish Ani's actual defaults, reasons to switch, and useful limits. Research product facts independently. Grok recommendations must retain limited-use scope. |
| 🟨 Vet | Shared operating guide and choosing a setup | Existing prose; operating title and first two sections include older unapproved agent rewrites. | Ani vets those changes and the rest of the shared guidance. Preserve rather than assume the earlier rewrite was accepted. |
| 🟨 Vet | History and method/sources | Existing chronology, setup/market context, and editorial-process claims. | Refresh dated sources/media support; confirm the checking process described actually happens. |
| ⬜ Develop | Codex: event hooks, packaging, composing extensions | Candidate topics in the blueprint; substantive sections not yet written. | Choose a useful event/example, explain packaging, and show how pieces fit only where reader needs justify it. |
| ⬜ Develop | Claude: delegation, packaging, composing extensions | Candidate topics remain in the blueprint. | Explain task boundaries and returned results, then packaging/precedence. A personal opinion is optional for a factual section. |
| ⬜ Start | Getting started, safety, workflows for Codex and Claude; shared credentials/access | Seven files are outlines, hidden from normal publication. | Choose which topics deserve standalone chapters, then write from experience and sources. Agent headings are suggestions. |
| ✅ Preserve scope | Archived Claude tools | Frozen compatibility material. | Compatibility verification near the documented cutoff; ordinary expansion is outside scope. |

### amendments applied in this pass

- Edited five canonical Markdown files: Grok overview, Codex overview and extensions, Claude overview and extensions. Homepage and unrelated drafts are unchanged.
- Raw Grok paragraph before polish is preserved verbatim in `~/.codex/skills/write-with-ani/references/voice-and-calibration.md` under “Grok: raw manual writing”; subsequent dictation remains below in this ledger. That reference is a historical raw sample, not the current question list.
- The historical manual boundary was the paragraph ending “X dominant influencer/creator/voice.” The replacement ecosystem paragraph now ends “the broader X and xAI ecosystem.” Ani's direction also authorizes the new personification aside. The following H2, “grok bot puts the computer beside the conversation,” remains the next unreviewed block.
- Changed the broad audience-expectation claim into Ani's product comparison, omitted the unsupported claim of a surge in attention, and made the “claws” claim explicitly tentative. Preserved the named products and point of the comparison.
- Corrected the Claude experiment attribution from “i tested” to “an agent run for this guide tested.” Original rejected attribution: “on September 5, 2026, i tested the preview path with Claude Code `2.1.261` using a disposable HOME”. This was agent prose, never evidence that Ani performed the test.
- Registered new primary sources for Bot profiles, X API, Grok/SuperGrok, and Codex open source components. Source checks do not certify personal experience or all other claims in the pages.
- Delivery: canonical local changes for the normal preview. This pass does not publish the outstanding collection of unreviewed drafts.
- Verification: content checks passed with zero Astro diagnostics and 88 registered sources; build and site checks passed for 17 canonical routes. Browser inspection confirmed the amended passages on all five routes; the four Codex/Claude routes had no horizontal overflow in the inspected viewport. Homepage is still identical to HEAD. Normal Grok preview refreshed after restarting the stale development server.

## agent audit snapshot

Audit date: September 7, 2026. This is an agent review of all 15 public routes
and all 101 public H1, H2, and H3 blocks. It does not change any manual review
state or stand in for Ani's wording approval.

| Route | Blocks | Accuracy and currency | Repetition and voice | Links, media, and presentation | Next editorial pass |
| --- | ---: | --- | --- | --- | --- |
| `/` | 2 | Personal claims are clearly framed. Product links are registered; the two X links are Ani-directed cultural examples. | Preserve Ani's original wording. Ani rejected the unsolicited additions on September 7; both passages were restored to the committed original. | Link checks pass. No media. | No homepage rewrite pending; change wording only with explicit direction. |
| `/handbook/operating-agents/` | 10 | Foundation sources are current enough for this batch; AGENTS.md, CLAUDE.md, and Git worktree behavior were rechecked September 7. | Repeats repository, evidence, authority, and handoff ideas found in both provider overviews. Keep this page as the short shared rule and make the provider chapters carry product-specific behavior. | Link checks and tables pass. No media is required for the first pass. | Batch 1 covers the title and first two sections. |
| `/handbook/choosing-a-setup/` | 8 | The dated OpenAI and Cursor contract claim needs another check near its proposed November cutoff. Hardware guidance is intentionally qualitative. | Clear evidence voice; several setup rows need more firsthand examples before approval. | Link and table checks pass. No media. | Recheck the dated contract, then review the practical default with Ani. |
| `/handbook/history/` | 2 | Primary sources support the chronology; every dated event still needs a dedicated freshness pass before approval. | Personal framing is clear and the timeline avoids pretending to be exhaustive. | Links pass. Remote paper and provider images need a final license, attribution, and failure-fallback review. | Source and media provenance pass. |
| `/handbook/method-and-sources/` | 5 | The evidence labels match the registry. The stated weekly checking process needs confirmation against the actual automation before approval. | Concise and distinct from the guide content. | No inline sources or media; the page relies on the rendered source list. | Verify the real checking workflow, then Ani reviews the trust language. |
| `/guides/codex/` | 18 | Broad current surface claims were checked August 30 and need routine refresh as the product changes. | Strong firsthand material, with repeated repository and authority guidance that should defer to the operating foundation. | Links pass. The single Ani-owned introduction image is recorded and placed correctly. | Refresh product facts, then trim shared guidance without losing personal examples. |
| `/guides/codex/configuration/` | 9 | The page was updated after its last checked date, so its metadata and current settings claims need a new source pass. | Useful taxonomy but still an excerpt; it needs a real configuration example. | Links pass. No media. | Recheck current settings and add one inspected configuration example. |
| `/guides/codex/recommendations/` | 6 | Product links are current enough for navigation, but the recommendations need a paired current workflow test. | Personal framing is thin relative to the overview. | Links and definition rows pass. No media. | Add firsthand defaults and a concrete parallelism failure mode. |
| `/guides/claude-code/` | 18 | Official sources were checked August 30; paired hands-on testing remains explicitly open. | Strong personal premise, with the same shared repository and authority repetition as the Codex overview. | Links pass. Local provider derivatives are recorded in the publication manifest. | Refresh capabilities, then keep only Claude-specific behavior and firsthand experience. |
| `/guides/claude-code/configuration/` | 8 | The page was updated after its last checked date and explicitly depends on an unfinished paired test. | Too thin to carry the current title and description confidently. | Links pass. No media. | Run the paired configuration test and expand only from receipts. |
| `/guides/claude-code/recommendations/` | 6 | Source-based starting points are labeled honestly; current workflow evidence is still missing. | The page states defaults more than it explains Ani's actual choices. | Links and definition rows pass. No media. | Add firsthand surface-switching evidence after the paired test. |
| `/guides/grok/` | 2 | Current capability claims were checked in August and need a fresh xAI documentation pass. Hands-on evidence remains thin and visible. | Concise source voice is appropriate until Ani has more direct use. | Links pass. Two local provider images are recorded, but the page should confirm both earn their space. | Refresh sources and choose one strongest visual before a deeper draft. |
| `/guides/grok/configuration/` | 2 | Settings and permission claims need a current source and runtime pass. | Clear but still a source summary. | Links and table pass. No media. | Test `grok inspect` in an isolated project before expanding. |
| `/guides/grok/recommendations/` | 2 | Recommendations are explicitly provisional because firsthand evidence is limited. | Honest boundary, but the second paragraph repeats the site's general reversible-task guidance. | No media or inline link issues. | Wait for hands-on receipts, then make the recommendation specific. |
| `/archive/claude-code-tools/` | 3 | Frozen compatibility scope is clear. Install paths and the promised final tag need verification near November 5. | Appropriate frozen voice. | Code block and redirects pass. No new media. | Compatibility verification only; avoid ordinary editorial expansion. |

## locked media policy

### Grok interface screenshot and optional crash course: September 7

- Ani requested the crash-course invitation outside article prose. Removed it from all three product overviews; on those overviews the shared link now lives in the desktop guide rail and mobile guide menu footer. Other chapters retain access through handbook navigation. This layout change conveys no wording acceptance.
- Ani requested real Grok UI instead of the two company promotional images. Removed those presentations, retaining their registered files and provenance for reference.
- Used Will Oldgram's (@old_pgmrs_will) August 31 mobile Grok Bot screenshot through the official X embed: https://x.com/old_pgmrs_will/status/2094265782054367651. Fresh inspection of the official embed and syndication data confirmed a still image, Japanese trackpad menu, cursor, and virtual desktop/file manager. This is third-party media, not Ani's capture or a recording of the complete handoff.
- Placement: under “cooperative computer use,” before the accepted “computer view” body. The embed retains X's post presentation, visible source credit and a direct fallback link; no image file is rehosted. The embed loads lazily, reserves responsive space, disables autoplay, and only accepts height updates from its own official X frame. Ani's own capture could later replace the post wrapper with the site's usual image-only viewer.
- The accepted Zoom body and the two explicit fingertip/phone-keyboard revisions remain unchanged. Media placement does not approve neighboring prose.
- Local checks: content/source registry, UI ownership, eight editorial inventory tests, build, 17 canonical route checks, agent surfaces, navigation, and unchanged performance budgets passed. Chromium checks covered 319/375/768/1440 pixels in both themes; WebKit covered 319/768. Verified the actual X screenshot, navigation/hash behavior, collapsed-rail keyboard access, bounded iframe resizing, and credited fallback with X blocked or JavaScript disabled. The full sweep initially reached X's image link during loading and reported an unnamed link. The accessibility check now waits for the external screenshot and fonts to load, while continuing to audit the complete iframe. Grok then passed all nine required widths in both themes. Receipt: `/tmp/handbook-grok-closure.json`; screenshots: `/tmp/grok-nav-media/` and `/tmp/grok-nav-media-webkit/`.
- Final accessibility verification also passed across all 17 routes, nine widths, and both themes (306 route/viewport/theme cases): `/tmp/handbook-grok-a11y-verified.log`. The separate full Lighthouse audit remains part of launch preparation; this change passed the existing asset and compressed-output budgets without raising them. Whole-page editorial acceptance and publication remain pending.

### Grok Bot mobile recording search: September 7

- Requested placement: beside “swipe from the chat into the computer” / “take over, then hand it back.” Desired evidence is a real mobile recording showing chat, computer view, cursor/keyboard takeover, and return to the Bot.
- Searched xAI product/docs pages, web-indexed Reddit and X results, and X video search. No recording of the exact mobile handoff was verified in this pass. No substitute media was added to the article.
- Official broader launch trailer: https://x.com/bot/status/2087224798078517251 and the player on https://x.ai/bot. The player was found; the exact mobile sequence was not verified. Keep as a candidate, not a verified mobile walkthrough.
- Will Oldgram (@old_pgmrs_will): https://x.com/old_pgmrs_will/status/2094265782054367651. Browser inspection confirmed a still image and text about mobile trackpad mode, not a recording. Could support a future credited screenshot reference, but does not fulfill the video request.
- Fallback offered: record Ani's own 20–30 second mobile demonstration via a USB-connected iPhone in QuickTime (File > New Movie Recording > select iPhone as Camera), or iPhone Screen Recording followed by AirDrop. Apple reference: https://support.apple.com/en-ie/guide/quicktime-player/qtp356b55534/mac.
- Capture sequence: Bot conversation, swipe to computer, show browser action, take control and type harmless text, hand control back. Use a demo task with nonprivate content. No recording has started; phone connection and capture remain to be done with Ani.

- Ani-owned assets may be stored locally and optimized for the site.
- Third-party media from X defaults to an official lazy embed or a link to the original post.
- Never rehost third-party media without permission or a compatible license.
- Show the creator's visible name, `@handle`, and original source link with a natural shoutout that does not imply affiliation.
- Every desired visual remains pending until its ownership, source, permission, and presentation are recorded in this ledger.

## 1. handbook foundation

### `/`

Source: `content/home.md`

| Block | State | Wording and personal insight | Evidence or source needs | Desired media | Attribution or permission | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| H1: a casual guide to coding agents in production software (projects, startups & big tech) | unreviewed | Original title and introduction restored. Ani rejected the added personal paragraph on September 7. | Preserve the original claims. | No media currently requested. | Not applicable. | Preserve Ani's wording; no review of the removed addition is pending. |
| H2: why i made this | unreviewed | Original section restored. Ani rejected the unsolicited rewrite on September 7. This correction does not imply approval of the full block. | Product links pass the registry check. The two X links are Ani-directed cultural examples, not technical evidence. | No media currently requested. | Original links are present. | Preserve Ani's wording and browser-directed links; no review of the removed ending is pending. |

### `/handbook/operating-agents/`

Source: `content/handbook/operating-agents.md`

| Block | State | Wording and personal insight | Evidence or source needs | Desired media | Attribution or permission | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| H1: working with coding agents | in progress | Replaces the abstract title with conventional language and frames the page around Ani's three recurring operating questions. | Page-level sources refreshed September 7. | No media currently needed for this introductory block. | Not applicable. | Ani reviews the title and three-question framing. |
| H2: start with the repository | in progress | Removes the implication that every task must begin on GitHub. Keeps the repository as the inspectable destination for software work and makes agent files concise routing layers. | OpenAI AGENTS.md, Anthropic CLAUDE.md, and Git worktree documentation checked September 7. | A small owned repository-to-agent routing diagram may help later, but is not needed for this wording review. | Ani-owned if created later. | Ani reviews the heading, checklist, and canonical-file recommendation. |
| H2: separate guidance from enforcement | in progress | Adds concrete CI and secret-handling examples while keeping the judgment-versus-enforcement distinction. | The examples are architectural guidance; current runtime details remain in provider pages. | No media currently needed. | Not applicable. | Ani reviews whether the examples match how he wants to teach the distinction. |
| H2: use evidence to resolve uncertainty | unreviewed | Check wording and add or preserve Ani's experience. | Audit claims and source coverage. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H2: isolate work by ownership | unreviewed | Check wording and add or preserve Ani's experience. | Audit claims and source coverage. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H2: keep the main thread clean | unreviewed | Check wording and add or preserve Ani's experience. | Audit claims and source coverage. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H2: preserve human control at the right boundary | unreviewed | Check wording and add or preserve Ani's experience. | Audit claims and source coverage. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H2: verify completion | unreviewed | Check wording and add or preserve Ani's experience. | Audit claims and source coverage. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H2: hand off durable state | unreviewed | Check wording and add or preserve Ani's experience. | Audit claims and source coverage. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H2: review the whole system | unreviewed | Check wording and add or preserve Ani's experience. | Audit claims and source coverage. | Decide during review. | Pending if media is added. | Ani reviews block. |

## 2. Codex

### `/guides/codex/`

Source: `content/guides/codex.md`

| Block | State | Wording and personal insight | Evidence or source needs | Desired media | Attribution or permission | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| H1: codex | unreviewed | Check page framing with Ani. | Audit page-level official sources and checked date. | Keep the page visually selective. | Pending for any added media. | Ani reviews title and page premise. |
| H2: this is codex | unreviewed | Direct browser feedback fixed placement and caption, but did not approve the prose. | Recheck current OpenAI surface claims. | Keep one Ani-owned screenshot directly below this heading. | Ani-owned; local asset and requested caption are present. | Ani reviews prose and confirms final crop/caption. |
| H3: one engineering loop, several control rooms | unreviewed | Preserve firsthand operating model. | Separate personal analysis from product facts. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: the task can be its own workspace | unreviewed | Check whether this matches Ani's actual use. | Verify productless-task behavior if stated as fact. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H2: where codex lives | unreviewed | Check taxonomy and current product naming. | Refresh all current surface and feature claims. | Consider one official visual only if it clarifies the map. | Use official embed/link or licensed asset. | Ani reviews block after source refresh. |
| H3: terminal and editor keep the evidence close | unreviewed | Preserve Ani's preference and concrete examples. | Verify CLI and editor facts. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: desktop coordinates parallel work | unreviewed | Preserve firsthand desktop workflow. | Verify desktop feature claims. | Ani-owned workflow capture may help. | Ani-owned only unless an official source is used. | Ani reviews block and media need. |
| H3: cloud and mobile change where you steer | unreviewed | Check claims against Ani's actual remote workflow. | Refresh cloud and mobile documentation. | Prefer official lazy embed/link if needed. | Record creator/source if third party. | Ani reviews block. |
| H2: the interface is not the whole system | unreviewed | Check the interface/interaction-layer distinction. | Source product facts; label analysis clearly. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: the interface changes what you can see | unreviewed | Add or preserve a concrete Ani example. | Audit claims and source coverage. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: the interaction layer changes what codex can reach | unreviewed | Check this model against Ani's setup. | Verify instructions, tools, and access claims. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H2: controlling codex across devices | unreviewed | Check section framing with Ani. | Refresh remote-control facts. | Prefer official lazy embed/link if useful. | Record creator/source if third party. | Ani reviews block. |
| H3: steering is different from hosting | unreviewed | Preserve practical distinction and firsthand examples. | Verify Remote behavior. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: local, remote, and cloud execution are different | unreviewed | Check terminology against Ani's actual environments. | Refresh local, SSH, Remote, and cloud distinctions. | A simple owned diagram may help. | Ani-owned if created locally. | Ani reviews block. |
| H3: mobile keeps the control loop close | unreviewed | Preserve direct mobile-use observations. | Verify current mobile capabilities. | Official lazy embed/link or Ani-owned capture. | Record source and permission. | Ani reviews block. |
| H2: start with what you are trying to finish | unreviewed | Check the artifact-first framing. | Refresh ChatGPT Work boundary claims. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: code should end in the repository | unreviewed | Preserve this as Ani's recommendation. | Distinguish recommendation from product requirement. | No media currently needed. | Not applicable. | Ani reviews block. |
| H3: ChatGPT Work begins with a finished deliverable | unreviewed | Check naming, casing, and Ani's intended distinction. | Refresh official ChatGPT Work source. | Decide during review. | Pending if media is added. | Ani reviews block. |

### `/guides/codex/configuration/`

Source: `content/guides/codex/configuration.md`

| Block | State | Wording and personal insight | Evidence or source needs | Desired media | Attribution or permission | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| H1: configuration | unreviewed | Check page framing with Ani. | Audit page-level official sources. | Decide during review. | Pending if media is added. | Ani reviews title and premise. |
| H2: configuration has separate jobs | unreviewed | Check taxonomy against Ani's practice. | Verify current configuration model. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: AGENTS.md explains the repository | unreviewed | Preserve real repository examples. | Verify precedence and scope claims. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: config.toml chooses defaults | unreviewed | Check examples against Ani's configuration. | Refresh official config reference. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H2: permissions are two different questions | unreviewed | Check the distinction in Ani's words. | Verify sandbox and approval behavior. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: the sandbox defines reach | unreviewed | Add or preserve a concrete boundary example. | Verify current sandbox options. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: approval policy defines interruption | unreviewed | Add or preserve a concrete workflow example. | Verify current approval policies. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H2: keep identity and secrets outside the repository | unreviewed | Check recommendation and personal practice. | Support security claims with primary sources. | No media currently needed. | Not applicable. | Ani reviews block. |
| H3: credentials belong in external storage | unreviewed | Check tooling references against Ani's setup. | Verify credential-management claims. | Decide during review. | Pending if media is added. | Ani reviews block. |

### `/guides/codex/recommendations/`

Source: `content/guides/codex/recommendations.md`

| Block | State | Wording and personal insight | Evidence or source needs | Desired media | Attribution or permission | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| H1: recommendations | unreviewed | Make Ani's opinion boundary explicit. | Audit page-level sources. | Decide during review. | Pending if media is added. | Ani reviews title and premise. |
| H2: my default codex setup | unreviewed | Preserve concrete personal defaults. | Source product facts inside the recommendation. | Ani-owned setup capture may help. | Ani-owned if captured locally. | Ani reviews block. |
| H2: when i switch surfaces | unreviewed | Check against Ani's actual switching behavior. | Verify surface capabilities. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: the review surface follows the evidence | unreviewed | Preserve as a clear personal rule. | Separate analysis from factual claims. | No media currently needed. | Not applicable. | Ani reviews block. |
| H2: what i would avoid | unreviewed | Keep specific and experience based. | Source any product claims. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: parallelism that outruns review | unreviewed | Add or preserve a concrete failure mode. | Separate observation from general claim. | Decide during review. | Pending if media is added. | Ani reviews block. |

## 3. Claude Code

### `/guides/claude-code/`

Source: `content/guides/claude-code.md`

| Block | State | Wording and personal insight | Evidence or source needs | Desired media | Attribution or permission | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| H1: claude code | unreviewed | Check page framing with Ani. | Audit page-level official sources and checked date. | Keep the page visually selective. | Pending for any added media. | Ani reviews title and premise. |
| H2: this is claude code | unreviewed | Check definition in Ani's voice. | Refresh current Anthropic product claims. | Consider one purposeful visual. | Official embed/link or licensed asset. | Ani reviews block. |
| H3: one engineering loop, several interfaces | unreviewed | Check comparison against Ani's use. | Separate analysis from official facts. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: the repository gives the task its shape | unreviewed | Preserve concrete repository experience. | Audit claims and source coverage. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H2: where claude code lives | unreviewed | Check taxonomy and current naming. | Refresh surface and feature claims. | Consider one official visual only if clarifying. | Use official embed/link or licensed asset. | Ani reviews block after source refresh. |
| H3: terminal and IDE keep the evidence close | unreviewed | Preserve firsthand workflow. | Verify terminal and IDE facts. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: desktop coordinates parallel work | unreviewed | Check against Ani's actual desktop use. | Verify desktop capabilities. | Ani-owned capture may help. | Ani-owned only unless official source is used. | Ani reviews block. |
| H3: web, mobile, and Remote Control change where you steer | unreviewed | Check claims against Ani's real workflow. | Refresh web, mobile, and Remote Control docs. | Prefer official lazy embed/link if needed. | Record creator/source if third party. | Ani reviews block. |
| H2: the interface is not the whole system | unreviewed | Check interface/interaction-layer framing. | Source product facts; label analysis. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: the interface changes what you can see | unreviewed | Add or preserve a concrete Ani example. | Audit claims and source coverage. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: the interaction layer changes how claude code behaves | unreviewed | Check this model against Ani's setup. | Verify instruction, tool, and memory claims. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H2: controlling claude code across devices | unreviewed | Check section framing with Ani. | Refresh remote-control facts. | Prefer official lazy embed/link if useful. | Record creator/source if third party. | Ani reviews block. |
| H3: steering is different from hosting | unreviewed | Preserve practical distinction. | Verify current hosting behavior. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: web and Remote Control use different execution models | unreviewed | Check terminology against actual use. | Refresh execution-model sources. | A simple owned diagram may help. | Ani-owned if created locally. | Ani reviews block. |
| H3: mobile keeps the control loop close | unreviewed | Preserve direct mobile observations. | Verify current mobile capabilities. | Official lazy embed/link or Ani-owned capture. | Record source and permission. | Ani reviews block. |
| H2: start with what you are trying to finish | unreviewed | Check artifact-first framing. | Refresh Cowork boundary claims. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: code should end in the repository | unreviewed | Preserve as Ani's recommendation. | Distinguish recommendation from requirement. | No media currently needed. | Not applicable. | Ani reviews block. |
| H3: Cowork begins with a finished deliverable | unreviewed | Check naming and intended distinction. | Refresh official Cowork source. | Decide during review. | Pending if media is added. | Ani reviews block. |

### `/guides/claude-code/configuration/`

Source: `content/guides/claude-code/configuration.md`

| Block | State | Wording and personal insight | Evidence or source needs | Desired media | Attribution or permission | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| H1: configuration | unreviewed | Check page framing with Ani. | Audit page-level official sources. | Decide during review. | Pending if media is added. | Ani reviews title and premise. |
| H2: configuration has separate jobs | unreviewed | Check taxonomy against Ani's practice. | Verify current configuration model. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: CLAUDE.md explains the repository | unreviewed | Preserve real repository examples. | Verify precedence and scope claims. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: settings choose behavior | unreviewed | Check examples against Ani's setup. | Refresh official settings reference. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H2: separate instructions from memory | unreviewed | Check distinction in Ani's words. | Verify current instruction and memory behavior. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: shared rules have one canonical source | unreviewed | Preserve concrete maintenance experience. | Audit claims and source coverage. | No media currently needed. | Not applicable. | Ani reviews block. |
| H2: inspect the effective configuration | unreviewed | Add or preserve a concrete debugging example. | Verify current inspection methods. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: imports and precedence can hide the source | unreviewed | Check actual failure modes Ani has seen. | Verify import and precedence rules. | Decide during review. | Pending if media is added. | Ani reviews block. |

### `/guides/claude-code/recommendations/`

Source: `content/guides/claude-code/recommendations.md`

| Block | State | Wording and personal insight | Evidence or source needs | Desired media | Attribution or permission | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| H1: recommendations | unreviewed | Make Ani's opinion boundary explicit. | Audit page-level sources. | Decide during review. | Pending if media is added. | Ani reviews title and premise. |
| H2: my default claude code setup | unreviewed | Preserve concrete personal defaults. | Source product facts inside the recommendation. | Ani-owned setup capture may help. | Ani-owned if captured locally. | Ani reviews block. |
| H2: when i switch surfaces | unreviewed | Check against Ani's actual switching behavior. | Verify surface capabilities. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: the review surface follows the evidence | unreviewed | Preserve as a clear personal rule. | Separate analysis from factual claims. | No media currently needed. | Not applicable. | Ani reviews block. |
| H2: what i am still watching | unreviewed | Keep uncertainty concrete and current. | Refresh open product questions. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: current workflow features need a paired test | unreviewed | Check the proposed test against Ani's workflow. | Record test evidence and official sources. | Decide during review. | Pending if media is added. | Ani reviews block. |

### draft: `/guides/claude-code/extensions/`

Source: `content/guides/claude-code/extensions.md`

| Block | State | Wording and personal insight | Evidence or source needs | Desired media | Attribution or permission | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| H2: make events deterministic | in progress | New draft compares the five documented handler types and separates them from the Function Hooks proposal. Preserve Ani's interest in practical control and deeper agent extensibility. | Official hooks reference checked September 5. Isolated Claude Code 2.1.261 probe verifies flagged module validation, worker loading, and `session.start`; model and tool interception remain open tests. | A small owned event to handler to result diagram may clarify the mental model after Ani reviews the prose. | Ani-owned if created locally. | Ani reviews the full section, then chooses which real hook experience and experiment should become the personal example. |
| H3: hooks run code at defined moments | in progress | Keep the five handler comparison practical, explain Function Hooks through `$`, `event`, and `next`, and preserve the correction that the proposal PDF omits today's documented MCP tool handler. | Recheck the handler list, per-event support, proposal issue, and eventual official Function Hooks documentation. Add one real Ani hook or failure after review. | A small owned event to handler to result diagram or sanitized log capture may help after Ani reviews the prose. | Ani-owned if created locally; remove paths and identifiers before any public capture. | Ani reviews the draft, chooses the useful depth, and supplies or approves the firsthand example. |
| H3: failure should remain visible | in progress | Connect extensibility to observable load, decision, timing, and recovery state. | Exact 2.1.261 test boundary is recorded. Model and tool interception, final failure semantics, and a stable test harness remain open. | A future failure state capture could make this concrete. | Ani-owned or official source. | Ani reviews and adds a real failure mode if useful. |

## 4. Grok

### `/guides/grok/`

Source: `content/guides/grok.md`

| Block | State | Wording and personal insight | Evidence or source needs | Desired media | Attribution or permission | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| H1: grok | unreviewed | Check page framing and firsthand scope with Ani. | Refresh all current product claims. | Decide during review. | Pending if media is added. | Ani reviews title and premise. |
| H2: this is grok | in progress | Ani’s manual writing and subsequent answers polished at his explicit request; personification candidate applied. | X API and ecosystem meaning resolved. Product capabilities are sourced; naming details remain observations. | No new media requested. | Existing media policy applies. | Quick read of the amended wording; next continuous review begins at the following H2. |
| H2: grok bot puts the computer beside the conversation | unreviewed | Agent draft derived partly from Ani's dictation; outside his stated manual review boundary. | Keep user-reported interaction distinct from current documented behavior. | No new media requested. | Not applicable. | Resume only after the current introduction pass; no wording approval inferred. |
| H3: swipe from the chat into the computer | unreviewed | Zoom analogy and swipe experience came from Ani; the rendered wording came from an agent. | Exact gesture is user reported. | No new media requested. | Not applicable. | Ani has not reviewed this wording. |
| H3: take over, then hand it back | unreviewed | Takeover experience came from Ani; surrounding explanation remains an agent draft. | Preserve current source and personal-experience distinctions. | No new media requested. | Not applicable. | Ani has not reviewed this wording. |
| H3: each bot has a screen on the shared computer | unreviewed | Agent-authored technical explanation. | Verify the distinction from current primary sources when revising. | No new media requested. | Not applicable. | Ani has not reviewed this wording. |

### `/guides/grok/configuration/`

Source: `content/guides/grok/configuration.md`

| Block | State | Wording and personal insight | Evidence or source needs | Desired media | Attribution or permission | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| H1: configuration | unreviewed | Check page framing and limits with Ani. | Refresh all configuration claims. | Decide during review. | Pending if media is added. | Ani reviews title and premise. |
| H2: the current configuration map | unreviewed | Keep uncertainty and tested boundaries explicit. | Require primary sources plus hands-on evidence. | An Ani-owned capture may help after testing. | Ani-owned if captured locally. | Test, source, then Ani reviews block. |

### `/guides/grok/recommendations/`

Source: `content/guides/grok/recommendations.md`

| Block | State | Wording and personal insight | Evidence or source needs | Desired media | Attribution or permission | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| H1: recommendations | unreviewed | Make the limited opinion boundary explicit. | Refresh page-level sources. | Decide during review. | Pending if media is added. | Ani reviews title and premise. |
| H2: begin with the product boundary | unreviewed | Check recommendation against Ani's actual use. | Require current primary sources and tested behavior. | Decide during review. | Pending if media is added. | Test, source, then Ani reviews block. |

## 5. history

### `/handbook/history/`

Source: `content/handbook/history.md`

| Block | State | Wording and personal insight | Evidence or source needs | Desired media | Attribution or permission | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| H1: how coding agents got here | unreviewed | Check the story boundary and title with Ani. | Audit every dated event against primary sources. | Consider a selective timeline visual. | Use owned graphics; link original sources. | Ani reviews title and chronology. |
| H2: what i take from the timeline | unreviewed | Preserve Ani's interpretation and uncertainty. | Separate sourced history from personal analysis. | Decide during review. | Pending if media is added. | Ani reviews block after source audit. |

## 6. market

### `/handbook/choosing-a-setup/`

Source: `content/handbook/choosing-a-setup.md`

| Block | State | Wording and personal insight | Evidence or source needs | Desired media | Attribution or permission | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| H1: choosing a coding agent setup | unreviewed | Check market framing and intended reader with Ani. | Refresh product and hardware claims. | Decide during review. | Pending if media is added. | Ani reviews title and premise. |
| H2: choose the layer first | unreviewed | Check decision model against Ani's experience. | Audit claims and source coverage. | A simple owned comparison may help. | Ani-owned if created locally. | Ani reviews block. |
| H2: common setups | unreviewed | Add or preserve concrete real-world examples. | Refresh current product options. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H2: hardware and local analysis | unreviewed | Check scope and practical relevance. | Refresh hardware facts and dates. | Prefer official product links over rehosted media. | Record source and permission. | Ani reviews block after source refresh. |
| H3: memory | unreviewed | Check recommendation and tradeoffs. | Source hardware requirements and measurements. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: storage | unreviewed | Check recommendation and tradeoffs. | Source storage requirements and measurements. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H3: attention | unreviewed | Preserve this as an explicit human constraint. | Separate analysis from factual claims. | No media currently needed. | Not applicable. | Ani reviews block. |
| H2: a practical default | unreviewed | Make Ani's recommendation concrete and bounded. | Source facts inside the recommendation. | Decide during review. | Pending if media is added. | Ani reviews block. |

## 7. method

### `/handbook/method-and-sources/`

Source: `content/handbook/method-and-sources.md`

| Block | State | Wording and personal insight | Evidence or source needs | Desired media | Attribution or permission | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| H1: where this comes from | unreviewed | Check title and trust framing with Ani. | Confirm the page describes the real editorial process. | No media currently needed. | Not applicable. | Ani reviews title and premise. |
| H2: what i actually use | unreviewed | Preserve exact firsthand scope. | Ensure examples match current use. | Decide during review. | Pending if media is added. | Ani reviews block. |
| H2: how current claims get checked | unreviewed | Keep process concise and credible. | Verify it matches repository checks and source registry. | No media currently needed. | Not applicable. | Ani reviews block. |
| H2: how tested claims are recorded | unreviewed | Check whether the stated process is actually followed. | Compare against current evidence fields and receipts. | No media currently needed. | Not applicable. | Ani reviews block. |
| H2: what this does not settle | unreviewed | Preserve honest limits and uncertainty. | Confirm limitations are complete. | No media currently needed. | Not applicable. | Ani reviews block. |

## 8. archive

### `/archive/claude-code-tools/`

Source: `content/archive/claude-code-tools.md`

| Block | State | Wording and personal insight | Evidence or source needs | Desired media | Attribution or permission | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| H1: archived claude code tools | unreviewed | Review only for compatibility clarity; preserve frozen scope. | Verify security, data-loss, and installation-blocker facts only. | No new media planned. | Not applicable. | Ani reviews archive boundary. |
| H2: install paths that still work | unreviewed | Keep instructions minimal and compatibility focused. | Test only supported compatibility paths. | No new media planned. | Not applicable. | Verify compatibility, then Ani reviews. |
| H2: what happens next | unreviewed | Check sunset wording and dates with Ani. | Verify current compatibility-window date. | No new media planned. | Not applicable. | Ani reviews block. |


## integration follow-up: September 7, 2026

- Owner: `handbook` task `01a0732a-9d13-77b0-9c4e-95fd13d35689`.
- Editorial recovery: native `archive-cleanup` snapshot `8f55fe8d482c8f37e95abf4d35bf464c738a43ee` preserved the six uncommitted files from former `fed7`. Restored to `~/Projects/worktrees/coding-agent-tips-editorial` on unchanged branch head `6f1d025`. Every recovered file and the complete patch matched the snapshot before this follow-up was added. The original patch is retained beside the worktree as `coding-agent-tips-editorial-recovery.patch`.
- Current review: Ani rejected the two homepage additions on September 7; `content/home.md` is restored exactly to branch HEAD. The other three foundation blocks remain unapproved local drafts. The 15-route, 101-block audit is an agent audit, not authorization to rewrite; no manual review states were promoted.
- ASCII proposal: Ani rejected the entire animation on September 7. PR #315 is closed and its preview stopped by the coordinating task. There is no pending ASCII review, revision, integration, or release. Retain historical source only; do not revive it without a new explicit request.
- Independent performance findings: the completed comparison reported Codex guide LCP of 6908 ms on untouched main versus 6909 ms on the candidate, and warm provider switching of 272 ms versus 256 ms against a 100 ms target. These are existing handbook performance findings to prioritize separately. Verify current measurements before any repair. Evidence and commands remain in `~/.codex/worktrees/ascii-repair/PR315-receipt.md`.
- Editing workflow: on September 7 Ani rejected a separate copy review page and asked for direct editing. Edit canonical Markdown in Codex or through the existing GitHub edit links; use normal routes for preview and the existing protected PR and Pages pipeline for publication. No copy review interface is planned.
- Custody recheck, September 7: the completed mobile copy-review result from task `019fde30-e39a-7380-8519-03dc7d2c3e99` (titled `imessage-mcp`) is preserved in ancestor commit `dc34f5c`, including the mobile pane navigation, client behavior, responsive CSS, and regression test. Ancestor `f0b73b8` later removed the separate application. The former `fed7` directory is no longer a Git worktree. This is committed historical work, not an outstanding uncommitted implementation to restore. The six later dirty editorial files are separately preserved by the recovery snapshot and patch above. No files in the former worktree were changed during this recheck.

## requested continuation: September 7, 2026

- Scope: Ani requested Codex and Claude Code architecture and extensibility, with greater depth on Grok Bot. Existing homepage and shared operating guide wording were left untouched in this continuation.
- Architecture: added source backed app server explanation to the Codex overview and agent loop, extension roles, and permissions explanation to the Claude Code overview. These are local drafts; existing overview prose is retained.
- Extensions: filled the repository context, skills, and MCP sections in both canonical chapters. The existing Claude hooks draft is retained. These chapters now use the existing excerpt mode so substantive text appears on normal guide routes; unfinished headings remain in the blueprint. No manual review state is promoted.
- Grok Bot: Ani supplied the mobile Zoom comparison, swipe from conversation to computer, cursor and keyboard takeover, password entry, and return to the agent. The new section preserves that account and distinguishes each Bot's screen from the shared computer, using current xAI sources. Exact swipe and cursor behavior is Ani reported, not independently reproduced here.
- Source correction: OpenAI now documents `codex mcp-server` as deprecated and directs new integrations to app server. The new Codex extensions text records this distinction.
- Remaining chapter work: Codex event hooks, delegation, packaging, and composition; Claude delegation, packaging, and composition; firsthand examples and unresolved Function Hooks tests. These are chapter gaps, not a requirement for Ani to approve unsolicited rewrites.

## write with Ani calibration: September 7, 2026

- Artifact: `content/guides/grok.md`. Ani explicitly stopped at the paragraph ending **“X dominant influencer/creator/voice”**, immediately before `## grok bot puts the computer beside the conversation`. The earlier wording is not automatically approved for publication; every following section remains unreviewed, including agent-derived versions of earlier dictation.
- Covered in Ani's input: limited Grok use; exposure through X and replies; interest in the mobile computer experience; the Zoom analogy; cursor/keyboard takeover and return to the Bot.
- Clarified by Ani: “x/twitter and the xai ecosystem” is the intended infrastructure/social-income relationship. This establishes intended ecosystem framing, not shared technical infrastructure, a specific integration, or a revenue benefit. Replacement wording remains a candidate.
- Clarified by Ani: `xapi` means the X API for posts/platform data. The comparison is developing around his interest in browser access, agent coordination, and changing the harness; experience with each named product remains unestablished.
- Concrete example supplied: Ani uses one authoritative Codex task to track multiple projects, tasks, and contexts, improve instructions, and route work to the implementation tasks. This supplies the coordination example; it does not establish personal use of Cowork, ChatGPT Agent, or OpenClaw.
- Needs research: verify those external claims after their meaning is established; date any current product recommendations and distinguish them from personal opinion.
- Wording: raw edits preserved in the article. The partial sample in `$write-with-ani` is an unapproved demonstration, not a replacement or positive voice reference. Skill installation changes no public prose and grants no publication approval.
- Scope and completion: finish the introduction's intended point before expanding into later Grok sections. The existing blueprint remains a candidate coverage guide, not a mandatory syllabus.

### continued dictation: agent capabilities

Ani's direct wording, September 7 (raw, not polished or externally verified):

> creating new agents, archiving and messaging agents, reading thru other agents histories up to date to know realtime state, and also for example in codex an agent being able to edit any of the codex harness stuff and env / config etc etc since its open sourced, and for claude code its more limited as of rn but can possibly be more soon due to function hooks being proposed

- Intended coordination operations: create, archive, message, inspect history and current activity. His earlier “CRUD” does not establish an intent to permanently delete agents.
- Intended customization: instructions, environment, configuration, and potentially open harness implementation. Preserve his tentative enthusiasm about these being the best “claws.”
- Source check: OpenAI identifies CLI, SDK, and app server as open source; its IDE extension and cloud service are not open source (https://learn.chatgpt.com/docs/open-source). Configuration editing, source modification/rebuilding, and permissions to alter a running environment are separate capabilities.
- Source check: app server supports history reads and runtime status/events (https://learn.chatgpt.com/docs/app-server). A history snapshot alone does not prove continuously current state.
- Source check: Anthropic Function Hooks issue #91870 remains an open proposal (https://github.com/anthropics/claude-code/issues/91870). Possible deeper customization remains prospective; do not turn this into a broad unsourced claim that Claude cannot coordinate agents or change configuration.
- No article wording acceptance or publication follows from these answers. The Grok review boundary remains unchanged.

### continued dictation: coordinator and personification

Ani's direct wording, September 7 (raw; product claims require separate verification):

> being able to keep track of multiple different projects tasks and contexts in parallel by communicating and orchestrating other codex threads via one singular authoritative thread that doesnt do any code edits in a specific task but rather route better improved prompts messges commands instruyctions to the actual specific codex tasks and agents. grok bots can messsage each other too and theyre much more personified in the xai world thats a big point i wanna make is that on the spectrum of personification anthropomorphism, ironically anthropic's claude is the least lifelike and codex is in the middle but grok is near the highest in terms of the company truing to humanize personify the agents so you can customize agents with icons shapes colors and they are given defualt names directly, whereas in Codex and Claude Code, different agent, different agent independent tasks are just named based off of like an AI generated summary of your initial prompt. But in Codex, sub agents are given names by default that are like based on personified like human real names or whatever whatever like Casper, you know Socrates. They could be like fucking random names. The point is Claude doesn't really have that sort of paradigm. It just uses. You know, like if it makes a subagent, it'll just call it like reviewer one, reviewer two, infra reviewer, infra engineer, something like that. Whereas, you know, so that's why I want to make a point to explain the spectrum and on each independent independent models page, sort of I denote where they are in the spectrum, where I'd say in my opinion, without making it such a huge specific deal like it's like source of fact, but more so a unique observation that I've noticed.

- Personal experience: coordinator task keeps context across projects, improves prompts, and routes instructions to implementation tasks; code editing stays in those implementation tasks. Enough material for a concrete coordination paragraph without requiring another anecdote.
- Personal observation: Claude Code feels least personified, Codex sits in the middle, and Grok Bot feels most personified among these products. Preserve the Anthropic irony and the random-name humor. Describe Ani's impression of presentation, not a measured ranking, model capability, or established corporate intent.
- Requested placement: coordinator example in Codex coordination/extensibility; brief product-specific observations in each overview. Avoid a new taxonomy, scored graphic, or repeating the entire comparison on every page.
- Source check, September 7: https://docs.x.ai/grok-bot/bots documents editable name, title, description, avatar and an initial name of “New Agent”; https://docs.x.ai/grok-bot/overview documents Bot messaging and independent coordination. Specific shapes/colors and automatically assigned personal names remain Ani-reported, not independently reproduced.
- Source check, September 7: https://code.claude.com/docs/en/sub-agents supports custom names and named runtime agents. Role-style examples describe Ani's experience, not a naming restriction. https://learn.chatgpt.com/docs/agent-configuration/subagents also distinguishes configured agent roles; do not conflate these with UI display names or task titles. Casper/Socrates remain Ani's reported examples.
- Next step: review the candidate wording for the coordinator example and short personification observation. No additional personal input is required to draft these points. Candidate wording remains unapproved; no public article changes or review-boundary advancement from this dictation.

## live writing map

### next writing milestone: six core pages

Plan requested September 7, 2026. This is proposed work order, not wording
acceptance or permission to promote hidden chapters. Work in canonical Markdown
and inspect each section through its normal route and the live map.

1. **Grok overview.** Resume at `taking-control`, then review `shared-computer`
   and the earlier introduction/personification candidates. Preserve the two
   accepted Zoom paragraphs. Finish with a clear distinction between the visible
   computer experience and the documented shared computer, plus Ani's limited
   use and ecosystem interest. A mobile recording remains optional.
2. **Start here.** Review the short crash course and six practical questions.
   Keep enough context to act: a conversational first prompt, what the agent
   remembers, permission scope, coordination, checking a result, and resuming.
   Validate existing examples; consolidate repetition before adding more prose.
3. **Codex and Claude overviews.** Review one product at a time. Explain where
   work runs, what a task does, what to inspect, and the differences Ani actually
   notices. Preserve his media, joke, and adopted headings. Ask about a recent
   real workflow only where the current explanation needs personal context.
4. **Codex and Claude extensions.** Cover skills, connections, hooks, and agent
   coordination through one useful, reproducible example per chapter. Keep the
   supported feature, proposed feature, and Ani's judgment separate. Use his
   supplied coordinator description; ask only for missing details that change it.

These six pages are the next completion target, not six automatic approvals.
For each section: resolve its reader question, check changing facts from primary
sources, make the example and its limits clear, review candidate wording with
Ani, and record acceptance only for the exact span he accepts. A technical
explanation can be complete without a personal anecdote. The agent prepares
research, checks examples, and flags unsupported first person independently;
Ani receives one focused question or candidate section at a time.

After this milestone, review settings and recommendations against Ani's actual
defaults; finish the two first-task, workflow, and safety pairs plus credentials;
then reconcile shared setup, history, and method guidance. Hidden chapters stay
hidden until their individual content and wording review is complete. Preserve
the homepage and frozen archive. Run final publication and provider checks after
integration. The map derives current counts; this plan adds no manual totals.

Requested September 7: a read-only local map of current writing, review, provenance, media, examples, and links. The view at `/__progress/` reads the current Markdown and the exact records below on file changes. No public route or production assets are generated. Earlier ledger tables remain historical. This is the only structured acceptance record; generated counts are never maintained by hand.

The unclear “why am i repeating myself?” heading is now “why does my agent forget?” on the operating guide and Claude configuration page. Earlier fragments remain aliases. This is a candidate heading in response to Ani’s September 7 browser annotation; it does not approve the body.

<!-- live-map:start -->
```json
{
  "version": 1,
  "definitions": {
    "acceptance": "Exact body, heading, and whole-page acceptance are separate. Layout feedback is not wording acceptance.",
    "matching": "Unique exact content fingerprints survive renamed headings. Changed or ambiguous matches remain flagged. Heading aliases are ignored when fingerprinting body text."
  },
  "records": [
    {
      "id": "homepage-preserved-original",
      "file": "content/home.md",
      "status": "preserve",
      "match": "file",
      "hash": "d226dae5b9f915e44e59b59a0d4b18428a4e7bf81f657513fcc9256a26d89fe0",
      "origin": "ani-original-and-manual-edits",
      "date": "2026-09-07",
      "source": "editorial/review-ledger.md:106 Homepage is byte identical to the starting checkout",
      "note": "Leave the original wording alone as directed. Exact preservation is established; full-page wording approval, factual certification, and publication are not inferred."
    },
    {
      "id": "codex-original-caption",
      "file": "content/guides/codex.md",
      "anchor": "this-is-codex",
      "status": "preserve",
      "match": "quote",
      "hash": "60ed4b882d4a5448268f20c80c57e4cf28f672690b3667615321efafc2d723d8",
      "quote": "a screenshot of me working on some personal projects and some content for a brand deal.",
      "origin": "ani-supplied-caption",
      "date": "2026-09-07",
      "source": "editorial/review-ledger.md:108 Codex's original 3600 × 2260 screenshot and caption remain intact; editorial/review-ledger.md:270 Ani supplied the image and directed placement/caption",
      "note": "Applies to caption text only. Image ownership/preservation is recorded separately in public/media/publications/manifest.json; neighboring introduction prose is agent drafted."
    },
    {
      "id": "archive-preserve-scope",
      "file": "content/archive/claude-code-tools.md",
      "status": "preserve",
      "match": "file",
      "hash": "f83d1f5a764cc553567ccc13170576d676ef6b036d3252e5fd4c90a98adcb939",
      "origin": "frozen-compatibility-unknown-authorship",
      "date": "2026-09-07",
      "source": "editorial/review-ledger.md:34 Archived Claude tools: preserved compatibility text; preserve frozen scope",
      "note": "Preservation requirement and compatibility scope; no claim Ani authored or explicitly approved every sentence. Exclude from ordinary voice rewrite demand. On September 8 Ani requested moving this page into Claude Code navigation; only navigation.scope changed, and the compatibility prose remains identical."
    },
    {
      "id": "grok-computer-view-accepted-body",
      "file": "content/guides/grok.md",
      "anchor": "computer-view",
      "status": "accepted-body",
      "match": "body",
      "hash": "2179eff97bd4c2a13e43d4503e34f3ebc58a3e12a4e70d1beece994f3b7ae4fa",
      "origin": "agent-polish-of-ani",
      "date": "2026-09-07",
      "source": "editorial/review-ledger.md:196 Ani then answered “Keep this wording” to the complete two paragraph candidate",
      "note": "Exactly two paragraphs. Acceptance excludes the section heading, taking-control prose, shared-computer prose, and complete page."
    },
    {
      "id": "grok-cooperative-heading-adopted",
      "file": "content/guides/grok.md",
      "anchor": "cooperative-computer-use",
      "status": "adopted-heading",
      "match": "heading",
      "hash": "387d1bd5fb5f33167c504ad7886aef1706cf0d5c36d5d2246cceeecf44de2178",
      "origin": "ani-selected-heading",
      "date": "2026-09-07",
      "source": "editorial/review-ledger.md:205 i prefer something very direct and opinionated like \"cooperative computer use\"",
      "note": "Exact H2 chosen by Ani. Does not approve any child heading or body."
    },
    {
      "id": "claude-twenty-agents-heading-adopted",
      "file": "content/guides/claude-code.md",
      "anchor": "whos-running-twenty-agents",
      "status": "adopted-heading",
      "match": "heading",
      "hash": "ca48d8b040653683f44783343c078b8dc5a2cdb4535e8626a77b280a87cab788",
      "origin": "ani-selected-heading",
      "date": "2026-09-07",
      "source": "editorial/review-ledger.md:70 Ani specifically adopted “who's running twenty agents?”",
      "note": "Exact H3 chosen by Ani. Screenshot ownership and candidate caption are separate."
    },
    {
      "id": "grok-limited-use-and-replies",
      "file": "content/guides/grok.md",
      "anchor": "this-is-grok",
      "status": "grounded-candidate",
      "match": "quote",
      "hash": "dbf99465a94f247f42325e9c415609001f5ec9a401259e35a253661d6d8fcea0",
      "quote": "i use Grok drastically less than Codex and Claude Code, so these pages won't\ngive you the perspective of an extreme power user. for most of Grok's life,\ni've used it through the X app or watched people bring it into comment replies\nto argue with people who definitely don't go outside of their house ever.",
      "origin": "agent-polish-of-ani",
      "date": "2026-09-07",
      "source": "editorial/review-ledger.md:110 remain grounded in Ani supplied words; editorial/review-ledger.md:270 supplied by Ani and applied with editorial help",
      "note": "Meaning comes from Ani’s manual draft and direct answers; current wording is an agent polish. Applied is not exact wording acceptance. Product behavior requires separate factual support."
    },
    {
      "id": "grok-bot-comparison-and-claws",
      "file": "content/guides/grok.md",
      "anchor": "this-is-grok",
      "status": "grounded-candidate",
      "match": "quote",
      "hash": "3be785f815cc5171d74d265bde6ac8a8a3fd1bf694dbf14aca06aa83ffd4e2bd",
      "quote": "what interests me about Grok Bot is the polished mobile experience: chat with\nan agent, see the computer it's using, step in yourself, then hand it back.\nit brings to mind the promise of Claude Cowork, ChatGPT Agent, and\nespecially OpenClaw. i think of OpenClaw as an agent you give “claws” to.\nright now, a browser and the ability to coordinate other agents might be the\nmost useful claws: create them, message them, read their histories, check what\nthey're doing, and archive them when the work is done.",
      "origin": "agent-polish-of-ani",
      "date": "2026-09-07",
      "source": "editorial/review-ledger.md:110 remain grounded in Ani supplied words; editorial/review-ledger.md:270 supplied by Ani and applied with editorial help",
      "note": "Meaning comes from Ani’s manual draft and direct answers; current wording is an agent polish. Applied is not exact wording acceptance. Product behavior requires separate factual support. This is one mixed paragraph: Ani supplies interest/analogy and tentative usefulness; capability details are proposed/factually checked separately, not personal proof of testing all products."
    },
    {
      "id": "grok-x-ecosystem",
      "file": "content/guides/grok.md",
      "anchor": "this-is-grok",
      "status": "grounded-candidate",
      "match": "quote",
      "hash": "b08884b745da4c9716449868de6445c93bd89547ec12df407a33ef8cb7a75363",
      "quote": "if you're a creator, influencer, or voice making your living primarily on X,\nthere's also the appeal of working within the broader X and xAI ecosystem.",
      "origin": "agent-polish-of-ani",
      "date": "2026-09-07",
      "source": "editorial/review-ledger.md:110 remain grounded in Ani supplied words; editorial/review-ledger.md:270 supplied by Ani and applied with editorial help",
      "note": "Meaning comes from Ani’s manual draft and direct answers; current wording is an agent polish. Applied is not exact wording acceptance. Product behavior requires separate factual support."
    },
    {
      "id": "grok-social-context-personal-sentence",
      "file": "content/guides/grok.md",
      "anchor": "this-is-grok",
      "status": "grounded-candidate",
      "match": "quote",
      "hash": "3ee2d03475d42533140008af9035bb1e15057ef64840cfa016efcac0c5d27237",
      "quote": "i haven't had much personal need for real time social context.",
      "origin": "agent-polish-of-ani",
      "date": "2026-09-07",
      "source": "editorial/review-ledger.md:110 remain grounded in Ani supplied words; editorial/review-ledger.md:270 supplied by Ani and applied with editorial help",
      "note": "Personal sentence only; the adjacent Grok/SuperGrok recommendation and X API description are separately sourced agent prose."
    },
    {
      "id": "grok-personification-opinion",
      "file": "content/guides/grok.md",
      "anchor": "this-is-grok",
      "status": "grounded-candidate",
      "match": "quote",
      "hash": "aff471089f9fe1f87f50abfdbfae2f819b427f54c519046f85ca5d1d039f8724",
      "quote": "Grok Bot also feels the most personified to me out of these three products,\nwith Codex somewhere in the middle and Claude Code at the other end. the\nnames and customizable appearances make individual Bots feel more like\ncharacters. the icons, shapes, and colors i've seen are part of that\nimpression.",
      "origin": "agent-polish-of-ani",
      "date": "2026-09-07",
      "source": "editorial/review-ledger.md:110 remain grounded in Ani supplied words; editorial/review-ledger.md:270 supplied by Ani and applied with editorial help; editorial/review-ledger.md:620 Personal observation: Claude Code feels least personified, Codex sits in the middle, and Grok Bot feels most personified",
      "note": "Personal impression is grounded. Excludes adjacent sentences attributing capabilities to xAI docs. No corporate-intent or model-quality ranking established."
    },
    {
      "id": "codex-personification-opinion",
      "file": "content/guides/codex.md",
      "anchor": "this-is-codex",
      "status": "grounded-candidate",
      "match": "quote",
      "hash": "e97c6f625cc36ac932ea5fb67c46d5028b4a5e2570ca178c259ea201f82d93b9",
      "quote": "on the spectrum of how personified these products feel to me, Codex sits\nsomewhere between Claude Code and Grok Bot. the main tasks get descriptive\ntitles, but then i've seen a subagent show up named Casper or Socrates.\nsome fucking random names. that small detail gives the agents a bit of\npersonality alongside the work they're doing.",
      "origin": "agent-polish-of-ani",
      "date": "2026-09-07",
      "source": "editorial/review-ledger.md:110 remain grounded in Ani supplied words; editorial/review-ledger.md:270 supplied by Ani and applied with editorial help; editorial/review-ledger.md:620 Casper/Socrates remain Ani reported examples",
      "note": "Casper/Socrates and profanity are user-grounded. Exact polish and adjacent overview explanations do not acquire approval."
    },
    {
      "id": "claude-personification-opinion",
      "file": "content/guides/claude-code.md",
      "anchor": "this-is-claude-code",
      "status": "grounded-candidate",
      "match": "quote",
      "hash": "99db9701a4bf9fc31016cef9f59f4b7667f7cb4fe104ce2fd49065cd1048c3be",
      "quote": "ironically, Anthropic's Claude Code feels the least personified to me out of\nClaude Code, Codex, and Grok Bot. the agents i've seen tend to have names\ndescribing their jobs: reviewer, infra engineer, things like that.",
      "origin": "agent-polish-of-ani",
      "date": "2026-09-07",
      "source": "editorial/review-ledger.md:110 remain grounded in Ani supplied words; editorial/review-ledger.md:270 supplied by Ani and applied with editorial help; editorial/review-ledger.md:620 Role-style examples describe Ani experience, not a naming restriction",
      "note": "Excludes the adjacent externally sourced named-agents capability sentence."
    },
    {
      "id": "claude-personification-closing-opinion",
      "file": "content/guides/claude-code.md",
      "anchor": "this-is-claude-code",
      "status": "grounded-candidate",
      "match": "quote",
      "hash": "f0bca67e9e49562acfebc201880f95fc66079cb9c29f066c2b614fcaa03dae7c",
      "quote": "the role focused presentation is what stands out in my own use.",
      "origin": "agent-polish-of-ani",
      "date": "2026-09-07",
      "source": "editorial/review-ledger.md:110 remain grounded in Ani supplied words; editorial/review-ledger.md:270 supplied by Ani and applied with editorial help",
      "note": "Personal interpretation derived from Ani. The intervening named-agents sentence is factual agent prose with its own source."
    },
    {
      "id": "codex-coordinator-introduction",
      "file": "content/guides/codex.md",
      "anchor": "desktop-and-parallel-tasks",
      "status": "grounded-candidate",
      "match": "quote",
      "hash": "5a19b9065bd587df5f2e208d6987057c920c90531e693b3867666c6be0741cbd",
      "quote": "i use one authoritative Codex thread to keep track of multiple projects,\ntasks, and contexts running in parallel. it turns what i want into clearer\ninstructions and routes them to the right tasks. i explain that setup in\n[the delegation section](/guides/codex/extensions/#task-coordination-and-subagents).",
      "origin": "agent-polish-of-ani",
      "date": "2026-09-07",
      "source": "editorial/review-ledger.md:110 remain grounded in Ani supplied words; editorial/review-ledger.md:270 supplied by Ani and applied with editorial help; editorial/review-ledger.md:609 Intended coordination operations and harness customization; editorial/review-ledger.md:622 coordinator task keeps context across projects",
      "note": "User supplied perspective and authorized application. Preserve intended meaning; exact candidate wording remains reviewable. Surrounding technical explanation is a separate agent draft."
    },
    {
      "id": "codex-coordinator-core",
      "file": "content/guides/codex/extensions.md",
      "anchor": "task-coordination-and-subagents",
      "status": "grounded-candidate",
      "match": "quote",
      "hash": "73245e530543fecd61b1bb9bbec27a9740046196ce8c37e19c8a097f5d44e716",
      "quote": "i use one authoritative Codex thread to keep track of multiple projects,\ntasks, and contexts running in parallel. its job is to understand what's\nhappening across them, turn what i want into clearer prompts and instructions,\nand send those to the right tasks. the actual code edits happen in the\nindividual project tasks. that's a concrete example of why agents being able\nto communicate with other agents matters to me.",
      "origin": "agent-polish-of-ani",
      "date": "2026-09-07",
      "source": "editorial/review-ledger.md:110 remain grounded in Ani supplied words; editorial/review-ledger.md:270 supplied by Ani and applied with editorial help; editorial/review-ledger.md:609 Intended coordination operations and harness customization; editorial/review-ledger.md:622 coordinator task keeps context across projects",
      "note": "User supplied perspective and authorized application. Preserve intended meaning; exact candidate wording remains reviewable. Surrounding technical explanation is a separate agent draft."
    },
    {
      "id": "claude-function-hooks-interest",
      "file": "content/guides/claude-code/extensions.md",
      "anchor": "function-hooks-are-a-proposal",
      "status": "grounded-candidate",
      "match": "quote",
      "hash": "d205ceb7464fc1565b9a1078974ddd35cc151db8f39266ba1dd0178d733bf0c1",
      "quote": "i'm interested in how much an agent can change about its own setup, including\nthe harness around it. that's why the Function Hooks proposal caught my\nattention: it could expose more of Claude Code's internals to extensions.",
      "origin": "agent-polish-of-ani",
      "date": "2026-09-07",
      "source": "editorial/review-ledger.md:110 remain grounded in Ani supplied words; editorial/review-ledger.md:270 supplied by Ani and applied with editorial help; editorial/review-ledger.md:609 Intended coordination operations and harness customization; editorial/review-ledger.md:622 coordinator task keeps context across projects",
      "note": "User supplied perspective and authorized application. Preserve intended meaning; exact candidate wording remains reviewable. Surrounding technical explanation is a separate agent draft."
    },
    {
      "id": "codex-coordination-operations",
      "file": "content/guides/codex/extensions.md",
      "anchor": "what-should-a-subagent-do",
      "status": "grounded-candidate",
      "match": "quote",
      "hash": "59fb2f2de314dfbc4cb845be6f846934a5e420ece8ab2c967108049bbe9b82df",
      "quote": "the operations i'm interested in are concrete: create a task, message it,\nread its history, check its current activity, and archive it when the work is\ndone.",
      "origin": "agent-polish-of-ani",
      "date": "2026-09-07",
      "source": "editorial/review-ledger.md:607 creating new agents, archiving and messaging agents, reading thru other agents histories",
      "note": "Only the personal list of desired operations. Excludes adjacent app-server/history/status factual explanation."
    },
    {
      "id": "claude-tiktok-caption-candidate",
      "file": "content/guides/claude-code.md",
      "anchor": "whos-running-twenty-agents",
      "status": "grounded-candidate",
      "match": "quote",
      "hash": "801169b4b2ca25aa277be1808fb6381241e7914c971b4b20169a847324f77cde",
      "quote": "i did this for a TikTok and went through my five hour usage window in 15 minutes.",
      "origin": "agent-polish-of-ani",
      "date": "2026-09-07",
      "source": "editorial/review-ledger.md:95 Candidate caption, grounded in his direct account",
      "note": "Anecdote supplied by Ani; caption wording and media presentation still require his review. Does not establish a general Claude usage limit."
    },
    {
      "id": "grok-taking-control-next-review",
      "file": "content/guides/grok.md",
      "anchor": "taking-control",
      "status": "review-started",
      "match": "body",
      "hash": "cfbc721319f97c69b912382d5edb58cc4080e21460cdc95502d90aeed6c70c6e",
      "origin": "agent-polish-of-ani",
      "date": "2026-09-08",
      "source": "Ani browser comments September 8, 2026, comments 1 and 2: compare the current mobile interfaces and explain why watching the actual browser is easier to follow.",
      "note": "Candidate revised in response to direct feedback. Fingerprint tracks the new body awaiting review; it is not acceptance. Earlier candidate remains in ee3edeb. Exact fingertip and phone-keyboard revisions remain recorded separately."
    },
    {
      "id": "operating-prompt-review",
      "file": "content/handbook/operating-agents.md",
      "anchor": "what-should-i-ask-first",
      "status": "review-started",
      "match": "heading",
      "hash": "738a8b71ce28d18deb3456f1111d7e47c78b1b94941191c7644de55f5ae36c2e",
      "origin": "agent-draft-under-ani-direction",
      "date": "2026-09-07",
      "source": "editorial/review-ledger.md:78 This is task direction, not acceptance of the earlier example wording",
      "note": "Ani requested conversational prompts and visible good/bad examples. Implemented candidate remains unreviewed. Hypothetical examples establish no personal experience. Review remains open after Ani requested a shorter imperative example. This heading match tracks the review location; it accepts neither the title nor the body. The earlier body fingerprint remains in git 47997d6."
    },
    {
      "id": "operating-handoff-review",
      "file": "content/handbook/operating-agents.md",
      "anchor": "how-do-i-pick-this-up-later",
      "status": "review-started",
      "match": "body",
      "hash": "b9f1fc5c6b3acfefbb6db926d192fcb5872b6e50e93c8bcec007425567f52183",
      "origin": "agent-draft-under-ani-direction",
      "date": "2026-09-07",
      "source": "editorial/review-ledger.md:78 This is task direction, not acceptance of the earlier example wording",
      "note": "Ani requested conversational prompts and visible good/bad examples. Implemented candidate remains unreviewed. Hypothetical examples establish no personal experience."
    },
    {
      "id": "grok-fingertip-cursor-edit",
      "file": "content/guides/grok.md",
      "anchor": "taking-control",
      "status": "grounded-candidate",
      "match": "quote",
      "hash": "c05f23108f6aeaad1e11791e18956a3fe2a9def99246f698b700feb76d99e66d",
      "quote": "control the virtual mouse/cursor with your fingertip",
      "origin": "ani-direct-revision",
      "date": "2026-09-07",
      "source": "Response annotations to taking-control candidate: fingertip cursor control and phone keyboard.",
      "note": "Ani directly supplied this replacement for tap into cursor mode. This local revision does not establish acceptance of the surrounding body."
    },
    {
      "id": "grok-phone-keyboard-edit",
      "file": "content/guides/grok.md",
      "anchor": "taking-control",
      "status": "grounded-candidate",
      "match": "quote",
      "hash": "531155fd6114c61b4cad6b95b62140f5ad572f555e4d5858776382e73bd5e73a",
      "quote": "your\nphone's keyboard",
      "origin": "ani-direct-revision",
      "date": "2026-09-07",
      "source": "Response annotations to taking-control candidate: fingertip cursor control and phone keyboard.",
      "note": "Ani directly specified your phone’s in place of the before keyboard. Line wrapping is retained for exact matching. This local revision does not establish acceptance of the surrounding body."
    },
    {
      "id": "grok-takeover-observations-sept8",
      "file": "content/guides/grok.md",
      "anchor": "taking-control",
      "status": "grounded-candidate",
      "match": "body",
      "hash": "cfbc721319f97c69b912382d5edb58cc4080e21460cdc95502d90aeed6c70c6e",
      "origin": "agent-polish-under-ani-direction",
      "date": "2026-09-08",
      "source": "Ani browser annotations on Grok and Start here, September 8, 2026, comments 1–10.",
      "note": "Personal comparison and visual-following preference came from Ani comments 1 and 2. General remote capabilities have source support; absence of live mobile viewing across every rollout was not established from documentation."
    },
    {
      "id": "grok-shared-sessions-sept8",
      "file": "content/guides/grok.md",
      "anchor": "shared-computer",
      "status": "grounded-candidate",
      "match": "body",
      "hash": "f30f62ac48dc3ee932d6c5b70e1dbd388dec7db184db209914079837b7867559",
      "origin": "agent-polish-under-ani-direction",
      "date": "2026-09-08",
      "source": "Ani browser annotations on Grok and Start here, September 8, 2026, comments 1–10.",
      "note": "Ani comments 3 and 4 requested direct workspace wording and saved-login convenience. Primary docs specify per-Bot screens on one shared account computer, not a separate VM per Bot. Saved sessions are distinguished from a password manager and may expire."
    },
    {
      "id": "foundations-opening-sept8",
      "file": "content/handbook/operating-agents.md",
      "anchor": "_top",
      "status": "grounded-candidate",
      "match": "body",
      "hash": "001d995535ab485ff27fbd7ca7c13d6221b83f8dadcbe9c71dcf7279b612e5ec",
      "origin": "agent-polish-under-ani-direction",
      "date": "2026-09-08",
      "source": "Ani browser annotations on Grok and Start here, September 8, 2026, comments 1–10.",
      "note": "Ani comments 8 and 9 supplied the friend/genius comparison and requested descriptive links to prompt examples. This is candidate polish, not final wording acceptance."
    },
    {
      "id": "foundations-model-sept8",
      "file": "content/handbook/operating-agents.md",
      "anchor": "the-model",
      "status": "grounded-candidate",
      "match": "body",
      "hash": "0a41b1236013f624c42bf148c1ee7444be75d2607d86b06ebafedbad8fff5710",
      "origin": "agent-polish-under-ani-direction",
      "date": "2026-09-08",
      "source": "Ani browser annotations on Grok and Start here, September 8, 2026, comments 1–10.",
      "note": "Ani comment 10 requested separate model and harness explanations, starting with familiar product names. The ChatGPT app/model distinction was corrected from primary documentation."
    },
    {
      "id": "foundations-harness-sept8",
      "file": "content/handbook/operating-agents.md",
      "anchor": "the-harness",
      "status": "grounded-candidate",
      "match": "body",
      "hash": "3e0bcdba63ddb04dc0837057c082004ff4ba61d44e189cf4db24ac69d3a40928",
      "origin": "agent-polish-under-ani-direction",
      "date": "2026-09-08",
      "source": "Ani browser annotations on Grok and Start here, September 8, 2026, comments 1–10.",
      "note": "Ani comments 9 and 10 requested a brief conversational foundation with deeper links. Technical explanation comes from primary documentation, not an invented personal experience."
    }
  ],
  "next": [
    {
      "title": "Grok: taking control",
      "detail": "Review the added visual-following observation and the scoped Codex/Claude mobile comparison alongside the preserved fingertip and phone-keyboard wording.",
      "file": "content/guides/grok.md",
      "anchor": "taking-control",
      "id": "grok-takeover-review",
      "kind": "review",
      "scope": "body",
      "status": "open"
    },
    {
      "id": "grok-shared-computer-review",
      "title": "Grok: shared computer",
      "file": "content/guides/grok.md",
      "anchor": "shared-computer",
      "kind": "review",
      "scope": "body",
      "status": "open",
      "detail": "Review the explanation of separate screens and shared files and logins. Source support is established; the wording remains proposed. No extra personal example is required for this overview."
    },
    {
      "title": "Start here",
      "detail": "Review the friend-like introduction, separate model and harness explanations, descriptive prompt links, then memory, permissions, coordination, checks, and handoff.",
      "file": "content/handbook/operating-agents.md",
      "anchor": "the-foundations",
      "id": "start-here-review",
      "kind": "review",
      "scope": "page",
      "status": "open"
    },
    {
      "title": "Codex overview",
      "detail": "Ground the explanation of tasks, surfaces, and customization in clear examples and your supplied observations.",
      "file": "content/guides/codex.md",
      "anchor": "this-is-codex",
      "id": "codex-overview-review",
      "kind": "review",
      "scope": "page",
      "status": "open"
    },
    {
      "title": "Claude overview",
      "detail": "Review the terminal introduction, parallel agents, surfaces, and result checking around your existing media.",
      "file": "content/guides/claude-code.md",
      "anchor": "this-is-claude-code",
      "id": "claude-overview-review",
      "kind": "review",
      "scope": "page",
      "status": "open"
    },
    {
      "title": "Codex extensions",
      "detail": "Finish skills, connections, hooks, and your coordinator workflow with a reproducible example.",
      "file": "content/guides/codex/extensions.md",
      "anchor": "how-do-i-reuse-a-workflow",
      "id": "codex-extensions-review",
      "kind": "review",
      "scope": "page",
      "status": "open"
    },
    {
      "title": "Claude extensions",
      "detail": "Review one practical extension example and distinguish supported hooks from function-hook proposals.",
      "file": "content/guides/claude-code/extensions.md",
      "anchor": "what-do-i-want-to-add",
      "id": "claude-extensions-review",
      "kind": "review",
      "scope": "page",
      "status": "open"
    },
    {
      "id": "grok-shared-computer",
      "title": "Grok: shared computer",
      "file": "content/guides/grok.md",
      "detail": "The shared state is documented product behavior. Ani does not need to supply an anecdote to establish it.",
      "kind": "research",
      "scope": "body",
      "status": "answered",
      "anchor": "shared-computer",
      "resolution": "Primary documentation rechecked September 8, 2026: Bots use one persistent cloud computer per account with separate screens and shared files, browser sessions, and command-line credentials. This supports the factual explanation; it does not establish Ani's own use or accept the wording.",
      "source": "https://docs.x.ai/grok-bot/computer-and-apps and https://docs.x.ai/grok-bot/mobile, read September 8, 2026."
    },
    {
      "id": "codex-defaults",
      "title": "Your Codex setup",
      "file": "content/guides/codex/recommendations.md",
      "question": "Which Codex surface, model, and permission settings do you actually start with, and what makes you change them?",
      "detail": "Optional personal context for the existing factual setup guidance.",
      "kind": "input",
      "scope": "page",
      "status": "open"
    },
    {
      "id": "claude-defaults",
      "title": "Your Claude setup",
      "file": "content/guides/claude-code/recommendations.md",
      "question": "What do you actually use Claude Code for now, and what makes you pick it for a task?",
      "detail": "Keep your use and preferences separate from supported product features.",
      "kind": "input",
      "scope": "page",
      "status": "open"
    },
    {
      "id": "coordinator-example",
      "title": "One coordinator example",
      "file": "content/guides/codex/extensions.md",
      "question": "Walk through one task your coordinating Codex thread routed to another task, including what it read, sent, and checked afterward.",
      "detail": "One concrete example would complete the workflow you described; no invented project or outcome.",
      "kind": "input",
      "scope": "page",
      "status": "open"
    }
  ],
  "notes": [
    "The old ledger heading tables are historical. Current inventory is derived from Markdown.",
    "No whole-page acceptance is recorded. Preserved material and partial approvals remain separate.",
    "The live-map next queue owns active questions. Review steps follow exact acceptance evidence; answering a question does not approve the resulting prose. Remaining page reviews are derived automatically."
  ]
}
```
<!-- live-map:end -->
