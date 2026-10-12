# agent tips

a personal handbook for using agents to build things and handle everyday work.
the published site still centers on coding while the broader structure and copy
are reviewed.

[read the handbook](https://agents.anipotts.com) or go directly to a principal guide:

<!-- generated:guides:start -->
- [codex](https://agents.anipotts.com/guides/codex/)
- [claude code](https://agents.anipotts.com/guides/claude-code/)
- [grok](https://agents.anipotts.com/guides/grok/)
- [start here](https://agents.anipotts.com/handbook/operating-agents/)
- [choosing an agent setup](https://agents.anipotts.com/handbook/choosing-a-setup/)
- [how coding agents got here](https://agents.anipotts.com/handbook/history/)
- [where this comes from](https://agents.anipotts.com/handbook/method-and-sources/)
<!-- generated:guides:end -->

## resume here

The [reassessment](editorial/reassessment.md) records a disposition for all 24
existing pages. The [section audit](editorial/reassessment-details.md) covers
headings, copy, source conflicts, and both recovered stashes. The
[review ledger](editorial/review-ledger.md) owns wording acceptance and the
local `/__progress/` page derives the current review map.

- [ ] review the homepage and start page candidate wording
- [ ] review the hidden infrastructure, everyday work, and building drafts
- [ ] resolve the product accuracy findings, then reassess retained copy in batches
- [ ] verify the exact release tree, integrate through protected PRs, and check deployment

The structure is accepted with separate building paths for curiosity and work
with business or real world consequences. Candidate prose remains unaccepted.
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
