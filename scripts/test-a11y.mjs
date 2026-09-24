import { spawn } from 'node:child_process';
import { once } from 'node:events';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import AxeBuilder from '@axe-core/playwright';
import { chromium } from '@playwright/test';
import { canonicalContentFiles } from '../src/content-manifest.mjs';

const previewPort = 4176;
const origin = `http://127.0.0.1:${previewPort}`;
const vite = path.join(process.cwd(), 'node_modules/vite/bin/vite.js');
const routes = canonicalContentFiles().map((entry) => entry.route);
const viewports = [
  { name: 'annotated mobile', width: 319, height: 856 },
  { name: 'reflow narrow', width: 320, height: 800 },
  { name: 'mobile small', width: 375, height: 812 },
  { name: '200% browser zoom equivalent', width: 720, height: 500 },
  { name: 'mobile wide', width: 768, height: 1024 },
  { name: 'tablet square', width: 942, height: 942 },
  { name: 'desktop compact', width: 1024, height: 900 },
  { name: 'desktop annotated', width: 1191, height: 942 },
  { name: 'desktop wide', width: 1440, height: 1024 },
];
// CI checks each theme in its own job; A11Y_COLOR_SCHEMES narrows the run to one.
const colorSchemes = (process.env.A11Y_COLOR_SCHEMES ?? 'light,dark').split(',').map((scheme) => scheme.trim());
if (colorSchemes.length === 0 || colorSchemes.some((scheme) => scheme !== 'light' && scheme !== 'dark')) throw new Error(`A11Y_COLOR_SCHEMES must list light and/or dark, got ${process.env.A11Y_COLOR_SCHEMES}`);
const server = spawn(process.execPath, [vite, 'preview', '--host', '127.0.0.1', '--port', String(previewPort), '--strictPort'], { stdio: 'inherit' });
const serverExit = once(server, 'exit');
const allFailures = [];
const warnings = [];
let browser;
let completedCases = 0;
// Each theme and width runs in its own browser context. The combinations are
// independent, so a small pool checks them side by side instead of one at a time.
const combinations = colorSchemes.flatMap((colorScheme) => viewports.map((viewport) => ({ colorScheme, viewport })));
const totalCases = routes.length * combinations.length;
const concurrency = Math.max(1, Math.min(combinations.length, Number(process.env.A11Y_CONCURRENCY) || os.availableParallelism()));
const activeCases = new Map();

