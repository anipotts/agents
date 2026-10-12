import assert from 'node:assert/strict';
import AxeBuilder from '@axe-core/playwright';

export async function verifyGuidePickers({ browser, origin }) {
  for (const colorScheme of ['light', 'dark']) {
    const context = await browser.newContext({ colorScheme });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    try {
      for (const width of [319, 375, 768, 959, 960, 1024, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(origin, { waitUntil: 'networkidle' });
        assert.equal(await page.locator('.provider-tabs').count(), 0, 'retired tabs are absent');
        assert.equal(await page.locator('.hero-provider-link').count(), 3);
        assert.equal(await page.locator('.home-content h1 + p').textContent().then((s) => s.replace(/\s+/g, ' ').trim()), 'practical help for building things and getting everyday work done');
        assert.equal(await page.locator('.hero-scope').count(), 0);
        assert.deepEqual(await page.locator('h1 .hero-heading-line').allTextContents(), ['a casual guide to', 'working with', 'agents']);
        const geometry = await page.evaluate(() => {
          const highlight = document.querySelector('.keyword-highlight');
          return {
            overflow: document.documentElement.scrollWidth - innerWidth,
            highlightColor: getComputedStyle(highlight).color,
            highlightBackground: getComputedStyle(highlight).backgroundColor,
            buttons: [...document.querySelectorAll('.hero-provider-link')].map((button) => ({
              label: button.textContent.trim(), href: button.getAttribute('href'),
              radius: getComputedStyle(button).borderRadius,
              highlightRadius: getComputedStyle(highlight).borderRadius,
              inView: button.getBoundingClientRect().right <= innerWidth,
            })),
          };
        });
        assert.equal(geometry.highlightColor, colorScheme === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(18, 71, 230)');
        assert.equal(geometry.highlightBackground, colorScheme === 'dark' ? 'rgb(36, 84, 244)' : 'rgba(0, 0, 0, 0)');
        assert.equal(geometry.overflow, 0, `${width}px homepage overflows`);
        assert.deepEqual(geometry.buttons.map(({ label }) => label), ['codex', 'claude', 'grok']);
        assert.deepEqual(geometry.buttons.map(({ href }) => href), ['/guides/codex/', '/guides/claude-code/', '/guides/grok/']);
        assert.ok(geometry.buttons.every((button) => button.inView && button.radius === button.highlightRadius));
        const triggers = page.locator('.header-guide-picker-trigger:visible');
        const wide = width === 1440;
        assert.deepEqual(await triggers.allTextContents().then((labels) => labels.map((label) => label.trim())), wide ? ['handbook', 'codex', 'claude', 'grok'] : ['guides']);
        for (let index = 0; index < await triggers.count(); index++) {
          console.log(`[guide picker] ${colorScheme} ${width}px menu ${index + 1}`);
          const trigger = triggers.nth(index);
          await trigger.focus();
          await page.keyboard.press('Enter');
          const menu = page.locator('.guide-page-options:visible');
          await menu.waitFor();
          const groups = await menu.locator('[data-slot="dropdown-group"]').evaluateAll((groups) => groups.map((group) => group.getAttribute('aria-label')));
          assert.deepEqual(groups, wide ? [['handbook'], ['codex'], ['claude code'], ['grok']][index] : ['handbook', 'codex', 'claude code', 'grok']);
          const bounds = await menu.boundingBox();
          assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= width, `${width}px guide menu stays within viewport`);
          if (!wide || index === 0) assert.equal(await menu.locator('a[href="/handbook/operating-agents/"]').count(), 1);
          if (!wide || index === 2) assert.equal(await menu.locator('[aria-label="claude code"] a[href="/archive/claude-code-tools/"]').count(), 1);
          await page.keyboard.press('Escape');
          await menu.waitFor({ state: 'hidden' });
          assert.ok(await trigger.evaluate((el) => el === document.activeElement), 'guide picker restores focus');
        }
      }
      await page.locator('.header-guides-wide [data-guide-scope="grok"]').click();
      await page.locator('.guide-page-options:visible a[href="/guides/grok/"]').click();
      await page.waitForURL('**/guides/grok/');
      assert.equal(await page.locator('.header-guides-wide [aria-current="true"]').getAttribute('data-guide-scope'), 'grok');
      assert.equal(await page.locator('.publication-sidebar .guide-picker-trigger, .mobile-site-menu .guide-picker-trigger').count(), 0);
      await page.setViewportSize({ width: 872, height: 900 });
      const compact = page.locator('.header-guides-compact .guide-picker-trigger');
      assert.equal((await compact.textContent()).trim(), 'grok');
      await compact.focus();
      await page.keyboard.press('Enter');
      const report = await new AxeBuilder({ page }).include('.guide-page-options[data-state="open"]').analyze();
      assert.deepEqual(report.violations.map(({ id }) => id), [], 'shared picker passes accessibility checks');
      await page.locator('.guide-page-options:visible a[href="/handbook/operating-agents/"]').click();
      await page.waitForURL('**/handbook/operating-agents/');
      assert.equal((await compact.textContent()).trim(), 'handbook');
      assert.equal(await page.locator('.guide-page-options:visible').count(), 0);

      // Guide identity, search compaction, and navigation restore across both shells.
      for (const [route, label, scope] of [
        ['/', 'guides', null], ['/handbook/operating-agents/', 'handbook', 'handbook'],
        ['/guides/codex/', 'codex', 'codex'], ['/guides/claude-code/configuration/', 'claude code', 'claude-code'],
        ['/guides/grok/', 'grok', 'grok'], ['/archive/claude-code-tools/', 'claude code', 'claude-code'],
      ]) {
        for (const width of [375, 872, 1440]) {
          await page.setViewportSize({ width, height: 900 });
          await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' });
          assert.equal((await compact.textContent()).trim(), label);
          assert.equal(await page.locator('.header-guides-wide [aria-current="true"]').evaluateAll((elements) => elements[0]?.getAttribute('data-guide-scope') ?? null), scope);
          if (route !== '/' && width === 375) {
            await page.getByRole('button', { name: 'chapters', exact: true }).click();
            const sheet = page.locator('.mobile-site-menu:visible');
            assert.ok((await sheet.locator('[data-slot="sheet-title"]').textContent()).includes(label));
            assert.equal(await sheet.locator('.guide-picker-trigger').count(), 0);
            await page.keyboard.press('Escape');
          }
          await page.locator('.header-search [data-open-modal]').click();
          await page.locator('.header-search input').waitFor({ state: 'visible' });
          assert.equal(await page.locator('.header-guides-wide').isVisible(), false, 'search compacts wide navigation');
          assert.equal(await compact.isVisible(), width >= 768, 'compact picker remains beside tablet and desktop search');
          await page.keyboard.press('Escape');
          assert.equal(await page.locator('.header-guide-picker-trigger:visible').count(), width === 1440 ? 4 : 1, 'closing search restores navigation');
        }
      }
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.locator('.header-guides-wide [data-guide-scope="claude-code"]').click();
      await page.locator('.guide-page-options:visible').waitFor();
      await page.setViewportSize({ width: 872, height: 900 });
      await page.locator('.guide-page-options:visible').waitFor({ state: 'hidden' });
      // CSS can hide the old menu before ResizeObserver transfers focus.
      // Require the actual transfer, with a bounded wait for that observer.
      await page.waitForFunction(() => document.activeElement === document.querySelector('.header-guides-compact .guide-picker-trigger'), undefined, { timeout: 2000 });
      assert.ok(await compact.evaluate((element) => element === document.activeElement), 'resizing an open menu restores focus to the compact picker');
      for (const width of [320, 390, 872, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        const enlarged = await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
        // Text resizing also transitions the rail and article padding. Check
        // the settled reading layout rather than an intermediate animation.
        await page.evaluate(async () => {
          await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
          await new Promise((resolve, reject) => {
            const deadline = setTimeout(() => reject(new Error('layout animations did not finish within two seconds')), 2000);
            Promise.allSettled(document.getAnimations().filter((animation) =>
              animation.playState === 'running' && animation.effect?.getComputedTiming().iterations !== Infinity
            ).map((animation) => animation.finished)).then(() => { clearTimeout(deadline); resolve(); });
          });
        });
        await page.waitForFunction(() => Math.abs(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sl-nav-height')) - document.querySelector('.site-header').getBoundingClientRect().height) < 1);
        assert.equal(await page.locator('.header-guide-picker-trigger:visible').count(), 1, 'text enlargement compacts navigation');
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'enlarged guide header reflows');
        const geometry = await page.evaluate(() => {
          const header = document.querySelector('.site-header').getBoundingClientRect();
          const label = document.querySelector('.header-guides-compact .guide-picker-trigger span');
          const splitWords = [...label.textContent.matchAll(/\S+/g)].filter((word) => {
            const range = document.createRange();
            range.setStart(label.firstChild, word.index);
            range.setEnd(label.firstChild, word.index + word[0].length);
            return range.getClientRects().length > 1;
          }).map((word) => word[0]);
          return { headerBottom: header.bottom, titleTop: document.querySelector('main h1').getBoundingClientRect().top, splitWords };

        });
        assert.ok(geometry.titleTop >= geometry.headerBottom, 'enlarged header does not cover the article title');
        assert.deepEqual(geometry.splitWords, [], `${colorScheme} ${width}px enlarged guide name wraps only between words`);
        if (width === 320) {
          await page.locator('.header-search [data-open-modal]').click();
          const input = page.locator('.header-search input');
          await input.waitFor({ state: 'visible' });
          const searchBox = await input.boundingBox();
          assert.ok(searchBox.width >= 160 && searchBox.x >= 0 && searchBox.x + searchBox.width <= width, 'enlarged phone search retains usable input space');
          await page.keyboard.press('Escape');
          assert.ok(await compact.isVisible(), 'enlarged phone restores its guide picker after search');
        }
        await enlarged.evaluate((element) => element.remove());
      }
      assert.deepEqual(errors, []);
    } finally { await context.close(); }
  }
  console.log('homepage provider links and shared guide pickers passed at seven widths in both themes');
}
