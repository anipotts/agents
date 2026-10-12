import { spawn, spawnSync } from 'node:child_process';
import { once } from 'node:events';
import path from 'node:path';
import process from 'node:process';
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { canonicalContentFiles } from '../src/content-manifest.mjs';
import { verifyChapterDisclosures } from './lib/check-chapter-navigation.mjs';
import { verifyPublicationMedia } from './lib/check-publication-media.mjs';
import { verifyGuidePickers } from './lib/check-guide-pickers.mjs';
import { verifyMobileLayout } from './lib/check-mobile-layout.mjs';

const previewPort = 4175;
const origin = `http://127.0.0.1:${previewPort}`;
const astro = path.join(process.cwd(), 'node_modules/astro/bin/astro.mjs');
const vite = path.join(process.cwd(), 'node_modules/vite/bin/vite.js');
const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };
if (!process.argv.includes('--skip-build')) {
  const build = spawnSync(process.execPath, [astro, 'build'], { stdio: 'inherit' });
  if (build.status !== 0) process.exit(build.status ?? 1);
}
const server = spawn(process.execPath, [vite, 'preview', '--host', '127.0.0.1', '--port', String(previewPort), '--strictPort'], { stdio: 'inherit' });
const serverExit = once(server, 'exit');
let browser;

