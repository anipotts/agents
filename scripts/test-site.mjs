import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { canonicalContentFiles, contentRedirects } from '../src/content-manifest.mjs';

const root = process.cwd();
const dist = path.join(root, 'dist');
const origin = 'https://agents.anipotts.com';
const failures = [];

const scalar = (markdown, key) => markdown.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1].trim().replace(/^['"]|['"]$/g, '');
const inlineList = (markdown, key) => (markdown.match(new RegExp(`^${key}:\\s*\\[([^\\]]*)\\]`, 'm'))?.[1] ?? '').split(',').map((item) => item.trim()).filter(Boolean);
const ampersandEntities = new Set(['&amp;', '&#x26;', '&#38;']);
const text = (html) => html
  .replace(/<[^>]+>/g, ' ')
  .replace(/&(?:amp|#x26|#38);/g, (entity) => ampersandEntities.has(entity) ? '&' : entity)
  .replace(/\s+/g, ' ')
  .trim();
const hasRetiredGuideLabel = (html) => />\s*product guides\s*</i.test(html);
if (!hasRetiredGuideLabel('<span class="sidebar-label">product guides</span>')) failures.push('retired label check must reject the old navigation label');
if (hasRetiredGuideLabel('<p>the product guides carry the current details.</p>')) failures.push('retired label check must allow ordinary prose about the guides');
const homeSource = await readFile(path.join(root, 'content/home.md'), 'utf8');
const canonicalH1 = text(homeSource.match(/^#\s+(.+)$/m)?.[1] ?? '');
const routeFile = (route) => route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.replace(/^\//, ''), 'index.html');
const publicFile = (pathname) => path.extname(pathname) ? path.join(dist, pathname.replace(/^\//, '')) : routeFile(pathname.endsWith('/') ? pathname : `${pathname}/`);
const markdownFiles = async (directory) => (await Promise.all((await readdir(directory, { withFileTypes: true })).map(async (entry) => {
  const absolute = path.join(directory, entry.name);
  if (entry.isDirectory()) return markdownFiles(absolute);
  return entry.isFile() && entry.name.endsWith('.md') ? [absolute] : [];
}))).flat();

const contentFiles = canonicalContentFiles().map(({ route, file }) => [route, file]);

try { await access(path.join(root, 'public/favicon.svg')); } catch { failures.push('favicon source is missing'); }
try { await access(path.join(root, 'public/social-card.png')); } catch { failures.push('social card source is missing'); }
try { await access(path.join(root, 'public/robots.txt')); } catch { failures.push('robots source is missing'); }
for (const icon of ['codex.png', 'claude-code.png', 'grok.png']) {
  try { await access(path.join(root, 'public/icons/products', icon)); } catch { failures.push(`product icon is missing: ${icon}`); }
}

const registry = JSON.parse(await readFile(path.join(root, 'editorial/sources.json'), 'utf8'));
const metadata = [];
for (const privatePath of ['__progress', 'editorial/progress', 'editorial/review-ledger.md']) {
  try { await access(path.join(dist, privatePath)); failures.push(`local writing map leaked into production: ${privatePath}`); } catch { /* Development-only files must be absent. */ }
}
for (const [route, source] of contentFiles) {
  const markdown = await readFile(source, 'utf8');
  const title = scalar(markdown, 'title');
  const description = scalar(markdown, 'description');
  const scope = markdown.match(/^navigation:\s*\n(?:  .*\n)*?  scope:\s*([^\n]+)/m)?.[1].trim();
  const order = Number(markdown.match(/^navigation:\s*\n(?:  .*\n)*?  order:\s*(\d+)/m)?.[1]);
  metadata.push({ route, source, title, description, scope, order });
  const file = routeFile(route);
  try { await access(file); } catch { failures.push(`${route}: generated page is missing`); continue; }
  const html = await readFile(file, 'utf8');
  const publicText = text(html);
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/)?.[1];
  if (canonical !== `${origin}${route}`) failures.push(`${route}: canonical url is missing or incorrect`);
  if ((html.match(/<meta name="author" content="Ani Potts"/g) ?? []).length !== 1) failures.push(`${route}: expected one consistent author meta tag`);
  if (!html.includes('<link rel="author" href="https://anipotts.com/"')) failures.push(`${route}: personal author link is missing from metadata`);
  const bylines = [...html.matchAll(/<p\b[^>]*class="author-attribution"[^>]*>(.*?)<\/p>/gs)];
  if (bylines.length !== 1 || text(bylines[0][1]) !== 'by ani potts' || !bylines[0][1].includes('href="https://anipotts.com/"')) failures.push(`${route}: visible author attribution is missing or inconsistent`);
  try {
    const identities = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1]));
    const websites = identities.filter((entry) => entry['@type'] === 'WebSite');
    if (websites.length !== 1 || websites[0]['@id'] !== `${origin}/#website` || websites[0].url !== `${origin}/` || websites[0].name !== 'agent tips' || websites[0].author?.['@id'] !== 'https://anipotts.com/#person' || websites[0].author?.name !== 'Ani Potts' || websites[0].author?.url !== 'https://anipotts.com/') failures.push(`${route}: structured website authorship is missing or inconsistent`);
  } catch { failures.push(`${route}: structured identity is not valid JSON`); }
  if (!html.includes('<meta property="og:title"')) failures.push(`${route}: open graph title is missing`);
  if (!html.includes(`<meta property="og:image" content="${origin}/social-card.png"`)) failures.push(`${route}: social preview image is missing`);
  if (!html.includes(`<meta name="twitter:image" content="${origin}/social-card.png"`)) failures.push(`${route}: twitter preview image is missing`);
  if (!html.includes(`content="${description.replaceAll('&', '&amp;')}"`) && !text(html).includes(description)) failures.push(`${route}: canonical description is absent from rendered metadata`);
  if (!publicText.includes(title)) failures.push(`${route}: canonical title is absent from the rendered page`);
  if (route !== '/') {
    const sourceIds = inlineList(markdown, 'sources');
    if (!/<div\b(?=[^>]*\bdata-sw-accordion\b)(?=[^>]*\bdata-state="closed")(?=[^>]*\bclass="[^"]*\bpage-sources\b)[^>]*>/.test(html)) failures.push(`${route}: collapsed Starwind sources accordion is missing`);
    if (/TESTED \/ OFFICIAL SOURCE \/ ANALYSIS/i.test(publicText)) failures.push(`${route}: retired evidence microcopy appears in the source footer`);
    for (const id of sourceIds) {
      const source = registry.sources.find((candidate) => candidate.id === id);
      if (!source || !publicText.includes(source.title)) failures.push(`${route}: registered source is absent from the source disclosure: ${id}`);
    }
    if (sourceIds.length > 0 && (!html.includes('source-summary-badge') || !html.includes('source-summary-count'))) failures.push(`${route}: source icon count badge is missing`);
  }
  if (!publicText.includes('last updated')) failures.push(`${route}: exact update metadata is missing`);
  if ((route.startsWith('/guides/codex') || route.startsWith('/guides/claude-code')) && publicText.includes('last checked')) failures.push(`${route}: internal source check metadata is exposed in the public page header`);
  for (const label of ['handbook', 'codex', 'claude code', 'grok']) if (!publicText.includes(label)) failures.push(`${route}: guide picker scope is missing: ${label}`);
  if (hasRetiredGuideLabel(html)) failures.push(`${route}: retired product guides label appears in public output`);
  if (html.includes('·')) failures.push(`${route}: mid dot appears in public output`);
  if (!html.includes('agent tips on GitHub')) failures.push(`${route}: GitHub link is missing from the site header`);
  if (/GitHub stars|github-stars|\d+ stars, checked/i.test(html)) failures.push(`${route}: stale GitHub star metadata appears in the site header`);

  const links = [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map((match) => match[1]);
  for (const href of links) {
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const pathname = new URL(href, origin).pathname;
    try { await access(publicFile(pathname)); } catch { failures.push(`${route}: internal link does not resolve: ${href}`); }
  }
  const registeredLinks = [...html.matchAll(/<a\b[^>]*class="[^"]*\bregistered-link\b[^"]*"[^>]*>[\s\S]*?<\/a>/g)].map((match) => match[0]);
  for (const link of registeredLinks) {
    if (!link.includes('data-link-title=') || !link.includes('data-link-domain=') || !link.includes('data-link-publisher=') || !link.includes('data-link-icon=') || !link.includes('data-link-kind=')) failures.push(`${route}: registered link metadata is incomplete`);
    const href = link.match(/\bhref="([^"]+)"/)?.[1];
    const domain = link.match(/\bdata-link-domain="([^"]+)"/)?.[1];
    if (href?.startsWith('http') && domain !== new URL(href.replaceAll('&amp;', '&')).hostname) failures.push(`${route}: registered link domain does not match its actual hostname: ${href}`);
    if (/\blink-favicon\b/.test(link)) failures.push(`${route}: article link still includes an inline publisher icon`);
  }
  if (html.includes('link-favicon')) failures.push(`${route}: retired inline link favicon class appears in rendered HTML`);
}

try {
  const llms = await readFile(path.join(dist, 'llms.txt'), 'utf8');
  if (!llms.includes(`${origin}/agent-index.json`)) failures.push('/llms.txt: structured agent index discovery link is missing');
  for (const { route, file, kind } of canonicalContentFiles().filter((entry) => entry.kind === 'home' || entry.kind === 'guide')) {
    const markdown = await readFile(file, 'utf8');
    const title = scalar(markdown, 'title');
    const markdownPath = `${route.replace(/\/$/, '') || '/index'}.md`;
    if (!llms.includes(`[${title}](${origin}${markdownPath})`)) failures.push(`/llms.txt: missing public Markdown route ${markdownPath}`);
    if (kind === 'guide' && scalar(markdown, 'draft') === 'true') failures.push(`/llms.txt: draft route entered canonical content ${route}`);
  }
  if (llms.includes('/changes/') || llms.includes('/field-lab/')) failures.push('/llms.txt: redirected route is present');
} catch { failures.push('/llms.txt: generated index is missing'); }

try {
  const agentIndex = JSON.parse(await readFile(path.join(dist, 'agent-index.json'), 'utf8'));
  if (agentIndex.discovery?.llms !== '/llms.txt' || agentIndex.discovery?.index !== '/agent-index.json') failures.push('/agent-index.json: discovery metadata is incorrect');
  if (agentIndex.pages?.length !== contentFiles.length) failures.push('/agent-index.json: canonical route parity is incorrect');
} catch { failures.push('/agent-index.json: generated structured index is missing or invalid'); }

try {
  const homepageMarkdown = await readFile(path.join(dist, 'index.md'), 'utf8');
  const canonicalBody = homeSource.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '').trim();
  if (homepageMarkdown !== `${canonicalBody}\n`) failures.push('/index.md: generated homepage Markdown differs from canonical content');
} catch { failures.push('/index.md: generated homepage Markdown is missing'); }

// Dated test environments must retain the version actually exercised. Only
// exempt the version in that explicit test claim; later current-version prose
// in the same paragraph still goes through the duplication check.
const withoutDatedTestVersions = (markdown) => markdown.replace(
  /\bon (?:January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4},?\s+(?:i|an agent run for this guide) (?:tested|verified|reproduced) [^.!?`]*?`\d+\.\d+\.\d+(?:-[\w.-]+)?`/gi,
  (claim) => claim.replace(/`[^`]+`$/, '`recorded test version`'),
);
const versionFixture = '2.1.261';
for (const [fixture, remains] of [
  ['on September 5, 2026, i tested Claude Code `2.1.261` in isolation.', false],
  ['on September 5, 2026, an agent run for this guide tested Claude Code `2.1.261` in isolation.', false],
  ['an agent run for this guide tested Claude Code `2.1.261` in isolation.', true],
  ['i tested Claude Code `2.1.261` in isolation.', true],
  ['on September 5, 2026, the current Claude Code version is `2.1.261`.', true],
  ['on September 5, 2026, i tested Claude Code `2.1.261`. use 2.1.261 today.', true],
]) {
  if (withoutDatedTestVersions(fixture).includes(versionFixture) !== remains) {
    failures.push('dated test version classification failed');
  }
}
const activeGuideText = (await Promise.all(contentFiles.map(([, source]) => readFile(source, 'utf8')))).map(withoutDatedTestVersions).join('\n');
for (const version of Object.values(registry.product_versions)) {
  const occurrences = activeGuideText.split(String(version)).length - 1;
  if (occurrences > 0) failures.push(`current product version ${version} is duplicated outside editorial/sources.json`);
}

const home = await readFile(routeFile('/'), 'utf8');
if ((home.match(/class="home-guide-list"/g) ?? []).length !== 1) failures.push('/: missing foundations index');
if (home.includes('provider-handbook-card') || home.includes('data-guide-next')) failures.push('/: retired directory carousel remains');
if (text(home).includes('across agents')) failures.push('/: retired shared-guide framing appears on the homepage');
for (const icon of ['codex.png', 'claude-code.png', 'grok.png']) {
  if (!home.includes(`/icons/products/${icon}`)) failures.push(`/: product icon is absent from the homepage: ${icon}`);
}
for (const slug of ['codex', 'claude-code', 'grok']) {
  if (!new RegExp(`<a[^>]+href="/guides/${slug}/"[^>]+class="hero-provider-link`).test(home)) failures.push(`/: missing hero provider link for ${slug}`);
}
if (home.indexOf('class="hero-provider-actions"') > home.indexOf('id="why-i-made-this"')) failures.push('/: provider actions must follow the introduction before why i made this');
const draftGuides = (await Promise.all((await markdownFiles(path.join(root, 'content'))).map(async (file) => ({ file, markdown: await readFile(file, 'utf8') }))))
  .filter(({ markdown }) => scalar(markdown, 'draft') === 'true')
  .map(({ file }) => `/${path.relative(path.join(root, 'content'), file).replace(/\.md$/, '')}/`);
for (const route of draftGuides) {
  try { await access(routeFile(route)); failures.push(`${route}: draft route exists in production output`); } catch {}
  if (home.includes(`href="${route}"`)) failures.push(`${route}: draft route is linked from the production homepage`);
}
if (home.includes('hero-scope')) failures.push('/: retired hero scope must be absent');
if ((home.match(/class="hero-heading-line"/g) ?? []).length !== 3) failures.push('/: hero requires three reflowable heading parts');
const h1Values = [...home.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)].map((match) => text(match[1]));
if (h1Values.length !== 1 || h1Values[0] !== canonicalH1) failures.push(`/: expected one exact canonical h1, received ${JSON.stringify(h1Values)}`);
for (const item of metadata.filter((item) => item.route !== '/' && !item.source.includes(`${path.sep}archive${path.sep}`) && (item.scope === 'handbook' || item.order === 10))) {
  if (!home.includes(`href="${item.route}"`)) failures.push(`/: canonical guide link is missing: ${item.route}`);
  // The foundations index intentionally renders titles only; descriptions remain canonical metadata.
}

for (const [alias] of Object.entries(contentRedirects())) {
  try { await access(routeFile(alias)); } catch { failures.push(`${alias}: redirect output is missing`); }
}
try { await access(routeFile('/changes/')); } catch { failures.push('/changes/: release history redirect is missing'); }

const sitemapFiles = (await readdir(dist)).filter((file) => file.startsWith('sitemap') && file.endsWith('.xml'));
if (sitemapFiles.length === 0) failures.push('sitemap output is missing');
else {
  const sitemap = await readFile(path.join(dist, sitemapFiles[0]), 'utf8');
  const locations = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
  for (const { route } of metadata) if (!locations.has(`${origin}${route}`)) failures.push(`${route}: absent from sitemap`);
  for (const route of draftGuides) if (locations.has(`${origin}${route}`)) failures.push(`${route}: draft route appears in sitemap`);
  for (const alias of [...Object.keys(contentRedirects()), '/changes/']) if (locations.has(`${origin}${alias}`)) failures.push(`${alias}: redirect route appears in sitemap`);
}

try {
  const robots = await readFile(path.join(dist, 'robots.txt'), 'utf8');
  if (!robots.includes('User-agent: *') || !robots.includes('Allow: /')) failures.push('robots.txt does not permit public crawling');
  if (!robots.includes(`${origin}/sitemap-index.xml`)) failures.push('robots.txt does not reference the sitemap index');
} catch { failures.push('generated robots.txt is missing'); }

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`validated ${metadata.length} canonical routes, derived metadata, redirects, links, sitemap, and homepage identity`);
