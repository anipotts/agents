import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import AxeBuilder from '@axe-core/playwright';

export async function verifyChapterDisclosures({ browser, origin }) {
  const folder = process.env.NAVIGATION_SCREENSHOT_DIR ?? path.join(os.tmpdir(), 'agents-chapter-navigation');
  await mkdir(folder, { recursive: true });
  const catalog = JSON.parse(await readFile(path.join(process.cwd(), 'dist/agent-catalog.json'), 'utf8'));
  const expectedPages = catalog.pages.filter((page) => page.scope === 'claude-code');
  const route = '/guides/claude-code/';
  const configuration = '/guides/claude-code/configuration/';
  const results = [];
  for (const width of [375, 907, 1440]) for (const colorScheme of ['light', 'dark']) {
    const context = await browser.newContext({ viewport: { width, height: 856 }, colorScheme });
    const page = await context.newPage();
    const errors = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    try {
      await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' });
      const mobile = width < 768;
      if (mobile) {
        await page.locator('.mobile-site-menu-trigger').click();
        await page.locator('.mobile-site-menu').waitFor({ state: 'visible' });
      }
      const menu = page.locator(`[data-chapter-menu="${mobile ? 'mobile' : 'desktop'}"]`);
      assert.deepEqual((await menu.locator('[data-chapter-route]').evaluateAll((items) => items.map((item) => item.dataset.chapterRoute))).sort(), expectedPages.map((item) => item.route).sort(), 'chapter menu must contain exactly the public scope, excluding drafts');
      for (const expected of expectedPages) {
        const item = menu.locator(`[data-chapter-route="${expected.route}"]`);
        const toggle = item.locator('.chapter-toggle');
        const panelId = await toggle.getAttribute('aria-controls');
        assert.equal(await toggle.getAttribute('aria-expanded'), String(expected.route === route));
        assert.equal(await item.locator(`#${panelId}`).isVisible(), expected.route === route);
        const headings = await item.locator('.sidebar-page-outline a').evaluateAll((links) => links.map((link) => ({ text: link.textContent.trim(), href: link.getAttribute('href'), depth: Number(link.closest('[data-heading-depth]').dataset.headingDepth) })));
        assert.deepEqual(headings, expected.sections.filter((heading) => heading.depth === 2 || heading.depth === 3).map((heading) => ({ text: heading.title, href: `${expected.route === route ? '' : expected.route}#${heading.anchor}`, depth: heading.depth })), 'chapter H2/H3 links must match the canonical heading catalog');
      }
      const current = menu.locator(`[data-chapter-route="${route}"]`);
      const other = menu.locator(`[data-chapter-route="${configuration}"]`);
      const toggle = other.locator('.chapter-toggle');
      await toggle.focus();
      await page.keyboard.press('Space');
      await other.locator('.chapter-outline-panel').waitFor({ state: 'visible' });
      assert.equal(page.url(), `${origin}${route}`, 'expanding another chapter must not navigate');
      assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
      assert.equal(await current.locator('.chapter-toggle').getAttribute('aria-expanded'), 'true', 'chapters expand independently');
      const indentation = await other.locator('[data-heading-depth]').evaluateAll((items) => items.map((item) => ({ depth: Number(item.dataset.headingDepth), inset: parseFloat(getComputedStyle(item).paddingInlineStart) })));
      assert.ok(indentation.find((item) => item.depth === 3).inset > indentation.find((item) => item.depth === 2).inset, 'H3s must indent beneath H2s');
      await page.keyboard.press('Enter');
      await other.locator('.chapter-outline-panel').waitFor({ state: 'hidden' });
      assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
      await toggle.click();
      await other.locator('.chapter-outline-panel').waitFor({ state: 'visible' });
      const geometry = await menu.locator('.chapter-row').evaluateAll((rows) => rows.map((row) => {
        const rowBounds = row.getBoundingClientRect();
        const link = row.querySelector('a').getBoundingClientRect();
        const button = row.querySelector('.chapter-toggle').getBoundingClientRect();
        const icon = row.querySelector('.chapter-toggle svg').getBoundingClientRect();
        return { rowHeight: rowBounds.height, buttonWidth: button.width, buttonHeight: button.height, linkWidthGap: Math.abs(rowBounds.width - link.width), centerDelta: Math.abs(icon.y + icon.height / 2 - link.y - link.height / 2), topInset: button.top - link.top, bottomInset: link.bottom - button.bottom, rightInset: rowBounds.right - button.right };
      }));
      assert.ok(geometry.every((item) => item.rowHeight <= 28.5 && item.buttonWidth >= 24 && item.buttonHeight >= 24 && item.centerDelta <= 1 && item.topInset >= 0 && item.bottomInset >= 0 && Math.abs(item.rightInset - 4) <= 1), 'carets must remain compact, centered and inside their row with a 24px target');
      assert.ok(geometry.every((item) => item.linkWidthGap <= 1), 'chapter links and selected backgrounds must span the full row beneath the caret');
      const report = await new AxeBuilder({ page }).include(mobile ? '.mobile-site-menu' : '.publication-sidebar').analyze();
      assert.deepEqual(report.violations.filter((item) => ['serious', 'critical'].includes(item.impact)), [], 'chapter disclosure accessibility');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth), false);
      const screenshot = path.join(folder, `chapters-${width}-${colorScheme}.png`);
      await page.screenshot({ path: screenshot });
      const heading = other.locator('[data-heading-depth="3"] a').first();
      const target = await heading.getAttribute('href');
      await heading.click();
      await page.waitForURL(`${origin}${target}`);
      if (mobile) await page.locator('.mobile-site-menu').waitFor({ state: 'hidden' });
      const hash = new URL(page.url()).hash.slice(1);
      assert.equal(await page.locator(`[id="${hash}"]`).count(), 1, 'another chapter heading must open its actual target');
      await page.waitForFunction((id) => [...document.querySelectorAll('.is-current-chapter [data-heading-id]')].some((link) => link.dataset.headingId === id && link.dataset.active === 'true'), hash);
      const newMenu = page.locator(`[data-chapter-menu="${mobile ? 'mobile' : 'desktop'}"]`);
      assert.equal(await newMenu.locator(`[data-chapter-route="${configuration}"] .chapter-toggle`).getAttribute('aria-expanded'), 'true', 'destination chapter must open by default');
      if (mobile) {
        await page.locator('.mobile-site-menu-trigger').click();
        await page.locator('.mobile-site-menu').waitFor({ state: 'visible' });
      }
      await newMenu.locator(`[data-chapter-route="${route}"] .chapter-row a`).click();
      await page.waitForURL(`${origin}${route}`);
      if (!mobile) {
        await page.locator('.publication-sidebar [data-sw-sidebar-trigger]').click();
        await page.waitForFunction(() => document.querySelector('.publication-sidebar')?.dataset.state === 'collapsed');
        assert.equal(await page.locator('.publication-sidebar .chapter-toggle:visible').count(), 0);
        assert.equal(await page.locator('.publication-sidebar .sidebar-page-outline:visible').count(), 0);
      }
      assert.deepEqual(errors, []);
      results.push({ width, colorScheme, geometry, screenshot, keyboard: 'Space/Enter toggle independently', hashNavigation: target, accessibility: 'no serious/critical findings', errors });
    } finally { await context.close(); }
  }
  await writeFile(path.join(folder, 'summary.json'), `${JSON.stringify(results, null, 2)}\n`);
  console.log(`chapter disclosure keyboard, hash, mobile, theme and geometry checks passed; screenshots: ${folder}`);
}
