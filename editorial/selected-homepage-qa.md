# Selected homepage and guide navigation QA

Date: September 8, 2026. Local editorial worktree, after `dce8c0a`.

## Target and evidence

Ani selected the quiet neutral provider buttons in the attached homepage mockup.
The subsequent browser annotation changes the subtitle to “practical guidance
for working with AI under constraints and tradeoffs of the real world.”
That exact copy supersedes the subtitle in the reference image.

- Source: [selected-homepage/selected-reference.png](~/.codex/visualizations/2026/09/05/01a0732a-9d13-77b0-9c4e-95fd13d35689/selected-homepage/selected-reference.png), 1487 × 1058 pixels.
- Implementation: http://127.0.0.1:4330/, desktop light theme, scroll position 0, menus closed.
- Final capture: [desktop-light-final.png](~/.codex/visualizations/2026/09/05/01a0732a-9d13-77b0-9c4e-95fd13d35689/selected-homepage/desktop-light-final.png), 1487 × 1058 CSS pixels and image pixels, DPR 1.
- Initial capture: [desktop-before.png](~/.codex/visualizations/2026/09/05/01a0732a-9d13-77b0-9c4e-95fd13d35689/selected-homepage/desktop-before.png), 1488 × 1056; the final comparison removes this initial one-pixel width / two-pixel height mismatch.
- Responsive captures: [mobile light](~/.codex/visualizations/2026/09/05/01a0732a-9d13-77b0-9c4e-95fd13d35689/selected-homepage/mobile-light.png), [mobile dark](~/.codex/visualizations/2026/09/05/01a0732a-9d13-77b0-9c4e-95fd13d35689/selected-homepage/mobile-dark.png), [mobile picker dark](~/.codex/visualizations/2026/09/05/01a0732a-9d13-77b0-9c4e-95fd13d35689/selected-homepage/mobile-picker-dark.png), all 319 × 856 at DPR 1.
- Guide view: [sidebar picker](~/.codex/visualizations/2026/09/05/01a0732a-9d13-77b0-9c4e-95fd13d35689/selected-homepage/sidebar-picker.png), 1488 × 1056 at DPR 1.

The reference and final browser capture were opened together in the same
comparison input. No image scaling or device-density normalization was needed
for the final comparison. The full viewport resolves the header, highlight,
subtitle, buttons, and beginning of the following section at readable size;
separate cropped reference regions were unnecessary. Mobile and open menus
are responsive adaptations of the selected desktop target.

## Comparison history

1. P1: the first rendered hero was too narrow and small, and the following
   section began too early. Changed the homepage container from 76rem to
   82rem, capped desktop display type at 86px, matched desktop reading type
   and spacing, and placed the neutral provider buttons immediately after
   the subtitle. The final screenshot shows the intended three-line headline,
   compact horizontal buttons, and breathing room before “why i made this”.
2. P2: the Claude app tile differed from the selected transparent star. Reused
   the existing official Claude SVG for the hero. Grok uses its real product
   asset with theme-aware rendering. All buttons share the highlight's 8px
   radius and use the existing Tabler arrow asset.
3. P1: the mobile header menu aligned partly offscreen at 319px (left -56px).
   Constrained this placement to existing mobile gutters below 48rem. The
   final browser geometry is x=16, width=287, right=303 at a 319px viewport.
   The desktop sidebar and mobile Sheet continue to use the shared picker.
4. P2: the sidebar dropdown's inline baseline made its header 65.5px rather
   than 64px. Its wrapper now uses flex, its trigger is 32px, and the provider
   mark retains its own width. Browser geometry verifies a 64px rail header.
5. P2: the Codex label's dark contrast was marginal on the neutral button.
   Use the existing strong accent token in dark mode and the site's supported
   600 weight. The subsequent mobile dark capture retains the provider identity
   and readable text. Focus outlines sit inside menu items to avoid clipping.

The selected visual composition has no remaining actionable P0/P1/P2
mismatches. Small P3 differences follow the existing publication system:
64px desktop header, real supplied product marks, flat cobalt fill, and the
existing ink/link colors. The generated reference's decorative color shifts
and logo treatment are not used as replacement brand assets.

## Behavior and implementation

- One `GuidePicker.astro` renders the homepage, sidebar, and mobile placements
  from canonical page metadata, including provider groups and indented chapters.
- Provider CTAs are real links and remain in document order after the subtitle.
- Shared hero metadata is supplied as explicit Markdown processor options so
  Astro includes it in the content cache digest. A subsequent build refreshed
  the Claude hero asset without editing the Markdown body.
- Header and sidebar switching, back navigation, keyboard Enter/Escape, focus
  restoration, mobile Sheet behavior, search, copy actions, carousel controls,
  heading navigation, and reduced motion pass the navigation regression suite.
- The new picker suite covers 319, 375, 768, 959, 960, 1024, and 1440 pixels in
  both themes, verifies archive placement under Claude, and runs axe on menus.
- Browser console inspection: no errors or warnings on the checked homepage.
- Static routes, metadata, sitemap, links, UI ownership, content/type checks,
  and the agent-facing surface checks passed.
- HTML budget is now 28 KiB compressed to include both static picker placements;
  the largest current guide is about 26.4 KiB. Existing CSS, JavaScript, fonts,
  and media budgets pass without raising their limits.
- Full accessibility audit of the stable final build: passed all 306 route,
  viewport, and theme combinations, including text spacing, text resize,
  reflow, and axe checks. Final navigation and accessibility runs used the
  same completed build; no build writes occurred during those final runs.

## Result

Visual comparison and the final automated checks passed. No actionable
P0/P1/P2 findings remain. This is a local preview; no release was performed.

final result: passed
