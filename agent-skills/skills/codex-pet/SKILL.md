---
name: codex-pet
description: Build or repair a Codex pet sprite atlas with the deterministic assembly and QA pipeline. Use only for Codex pet assets; general image or media work needs no skill.
---

# codex-pet

The deterministic implementation lives in this skill directory:

- contract and animation rows: `references/`
- assembly and QA tools: `scripts/`
- regression tests: `tests/`

Create a named run directory, preserve source art, generate only the missing visual material, assemble deterministically, and run all applicable validators before packaging. Use image generation for new or edited art, then inspect contact sheets and animation previews visually.

Build the complete v2 atlas with `scripts/assemble_extended_atlas.py` before the single final edge cleanup with `scripts/despill_chroma_edges.py`. Never run another chroma pass after that cleanup. Validate the resulting atlas and cleanup report before packaging.

Do not bypass direction, chroma, atlas, or animation-row checks. Report generated art, deterministic outputs, validation results, and the final package separately.
