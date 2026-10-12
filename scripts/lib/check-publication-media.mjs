import assert from 'node:assert/strict';
import AxeBuilder from '@axe-core/playwright';

export async function verifyPublicationMedia({ browser, origin }) {
  for (const width of [375, 907]) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport: { width, height: 856 }, colorScheme: theme });
      const page = await context.newPage();
      await page.goto(`${origin}/guides/claude-code/`, { waitUntil: 'networkidle' });
      const figures = page.locator('.sl-markdown-content figure');
      assert.equal(await figures.count(), 4, 'Claude has one terminal video, the agent wall, and two contextual screenshots');
      assert.equal(await page.locator('.surface-bento').evaluateAll((groups) => groups.every((group) => group.querySelectorAll('figure').length === 1)), true, 'Claude screenshots belong to separate sections');
      const inlineVideo = figures.first().locator('video');
      await page.waitForFunction(() => {
        const video = document.querySelector('.sl-markdown-content video');
        return video?.currentTime > 0 && !video.paused;
      });
      assert.equal(await inlineVideo.evaluate((video) => video.muted && video.loop && video.autoplay && !video.controls), true, 'silent recording autoplays and loops with no controls');
      assert.equal(await figures.locator('figcaption').evaluateAll((captions) => captions.every((caption) => getComputedStyle(caption).display === 'none')), true);
      const trigger = figures.first().locator('button');
      await trigger.focus();
      await page.keyboard.press('Enter');
      const dialog = page.locator('#publication-image-dialog');
      await dialog.waitFor({ state: 'visible' });
      const video = dialog.locator('video');
      assert.equal(await video.evaluate((video) => !video.controls && video.muted && video.loop), true);
      await page.waitForFunction(() => {
        const video = document.querySelector('[data-publication-dialog-video]');
        return video?.currentTime > 0 && !video.paused;
      });
      assert.equal(await dialog.locator('img').isHidden(), true);
      assert.match(await dialog.locator('[data-publication-dialog-caption]').innerText(), /Claude Code in the terminal/);
      // Scan the final rendered colors, after the opening opacity transition.
      await dialog.evaluate(async (element) => {
        await Promise.all(element.getAnimations({ subtree: true }).map((animation) => animation.finished));
      });
      assert.equal(await dialog.evaluate((element) => getComputedStyle(element).opacity), '1');
      const findings = await new AxeBuilder({ page }).include('#publication-image-dialog').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      assert.deepEqual(findings.violations, [], `${width}px ${theme}: media dialog accessibility`);
      await page.keyboard.press('Escape');
      await dialog.waitFor({ state: 'hidden' });
      assert.equal(await video.evaluate((element) => element.paused), true, 'closing the viewer pauses playback');
      assert.equal(await trigger.evaluate((element) => element === document.activeElement), true);

      await figures.nth(1).locator('button').click();
      await dialog.waitFor({ state: 'visible' });
      assert.equal(await video.isHidden(), true);
      assert.equal(await dialog.locator('img').getAttribute('src'), '/media/guides/claude-agent-wall.png');
      assert.equal(await dialog.locator('[data-publication-dialog-caption]').innerText(), 'i did this for a TikTok and went through my five hour usage window in 15 minutes.');
      await page.keyboard.press('Escape');
      await figures.nth(2).locator('button').click();
      await dialog.waitFor({ state: 'visible' });
      assert.equal(await dialog.locator('[data-publication-dialog-caption] a').getAttribute('href'), 'https://code.claude.com/docs/en/overview', 'caption source links survive enlargement');
      await page.keyboard.press('Escape');

      await page.goto(`${origin}/guides/grok/`, { waitUntil: 'networkidle' });
      for (const figure of await page.locator('.sl-markdown-content figure').all()) {
        const caption = await figure.locator('figcaption').textContent();
        assert.ok(caption?.trim(), 'captions nested in source links survive enhancement');
        await figure.locator('button').click();
        await dialog.waitFor({ state: 'visible' });
        assert.equal((await dialog.locator('[data-publication-dialog-caption]').textContent())?.trim(), caption.trim());
        await page.keyboard.press('Escape');
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      await context.close();
    }
  }
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${origin}/guides/claude-code/`);
  assert.equal(await page.locator('.sl-markdown-content figcaption').evaluateAll((captions) => captions.every((caption) => getComputedStyle(caption).display === 'none')), true, 'initial HTML keeps captions hidden before scripts load');
  assert.equal(await page.locator('.surface-bento').first().locator('a').getAttribute('href'), '/media/guides/claude-terminal-recording.mp4', 'video has a direct fallback');
  await context.close();
  const reduced = await browser.newContext({ reducedMotion: 'reduce' });
  const reducedPage = await reduced.newPage();
  await reducedPage.goto(`${origin}/guides/claude-code/`, { waitUntil: 'networkidle' });
  assert.equal(await reducedPage.locator('.sl-markdown-content video').evaluate((video) => video.paused), true, 'reduced motion pauses inline recording');
  await reduced.close();
}
