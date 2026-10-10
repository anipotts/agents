# editing craft

This is the editing reference for the video-editing skill. Universal rules live here; load sibling references only when the requested operation needs them.

## Always-true defaults (never violate)

1. **Source files are READ-ONLY.** Never overwrite a take.
2. **All cuts land in `_cuts/`** as a sibling dir next to the source. Naming: `<source-name>.v1.mov`, `.v2.mov`, etc. The creator renames the keeper to `.SHIPPED.mov`.
3. **Default to lossless** (`-c copy` for both audio and video) unless platform requires re-encode.
4. **Audio target by platform**: -14 LUFS for TikTok / Instagram / YouTube; -16 LUFS for X / LinkedIn.
5. **Never aggressively cut quality to hit a target duration.** If "45s" but the best take is 47s, propose the 47s cut and flag it.

## When to Read which subfile

Before any cut, run, or recommendation, read the subfile that applies. Resolve
it relative to this `editing/` directory, independent of the active agent
vendor or installation scope.

| Task | Read this |
|---|---|
| Any ffmpeg command (trim, concat, crop, speed, probe, still-frame) | `ffmpeg-recipes.md` |
| Targeting TT / IG / YT-Shorts / X / LinkedIn / IG-Feed | `platform-specs.md` |
| Finding take boundaries / silence detection | `silence-tuning.md` |
| Audio loudness normalization | `audio-norms.md` |
| Caption styling / burn-in / SRT or ASS | `captions-design.md` |

If a task touches multiple, Read multiple. They're small; Read what you need.

## Output naming

Full layout and naming convention lives in `ffmpeg-recipes.md` beside this file.
Cuts land in `_cuts/` as `<source-name>.v1.mov`; the creator renames the keeper to
`.SHIPPED.mov`.

## Take ranking heuristics (pre-taste filters)

These come before the creator's personal taste:

1. **First-2s viability** — does the take open with energy? If it starts "uh, ok, let me try again," reject the first 1-2 seconds at minimum.
2. **No mid-sentence restarts** — silencedetect inside a single take. Restarts usually mean cuts, not kept takes.
3. **Audio peaks** — flag anything > 0 dBFS peak (use `ffmpeg -af volumedetect`).
4. **Visual quality** — focus, exposure, no major shadow issues (the available
   media analysis flags this).
5. **Length match to target** — prefer cleaner 38s over messy 55s if target is 45s.

The creator's stated preferences override these.

## When NOT to use ffmpeg

Out of editor's scope (recommend doing these by hand in DaVinci Resolve or Final Cut Pro):

- Color grading beyond a simple LUT
- Multi-camera sync
- Complex audio mixing with multiple sources
- VFX, motion graphics, animated text beyond basic style
- Frame-level retiming

Editor's scope is **cut-and-ship for short-form**. Anything outside that, name the boundary and hand back to the creator.