try {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try { if ((await fetch(origin)).ok) break; } catch {}
    if (attempt === 39) throw new Error('astro preview did not become ready');
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin });
  const page = await context.newPage();
  const consoleErrors = [];
  const originalScreenshotRequests = [];
  page.on('request', (request) => {
    if (new URL(request.url()).pathname === '/media/guides/codex-handbook-workspace.png') originalScreenshotRequests.push(request.url());
  });
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('pageerror', (error) => consoleErrors.push(error.message));
  await page.addInitScript(() => { window.__navigationDocumentToken = crypto.randomUUID(); });

  await page.goto(`${origin}/guides/codex/`, { waitUntil: 'networkidle' });
  const documentToken = await page.evaluate(() => window.__navigationDocumentToken);
  expect(await page.title() === 'codex | coding agent tips', 'guide title is incorrect');
  expect(await page.locator('meta[name="astro-view-transitions-enabled"]').count() === 1, 'ClientRouter marker is missing');
  expect(await page.locator('.header-guides-compact .guide-page-options a[data-astro-prefetch="hover"]').count() >= 13, 'header guide picker must expose all public chapters');
  const expectedCodexRoutes = canonicalContentFiles().filter(({ route }) => route.startsWith('/guides/codex/')).map(({ route }) => route).sort();
  const prefetchedCodexRoutes = await page.locator('.publication-sidebar [data-sidebar="menu-button"][data-astro-prefetch="hover"]').evaluateAll((links) => links.map((link) => link.getAttribute('href')).sort());
  expect(JSON.stringify(prefetchedCodexRoutes) === JSON.stringify(expectedCodexRoutes), 'public desktop chapters are missing selective hover prefetching');
  expect(await page.locator('.publication-sidebar .guide-picker-trigger, .mobile-site-menu .guide-picker-trigger').count() === 0, 'guide selection belongs only in the header');
  expect(await page.locator('.sidebar-page-outline a[data-astro-prefetch]').count() === 0, 'hash links must not be prefetched');

  for (const viewport of [
    { width: 319, height: 856 },
    { width: 375, height: 812 },
    { width: 768, height: 1024 },
    { width: 1024, height: 900 },
    { width: 1440, height: 1024 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto(`${origin}/guides/codex/`, { waitUntil: 'networkidle' });
    const layout = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      sidebar: getComputedStyle(document.querySelector('.sidebar-pane')).display,
      mobileTrigger: getComputedStyle(document.querySelector('.mobile-site-menu-trigger')).display,
      progress: getComputedStyle(document.querySelector('.reading-progress-rail')).display,
      dualBar: document.querySelectorAll('.mobile-toc, .guide-context-bar').length,
      headerHeight: document.querySelector('.site-header').getBoundingClientRect().height,
      searchHeight: document.querySelector('.header-search site-search > button').getBoundingClientRect().height,
      headerControlHeights: [...document.querySelectorAll('.site-header-control')]
        .map((control) => control.getBoundingClientRect())
        .filter((bounds) => bounds.width > 0)
        .map((bounds) => bounds.height),
      pageActionHeights: [...document.querySelectorAll('.page-actions button')].map((control) => control.getBoundingClientRect().height),
      headerGroupsOverlap: (() => {
        const groups = [...document.querySelectorAll('.site-header .site-name, .header-guide-picker, .header-actions')]
          .map((element) => element.getBoundingClientRect());
        return groups.some((first, index) => groups.slice(index + 1).some((second) =>
          first.left < second.right && first.right > second.left && first.top < second.bottom && first.bottom > second.top
        ));
      })(),
    }));
    expect(layout.overflow === 0, `${viewport.width}px layout has horizontal overflow: ${layout.overflow}`);
    expect(layout.dualBar === 0, `${viewport.width}px layout renders the retired intermediate navigation bar`);
    expect(layout.searchHeight === 32, `${viewport.width}px search trigger does not use the compact 32px height`);
    expect(layout.headerControlHeights.every((height) => height === 32), `${viewport.width}px header actions do not share the compact 32px height`);
    expect(layout.pageActionHeights.every((height) => height === 32), `${viewport.width}px page actions do not share the compact 32px height`);
    expect(!layout.headerGroupsOverlap, `${viewport.width}px header groups overlap`);
    expect(Math.abs(layout.headerHeight - (viewport.width < 960 ? 52 : 64)) <= 1, `${viewport.width}px header height does not match its responsive row layout`);
    if (viewport.width < 768) {
      expect(layout.sidebar === 'none', 'mobile layout renders the desktop sidebar');
      expect(layout.mobileTrigger !== 'none', 'mobile layout hides the Sheet trigger');
    } else {
      expect(layout.sidebar !== 'none', `${viewport.width}px layout hides the persistent sidebar`);
      expect(layout.mobileTrigger === 'none', `${viewport.width}px layout renders the mobile Sheet trigger`);
    }
    expect((viewport.width >= 1024) === (layout.progress !== 'none'), `${viewport.width}px reading progress visibility is incorrect`);

    const theme = await page.locator('html').getAttribute('data-theme');
    await page.locator('[data-slot="theme-toggle"]').click();
    const toggled = await page.locator('html').getAttribute('data-theme');
    expect(toggled !== theme, `${viewport.width}px theme toggle did not change theme`);
    expect(await page.locator('html').evaluate((root) => root.classList.contains('dark') === (root.dataset.theme === 'dark')), `${viewport.width}px Starwind and Starlight theme state diverged`);
    for (let state = 0; state < 2; state++) {
      await page.locator('.header-search [data-open-modal]').click();
      const dialog = page.locator('.header-search dialog');
      await dialog.waitFor({ state: 'visible' });
      await page.waitForTimeout(200);
      const geometry = await dialog.evaluate((element) => {
        const input = element.querySelector('input');
        const rect = input.getBoundingClientRect();
        const logo = document.querySelector('.site-name img').getBoundingClientRect();
        const theme = document.querySelector('[data-slot="theme-toggle"]').getBoundingClientRect();
        return { height: rect.height, font: getComputedStyle(input).fontSize, fits: rect.left >= logo.right && rect.right <= theme.left };
      });
      expect(geometry.height === 32 && geometry.font === '12px' && geometry.fits, `${viewport.width}px search must fit between brand and utilities in both themes`);
      await dialog.locator('input').fill('configuration');
      expect(await dialog.locator('input').getAttribute('aria-label') === 'Search', 'search input needs an explicit accessible name');
      await dialog.locator('.pagefind-ui__result').first().waitFor();
      expect(await dialog.locator('.pagefind-ui__drawer').evaluate((element) => element.scrollWidth <= element.clientWidth + 1), `${viewport.width}px search results overflow horizontally`);
      await page.keyboard.press('Escape');
      await page.locator('[data-slot="theme-toggle"]').click();
    }
    await page.locator('[data-slot="theme-toggle"]').click();
  }

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${origin}/guides/codex/`, { waitUntil: 'networkidle' });
  const sheetTrigger = page.locator('.mobile-site-menu-trigger');
  await sheetTrigger.click();
  const sheet = page.locator('.mobile-site-menu[role="dialog"]');
  await sheet.waitFor({ state: 'visible' });
  const mobileHeadings = await sheet.locator('.is-current-chapter .mobile-page-outline a').allTextContents();
  const desktopHeadings = await page.locator('.publication-sidebar .is-current-chapter .sidebar-page-outline a').allTextContents();
  expect(JSON.stringify(mobileHeadings.map((text) => text.trim())) === JSON.stringify(desktopHeadings.map((text) => text.trim())), 'mobile and desktop heading outlines differ');
  expect(await sheet.locator('.mobile-page-outline li[style*="1"]').count() > 0, 'mobile outline is missing subsection indentation');
  const sheetAccessibility = await new AxeBuilder({ page }).include('.mobile-site-menu').analyze();
  expect(sheetAccessibility.violations.length === 0, `mobile Sheet accessibility: ${sheetAccessibility.violations.map(({ id }) => id).join(', ')}`);
  expect(await sheet.evaluate((element) => element.scrollWidth <= element.clientWidth), 'mobile Sheet overflows horizontally');
  expect(await page.evaluate(() => document.querySelector('.mobile-site-menu')?.contains(document.activeElement)), 'mobile Sheet does not move focus inside');
  await page.keyboard.press('Escape');
  await sheet.waitFor({ state: 'hidden' });
  expect(await sheetTrigger.evaluate((trigger) => document.activeElement === trigger), 'mobile Sheet does not restore trigger focus');
  await sheetTrigger.click();
  await sheet.locator('a[href="/guides/codex/configuration/"]').click();
  await page.waitForURL('**/guides/codex/configuration/');
  await sheet.waitFor({ state: 'hidden' });
  await page.goBack();
  await page.waitForURL('**/guides/codex/');
  await page.waitForFunction(() => document.querySelector('[data-copy-page]'));

  await sheetTrigger.click();
  const mobileHeading = sheet.locator('.mobile-page-outline a').first();
  const mobileHash = await mobileHeading.getAttribute('href');
  await mobileHeading.click();
  await sheet.waitFor({ state: 'hidden' });
  expect(new URL(page.url()).hash === mobileHash, 'mobile heading navigation lost its anchor');

  await page.locator('.header-search [data-open-modal]').click();
  const search = page.locator('.header-search site-search dialog');
  await search.waitFor({ state: 'visible' });
  await page.waitForTimeout(180);
  const searchBox = await search.evaluate((element) => {
    const box = element.getBoundingClientRect();
    const trigger = document.querySelector('.header-search [data-open-modal]').getBoundingClientRect();
    const backdrop = getComputedStyle(element, '::backdrop');
    return {
      x: box.x,
      y: box.y,
      width: box.width,
      height: box.height,
      innerWidth,
      innerHeight,
      triggerTop: trigger.top,
      triggerLeft: trigger.left,
      triggerRight: trigger.right,
      triggerWidth: trigger.width,
      backdropColor: backdrop.backgroundColor,
      backdropFilter: backdrop.backdropFilter,
    };
  });
  expect(Math.abs(searchBox.y - searchBox.triggerTop) <= 2 && searchBox.x <= searchBox.triggerLeft && searchBox.x + searchBox.width >= searchBox.triggerRight, 'mobile search does not expand through the header trigger');
  expect(searchBox.width > 180 && Math.abs(searchBox.width - searchBox.triggerWidth) < 2, 'mobile search does not occupy its reserved header space');
  const inputStyle = await search.locator('input').first().evaluate((input) => ({ height: input.getBoundingClientRect().height, font: getComputedStyle(input).fontSize, shadow: getComputedStyle(input).boxShadow }));
  expect(inputStyle.height === 32 && inputStyle.font === '12px' && inputStyle.shadow === 'none', 'search input diverges from compact control sizing');
  expect(searchBox.x >= 15 && searchBox.width <= searchBox.innerWidth - 30 && searchBox.height < searchBox.innerHeight * .75, 'mobile search is not a compact inset popover');
  expect(searchBox.backdropColor === 'rgba(0, 0, 0, 0)' && searchBox.backdropFilter === 'none', 'mobile search still obscures or blurs the page');
  await search.locator('input[type="text"], input[type="search"]').first().fill('codex');
  await search.locator('.pagefind-ui__result').first().waitFor({ state: 'visible', timeout: 5000 });
  await page.keyboard.press('Escape');
  await search.waitFor({ state: 'hidden' });

  const sources = page.locator('.page-sources');
  const sourceTrigger = sources.locator('[data-sw-accordion-trigger]');
  expect(await sources.getAttribute('data-state') === 'closed', 'sources accordion is open by default');
  await sourceTrigger.click();
  expect(await sources.getAttribute('data-state') === 'open', 'sources accordion did not open');
  expect(await sources.locator('.source-publisher').count() > 0, 'sources accordion has no publisher groups');
  await sourceTrigger.click();
  expect(await sources.getAttribute('data-state') === 'closed', 'sources accordion did not close');

  await page.locator('[aria-label="more page actions"]').click();
  const menu = page.locator('[role="menu"]:visible');
  await menu.waitFor({ state: 'visible' });
  expect((await menu.locator('[role="menuitem"]').allTextContents()).map((text) => text.trim()).join('|') === 'view Markdown|copy page link|edit on GitHub', 'page action menu contents are incorrect');
  expect(await menu.locator('[role="menuitem"]').evaluateAll((items) => items.every((item) => getComputedStyle(item).fontSize === '12px' && getComputedStyle(item).textDecorationLine === 'none')), 'portaled menu items must retain compact typography without prose underlines');
  await page.keyboard.press('Escape');
  await menu.waitFor({ state: 'hidden' });
  await page.locator('[aria-label="more page actions"]').click();
  await page.evaluate(() => window.scrollBy(0, 150));
  await menu.waitFor({ state: 'hidden' });
  expect(await page.evaluate(() => window.scrollY >= 150), 'scroll dismissal must not jump back to the page-action trigger');
  await page.locator('[data-copy-page]').click();
  await page.waitForFunction(() => navigator.clipboard.readText().then((text) => text.startsWith('# codex')));

  const figure = page.locator('.surface-bento figure').first();
  expect(await figure.locator('figcaption').evaluate((caption) => getComputedStyle(caption).display) === 'none', 'dialog-enabled image caption is visible in the reading flow');
  const imageTrigger = figure.locator('[data-publication-image-trigger]');
  expect(await figure.locator('img').evaluate((image) => image.currentSrc.includes('codex-handbook-workspace-') && image.currentSrc.endsWith('.webp')), 'inline Codex screenshot does not use a responsive derivative');
  expect(originalScreenshotRequests.length === 0, 'full-resolution Codex screenshot downloaded before user enlargement');
  await imageTrigger.click();
  const imageDialog = page.locator('#publication-image-dialog[role="dialog"]');
  await imageDialog.waitFor({ state: 'visible' });
  expect(await imageDialog.locator('[data-publication-dialog-image]').getAttribute('src') === '/media/guides/codex-handbook-workspace.png', 'image dialog must load the full-resolution original on demand');
  await imageDialog.locator('[data-publication-dialog-image]').evaluate((image) => image.decode());
  expect(await imageDialog.locator('[data-publication-dialog-image]').evaluate((image) => image.naturalWidth) === 3600, 'enlarged Codex screenshot must retain the supplied resolution');
  expect((await imageDialog.locator('[data-publication-dialog-caption]').textContent())?.trim() === 'a screenshot of me working on some personal projects and some content for a brand deal.', 'enlarged image is missing its caption');
  await page.keyboard.press('Escape');
  await imageDialog.waitFor({ state: 'hidden' });
  expect(await imageTrigger.evaluate((trigger) => document.activeElement === trigger), 'image dialog does not restore trigger focus');

  await page.setViewportSize({ width: 1440, height: 1024 });
  await page.goto(`${origin}/guides/codex/`, { waitUntil: 'networkidle' });
  const sourcePreview = page.locator('.sl-markdown-content .registered-link-hover-card').first();
  await sourcePreview.locator('[data-sw-preview-card-trigger]').hover();
  await page.waitForFunction(() => document.querySelector('.sl-markdown-content .registered-link-hover-card')?.getAttribute('data-state') === 'open');
  await page.locator('.registered-link-card[data-state="open"]').waitFor({ state: 'visible' });
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.querySelector('.sl-markdown-content .registered-link-hover-card')?.getAttribute('data-state') === 'closed');

  const sidebar = page.locator('.publication-sidebar-provider');
  const sidebarTrigger = sidebar.locator('[data-sw-sidebar-trigger]').first();
  const chromeStyles = await page.evaluate(() => {
    const box = (selector) => {
      const element = document.querySelector(selector);
      const styles = getComputedStyle(element);
      const bounds = element.getBoundingClientRect();
      return {
        borderStyle: styles.borderStyle,
        height: bounds.height,
        width: bounds.width,
      };
    };
    return {
      controls: [
        box('[data-slot="theme-toggle"]'),
        box('.github-link'),
        box('[data-sw-sidebar-trigger]'),
      ],
      listMarkers: [...document.querySelectorAll('.publication-sidebar li')]
        .filter((item) => getComputedStyle(item).listStyleType !== 'none').length,
      outlineRule: getComputedStyle(document.querySelector('.sidebar-page-outline')).borderInlineStartWidth,
      railHeaderHeight: document.querySelector('.handbook-rail-head').getBoundingClientRect().height,
      siteHeaderHeight: document.querySelector('.site-header').getBoundingClientRect().height,
    };
  });
  expect(chromeStyles.controls.every((control) => control.width === 32 && control.height === 32), 'header and sidebar controls do not share a compact 32px footprint');
  expect(chromeStyles.controls.every((control) => control.borderStyle !== 'outset'), 'native browser borders leak into Starwind controls');
  expect(chromeStyles.listMarkers === 0, 'browser list markers leak into the guide sidebar');
  expect(chromeStyles.outlineRule === '0px', 'the retired heading connector rule remains visible');
  expect(chromeStyles.railHeaderHeight >= 48 && chromeStyles.railHeaderHeight <= 52, 'sidebar collapse row must remain compact');

  await page.locator('[data-slot="theme-toggle"]').click();
  const darkChrome = await page.evaluate(() => {
    const probe = document.createElement('span');
    probe.style.color = 'var(--surface-subtle)';
    document.body.append(probe);
    const surfaceSubtle = getComputedStyle(probe).color;
    probe.style.color = 'var(--surface-canvas)';
    const canvasBackground = getComputedStyle(probe).color;
    probe.remove();
    return {
      kbdBackground: getComputedStyle(document.querySelector('.header-search kbd')).backgroundColor,
      surfaceSubtle,
      sidebarBackground: getComputedStyle(document.querySelector('.publication-sidebar [data-slot="sidebar-inner"]')).backgroundColor,
      canvasBackground,
    };
  });
  expect(darkChrome.kbdBackground === darkChrome.surfaceSubtle, 'dark search shortcut does not use the dark subtle surface');
  expect(darkChrome.sidebarBackground === darkChrome.canvasBackground, 'dark sidebar uses a mismatched surface color');
  await page.locator('[data-slot="theme-toggle"]').click();

  expect(await sidebar.getAttribute('data-state') === 'expanded', 'desktop sidebar is not expanded initially');
  await sidebarTrigger.click();
  expect(await sidebar.getAttribute('data-state') === 'collapsed', 'desktop sidebar did not collapse');
  await page.waitForFunction(() => Math.abs(document.querySelector('.publication-sidebar')?.getBoundingClientRect().width - 56) < 1);
  const collapsedAlignment = await page.evaluate(() => {
    const visible = (selector) => [...document.querySelectorAll(selector)].find((element) => element.getClientRects().length > 0);
    const rail = visible('.publication-sidebar').getBoundingClientRect();
    const trigger = visible('[data-sw-sidebar-trigger]').getBoundingClientRect();
    const chapterButtons = [...document.querySelectorAll('[data-sidebar="menu-button"]')]
      .filter((element) => element.getClientRects().length > 0)
      .map((element) => element.getBoundingClientRect());
    const center = (bounds) => bounds.left + bounds.width / 2;
    return {
      triggerDelta: Math.abs(center(trigger) - center(rail)),
      chapterDeltas: chapterButtons.map((button) => Math.abs(center(button) - center(rail))),
      horizontalInset: (rail.width - trigger.width) / 2,
      verticalInset: (visible('.handbook-rail-head').getBoundingClientRect().height - trigger.height) / 2,
    };
  });
  expect(collapsedAlignment.triggerDelta < 1, 'collapsed sidebar trigger is not centered in the rail');
  expect(collapsedAlignment.chapterDeltas.every((delta) => delta < 1), 'collapsed chapter buttons are not centered in the rail');
  expect(Math.abs(collapsedAlignment.horizontalInset - collapsedAlignment.verticalInset) < 1, 'collapsed sidebar trigger does not have equal vertical and horizontal spacing');
  expect(await page.locator('.publication-sidebar .is-current-chapter .sidebar-page-outline').evaluate((outline) => getComputedStyle(outline).display) === 'none', 'heading outline remains visible in icon-collapse mode');
  expect(await page.locator('.right-sidebar-container').evaluate((rail) => rail.getBoundingClientRect().width) === 0, 'retired right sidebar retains width');
  await sidebarTrigger.click();
  expect(await sidebar.getAttribute('data-state') === 'expanded', 'desktop sidebar did not expand');

  const desktopDocumentToken = await page.evaluate(() => window.__navigationDocumentToken);
  await page.locator('.publication-sidebar .chapter-menu a[href="/guides/codex/configuration/"]').click();
  await page.waitForURL('**/guides/codex/configuration/');
  expect(desktopDocumentToken === await page.evaluate(() => window.__navigationDocumentToken), 'chapter navigation caused a full reload');
  expect(await page.locator('html').evaluate((root) => root.classList.contains('dark') === (root.dataset.theme === 'dark')), 'Starwind and Starlight theme state diverged after chapter navigation');
  expect((await page.locator('.publication-sidebar .chapter-menu [aria-current="page"]').textContent())?.trim() === 'settings and memory', 'sidebar active chapter did not update');
  await page.goBack();
  await page.waitForURL('**/guides/codex/');
  await page.waitForFunction(() => document.querySelector('.publication-sidebar .chapter-menu [aria-current="page"]')?.getAttribute('href') === '/guides/codex/');
  const hash = await page.locator('.publication-sidebar .is-current-chapter .sidebar-page-outline a[href^="#"]').first().getAttribute('href');
  expect(Boolean(hash), 'page outline has no heading links');
  if (hash) {
    await page.locator(`.publication-sidebar .is-current-chapter .sidebar-page-outline a[href="${hash}"]`).evaluate((link) => link.click());
    await page.waitForURL(`**/guides/codex/${hash}`);
    expect(await page.locator(hash).count() === 1, 'hash target is missing');
  }
  await page.evaluate(() => scrollTo(0, Math.max(1, (document.documentElement.scrollHeight - innerHeight) * .5)));
  await page.waitForTimeout(100);
  expect(Number(await page.locator('.reading-progress').getAttribute('aria-valuenow')) > 0, 'reading progress did not react to scrolling');

  await page.goto(`${origin}/guides/grok/configuration/`, { waitUntil: 'networkidle' });
  const tableArea = page.locator('.publication-scroll-area').first();
  expect(await tableArea.locator('table[tabindex="0"][aria-label="scrollable comparison table"]').count() === 1, 'wide table is not wrapped in a build-time Starwind ScrollArea');

  const codeCopy = page.locator('[data-code-copy]').first();
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${origin}/archive/claude-code-tools/`, { waitUntil: 'networkidle' });
    expect((await page.locator('.header-guides-compact .guide-picker-trigger').textContent()).trim() === 'claude code', 'archive must activate Claude Code in the guide picker');
    expect(await page.locator('.publication-sidebar .chapter-menu [aria-current="page"]').getAttribute('href') === '/archive/claude-code-tools/', 'archive must remain reachable and active in the Claude Code chapter list');
    const archiveGroup = page.locator('.header-guides-compact .guide-page-options [data-slot="dropdown-group"]').filter({ has: page.locator('a[href="/archive/claude-code-tools/"]') });
    expect((await archiveGroup.locator('[data-slot="dropdown-label"]').textContent())?.trim() === 'claude code', 'mobile archive entry must be grouped under Claude Code');
    await page.mouse.move(0, 0);
    await codeCopy.hover();
    const tooltip = page.locator('.code-copy-tooltip:not([hidden])');
    await tooltip.waitFor({ state: 'visible' });
    await page.waitForFunction(() => document.querySelector('.code-copy-tooltip:not([hidden])')?.getAttribute('data-side') === 'left');
    const tooltipGeometry = await tooltip.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      const styles = getComputedStyle(element);
      const trigger = document.querySelector(`[aria-describedby="${element.id}"]`);
      const frame = trigger?.closest('.code-frame')?.getBoundingClientRect();
      return { height: bounds.height, lineHeight: Number.parseFloat(styles.lineHeight), padding: Number.parseFloat(styles.paddingTop) + Number.parseFloat(styles.paddingBottom), top: bounds.top, frameTop: frame?.top, left: bounds.left, right: bounds.right };
    });
    expect(tooltipGeometry.height <= tooltipGeometry.lineHeight + tooltipGeometry.padding + 1, 'copy tooltip must remain one line');
    expect(tooltipGeometry.top >= tooltipGeometry.frameTop && tooltipGeometry.left >= 0 && tooltipGeometry.right <= width, 'copy tooltip must stay beside the button inside the code frame');
    await codeCopy.click();
    await page.waitForFunction(() => navigator.clipboard.readText().then((text) => text.includes('claude-code')));
    const copiedToast = page.locator('[data-slot="toast"]').filter({ hasText: 'code copied' });
    await copiedToast.waitFor({ state: 'visible' });
    expect(await copiedToast.locator('[data-slot="toast-action"]').isHidden(), 'copy confirmation must not show an unused Action button');
    await copiedToast.locator('[data-slot="toast-close"]').click();
    await copiedToast.waitFor({ state: 'hidden' });
  }

  const reducedContext = await browser.newContext({ viewport: { width: 1024, height: 900 }, reducedMotion: 'reduce' });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto(`${origin}/guides/codex/`, { waitUntil: 'networkidle' });
  expect(await reducedPage.locator('.header-guide-picker-trigger:visible').first().evaluate((link) => Number.parseFloat(getComputedStyle(link).transitionDuration) <= .001), 'reduced motion does not suppress interface transitions');
  await reducedContext.close();

  await verifyChapterDisclosures({ browser, origin });
  await verifyPublicationMedia({ browser, origin });
  await verifyGuidePickers({ browser, origin });
  await verifyMobileLayout({ browser, origin });

  expect(consoleErrors.length === 0, `browser console errors: ${consoleErrors.join(' | ')}`);
} finally {
  await browser?.close();
  if (server.exitCode === null && server.signalCode === null) server.kill('SIGTERM');
  await serverExit;
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Starwind navigation, controls, publication primitives, routing, progress, and reduced-motion checks passed');