try {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try { if ((await fetch(origin)).ok) break; } catch {}
    if (attempt === 39) throw new Error('astro preview did not become ready');
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  browser = await chromium.launch({ headless: true });
  let next = 0;
  let stopped = false;
  const checkCombination = async (worker, { colorScheme, viewport }) => {
    const context = await browser.newContext({ viewport, colorScheme });
    context.setDefaultTimeout(15_000);
    context.setDefaultNavigationTimeout(30_000);
    const page = await context.newPage();
    try {
    for (const route of routes) {
      if (stopped) return;
      const activeCase = `${colorScheme} ${viewport.width}px ${route}`;
      activeCases.set(worker, activeCase);
      const started = performance.now();
      const failures = [];
      console.log(`[a11y] checking ${activeCase}`);
      await page.goto(`${origin}${route}`, { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => document.fonts.ready);
      // Publication code frames make overflowing examples keyboard scrollable.
      await page.waitForFunction(() => [...document.querySelectorAll('.code-frame pre')].every((pre) => pre.scrollWidth <= pre.clientWidth || pre.tabIndex === 0));
      if (await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)) failures.push(`${viewport.name} ${route}: horizontal overflow`);
      const typographyFailures = await page.evaluate(({ route, viewportWidth }) => {
        const findings = [];
        const dark = document.documentElement.dataset.theme === 'dark';
        const ink = dark ? 'rgb(245, 247, 251)' : 'rgb(16, 17, 20)';
        const slate = dark ? 'rgb(167, 173, 183)' : 'rgb(80, 87, 96)';
        const close = (actual, expected, tolerance = 0.25) => Math.abs(actual - expected) <= tolerance;
        const visible = (element) => element.getClientRects().length > 0 && getComputedStyle(element).visibility !== 'hidden';
        const directText = (element) => [...element.childNodes].some((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
        const style = (element) => getComputedStyle(element);
        const number = (value) => Number.parseFloat(value);
        const checkRole = (elements, expected, label) => {
          for (const element of elements.filter(visible)) {
            const computed = style(element);
            if (expected.size !== undefined && !close(number(computed.fontSize), expected.size)) findings.push(`${label} font-size ${computed.fontSize}: ${element.textContent.trim().slice(0, 60)}`);
            if (expected.line !== undefined && !close(number(computed.lineHeight), expected.line)) findings.push(`${label} line-height ${computed.lineHeight}: ${element.textContent.trim().slice(0, 60)}`);
            if (expected.weight !== undefined && computed.fontWeight !== String(expected.weight)) findings.push(`${label} font-weight ${computed.fontWeight}: ${element.textContent.trim().slice(0, 60)}`);
            if (expected.family && !computed.fontFamily.includes(expected.family)) findings.push(`${label} font-family ${computed.fontFamily}: ${element.textContent.trim().slice(0, 60)}`);
            if (expected.color && computed.color !== expected.color) findings.push(`${label} color ${computed.color}: ${element.textContent.trim().slice(0, 60)}`);
          }
        };
        const elements = (selector) => [...document.querySelectorAll(selector)];

        const textElements = elements('body *').filter((element) => visible(element) && directText(element));
        for (const element of textElements) {
          const computed = style(element);
          if (number(computed.fontSize) < 12) findings.push(`public text below 12px (${computed.fontSize}): ${element.textContent.trim().slice(0, 60)}`);
          if (computed.fontFamily.includes('Instrument Sans') && !['400', '600'].includes(computed.fontWeight)) findings.push(`unsupported sans weight ${computed.fontWeight}: ${element.textContent.trim().slice(0, 60)}`);
        }

        const displaySize = viewportWidth < 768
          ? Math.min(36, Math.max(32, viewportWidth * .085))
          : Math.min(60, Math.max(44, viewportWidth * .042));
        const titleSize = Math.min(48, Math.max(36, viewportWidth * .04));
        const headingSize = Math.min(32, Math.max(28, viewportWidth * .02));
        if (route === '/') checkRole(elements('.home-content h1'), { size: displaySize, line: displaySize, weight: 600, family: 'Instrument Sans', color: ink }, 'display h1');
        else checkRole(elements('main h1'), { size: titleSize, line: titleSize * 1.05, weight: 600, family: 'Instrument Sans', color: ink }, 'page h1');
        if (route !== '/' && elements('.home-content h1').length > 0) findings.push('display h1 appears outside the homepage');
        checkRole(elements('main h2').filter((el) => viewportWidth < 960 || !el.closest('.home-content')), { size: headingSize, line: headingSize * 1.15, weight: 600, family: 'Instrument Sans', color: ink }, 'content h2');
        if (viewportWidth >= 960) checkRole(elements('.home-content h2'), { size: 40, line: 46, weight: 600, family: 'Instrument Sans', color: ink }, 'homepage h2');
        checkRole(elements('main h3:not(.source-publisher h3)'), { size: 22, line: 27.5, weight: 600, family: 'Instrument Sans', color: ink }, 'content h3');
        checkRole(elements('.source-publisher h3'), { size: 16, line: 24, weight: 600, family: 'Instrument Sans', color: ink }, 'source publisher heading');

        const reading = elements('.home-content p, .home-guides p, .sl-markdown-content p, .run-page p, .source-groups > p')
          .filter((element) => !element.matches('.section-label, .example-label, .publication-embed-credit, .history-year, .run-header > p:first-child, .source-kinds, .page-meta, [data-slot="item-description"]'));
        if (viewportWidth >= 960) {
          checkRole(reading.filter((el) => el.closest('.home-content') && !el.matches('.home-content > p:first-of-type')), { size: 22, line: 32, weight: 400, family: 'Instrument Sans', color: ink }, 'homepage prose');
          const subtitleSize = Math.min(26, Math.max(18, viewportWidth * .0175));
          checkRole(elements('.home-content > p:first-of-type'), { size: subtitleSize, line: subtitleSize * 1.5, weight: 400, family: 'Instrument Sans', color: ink }, 'homepage subtitle');
        }
        checkRole(reading.filter((el) => viewportWidth < 960 || !el.closest('.home-content')), { size: 18, line: 30, weight: 400, family: 'Instrument Sans', color: ink }, 'reading prose');
        checkRole(elements('.author-attribution, .author-attribution a'), { size: 12, line: 18, weight: 400, family: 'Instrument Sans', color: slate }, 'author attribution');
        checkRole(elements('.publication-embed-credit'), { size: 12, line: 18, weight: 400, family: 'Instrument Sans', color: slate }, 'external media credit');
        checkRole(elements('.example-good .example-label'), { size: 14, line: 21, weight: 600, family: 'Instrument Sans', color: dark ? 'rgb(140, 219, 172)' : 'rgb(23, 97, 57)' }, 'good example label');
        checkRole(elements('.example-bad .example-label'), { size: 14, line: 21, weight: 600, family: 'Instrument Sans', color: dark ? 'rgb(255, 167, 167)' : 'rgb(163, 43, 43)' }, 'bad example label');
        for (const element of reading.filter(visible)) if (!element.matches('.home-content > p:first-of-type') && element.getBoundingClientRect().width > (element.closest('.home-content') && viewportWidth >= 960 ? 1000 : 816)) findings.push(`reading measure exceeds 68ch: ${element.textContent.trim().slice(0, 60)}`);

        checkRole(elements('td, .run-inventory li, .artifact-list li, .run-page dd'), { size: 16, line: 24, weight: 400, family: 'Instrument Sans', color: ink }, 'dense content');
        checkRole(elements('.page-sources li'), { size: 12, line: 16, weight: 400, family: 'Instrument Sans', color: ink }, 'source links');
        checkRole(elements('[data-slot="item-description"]'), { size: 16, line: 24, weight: 400, family: 'Instrument Sans', color: slate }, 'guide description');
        checkRole(elements('.home-guide-list a'), { size: 18, line: 30, weight: 600, family: 'Instrument Sans', color: ink }, 'foundations links');
        const metadata = elements('.section-label, .footer-meta, .sidebar-label, .page-meta, figcaption, .history-year, .run-header > p:first-child, .run-page dt, .run-evidence, .run-inventory span, .source-kinds, th');
        checkRole(metadata, { size: 12, line: 18, weight: 400, family: 'IBM Plex Mono', color: slate }, 'metadata');
        checkRole(elements('.site-name, .guide-picker-trigger, .search-trigger, .right-sidebar a, .right-sidebar h2, .site-footer a:not(.author-attribution a)').filter((el) => viewportWidth < 960 || !el.matches('.homepage-header .site-name, .homepage-header .guide-picker-trigger')), { size: 12, line: 16, family: 'Instrument Sans' }, 'navigation');
        if (viewportWidth >= 960) {
          checkRole(elements('.homepage-header .site-name'), { size: 18, line: 16, family: 'Instrument Sans' }, 'homepage brand');
          checkRole(elements('.homepage-header .guide-picker-trigger'), { size: 16, line: 16, family: 'Instrument Sans' }, 'homepage browse');
        }
        checkRole(elements('.publication-sidebar [data-sidebar="menu-button"], .publication-sidebar [data-sidebar="menu-sub-button"]'), { size: 12, line: 18, family: 'Instrument Sans' }, 'guide navigation');
        return findings;
      }, { route, viewportWidth: viewport.width });
      for (const finding of typographyFailures) failures.push(`${viewport.name} ${route}: ${finding}`);

      if (viewport.width === 375 && route === '/') {
        const menu = page.locator('.header-guide-picker-trigger');
        const sheet = page.locator('.guide-page-options:visible');
        await menu.focus();
        await page.keyboard.press('Enter');
        await sheet.waitFor({ state: 'visible' });
        if (await sheet.getAttribute('data-state') !== 'open') failures.push(`${viewport.name} ${route}: homepage picker does not open with Enter`);
        await page.keyboard.press('Escape');
        await sheet.waitFor({ state: 'hidden' });
        if (!(await menu.evaluate((trigger) => document.activeElement === trigger))) failures.push(`${viewport.name} ${route}: homepage picker does not restore focus after Escape`);
      }

      // A lazy external post can still be hydrating after the host's fonts
      // are ready. Audit loaded text, image, and video posts and their links.
      for (const iframe of await page.locator('.publication-embed iframe').elementHandles()) {
        await iframe.scrollIntoViewIfNeeded();
        const frame = await iframe.contentFrame();
        if (!frame) throw new Error(`${route}: external media frame is unavailable`);
        await frame.waitForFunction(() => {
          const images = [...document.querySelectorAll('img')];
          return document.querySelector('article') && images.every((image) => image.complete && image.naturalWidth > 0);
        });
        await frame.evaluate(() => document.fonts.ready);
        // Wait for the official resize message to reach the host so axe sees
        // the final frame, rather than a clipped or still-expanding post.
        await frame.waitForFunction(() => {
          const height = document.querySelector('article')?.getBoundingClientRect().height;
          return height && innerHeight >= height && innerHeight - height < 8;
        });
      }
      await page.evaluate(() => scrollTo(0, 0));
      const report = await new AxeBuilder({ page }).analyze();
      for (const violation of report.violations.filter((item) => item.impact === 'serious' || item.impact === 'critical')) {
        for (const node of violation.nodes) {
          const finding = `${colorScheme} ${viewport.name} ${route}: ${violation.impact} ${violation.id} at ${node.target.join(' -> ')}\n${node.failureSummary}`;
          // A node inside a frame belongs to a third-party embed (every iframe
          // here is a post from X). Its markup changes without a commit here and
          // cannot be fixed here, so it is reported without failing the run.
          // The host iframe itself, including its title, is still enforced.
          if (node.target.length > 1) warnings.push(finding);
          else failures.push(finding);
        }
      }

      const checkClipping = async (label) => {
        if (await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)) failures.push(`${viewport.name} ${route}: ${label} causes horizontal overflow`);
        const clipped = await page.evaluate(() => {
          const directText = (element) => [...element.childNodes].some((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
          return [...document.querySelectorAll('body *')]
            .filter((element) => directText(element) && element.getClientRects().length > 0)
            .filter((element) => {
              const style = getComputedStyle(element);
              const clippedInline = element.scrollWidth > element.clientWidth + 1 && ['clip', 'hidden'].includes(style.overflowX);
              const clippedBlock = element.scrollHeight > element.clientHeight + 1 && ['clip', 'hidden'].includes(style.overflowY);
              return clippedInline || clippedBlock;
            })
            .map((element) => element.textContent.trim().slice(0, 60));
        });
        for (const text of clipped) failures.push(`${viewport.name} ${route}: ${label} clips text: ${text}`);
      };

      if (viewport.width === 375) {
        const spacing = await page.addStyleTag({ content: `
          :where(p, li, dd, td, figcaption) {
            line-height: 1.5 !important;
            letter-spacing: .12em !important;
            word-spacing: .16em !important;
          }
          p { margin-bottom: 2em !important; }
        ` });
        await checkClipping('text spacing override');
        await spacing.evaluate((element) => element.remove());
      }

      if (viewport.width === 720) await checkClipping('200% browser zoom equivalent');
      for (const failure of failures) console.error(failure);
      allFailures.push(...failures);
      completedCases += 1;
      console.log(`[a11y] ${completedCases}/${totalCases} checked: ${activeCase} (${Math.round(performance.now() - started)}ms, ${failures.length} findings)`);
    }
    } finally {
      await context.close();
    }
  };
  const worker = async (id) => {
    while (!stopped && next < combinations.length) {
      const combination = combinations[next];
      next += 1;
      await checkCombination(id, combination);
    }
    activeCases.delete(id);
  };
  console.log(`[a11y] ${totalCases} cases across ${combinations.length} theme and width combinations, ${concurrency} at a time`);
  await Promise.all(Array.from({ length: concurrency }, (_, id) => worker(id).catch((error) => {
    stopped = true;
    throw error;
  })));
} catch (error) {
  const active = [...activeCases.values()].join(', ') || 'starting preview';
  throw new Error(`[a11y] stopped during ${active} after ${completedCases} completed cases: ${error.message}`, { cause: error });
} finally {
  await browser?.close();
  if (server.exitCode === null && server.signalCode === null) server.kill('SIGTERM');
  await serverExit;
}

if (warnings.length > 0) console.warn(`[a11y] ${warnings.length} findings inside third-party embeds, not failing the run:\n${warnings.join('\n')}`);
if (allFailures.length > 0) { console.error(`[a11y] ${allFailures.length} findings across ${completedCases} completed cases; see the per-case diagnostics above.`); process.exit(1); }
console.log(`typography, reflow, text spacing, text resize, and axe checks passed across ${routes.length} routes at ${viewports.length} required widths in ${colorSchemes.join(' and ')}`);
