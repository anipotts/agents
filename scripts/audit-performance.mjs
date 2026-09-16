import { spawn, spawnSync } from 'node:child_process';
import { once } from 'node:events';
import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { chromium } from '@playwright/test';
import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';
import { startHttp2Preview, requireHttp2 } from './lib/http2-preview.mjs';

const root = process.cwd();
const previewPort = 4176;
const origin = `http://127.0.0.1:${previewPort}`;
const astro = path.join(root, 'node_modules/astro/bin/astro.mjs');
const vite = path.join(root, 'node_modules/vite/bin/vite.js');
const requestedDirectory = process.env.PERFORMANCE_AUDIT_DIR;
const outputDirectory = requestedDirectory
  ? path.resolve(requestedDirectory)
  : await mkdtemp(path.join(os.tmpdir(), 'agents-performance-'));
const outputRelativeToRoot = path.relative(root, outputDirectory);
if (outputRelativeToRoot === '' || (!outputRelativeToRoot.startsWith('..') && !path.isAbsolute(outputRelativeToRoot))) throw new Error('performance audit output must be outside the repository');
await mkdir(outputDirectory, { recursive: true });

const pages = [
  { id: 'home', route: '/' },
  { id: 'codex', route: '/guides/codex/' },
  { id: 'claude-code', route: '/guides/claude-code/' },
  { id: 'grok', route: '/guides/grok/' },
];
const audits = [];
const failures = [];
let server;
let serverExit;
let browser;
let auditPreview;
let buildPages;

const median = (values) => [...values].sort((left, right) => left - right)[Math.floor(values.length / 2)];
const metricsFor = (lhr) => ({
  score: Math.round(lhr.categories.performance.score * 100),
  fcp: Math.round(lhr.audits['first-contentful-paint'].numericValue),
  lcp: Math.round(lhr.audits['largest-contentful-paint'].numericValue),
  speedIndex: Math.round(lhr.audits['speed-index'].numericValue),
  tbt: Math.round(lhr.audits['total-blocking-time'].numericValue),
  cls: lhr.audits['cumulative-layout-shift'].numericValue,
  bytes: lhr.audits['total-byte-weight'].numericValue,
});

