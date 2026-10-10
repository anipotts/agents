# agent skills

Skills from my own Claude Code and Codex setup, trimmed to work for anyone.

| skill | what it does |
| --- | --- |
| `codex-pet` | builds and checks a Codex pet sprite atlas with a deterministic pipeline (Apache 2.0, see its `LICENSE.txt`) |
| `video-editing` | cuts, normalizes, and captions short-form video with ffmpeg, and analyzes reels from their real media |

## install

Claude Code:

```text
/plugin marketplace add anipotts/agents
/plugin install agent-skills@claude-code-tips
```

Codex: copy a folder from `skills/` into `~/.agents/skills/` (or `.agents/skills/` in a repo).

## how this folder is made

These files are generated from a private repository and exported with a privacy
scan. Pull requests are welcome, and accepted changes are carried back to the
source so the next export keeps them.
