# captions-design — caption styling + burn-in

## Generate word-level captions from video (whisper, installed on this mac)

```bash
whisper "$SOURCE" --model base --output_format srt --word_timestamps True --output_dir .
# Produces: $SOURCE.srt with per-word timing
```

For higher accuracy on a final pass, use `--model small` or `--model medium`.

## Burn-in captions from SRT (simple style)

```bash
ffmpeg -i "$SOURCE" \
  -vf "subtitles=captions.srt:force_style='FontName=Arial,FontSize=24,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,Outline=2,Alignment=2'" \
  -c:a copy "$OUT"
```

ASS color format is `&H00BBGGRR` (alpha=00, BGR order). `&H00FFFFFF` is white. `&H00000000` is black outline.

Alignment values:
- `2` — bottom-center (default for captions)
- `5` — top-center
- `8` — top-center (alt)
- `10` — middle-center

## Burn-in with ASS (advanced — animations, positions, multi-line)

Convert SRT to ASS for richer styling:
```bash
ffmpeg -i captions.srt captions.ass
```

Edit `captions.ass` directly. The `[V4+ Styles]` section defines named styles; the `[Events]` section is dialog lines that reference them.

## Per-platform caption conventions

| platform | placement | style |
|---|---|---|
| TikTok | mid-screen or just below center | bold sans-serif, white w/ black outline, word-level pop-on |
| Instagram Reels | match TT slightly subdued | similar to TT, can be more polished |
| YouTube Shorts | bottom-third | sentence-level fine, but word-level boosts retention |
| LinkedIn | bottom | clean sans-serif, sentence-level, professional |
| YouTube (long) | bottom, no burn-in | use YT's CC system, not burn-in |

## Word-level pop-on style (TT-native)

```ass
Dialogue: 0,0:00:03.20,0:00:03.45,Default,,0,0,0,,{\fad(50,50)\frz0\fscx110\fscy110}YOU
Dialogue: 0,0:00:03.45,0:00:03.70,Default,,0,0,0,,{\fad(50,50)\frz0\fscx110\fscy110}CAN
```

- `\fad(50,50)` — 50ms fade in / 50ms fade out
- `\fscx110\fscy110` — scale text up 10% for emphasis
- Each word as its own dialogue line, timed tightly

## Caveats

- Burned-in captions are PERMANENT. If the creator might need an English-only edit later, keep the SRT and the un-burned cut.
- Auto-generated captions need a manual review pass for proper nouns (product, brand, and school names) — whisper mishears.
- A common whisper mishear (auto-fix in transcripts): "Cloud Code" → "Claude Code".
