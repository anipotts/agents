import { AGENT_INDEX_VERSION, AGENT_CATALOG_VERSION } from './agent-index-version.mjs';

export const AGENT_TOOL_NAMES = [
  'list_handbook_pages',
  'search_handbook',
  'read_handbook_section',
  'inspect_source',
  'open_handbook_page',
];

const scopes = ['handbook', 'codex', 'claude-code', 'grok'];
const noExtraProperties = { additionalProperties: false };
const schema = (properties, required = []) => ({ type: 'object', properties, required, ...noExtraProperties });
const string = (description, maxLength, extra = {}) => ({ type: 'string', description, maxLength, ...extra });
const integer = (description, maximum, defaultValue) => ({ type: 'integer', description, minimum: 1, maximum, default: defaultValue });

export const AGENT_TOOL_SCHEMAS = {
  list_handbook_pages: schema({
    scope: { type: 'string', description: 'Optional handbook or provider scope.', enum: scopes },
    limit: integer('Maximum pages to return.', 30, 20),
  }),
  search_handbook: schema({
    query: string('Words to find in public handbook text.', 120, { minLength: 1 }),
    scope: { type: 'string', description: 'Optional handbook or provider scope.', enum: scopes },
    limit: integer('Maximum matches to return.', 8, 5),
  }, ['query']),
  read_handbook_section: schema({
    route: string('Canonical same-origin handbook route.', 200, { pattern: '^/' }),
    anchor: string('Heading anchor or exact heading text.', 160, { minLength: 1 }),
    maxCharacters: { type: 'integer', description: 'Maximum section characters.', minimum: 200, maximum: 1500, default: 1200 },
  }, ['route', 'anchor']),
  inspect_source: schema({
    sourceId: string('Registered public source identifier.', 128, { minLength: 1 }),
  }, ['sourceId']),
  open_handbook_page: schema({
    route: string('Canonical same-origin handbook route.', 200, { pattern: '^/' }),
    anchor: string('Optional heading anchor on that page.', 160, { minLength: 1 }),
  }, ['route']),
};

const ok = (data) => ({ schemaVersion: AGENT_INDEX_VERSION, ok: true, data });
const fail = (code, message) => ({ schemaVersion: AGENT_INDEX_VERSION, ok: false, error: { code, message } });
const plainObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const exactKeys = (input, allowed) => Object.keys(input).every((key) => allowed.includes(key));
const boundedInteger = (value, fallback, maximum, minimum = 1) => value === undefined ? fallback : Number.isInteger(value) && value >= minimum && value <= maximum ? value : null;
const cleanString = (value, maximum, required = false) => {
  if (value === undefined && !required) return undefined;
  if (typeof value !== 'string') return null;
  const clean = value.trim();
  return clean.length >= (required ? 1 : 0) && clean.length <= maximum ? clean : null;
};
const pageSummary = (page) => ({
  route: page.route,
  markdownUrl: page.markdownUrl,
  kind: page.kind,
  title: page.title,
  description: page.description,
  updatedAt: page.updatedAt,
  status: page.status,
  evidence: page.evidence,
  sourceIds: page.sourceIds,
  scope: page.scope,
});
const normalizeRoute = (value) => value === '/' ? '/' : value.endsWith('/') ? value : `${value}/`;
const findPage = (index, route) => index.pages.find((page) => page.route === normalizeRoute(route));
const countMatches = (text, query) => text.toLocaleLowerCase().split(query).length - 1;
const snippet = (text, query, maximum = 180) => {
  const normalized = text.replace(/\s+/g, ' ').trim();
  const match = normalized.toLocaleLowerCase().indexOf(query);
  if (match < 0) return normalized.slice(0, maximum);
  const start = Math.max(0, match - Math.floor(maximum / 3));
  const end = Math.min(normalized.length, start + maximum);
  return `${start > 0 ? '…' : ''}${normalized.slice(start, end).trim()}${end < normalized.length ? '…' : ''}`;
};

