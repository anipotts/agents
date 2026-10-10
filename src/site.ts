export const site = {
  name: 'coding agent tips',
  url: 'https://agents.anipotts.com',
  repository: 'https://github.com/anipotts/agents',
  socialImage: '/social-card.png',
  socialImageAlt: 'coding agent tips: a guide to coding agents in production software',
  releaseHistory: 'https://github.com/anipotts/agents/releases',
  author: {
    name: 'Ani Potts',
    label: 'ani potts',
    url: 'https://anipotts.com/',
    id: 'https://anipotts.com/#person',
  },
  crashCourse: {
    label: 'agent foundations',
    href: '/handbook/operating-agents/#the-foundations',
  },
  interfaceCopy: {
    menu: 'menu',
    choosePage: 'choose page',
    browseGuides: 'browse guides',
    providerGuides: 'provider guides',
    onThisPage: 'on this page',
    search: 'search',
    sources: 'sources',
    sharedFoundations: 'shared foundations',
    evidence: 'examples and sources',
    github: 'coding agent tips on GitHub',
    home: 'coding agent tips home',
    guides: 'guides',
    contents: 'contents',
    archive: 'archive',
    lastUpdated: 'last updated',
    releases: 'releases',
    by: 'by',
  },
} as const;

// Both page shells publish the same author and website identity.
export const authorshipHead = [
  { tag: 'meta', attrs: { name: 'author', content: site.author.name } },
  { tag: 'link', attrs: { rel: 'author', href: site.author.url } },
  {
    tag: 'script',
    attrs: { type: 'application/ld+json' },
    content: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      name: site.name,
      url: `${site.url}/`,
      author: {
        '@type': 'Person',
        '@id': site.author.id,
        name: site.author.name,
        url: site.author.url,
      },
    }).replaceAll('<', '\\u003c'),
  },
] as const;

export const handbookChapters = [
  { id: 'overview', label: 'what is it?', slug: '', order: 10, icon: 'ph:book-open-text' },
  { id: 'getting-started', label: 'your first task', slug: 'getting-started', order: 20, icon: 'ph:arrow-right' },
  { id: 'configuration', label: 'settings and memory', slug: 'configuration', order: 30, icon: 'ph:sliders-horizontal' },
  { id: 'workflows', label: 'working on a project', slug: 'workflows', order: 40, icon: 'ph:git-branch' },
  { id: 'extensions', label: 'what else can it do?', slug: 'extensions', order: 50, icon: 'ph:app-window' },
  { id: 'safety', label: 'what can go wrong?', slug: 'safety', order: 60, icon: 'ph:shield-check' },
  { id: 'recommendations', label: 'choosing your setup', slug: 'recommendations', order: 70, icon: 'ph:compass' },
] as const;

export const handbookScopes = [
  { id: 'handbook', label: 'handbook', href: '/', order: 10, public: true, providerIcon: '/favicon.svg' },
  {
    id: 'codex', label: 'codex', href: '/guides/codex/', order: 20, public: true,
    providerIcon: '/icons/products/codex.png',
    providerIconSource: 'https://openai.com/index/introducing-the-codex-app/', providerIconCheckedAt: '2026-08-29',
  },
  {
    id: 'claude-code', label: 'claude code', heroLabel: 'claude', href: '/guides/claude-code/', order: 30, public: true,
    heroIcon: '/icons/products/claude.svg', providerIcon: '/icons/products/claude-code.png', providerIconDark: '/icons/products/claude-code.png',
    providerIconSource: 'https://claude.ai/images/claude_app_icon.png', providerIconCheckedAt: '2026-09-08',
  },
  {
    id: 'grok', label: 'grok', href: '/guides/grok/', order: 40, public: true,
    heroIcon: '/icons/products/grok.svg', providerIcon: '/icons/products/grok.png', providerIconDark: '/icons/products/grok.png',
    providerIconSource: 'https://grok.com/', providerIconCheckedAt: '2026-08-29',
  },
  { id: 'opencode', label: 'opencode', href: '/guides/opencode/', order: 50, public: false, providerIcon: '/favicon.svg' },
  { id: 'qwen-code', label: 'qwen code', href: '/guides/qwen-code/', order: 60, public: false, providerIcon: '/favicon.svg' },
  { id: 'kimi-code', label: 'kimi code', href: '/guides/kimi-code/', order: 70, public: false, providerIcon: '/icons/publishers/kimi.png' },
  { id: 'aider', label: 'aider', href: '/guides/aider/', order: 80, public: false, providerIcon: '/icons/publishers/aider.png' },
] as const;

export const providerHomepageHighlights = {
  codex: [
    { label: 'control rooms and surfaces', href: '/guides/codex/', icon: 'ph:app-window' },
    { label: 'config.toml, trust, and approvals', href: '/guides/codex/configuration/', icon: 'ph:sliders-horizontal' },
    { label: 'remote, cloud, and mobile steering', href: '/guides/codex/#cloud-work-and-mobile-access', icon: 'ph:arrow-right' },
  ],
  'claude-code': [
    { label: 'repository context and interfaces', href: '/guides/claude-code/', icon: 'ph:book-open-text' },
    { label: 'config, settings, rules, and memory', href: '/guides/claude-code/configuration/', icon: 'ph:sliders-horizontal' },
    { label: 'web, Remote Control, and mobile', href: '/guides/claude-code/#web-and-remote-control', icon: 'ph:arrow-right' },
  ],
  grok: [
    { label: 'Grok Build and Grok Bot', href: '/guides/grok/', icon: 'ph:app-window' },
    { label: 'settings and permissions', href: '/guides/grok/configuration/', icon: 'ph:sliders-horizontal' },
    { label: 'what still needs hands on testing', href: '/guides/grok/recommendations/', icon: 'ph:compass' },
  ],
} as const;

export const navigationScopes = handbookScopes.filter((scope) => scope.public);

export type NavigationScope = (typeof handbookScopes)[number]['id'];
export type HandbookChapter = (typeof handbookChapters)[number];

export function homepageHighlightsForScope(scope: NavigationScope) {
  if (scope === 'codex' || scope === 'claude-code' || scope === 'grok') return providerHomepageHighlights[scope];
  return [];
}

export function chapterForOrder(order: number): HandbookChapter | undefined {
  return handbookChapters.find((chapter) => chapter.order === order);
}
