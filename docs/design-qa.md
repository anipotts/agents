# Homepage foundations index QA

final result: passed

## Target and implementation

Selected displayed image 3: `exec-1f6db360-57a4-4b98-b93c-1326d6814dfc.png`.
Implementation: http://127.0.0.1:4330/ on local main.
Reference and normal browser capture compared together in `/tmp/foundations-comparison.png`.
Normal desktop capture: `/tmp/foundations-desktop.png`.

The implementation preserves the source Markdown, established responsive type sizes,
slim header and existing footer. It matches the selected composition: bare provider
links, personal introduction, then four title and arrow rows. Provider cards,
descriptions and carousel controls are removed. Grok uses its official vector mark.
The generated board is a visual direction, not an exact CSS viewport specification.

## Iterations

- Replaced stale development asset data by restarting the verified local preview.
- Matched optical logo sizes with 32px mobile and 40px desktop boxes and a Codex
  optical adjustment. Added the existing dark Codex asset for theme parity.
- Allowed header controls to reflow for enlarged text.
- Found enlarged words overflowing the headline at 320px with 200% root text and
  WCAG spacing. Added emergency word wrapping; rechecked at 320px with no overflow.

## Verification

- Astro check: zero errors, warnings or hints.
- Build, content/source contracts, UI ownership and generated route tests passed.
- Full navigation suite passed before final reflow changes, including guide picker
  interactions, keyboard, seven widths, both themes and reduced motion.
- Focused mobile suite passed again after the final reflow fix: both themes and
  both motion settings, keyboard provider navigation, four foundations links,
  footer, and combined 200% root text/WCAG spacing at 320px.
- In-app Chromium geometry sweep: 320 to 1920 CSS pixels in 50px steps plus
  375, 390, 402, 430, 440, 767/768/769, 959/960/961, 1024 and 1440; no page overflow.
- Browser restored to normal viewport and light theme with no injected QA styles.

## Explicit limits

Actual iPhone Safari Page Zoom at 75%, 100%, 125% and 200% was not verified.
No claim of iOS Safari or simulator parity is made. The geometry sweep is not
an exhaustive visual inspection of every possible viewport or text setting.
No route, API, publication or deployment changes were made.

## Follow-up annotation: provider buttons and Codex icon

Grey hero button surfaces, original rounding, padding and natural wrapping restored.
Codex now has one 512px transparent RGBA asset at `/icons/products/codex.png`,
used by the shared provider metadata in both themes. Its baked app tile was removed
with an image edit and alpha cleanup. It is a derived presentation asset, not a newly
downloaded official master. Shared Codex wrappers have no border or background.

## Follow-up: centered picker, mobile footer and Safari canvas

Homepage picker moved into the middle header grid column with equal side tracks.
It remains centered at 319px and wraps its label under text enlargement.
The mobile footer places GitHub between archive and releases with equal side columns.
Canonical setup title, homepage subtitle and hero-only Claude label follow the
latest supplied wording. Buttons use one row at 390px and a column below 384px.
Root and body backgrounds now follow the header surface token in both themes;
article backgrounds remain on the canvas token. iOS-targeted scrollbar hiding
preserves scrolling. These are local CSS fixes; actual iPhone Safari status-bar
rendering and native scrollbar suppression remain unverified.

Focused mobile tests passed in both themes and both motion settings, including
200% text plus WCAG spacing. Exact wording tests were updated to the requested copy.

## Current hero hierarchy review

final result: passed

Exact scope: projects → startups → big tech.
One semantic H1: a casual guide to / coding agents / in real software.
Exact subtitle: practical guidance for working with ai under real world constraints and tradeoffs.
Three block spans compose the heading without br elements; each can reflow.
The provider generation path is unchanged. Only the canonical homepage, hero styles,
hero assertions, design guidance and this QA record changed during this turn.

Screenshots and DOM measurements are saved outside the repository at:
Private machine references remain in the local recovery snapshot.
All captures were made through the Codex in-app browser using its CDP capability,
with 2x device density. Each width was visually inspected in light and dark themes.

| CSS width | H1 | subtitle lines | provider buttons | introduction top | overflow |
| --- | --- | --- | --- | --- | --- |
| 1440 | three intentional lines | 1 | one row | 621px | none |
| 768 | three intentional lines | 1 | one row | 446px | none |
| 430 | three intentional lines | 2 | one row | 430px | none |
| 390 | three intentional lines | 2 | one row | 420px | none |
| 320 | three intentional lines | 3 | one column | 555px | none |

The 12px scope remains subordinate to the existing 32–83px responsive H1.
The middle highlight is preserved and the header picker remains centered.
Measured intro positions use `.home-content h2`; the earlier raw measurement file's
`introTop: 0` referred to the hidden mobile Sheet heading and is superseded by
`hero-intro-measurements.json`.

Browser inspection additionally doubled all computed text sizes and line heights
at 320px, including px-based typography. The dark capture shows the heading parts
wrapping freely and the buttons remaining readable. The light capture adds WCAG
spacing overrides; long words use emergency wrapping without overflow or clipping.
These extreme settings increase page height, as expected. All injected styles,
QA state and viewport overrides were removed after inspection.

Validation: build; check:content (Astro, source registry, structure, completeness,
README and editorial links); test:site; check:ui; verifyMobileLayout in both themes
and motion preferences, including 200% root text/WCAG spacing; verifyGuidePickers
at seven widths in both themes, including keyboard, routes and axe; git diff --check.
All passed. Existing unrelated uncommitted work was preserved by comparison with
before-turn file hashes. HEAD remains 2e512183eaac319d1191950cf333d566f747c189 on local main.
No commit, push, PR, merge or deployment was performed.

Actual iOS Safari device zoom, browser chrome/status-bar tint, native scrollbars,
and device safe-area rendering remain unverified. Codex Chromium captures and
measurements do not establish real iPhone Safari parity.

## Approved compact editorial hero release

Reference: exec-4f1779b3-dd12-4ef4-9c10-08c06bfb45c8.png.

Compared the implemented homepage in the Codex browser at 1440, 768, 430, 390, and 320 CSS pixels in light and dark themes. Screenshots: /tmp/hero-final-{width}-{theme}.png. Desktop uses two title lines; mobile uses three. The light focal phrase is blue text; dark is white on cobalt. Existing buttons and subtitle are preserved. No document overflow in any case. The 320px button stack is the existing fallback. Independent 200% computed-font enlargement was visually inspected at 320px: heading, subtitle and controls reflow without clipping or horizontal overflow. Screenshot: /tmp/hero-release-200.png. Browser restored to normal view afterward.

Real iOS Safari hardware and Safari Page Zoom remain unverified.

final result: passed

Release validation update: clean final accessibility run passed all 306 cases across 17 routes, nine widths, and both themes, including typography, reflow, text spacing, text resize, and axe. Log: /tmp/hero-a11y-clean.log. Earlier interrupted build results were superseded by this complete uninterrupted run. The dark homepage picker uses a slight white mix into the existing blue for sufficient contrast. Final guide-picker checks passed seven widths in both themes.
