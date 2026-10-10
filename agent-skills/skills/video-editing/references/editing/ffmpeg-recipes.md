# ffmpeg-recipes — cookbook for short-form cuts

macOS ffmpeg (homebrew). Default to lossless (`-c copy`) wherever possible.

## Lossless trim (preserves quality, fast)
```bash
ffmpeg -ss 00:00:12.500 -to 00:00:58.300 -i "$SOURCE" -c copy "$OUT"
# -ss BEFORE -i = fast seek (less accurate, but lossless when -c copy)
# Use -ss AFTER -i for frame-accurate trim (must re-encode)
```

Frame-accurate trim (re-encodes, slower):
```bash
ffmpeg -i "$SOURCE" -ss 00:00:12.500 -to 00:00:58.300 \
  -c:v libx264 -crf 18 -preset slow -c:a aac -b:a 192k "$OUT"
```

## Concat multiple clips
Lossless if same codec/container:
```bash
printf "file '%s'\n" clip1.mov clip2.mov clip3.mov > concat.txt
ffmpeg -f concat -safe 0 -i concat.txt -c copy "$OUT"
```

Mixed codecs (re-encode):
```bash
ffmpeg -i clip1.mov -i clip2.mov -i clip3.mov \
  -filter_complex "[0:v][0:a][1:v][1:a][2:v][2:a]concat=n=3:v=1:a=1[v][a]" \
  -map "[v]" -map "[a]" "$OUT"
```

## Vertical 9:16 crop from 16:9
For TikTok / Reels / Shorts. Center crop is default:
```bash
ffmpeg -i "$SOURCE" -vf "crop=ih*9/16:ih,scale=1080:1920" -c:a copy "$OUT"
```

Off-center (X-offset):
```bash
ffmpeg -i "$SOURCE" -vf "crop=ih*9/16:ih:X:0,scale=1080:1920" -c:a copy "$OUT"
```

## Speed ramp
```bash
# 1.5x video + audio
ffmpeg -i "$SOURCE" -filter_complex \
  "[0:v]setpts=PTS/1.5[v];[0:a]atempo=1.5[a]" \
  -map "[v]" -map "[a]" "$OUT"
# atempo limited to [0.5, 100.0]; chain for extremes (atempo=2.0,atempo=2.0 = 4x)
```

## Probe file (duration, resolution, codecs)
```bash
ffprobe -v error -show_format -show_streams "$SOURCE" -of json
# Just duration:
ffprobe -v error -show_entries format=duration \
  -of default=noprint_wrappers=1:nokey=1 "$SOURCE"
```

## Extract still frame
```bash
ffmpeg -ss 00:00:03 -i "$SOURCE" -vframes 1 -q:v 2 thumbnail.jpg
```

## Detect audio peaks (clipping check)
```bash
ffmpeg -i "$SOURCE" -af volumedetect -f null - 2>&1 | grep -E "max_volume|mean_volume"
# max_volume > 0 dBFS = clipping
```

## Concat-and-trim (single command for multi-take cut)
Common pattern: take 2 from 0:08-0:42 + take 3 from 0:55-1:23, no transitions:
```bash
ffmpeg -ss 00:00:08 -to 00:00:42 -i "$SOURCE" -ss 00:00:55 -to 00:01:23 -i "$SOURCE" \
  -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" \
  -map "[v]" -map "[a]" "$OUT"
```

## Output naming convention (single source of truth)

```
<media>/raw/<date>-<slug>.mov              # source (read-only)
<media>/raw/<date>-<slug>.reel/            # /reel analysis sidecar
<media>/raw/_cuts/
    <date>-<slug>.v1.mov                   # first proposed cut
    <date>-<slug>.v2.mov                   # alternative
    <date>-<slug>.SHIPPED.mov              # the creator renames the keeper
```

Cut files must NOT collide with source. Never write to the source directory with a same-base name.