try {
  // Imported Markdown transforms can otherwise leave cached rendered content.
  const build = spawnSync(process.execPath, [astro, 'build', '--force'], { stdio: 'inherit' });
  if (build.status !== 0) process.exit(build.status ?? 1);
  buildPages = await Promise.all(pages.map(async ({ id, route }) => ({
    id, route,
    sha256: createHash('sha256').update(await readFile(path.join(root, 'dist', route.replace(/^\//, ''), 'index.html'))).digest('hex'),
  })));
  server = spawn(process.execPath, [vite, 'preview', '--host', '127.0.0.1', '--port', String(previewPort), '--strictPort'], { stdio: 'inherit' });
  serverExit = once(server, 'exit');
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try { if ((await fetch(origin)).ok) break; } catch {}
    if (attempt === 39) throw new Error('astro preview did not become ready');
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  // Match the deployed site's HTTP/2 transport while preserving Vite's bytes.
  auditPreview = await startHttp2Preview(previewPort);
  for (const page of pages) {
    for (let run = 1; run <= 3; run += 1) {
      console.log(`auditing ${page.id} cold mobile run ${run}/3`);
      const chrome = await chromeLauncher.launch({ chromePath: chromium.executablePath(), chromeFlags: ['--headless=new', '--no-sandbox', '--allow-insecure-localhost'] });
      try {
        const result = await lighthouse(`${auditPreview.origin}${page.route}`, {
          port: chrome.port,
          onlyCategories: ['performance'],
          output: 'json',
          logLevel: 'silent',
        });
        requireHttp2(result.lhr);
        const reportPath = path.join(outputDirectory, `${page.id}-${run}.json`);
        await writeFile(reportPath, result.report);
        audits.push({ page: page.id, run, ...metricsFor(result.lhr), reportPath });
      } finally {
        await chrome.kill();
      }
    }
  }

  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, ignoreHTTPSErrors: true });
  const page = await context.newPage();
  await page.goto(`${auditPreview.origin}/guides/codex/`, { waitUntil: 'networkidle' });
  await page.locator('.provider-tabs a[href="/guides/claude-code/"]').click();
  await page.waitForURL('**/guides/claude-code/');
  await page.locator('.provider-tabs a[href="/guides/codex/"]').click();
  await page.waitForURL('**/guides/codex/');

  await page.evaluate(() => {
    window.__performanceSwitchStart = null;
    window.__performanceSwitchEvents = [];
    window.__performanceSwitchObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (window.__performanceSwitchStart !== null && entry.startTime >= window.__performanceSwitchStart && entry.interactionId > 0) {
          window.__performanceSwitchEvents.push({ name: entry.name, startTime: entry.startTime, duration: entry.duration, interactionId: entry.interactionId });
        }
      }
    });
    window.__performanceSwitchObserver.observe({ type: 'event', durationThreshold: 16 });
    // Start at the user's click, excluding tracing setup and automation waits.
    document.querySelector('.provider-tabs a[href="/guides/claude-code/"]').addEventListener('click', (event) => {
      window.__performanceSwitchStart = event.timeStamp;
    }, { capture: true, once: true });
    window.__performanceSwitchComplete = new Promise((resolve, reject) => {
      document.addEventListener('astro:page-load', () => requestAnimationFrame(() => requestAnimationFrame(() => {
        if (window.__performanceSwitchStart === null) { reject(new Error('provider switch has no observed click')); return; }
        resolve(performance.now() - window.__performanceSwitchStart);
      })), { once: true });
    });
  });

  const cdp = await context.newCDPSession(page);
  const traceComplete = new Promise((resolve) => cdp.once('Tracing.tracingComplete', resolve));
  await cdp.send('Tracing.start', {
    categories: 'devtools.timeline,blink.user_timing,loading,disabled-by-default-devtools.screenshot',
    transferMode: 'ReturnAsStream',
  });
  await page.locator('.provider-tabs a[href="/guides/claude-code/"]').click();
  await page.waitForURL('**/guides/claude-code/');
  const clickToRoutePaint = await page.evaluate(() => window.__performanceSwitchComplete);
  if (!Number.isFinite(clickToRoutePaint) || clickToRoutePaint <= 0) throw new Error('provider switch timing is invalid');
  await page.waitForTimeout(200);
  const eventEntries = await page.evaluate(() => window.__performanceSwitchEvents);
  await cdp.send('Tracing.end');
  const { stream } = await traceComplete;
  let trace = '';
  while (true) {
    const chunk = await cdp.send('IO.read', { handle: stream });
    trace += chunk.data;
    if (chunk.eof) break;
  }
  await cdp.send('IO.close', { handle: stream });
  const tracePath = path.join(outputDirectory, 'warm-provider-switch.trace.json');
  await writeFile(tracePath, trace);
  const interactionDurations = eventEntries.map(({ duration }) => duration);
  const warmSwitch = {
    route: '/guides/codex/ -> /guides/claude-code/',
    clickToRoutePaint,
    eventTimingMax: interactionDurations.length > 0 ? Math.max(...interactionDurations) : null,
    measurement: 'observed click to two animation frames after astro:page-load; a synthetic route measurement, not field INP',
    eventEntries,
    tracePath,
  };
  await context.close();

  const medians = Object.fromEntries(pages.map(({ id }) => {
    const pageAudits = audits.filter((audit) => audit.page === id);
    return [id, {
      score: median(pageAudits.map(({ score }) => score)),
      fcp: median(pageAudits.map(({ fcp }) => fcp)),
      lcp: median(pageAudits.map(({ lcp }) => lcp)),
      speedIndex: median(pageAudits.map(({ speedIndex }) => speedIndex)),
      tbt: median(pageAudits.map(({ tbt }) => tbt)),
      cls: median(pageAudits.map(({ cls }) => cls)),
      bytes: median(pageAudits.map(({ bytes }) => bytes)),
    }];
  }));

  for (const id of ['codex', 'claude-code', 'grok']) {
    const metric = medians[id];
    if (metric.score < 95) failures.push(`${id}: median Lighthouse score ${metric.score} is below 95`);
    if (metric.fcp >= 1800) failures.push(`${id}: median FCP ${metric.fcp}ms is not below 1800ms`);
    if (metric.lcp >= 2500) failures.push(`${id}: median LCP ${metric.lcp}ms is not below 2500ms`);
    if (metric.speedIndex >= 3400) failures.push(`${id}: median Speed Index ${metric.speedIndex}ms is not below 3400ms`);
    if (metric.tbt >= 100) failures.push(`${id}: median TBT ${metric.tbt}ms is not below 100ms`);
    if (metric.cls >= 0.05) failures.push(`${id}: median CLS ${metric.cls} is not below 0.05`);
  }
  if (medians.home.score < 99) failures.push(`home: median Lighthouse score ${medians.home.score} did not preserve the 100-class baseline`);
  if (warmSwitch.clickToRoutePaint >= 100) failures.push(`warm provider switch click to route paint: ${warmSwitch.clickToRoutePaint}ms is not below 100ms`);

  const summary = { generatedAt: new Date().toISOString(), outputDirectory, buildPages, transport: 'h2 (verified); local Vite response bytes, without CDN caching or compression', medians, warmSwitch, audits, failures };
  await writeFile(path.join(outputDirectory, 'summary.json'), `${JSON.stringify(summary, null, 2)}\n`);
  console.table(medians);
  console.log(`warm provider switch click to route paint: ${warmSwitch.clickToRoutePaint}ms (not field INP)`);
  console.log(`audit artifacts: ${outputDirectory}`);
} finally {
  await browser?.close();
  await auditPreview?.close();
  if (server && server.exitCode === null && server.signalCode === null) server.kill('SIGTERM');
  if (serverExit) await serverExit;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try { await fetch(origin); } catch { break; }
    if (attempt === 39) throw new Error(`preview port ${previewPort} was not released after shutdown`);
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}
