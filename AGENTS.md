# coding agent tips

this repository is a personal, source backed handbook for people learning to use agents for everyday work and building things. basic coding is a prerequisite only for coding exercises. codex and claude code are coequal primary guides. archived claude code plugins remain available only for the compatibility window documented in `content/archive/claude-code-tools.md`.

## public standard

- assume little agent experience. explain coding prerequisites where a task needs them. give a brief, optional crash course with embedded primary references. explain unfamiliar agent terms where they matter and let fluent readers move straight to practical material.
- use short headings that help readers find a question, worry, or curiosity. preserve clear topic names and Ani's adopted headings. personal judgments require his words; a question heading does not establish his experience.
- separate tested behavior, official product facts, analysis, and open questions.
- prefer primary sources and record them in `editorial/sources.json`.
- do not use generated activity, commit frequency, or vendor benchmarks as evidence of quality.
- keep the voice direct, lowercase, and professional. avoid hype, fan language, and unsupported authority claims.
- treat Ani's submitted wording and manual browser edits as the primary voice reference. preserve his phrasing unless accuracy, safety, or clarity requires a change, and explain that conflict instead of silently polishing it away.
- write like a personal, engaging handbook built from curiosity and use: concrete experiences, recognizable details, honest uncertainty, and a clear reason for caring. avoid generic authority language and an overly technical textbook voice.
- do not use mid-dot dividers in public copy or interface labels.
- never use litotes or negative comparison frames in public copy. state the intended claim directly.
- repeat context only when it changes understanding or supports a deliberate editorial rhythm. remove labels that restate the title, route, or surrounding section.
- preserve compatibility paths through 2026-11-05. archive changes are limited to security, data loss, and installation blockers.

## canonical ownership

- `design.md` owns public visual, interaction, responsive, media presentation, and progressive agent-native design standards.
- `content/home.md` owns the homepage.
- `content/handbook/*.md` owns guidance shared across products.
- `content/guides/<product>*.md` owns product overviews and chapters.
- `content/archive/*.md` owns frozen compatibility material.
- `editorial/sources.json` owns source metadata, current product versions, and evidence definitions.
- `src/site.ts` owns shared navigation and interface copy.
- components render canonical metadata. they do not own guide summaries, product explanations, recommendations, or versions.
- run `bun run sync:readme` after changing a principal guide title or evidence label. the generated README blocks must match before validation passes.
- edit public prose in its canonical Markdown file and review the affected route in the normal Astro development server.
- normal public prose does not use hyphens. preserve them only for syntax, routes, filenames, commands, URLs, version identifiers, and official product names.

## working checkout

For the remaining handbook completion work, use the saved project checkout on
local `main`. Keep the development preview and ongoing edits in that checkout.
GitHub's protected `main` still requires a pull request and passing checks;
create a temporary submission branch from the current work when needed, then
fast forward local `main` to the verified merge. Preserve other worktrees as
recovery copies until their remaining work is accounted for.

Reusable worktree setup and toolbar actions live in
`.codex/environments/environment.toml` and call `scripts/project.mjs`. Run
`node scripts/project.mjs setup` for a frozen install and cached browser runtime.
See `docs/worktrees.md`; keep dependencies and build outputs local to each checkout.
Run full browser verification in one checkout at a time because its tests reserve
fixed ports. Setup and preview commands are safe to repeat.

## verification

run the source, Astro, generated route, Markdown, and shell checks before publishing a broad change. run `bun test plugins/cc/tests` and `pytest plugins/lore/tests` when archive files or shared runtime dependencies change, and during the scheduled full verification.

- protected pull requests must use a committer identity GitHub recognizes. local cryptographic verification is supporting evidence; GitHub's `verified=true` result is the merge gate.
- use `--body-file` for GitHub pull request or release text that contains Markdown code spans or shell syntax. never pass that content through an inline shell argument.
- use the package scripts for Astro development, editing, checks, builds, and previews. they invoke Astro through Node so a restarted shell does not need Bun on `PATH` for those commands.

## review

evaluate factual support, taxonomy, safety, maintenance cost, and whether the recommendation follows from the evidence. do not optimize prose for engagement at the expense of precision.
