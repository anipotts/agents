# silence-tuning — detect take boundaries

## Base command

```bash
ffmpeg -i "$SOURCE" -af silencedetect=noise=-30dB:d=1.5 -f null - 2>&1 | grep silence
```

- `noise=-30dB` — anything quieter than this is silence
- `d=1.5` — minimum 1.5s of silence to register

Output gives `silence_start` and `silence_end` timestamps. Each pair is a candidate take boundary.

## Tuning by content type

| content | noise threshold | duration |
|---|---|---|
| talking-head desk recording (typical) | `-30dB` | `1.5` |
| outdoors / ambient noise | `-25dB` | `2.0` |
| podcast / radio quality | `-35dB` | `1.0` |
| heavy music bed | `-20dB` | `2.5` |

Start at the default. If you get too many false boundaries (e.g. catches the mic in the room), tighten noise to `-25dB`. If you miss obvious gaps, loosen to `-35dB`.

## From silence to take candidates

A "take" is the audio between two silence events (or between file start and first silence, or last silence and file end). Pseudocode:

```
silences = parse_silencedetect_output()
takes = []
prev_end = 0.0
for (silence_start, silence_end) in silences:
    takes.append({"start": prev_end, "end": silence_start, "len": silence_start - prev_end})
    prev_end = silence_end
takes.append({"start": prev_end, "end": file_duration, "len": file_duration - prev_end})
```

Filter:
- Drop takes shorter than 3 seconds (usually false starts)
- Mark takes that overlap with bad-content windows from /reel analysis

## Combine with /reel transcript

`/reel`'s analysis returns a full transcript with the audio's structure. Cross-reference:

- Silence boundaries + transcript = where talent restarted vs. paused for breath
- A silence followed by "uh, sorry, let me try that again" in the transcript = take boundary
- A silence with no restart language = breath or beat, NOT a take boundary

This is how to avoid splitting takes at natural pauses.
