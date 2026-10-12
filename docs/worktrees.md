# reusable worktrees

The local Codex environment is `.codex/environments/environment.toml`.
Its setup and toolbar actions call `scripts/project.mjs` from the selected
checkout. The commands resolve the project from their own file location,
including paths with spaces. Node must be available on `PATH`; Bun must match
the exact `packageManager` version in `package.json`. The helper also finds
`~/.bun/bin/bun` when a fresh shell has no Bun on `PATH`.

## setup

```sh
node scripts/project.mjs setup
```

Setup runs a frozen dependency install and installs Playwright Chromium into
Playwright's normal browser cache. Repeating setup reuses downloaded packages
and browsers. Each checkout gets its own `node_modules`, `.astro`, and `dist`;
do not share these directories by symlink. Setup does not copy `.env` files,
credentials, private documents, or dependencies from another checkout.

No build or full test matrix runs during setup. The existing development
script builds the search index before starting the preview. Linux systems
may separately need Playwright's documented system libraries; setup does not
invoke a privileged operating system installer.

## toolbar actions

| action | command | behavior |
| --- | --- | --- |
| start preview | `node scripts/project.mjs dev` | foreground Astro development server, localhost only, a free port assigned by the operating system |
| check changes | `node scripts/project.mjs check` | source/content, UI ownership, and editorial inventory checks |
| full verification | `node scripts/project.mjs verify` | the repository's full verification script |
| setup dependencies | `node scripts/project.mjs setup` | repeat the frozen install and cached browser setup |

Use the URL Astro prints; concurrent worktrees receive different preview ports.
The preview stays attached to its terminal. Stop it with Ctrl+C in that terminal.
The normal Astro lock protects against conflicting servers in the same checkout.
No cleanup script kills processes or removes files. Let native worktree archival
preserve source changes; account for needed ignored files separately.

Preview isolation does not isolate external accounts or services. The existing
browser test scripts reserve fixed ports, so run full verification in one
checkout at a time. Stop that checkout's development preview before full
verification and restart it afterward: builds and the development-search test
refresh the same Astro content store. An arbitrary preview port also prevents the development
search test from borrowing a different checkout's conventional preview.

## creating and reusing

Prefer a suitable existing managed worktree for related work. Create a new
native Codex worktree when isolation is useful, using a branch with a clear
owner. The setup source must be present in the starting revision. Uncommitted
files in local `main` are not automatically copied to a fresh worktree.

The current handbook editorial review and preview stay on local `main`.
Temporary submission worktrees can carry selected, checked changes through
protected PR integration while preserving the unfinished work here.

The environment file is prepared and its underlying commands are tested
independently. Actual environment selection and automatic setup are app state;
read the app's setup result before claiming those ran. The native Codex app
cannot be controlled by the computer-use tool in this session.

See OpenAI's [local environments documentation](https://learn.chatgpt.com/docs/environments/local-environment)
for setup and actions. Cleanup is intentionally left unconfigured.
