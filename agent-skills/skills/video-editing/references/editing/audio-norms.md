# audio-norms — loudness normalization per platform

Target: **-14 LUFS** for TikTok / Instagram / YouTube. **-16 LUFS** for X / LinkedIn.

## Single-pass loudnorm (quick, good enough most of the time)

```bash
ffmpeg -i "$SOURCE" -af loudnorm=I=-14:LRA=7:TP=-1 -c:v copy "$OUT"
```

- `I=-14` — integrated loudness target
- `LRA=7` — loudness range (dynamics; 7 is conservative for spoken word)
- `TP=-1` — true peak ceiling (avoid clipping post-platform-processing)

## Two-pass loudnorm (precise — use when shipping)

```bash
# Pass 1: measure
ffmpeg -i "$SOURCE" -af loudnorm=I=-14:LRA=7:TP=-1:print_format=json -f null - 2> loudnorm.log

# Read the JSON block at the end of loudnorm.log:
#   "input_i", "input_lra", "input_tp", "input_thresh"
# Plug into pass 2:

ffmpeg -i "$SOURCE" -af loudnorm=I=-14:LRA=7:TP=-1:\
measured_I=$INPUT_I:\
measured_LRA=$INPUT_LRA:\
measured_TP=$INPUT_TP:\
measured_thresh=$INPUT_THRESH:\
linear=true -c:v copy "$OUT"
```

## When NOT to normalize

- Music-only beats (DJ mixes, instrumentals) — keep their internal dynamics
- Audio already mastered by an audio engineer (media analysis flags this as
  professional or mastered)
- ASMR or quiet-intentional content

## Quick check before shipping

```bash
ffmpeg -i "$OUT" -af volumedetect -f null - 2>&1 | grep -E "max_volume|mean_volume"
# max_volume should be ~ -1 dBFS (matches TP target)
# mean_volume varies but should be in the -14 to -20 range for spoken word
```

## Quiet-talent fix (boost without distortion)

If the recording is too quiet and loudnorm is fighting noise:

```bash
ffmpeg -i "$SOURCE" -af "volume=6dB,loudnorm=I=-14:LRA=7:TP=-1" -c:v copy "$OUT"
```

Boost by 3-9 dB BEFORE loudnorm, not after.
