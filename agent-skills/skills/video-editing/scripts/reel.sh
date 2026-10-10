#!/usr/bin/env bash
# reel.sh — Download + analyze any Instagram reel locally.
#
# Usage:  reel.sh <instagram-url> [output-dir]
#
# Produces in output-dir (default: /tmp/reel-<shortcode>/):
#   meta.json          — yt-dlp metadata (uploader, title, view_count, caption, duration)
#   transcript.txt     — plain whisper transcript
#   transcript.srt     — whisper transcript WITH timestamps (for alignment)
#   audio.mp3          — 192kbps mono for re-listening
#   frames/            — scene-detected + regular-sample keyframes (adaptive, 8-40 frames)
#   ocr.txt            — burned-in caption/overlay text extracted from frames (if tesseract installed)
#   SUMMARY.md         — one-page human-readable digest
#
# Exits 0 on success. Prints a JSON object with artifact paths.

set -euo pipefail

URL="${1:-}"
if [[ "$URL" == "-h" || "$URL" == "--help" ]]; then
  echo "usage: reel.sh <instagram-url> [output-dir]"
  exit 0
fi
if [[ -z "$URL" ]]; then
  echo "usage: reel.sh <instagram-url> [output-dir]" >&2
  exit 1
fi

# Extract shortcode from URL (e.g. DXW4c6xE2Fa from /reels/DXW4c6xE2Fa/)
SHORTCODE=$(echo "$URL" | grep -oE '(reel|reels|p)/[A-Za-z0-9_-]+' | head -1 | sed 's|.*/||')
if [[ -z "$SHORTCODE" ]]; then
  SHORTCODE="reel-$(date +%s)"
fi

OUT_DIR="${2:-/tmp/reel-$SHORTCODE}"
mkdir -p "$OUT_DIR/frames"
cd "$OUT_DIR"

# Tool paths (covers both Apple Silicon and Intel brew)
YTDLP="$(command -v yt-dlp || echo /opt/homebrew/bin/yt-dlp)"
WHISPER="$(command -v whisper || echo /opt/homebrew/bin/whisper)"
FFMPEG="$(command -v ffmpeg || echo /opt/homebrew/bin/ffmpeg)"
FFPROBE="$(command -v ffprobe || echo /opt/homebrew/bin/ffprobe)"
TESSERACT="$(command -v tesseract || true)"

[[ -x "$YTDLP"    ]] || { echo "yt-dlp not found"    >&2; exit 2; }
[[ -x "$FFMPEG"   ]] || { echo "ffmpeg not found"    >&2; exit 2; }
[[ -x "$FFPROBE"  ]] || { echo "ffprobe not found"   >&2; exit 2; }
[[ -x "$WHISPER"  ]] || { echo "whisper not found"   >&2; exit 2; }

log() { echo "[reel] $*" >&2; }

# ── 1. Download video + metadata ───────────────────────────────────
log "downloading: $URL"
"$YTDLP" \
  --no-progress \
  --write-info-json \
  --merge-output-format mp4 \
  -o "video.%(ext)s" \
  "$URL" >&2 2>/dev/null || {
    log "yt-dlp failed; authenticated browser access requires a separate user-present path"
    exit 3
  }

[[ -f video.mp4 ]] || { log "no video.mp4 produced"; exit 3; }

# Rename info.json → meta.json (simplified subset)
if [[ -f video.info.json ]]; then
  python3 -c "
import json, sys
d = json.load(open('video.info.json'))
keep = ['id','title','description','uploader','uploader_id','upload_date','timestamp','duration','view_count','like_count','comment_count','webpage_url','thumbnail','tags','categories','channel','channel_id','extractor']
out = {k:d.get(k) for k in keep if k in d}
json.dump(out, open('meta.json','w'), indent=2, ensure_ascii=False)
" 2>/dev/null || cp video.info.json meta.json
fi

DURATION=$("$FFPROBE" -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 video.mp4 | cut -d. -f1)
log "video duration: ${DURATION}s"

# ── 2. Extract audio ───────────────────────────────────────────────
log "extracting audio"
"$FFMPEG" -hide_banner -loglevel error -y -i video.mp4 -vn -acodec libmp3lame -b:a 192k -ac 1 audio.mp3

# ── 3. Transcribe ──────────────────────────────────────────────────
# base model ≈ 2x faster than small, still good quality for social reels
log "transcribing (whisper base, may take ~30s for a 60s video)"
"$WHISPER" audio.mp3 \
  --language en \
  --model base \
  --output_format txt \
  --output_format srt \
  --output_dir . \
  --verbose False >/dev/null 2>&1 || {
    log "whisper base failed, falling back to tiny"
    "$WHISPER" audio.mp3 --language en --model tiny --output_format txt --output_format srt --output_dir . --verbose False >/dev/null 2>&1
  }

[[ -f audio.txt ]] && mv audio.txt transcript.txt || true
[[ -f audio.srt ]] && mv audio.srt transcript.srt || true

