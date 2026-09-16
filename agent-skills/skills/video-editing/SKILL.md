---
name: video-editing
description: Cut, normalize, caption, and inspect short-form video and audio with ffmpeg, or analyze a reel from its actual media. Use when a clip, recording, or reel URL is supplied and the deliverable is an edit or an analysis of the footage. Writing captions or posts needs no skill.
---

# video-editing

Short-form editing and reel analysis with local tools (ffmpeg, yt-dlp, whisper).

Resolve supporting files relative to this skill directory and read only what the
task needs:

- [references/editing/editing.md](references/editing/editing.md) for any cut,
  trim, loudness pass, or caption burn-in. It routes to the smaller references.
- [references/reel.md](references/reel.md) with `scripts/reel.sh` to inspect a
  reel's real audio, transcript, and frames.

Source footage is read-only. Cuts go to a `_cuts/` directory beside the source.
Keep draft, export, upload, scheduled, and published states distinct, and ask
before anything leaves the machine.