export function createHandbookTools({ loadIndex, loadPage, navigate }) {
  const readPage = async (page, signal) => {
    signal?.throwIfAborted();
    if (typeof page.text === 'string') return page;
    if (!loadPage) throw new Error('page content loader is unavailable');
    const content = await loadPage(page, signal);
    signal?.throwIfAborted();
    if (content?.route !== page.route || typeof content.text !== 'string' || !Array.isArray(content.sections)) throw new Error('page content is invalid');
    return content;
  };
  const withIndex = (execute) => async (input, options = {}) => {
    if (options.signal?.aborted) return fail('aborted', 'The tool call was cancelled.');
    try {
      const index = await loadIndex(options.signal);
      options.signal?.throwIfAborted();
      if (![AGENT_INDEX_VERSION, AGENT_CATALOG_VERSION].includes(index?.schemaVersion)) return fail('unavailable', 'The handbook index version is unavailable.');
      const result = await execute(input, index, options);
      options.signal?.throwIfAborted();
      return result;
    } catch (error) {
      if (options.signal?.aborted || error?.name === 'AbortError') return fail('aborted', 'The tool call was cancelled.');
      return fail('unavailable', 'The handbook index could not be loaded.');
    }
  };

  return [
    {
      name: 'list_handbook_pages',
      title: 'List handbook pages',
      description: 'Lists canonical public agent tips pages with route, update, evidence, and source provenance.',
      inputSchema: AGENT_TOOL_SCHEMAS.list_handbook_pages,
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: withIndex((input, index) => {
        if (!plainObject(input) || !exactKeys(input, ['scope', 'limit'])) return fail('invalid_input', 'Use only scope and limit.');
        const scope = cleanString(input.scope, 32);
        const limit = boundedInteger(input.limit, 20, 30);
        if (scope === null || (scope !== undefined && !scopes.includes(scope)) || limit === null) return fail('invalid_input', 'Scope or limit is invalid.');
        const pages = index.pages.filter((page) => !scope || page.scope === scope).slice(0, limit).map(pageSummary);
        return ok({ pages, total: pages.length });
      }),
    },
    {
      name: 'search_handbook',
      title: 'Search handbook',
      description: 'Searches canonical public handbook text locally and returns bounded matches with provenance and normal URLs.',
      inputSchema: AGENT_TOOL_SCHEMAS.search_handbook,
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      execute: withIndex(async (input, index, options) => {
        if (!plainObject(input) || !exactKeys(input, ['query', 'scope', 'limit'])) return fail('invalid_input', 'Use only query, scope, and limit.');
        const query = cleanString(input.query, 120, true);
        const scope = cleanString(input.scope, 32);
        const limit = boundedInteger(input.limit, 5, 8);
        if (query === null || scope === null || (scope !== undefined && !scopes.includes(scope)) || limit === null) return fail('invalid_input', 'Query, scope, or limit is invalid.');
        const needle = query.toLocaleLowerCase();
        const pages = await Promise.all(index.pages.filter((page) => !scope || page.scope === scope).map((page) => readPage(page, options.signal)));
        const results = pages
          .map((page) => {
            const title = page.title.toLocaleLowerCase();
            const description = page.description.toLocaleLowerCase();
            const headings = page.sections.map((section) => section.title).join(' ').toLocaleLowerCase();
            const body = page.text.toLocaleLowerCase();
            const score = (title.includes(needle) ? 100 : 0) + (description.includes(needle) ? 40 : 0) + (headings.includes(needle) ? 25 : 0) + Math.min(20, countMatches(body, needle));
            return { page, score };
          })
          .filter(({ score }) => score > 0)
          .sort((left, right) => right.score - left.score || left.page.route.localeCompare(right.page.route))
          .slice(0, limit)
          .map(({ page, score }) => ({ ...pageSummary(page), score, snippet: snippet(page.text, needle) }));
        return ok({ query, results, total: results.length });
      }),
    },
    {
      name: 'read_handbook_section',
      title: 'Read handbook section',
      description: 'Reads one public section by canonical route and heading anchor, returning bounded text and source provenance.',
      inputSchema: AGENT_TOOL_SCHEMAS.read_handbook_section,
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      execute: withIndex(async (input, index, options) => {
        if (!plainObject(input) || !exactKeys(input, ['route', 'anchor', 'maxCharacters'])) return fail('invalid_input', 'Use only route, anchor, and maxCharacters.');
        const route = cleanString(input.route, 200, true);
        const anchor = cleanString(input.anchor, 160, true);
        const maxCharacters = boundedInteger(input.maxCharacters, 1200, 1500, 200);
        if (route === null || anchor === null || maxCharacters === null || !route.startsWith('/')) return fail('invalid_input', 'Route, anchor, or maxCharacters is invalid.');
        const page = findPage(index, route);
        if (!page) return fail('not_found', 'The canonical handbook route was not found.');
        const normalizedAnchor = anchor.replace(/^#/, '').toLocaleLowerCase();
        const heading = page.sections.find((candidate) => candidate.anchor.toLocaleLowerCase() === normalizedAnchor || candidate.title.toLocaleLowerCase() === normalizedAnchor);
        if (!heading) return fail('not_found', 'The heading was not found on that page.');
        const content = await readPage(page, options.signal);
        const section = content.sections.find((candidate) => candidate.anchor === heading.anchor);
        if (!section || typeof section.text !== 'string') throw new Error('section content is unavailable');
        const text = section.text.slice(0, maxCharacters);
        return ok({ ...pageSummary(page), section: { anchor: section.anchor, title: section.title, depth: section.depth, text, truncated: text.length < section.text.length } });
      }),
    },
    {
      name: 'inspect_source',
      title: 'Inspect source',
      description: 'Returns the public title, publisher, URL, and evidence type for one source referenced by the handbook.',
      inputSchema: AGENT_TOOL_SCHEMAS.inspect_source,
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      execute: withIndex((input, index) => {
        if (!plainObject(input) || !exactKeys(input, ['sourceId'])) return fail('invalid_input', 'Use only sourceId.');
        const sourceId = cleanString(input.sourceId, 128, true);
        if (sourceId === null) return fail('invalid_input', 'SourceId is invalid.');
        const source = index.sources.find((candidate) => candidate.id === sourceId);
        return source ? ok({ source }) : fail('not_found', 'The public source was not found.');
      }),
    },
    {
      name: 'open_handbook_page',
      title: 'Open handbook page',
      description: 'Navigates to a validated canonical handbook route and optional heading on the current site.',
      inputSchema: AGENT_TOOL_SCHEMAS.open_handbook_page,
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: withIndex(async (input, index) => {
        if (!plainObject(input) || !exactKeys(input, ['route', 'anchor'])) return fail('invalid_input', 'Use only route and anchor.');
        const route = cleanString(input.route, 200, true);
        const anchor = cleanString(input.anchor, 160);
        if (route === null || anchor === null || !route.startsWith('/') || route.startsWith('//')) return fail('navigation_rejected', 'Only canonical same-origin handbook routes are allowed.');
        const page = findPage(index, route);
        if (!page) return fail('navigation_rejected', 'The route is outside the canonical handbook.');
        let resolvedAnchor;
        if (anchor !== undefined) {
          const normalizedAnchor = anchor.replace(/^#/, '').toLocaleLowerCase();
          const section = page.sections.find((candidate) => candidate.anchor.toLocaleLowerCase() === normalizedAnchor || candidate.title.toLocaleLowerCase() === normalizedAnchor);
          if (!section) return fail('navigation_rejected', 'The heading is outside the canonical page.');
          resolvedAnchor = section.anchor;
        }
        const target = `${page.route}${resolvedAnchor ? `#${encodeURIComponent(resolvedAnchor)}` : ''}`;
        await navigate(target);
        return ok({ route: page.route, anchor: resolvedAnchor ?? null, target });
      }),
    },
  ];
}
