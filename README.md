# agent tips

a personal handbook for using agents to build things and handle everyday work.
the site brings together everyday work, building for fun or serious use, and
personal infrastructure. product guides provide the specific controls.

[read the handbook](https://agents.anipotts.com) or go directly to a principal guide:

<!-- generated:guides:start -->
- [codex](https://agents.anipotts.com/guides/codex/)
- [claude code](https://agents.anipotts.com/guides/claude-code/)
- [grok](https://agents.anipotts.com/guides/grok/)
- [start here](https://agents.anipotts.com/handbook/operating-agents/)
- [choosing an agent setup](https://agents.anipotts.com/handbook/choosing-a-setup/)
- [everyday work](https://agents.anipotts.com/handbook/everyday-work/)
- [building things](https://agents.anipotts.com/handbook/building-things/)
- [personal infrastructure](https://agents.anipotts.com/handbook/personal-infrastructure/)
- [backups and getting your work back](https://agents.anipotts.com/handbook/backups-and-recovery/)
- [how coding agents got here](https://agents.anipotts.com/handbook/history/)
- [where this comes from](https://agents.anipotts.com/handbook/method-and-sources/)
<!-- generated:guides:end -->

## resume here

The [reassessment](editorial/reassessment.md) records a disposition for all 24
pages present at the start. Four shared pages now have a publishable first edition. The [section audit](editorial/reassessment-details.md) covers
headings, copy, source conflicts, and both recovered stashes. The
[review ledger](editorial/review-ledger.md) owns wording acceptance and the
local `/__progress/` page derives the current review map.

- [ ] review the homepage bridge and remaining start page copy
- [ ] review deeper backup page copy in small batches, continuing with “choose one backup workflow”
- [ ] reassess the published everyday work and building copy in small wording batches
- [ ] resolve the product accuracy findings, then reassess retained copy in batches
- [ ] verify the exact release tree, integrate through protected PRs, and check deployment

[PR #326](https://github.com/anipotts/agents/pull/326) carries the setup,
reconciled design work, audit, and accepted opening copy through protected checks.
Its check and deployment records own release evidence.

The structure is accepted with separate building paths for curiosity and work
with business or real world consequences. The homepage headline/subtitle, everyday first-task example and exact planning
tradeoff paragraph are accepted;
the infrastructure opening and six sections also have exact acceptance records.
The deeper backup outline is accepted; its body copy remains under review.
Ani authorized organized publication of the shared pages on October 12.
Publication authority does not extend exact wording acceptance to newly added prose.
Archived plugins retain compatibility through November 5, 2026.

## project layout

`content/` owns guide copy; `editorial/` owns sources and review evidence;
`src/` renders the site; `scripts/` owns checks. `design.md` owns visual rules.
[Worktree setup](docs/worktrees.md) describes reusable setup and preview actions.
The handbook review stays in the saved local `main` checkout.

## evidence principle

<!-- generated:evidence:start -->
- `tested`: reproduced in a named environment and version, with the tester and limits stated
- `official source`: confirmed in current primary documentation or source code
- `analysis`: a judgment derived from stated evidence
- `open question`: current evidence is missing or incomplete
<!-- generated:evidence:end -->

citations sit beside the claims they support. tested observations name their limits, while source based claims stay distinct from personal analysis.

## local verification

```bash
node scripts/project.mjs setup
node scripts/project.mjs verify
```

built and maintained by [ani potts](https://anipotts.com). corrections with primary sources or reproducible field evidence are welcome.

MIT
