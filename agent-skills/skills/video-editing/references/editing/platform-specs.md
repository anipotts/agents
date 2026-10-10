# platform-specs — deliverable conventions per platform

| platform | aspect | max length (sweet spot) | fps | bitrate | audio LUFS | captions |
|---|---|---|---|---|---|---|
| TikTok | 9:16 | 10m (30-90s sweet) | 30/60 | 6-12 Mbps | -14 | sticker, word-level, fast |
| Instagram Reels | 9:16 | 90s (3m cap) | 30/60 | 5-10 Mbps | -14 | match TT, slightly slower |
| YouTube Shorts | 9:16 | 60s HARD cap | 30/60 | 6-12 Mbps | -14 | optional, boosts retention |
| Instagram Feed | 1:1 or 4:5 | 60s | 30 | 5-10 Mbps | -14 | optional |
| X (Twitter) | 16:9 max | 2:20 free, 10m paid | 30/60 | 5-10 Mbps | -16 | optional, smaller read audience |
| LinkedIn | 9:16 or 16:9 | 10m (45-90s sweet) | 30/60 | 5-10 Mbps | -16 | strongly recommended (autoplay muted) |
| YouTube (long) | 16:9 | unlimited | 30/60/120 | 8-50 Mbps | -14 | full subs expected, chapters help |

## Container + codec defaults (when you must re-encode)

| platform | container | video codec | audio codec | profile |
|---|---|---|---|---|
| all short-form | mp4 | h.264 (libx264) | aac | high@4.1, yuv420p |
| YouTube long-form | mp4 | h.264 or h.265 | aac | high@4.2 for 1080p, main10@5.1 for 4K |

## Safe area (avoid putting text here — UI chrome overlays)

| platform | top reserve | bottom reserve | left | right |
|---|---|---|---|---|
| TikTok | 5% | 20% | 5% | 13% |
| Instagram Reels | 5% | 25% | 5% | 13% |
| YouTube Shorts | 5% | 15% | 5% | 10% |

## When asked to "post this to X"

- "tiktok" → 9:16, ≤ 90s ideal, -14 LUFS, sticker captions
- "reel" / "instagram" / "ig" → 9:16, ≤ 90s, -14 LUFS, captions
- "short" / "yt short" → 9:16, ≤ 60s HARD, -14 LUFS
- "tweet" / "x" → 16:9, ≤ 2:20, -16 LUFS, captions optional
- "linkedin" / "li" → 9:16 OR 16:9, captions REQUIRED
- "youtube" (no "short") → 16:9, no length cap, chapters if > 5min