# ── 4. Extract frames (rich, scene-aware) ──────────────────────────
# Strategy:
#   a) Scene-change frames (threshold 0.25) — catches hard cuts
#   b) Regular samples every 1.5s — catches overlay/caption changes
#   c) Cap total at 40 frames, sorted by timestamp
log "extracting frames (scene detection + 1.5s sampling)"

# Scene change frames (named by timestamp)
"$FFMPEG" -hide_banner -loglevel error -y -i video.mp4 \
  -vf "select='gt(scene,0.25)',showinfo" \
  -fps_mode vfr -q:v 2 \
  "frames/scene_%04d.jpg" 2>/dev/null || true

# Regular 1.5s samples
"$FFMPEG" -hide_banner -loglevel error -y -i video.mp4 \
  -vf "fps=1/1.5" -q:v 2 \
  "frames/sample_%04d.jpg" 2>/dev/null || true

# Also grab very first frame (thumbnail)
"$FFMPEG" -hide_banner -loglevel error -y -i video.mp4 -vframes 1 -q:v 2 frames/00_thumbnail.jpg 2>/dev/null || true

# Rename frames to include approximate timestamp
# (sample_NNNN.jpg was at N*1.5 seconds)
python3 <<'PY' 2>/dev/null || true
import os, re, glob
from pathlib import Path
frames_dir = Path('frames')
renames = []
for f in sorted(frames_dir.glob('sample_*.jpg')):
    m = re.match(r'sample_(\d+)\.jpg', f.name)
    if m:
        idx = int(m.group(1))
        t = idx * 1.5  # 1fps/1.5s
        new = frames_dir / f'{t:06.2f}s_sample.jpg'
        f.rename(new)
# scene_*.jpg keeps its name (no exact timestamp from ffmpeg select filter)
PY

# Dedupe near-identical frames by file size (crude but fast)
python3 <<'PY' 2>/dev/null || true
from pathlib import Path
seen = set()
for f in sorted(Path('frames').glob('*.jpg')):
    size = f.stat().st_size
    # Bucket by 5KB — nearly identical frames will land in same bucket
    bucket = size // 5000
    if bucket in seen:
        f.unlink()
    else:
        seen.add(bucket)
PY

# Cap at 40 frames — keep evenly distributed
python3 <<'PY' 2>/dev/null || true
from pathlib import Path
frames = sorted(Path('frames').glob('*.jpg'))
if len(frames) > 40:
    step = len(frames) / 40
    keep = set()
    for i in range(40):
        keep.add(frames[int(i*step)])
    for f in frames:
        if f not in keep:
            f.unlink()
PY

FRAME_COUNT=$(ls frames/*.jpg 2>/dev/null | wc -l | tr -d ' ')
log "extracted $FRAME_COUNT frames"

# ── 5. OCR burned-in text from frames (if tesseract available) ─────
if [[ -n "$TESSERACT" && -x "$TESSERACT" ]]; then
  log "OCR burned-in text (tesseract)"
  : > ocr.txt
  for f in frames/*.jpg; do
    text=$("$TESSERACT" "$f" stdout 2>/dev/null | tr -s ' \n' ' ' | sed 's/^ *//;s/ *$//')
    if [[ -n "$text" && ${#text} -gt 3 ]]; then
      echo "[$(basename "$f")] $text" >> ocr.txt
    fi
  done
else
  log "tesseract not installed — skipping OCR (install: brew install tesseract)"
fi

# ── 6. Write summary ───────────────────────────────────────────────
cat > SUMMARY.md <<EOF
# Reel Analysis — $SHORTCODE

**URL:** $URL
**Duration:** ${DURATION}s
**Output dir:** $OUT_DIR

## Files

- \`meta.json\` — video metadata (uploader, views, caption, etc.)
- \`transcript.txt\` — plain text transcript
- \`transcript.srt\` — timestamped transcript (for cutting)
- \`audio.mp3\` — extracted audio
- \`frames/\` — $FRAME_COUNT keyframes (scene-aware + 1.5s samples)
- \`ocr.txt\` — burned-in captions/overlays (if tesseract was available)

## Quick read

\`\`\`
$(head -c 2000 transcript.txt 2>/dev/null || echo "(no transcript)")
\`\`\`

## Metadata

\`\`\`json
$(cat meta.json 2>/dev/null | head -c 1500 || echo "{}")
\`\`\`
EOF

# ── 7. Emit JSON manifest on stdout ────────────────────────────────
python3 <<PY
import json, os
from pathlib import Path
out = Path("$OUT_DIR")
frames = sorted(str(f) for f in out.glob("frames/*.jpg"))
manifest = {
    "shortcode": "$SHORTCODE",
    "url": "$URL",
    "out_dir": str(out),
    "duration_sec": $DURATION,
    "video": str(out / "video.mp4"),
    "audio": str(out / "audio.mp3"),
    "transcript": str(out / "transcript.txt"),
    "transcript_srt": str(out / "transcript.srt"),
    "meta": str(out / "meta.json"),
    "ocr": str(out / "ocr.txt") if (out / "ocr.txt").exists() else None,
    "summary": str(out / "SUMMARY.md"),
    "frames": frames,
    "frame_count": len(frames),
}
print(json.dumps(manifest, indent=2))
PY

log "done: $OUT_DIR"
