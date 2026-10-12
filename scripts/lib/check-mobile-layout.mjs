import assert from 'node:assert/strict';
import AxeBuilder from '@axe-core/playwright';

export async function verifyMobileLayout({ browser, origin }) {
  for (const colorScheme of ['light', 'dark']) {
    for (const reducedMotion of ['no-preference', 'reduce']) {
      const context = await browser.newContext({ viewport: { width: 319, height: 856 }, colorScheme, reducedMotion });
      await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      try {
        await page.goto(origin, { waitUntil: 'networkidle' });
        assert.equal(await page.locator('.hero-provider-link').count(), 3);
        assert.equal(await page.locator('.home-guide-list a').count(), 4);
        await page.locator('.hero-provider-link').first().focus();
        await page.keyboard.press('Tab');
        assert.ok(await page.locator('.hero-provider-claude-code').evaluate((el) => el === document.activeElement));
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'homepage reflows without horizontal scrolling');
        assert.ok(await page.locator('.footer-site-name span').isVisible(), 'footer keeps its site name at 319px');
        assert.equal(await page.locator('.footer-meta').evaluate((el) => el.getBoundingClientRect().height), 18, 'compact footer timestamp uses one line');
        assert.ok((await page.locator('.footer-meta time').getAttribute('title')).includes('ET'), 'full timestamp remains available');
        await page.setViewportSize({ width: 320, height: 856 });
        const spacing = await page.addStyleTag({ content: 'html{font-size:200%!important} *{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important} p{margin-bottom:2em!important}' });
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'homepage supports 200% root text and WCAG spacing at 320px');
        await spacing.evaluate((el) => el.remove());
        await page.setViewportSize({ width: 319, height: 856 });
        await page.goto(`${origin}/handbook/operating-agents/`, { waitUntil: 'networkidle' });
        const titleGeometry = await page.locator('.page-title-row').evaluate((el) => {
          const title = el.querySelector('h1').getBoundingClientRect();
          const actions = el.querySelector('.page-actions').getBoundingClientRect();
          return { title: title.toJSON(), actions: actions.toJSON() };
        });
        assert.ok(titleGeometry.title.height < 40, 'short mobile page title fits one line');
        assert.ok(titleGeometry.title.right <= titleGeometry.actions.left, 'title and page actions do not overlap');
        await page.getByRole('button', { name: 'copy page as Markdown', exact: true }).click();
        await page.waitForFunction(() => navigator.clipboard.readText().then((text) => text.includes('# start here')));
        const example = page.locator('.example-block').first();
        const code = await example.locator('pre').textContent();
        const geometry = await example.evaluate((el) => {
          const frame = el.getBoundingClientRect();
          const pre = el.querySelector('pre').getBoundingClientRect();
          const label = el.querySelector('.example-label').getBoundingClientRect();
          const button = el.querySelector('[data-code-copy]').getBoundingClientRect();
          return { inside: button.left >= frame.left && button.right <= frame.right && button.bottom < frame.bottom, header: button.top >= label.top && button.bottom <= pre.top, height: frame.height };
        });
        assert.ok(geometry.inside && geometry.header, 'example copy shares the label row and clears the prompt');
        assert.ok(geometry.height < 100, 'one-line example remains compact');
        await example.locator('[data-code-copy]').click();
        assert.equal((await page.evaluate(() => navigator.clipboard.readText())).trim(), code.trim(), 'example copy preserves exact prompt');
        await page.evaluate(() => scrollTo(0, 0));
        const searchTrigger = page.locator('.header-search [data-open-modal]');
        for (let attempt = 0; attempt < 2; attempt++) {
          await searchTrigger.focus();
          await page.keyboard.press('Enter');
          const input = page.locator('.header-search input');
          await input.waitFor({ state: 'visible' });
          assert.equal(await page.locator('.header-search dialog').evaluate((el) => getComputedStyle(el).animationName), 'none', 'search opens without a width animation');
          await input.fill('configuration');
          await page.locator('.header-search .pagefind-ui__result').first().waitFor({ state: 'visible' });
          await page.keyboard.press('Escape');
          assert.ok(await searchTrigger.evaluate((el) => el === document.activeElement), 'search dismissal restores trigger focus');
        }
        await page.locator('.header-guides-compact .guide-picker-trigger').click();
        const picker = page.locator('.guide-page-options:visible');
        await picker.waitFor({ state: 'visible' });
        assert.ok(await picker.locator('a').evaluateAll((links) => links.every((link) => link.querySelector('svg[aria-hidden="true"]'))), 'every picker page has a decorative chapter icon');
        assert.equal(await picker.locator('[data-slot="dropdown-label"] .provider-product-icon').count(), 4, 'picker group labels use all four provider identities');
        await page.waitForFunction(() => {
          const viewport = document.querySelector('.guide-page-options[data-state="open"] .guide-page-options-scroll').getBoundingClientRect();
          return [...document.querySelectorAll('.guide-page-options[data-state="open"] img')].filter((image) => {
            const rect = image.getBoundingClientRect();
            return rect.height > 0 && rect.bottom > viewport.top && rect.top < viewport.bottom;
          }).every((image) => image.complete && image.naturalWidth > 0);
        });
        const report = await new AxeBuilder({ page }).include('.guide-page-options[data-state="open"]').analyze();
        assert.deepEqual(report.violations.map(({ id }) => id), [], 'mobile picker passes axe');
        await page.keyboard.press('Escape');
        await picker.waitFor({ state: 'hidden' });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), 0, 'mobile page has no horizontal overflow');
        assert.deepEqual(errors, [], 'mobile interactions have no page errors');
      } finally { await context.close(); }
    }
  }
  console.log('319px foundations index, keyboard, metadata, page/prompt copy, search focus, and picker icons passed in both themes and motion preferences');
}
