import type { IndexHtmlTransformContext, Plugin } from 'vite'
import en from '../src/i18n/locales/en.ts'
import sr from '../src/i18n/locales/sr.ts'
import { site } from '../src/config/site.ts'

/**
 * One HTML page per language: / in English and /sr/ in Serbian. Each page carries its own
 * lang, title, description and Open Graph tags, because link previews (LinkedIn, Slack) read
 * only the HTML and never run the app. The content is rendered into these pages afterwards by
 * scripts/prerender.ts.
 */
export const PAGES = [
  { locale: 'en', path: '/', messages: en, ogLocale: 'en_US', image: '/og-en.jpg' },
  { locale: 'sr', path: '/sr/', messages: sr, ogLocale: 'sr_RS', image: '/og-sr.jpg' }
] as const
type Page = (typeof PAGES)[number]

const MARKER = '<!-- locale-head -->'
const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const abs = (path: string) => `${site.url}${path}`
// Path of the site on its host (/presentation/ on GitHub Pages, / on an own domain).
const basePath = () => new URL(site.url || 'http://localhost').pathname.replace(/\/?$/, '/')

/** Skills listed for search engines; technology names read the same in every language. */
const KNOWS_ABOUT = [
  'Frontend architecture',
  'Real-time data visualization',
  'Web HMI',
  'Vue',
  'React',
  'TypeScript',
  'SignalR',
  '.NET'
]

/**
 * Who the page is about, as schema.org data (ProfilePage with a Person). It lets a search for the
 * name connect this site, the portrait and the LinkedIn profile to one person, and carries the
 * name in both scripts, since people in Serbia search in Latin while the Serbian page is Cyrillic.
 */
function profileData(page: Page, portrait: string) {
  const m = page.messages.meta
  const other = PAGES.filter((p) => p !== page).map((p) => p.messages.heading.name)
  const sameAs = [site.linkedinUrl].filter(Boolean)
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: abs(page.path),
    inLanguage: page.locale,
    name: m.title,
    mainEntity: {
      '@type': 'Person',
      name: page.messages.heading.name,
      alternateName: other,
      jobTitle: page.messages.heading.role,
      description: m.description,
      url: abs('/'),
      ...(portrait && { image: abs(portrait) }),
      address: { '@type': 'PostalAddress', addressLocality: m.locality, addressCountry: 'RS' },
      worksFor: { '@type': 'Organization', name: 'COMING – Computer Engineering' },
      alumniOf: { '@type': 'CollegeOrUniversity', name: m.school },
      knowsAbout: KNOWS_ABOUT,
      ...(sameAs.length && { sameAs })
    }
  }
  // `<` escaped so no text in the data can close the script tag.
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

function head(page: Page, portrait: string) {
  const m = page.messages.meta
  const tags = [
    `<title>${escape(m.title)}</title>`,
    `<meta name="description" content="${escape(m.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${escape(m.shareTitle)}" />`,
    `<meta property="og:description" content="${escape(m.description)}" />`,
    `<meta property="og:locale" content="${page.ogLocale}" />`,
    ...PAGES.filter((p) => p !== page).map(
      (p) => `<meta property="og:locale:alternate" content="${p.ogLocale}" />`
    ),
    `<meta name="twitter:card" content="summary_large_image" />`
  ]
  if (site.url) {
    tags.push(
      `<link rel="canonical" href="${abs(page.path)}" />`,
      ...PAGES.map((p) => `<link rel="alternate" hreflang="${p.locale}" href="${abs(p.path)}" />`),
      `<link rel="alternate" hreflang="x-default" href="${abs('/')}" />`,
      `<meta property="og:url" content="${abs(page.path)}" />`,
      `<meta property="og:image" content="${abs(page.image)}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="${escape(m.imageAlt)}" />`,
      `<script type="application/ld+json">${profileData(page, portrait)}</script>`
    )
  }
  return tags.join('\n    ')
}

const render = (html: string, page: Page, portrait: string) =>
  html
    .replace('<html lang="en">', `<html lang="${page.locale}">`)
    .replace(MARKER, head(page, portrait))

/** The hero portrait as built (hashed name), relative to the site root, e.g. /assets/profile-x.jpg. */
function findPortrait(bundle: IndexHtmlTransformContext['bundle']) {
  const asset = Object.values(bundle ?? {}).find(
    (file) => file.type === 'asset' && file.names.includes('profile.jpg')
  )
  return asset ? `/${asset.fileName}` : ''
}

/** Both pages with their language versions, so search engines find /sr/ even without a link. */
function sitemap() {
  const alternates = PAGES.map(
    (p) => `    <xhtml:link rel="alternate" hreflang="${p.locale}" href="${abs(p.path)}"/>`
  ).join('\n')
  const urls = PAGES.map((p) => `  <url>\n    <loc>${abs(p.path)}</loc>\n${alternates}\n  </url>`)
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    ''
  ].join('\n')
}

/**
 * The page for an address that does not exist. GitHub Pages and Cloudflare Pages both serve
 * 404.html from the root of the site. It is in both languages, since the language comes from an
 * address that did not match, and is kept out of search results.
 */
function notFoundPage() {
  const base = basePath()
  const [en, sr] = PAGES.map((p) => p.messages.notFound)
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>${escape(en.title)}</title>
    <link rel="icon" href="${base}favicon.svg" type="image/svg+xml" />
    <style>
      :root { color-scheme: light dark; --bg: #f5f7f9; --ink: #222c35; --muted: #5b6570; --accent: #bd330f; }
      @media (prefers-color-scheme: dark) {
        :root { --bg: #0e1318; --ink: #eef1f4; --muted: #98a2ac; --accent: #f18719; }
      }
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 16px;
        box-sizing: border-box; background: var(--bg); color: var(--ink);
        font: 16px/1.5 system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }
      main { max-width: 34rem; }
      h1 { font-size: 28px; line-height: 1.2; margin: 0 0 8px; }
      p { margin: 0 0 8px; color: var(--muted); }
      section + section { margin-top: 32px; }
      a { color: var(--accent); font-weight: 600; }
    </style>
  </head>
  <body>
    <main>
      <section lang="en">
        <h1>${escape(en.title)}</h1>
        <p>${escape(en.text)}</p>
        <a href="${base}">${escape(en.home)}</a>
      </section>
      <section lang="sr">
        <h1>${escape(sr.title)}</h1>
        <p>${escape(sr.text)}</p>
        <a href="${base}sr/">${escape(sr.home)}</a>
      </section>
    </main>
  </body>
</html>
`
}

export function localePages(): Plugin {
  let template = ''
  let portrait = ''
  // The server build (src/entry-server.ts) has no index.html; the pages come from the client build.
  let ssr = false
  return {
    name: 'locale-pages',
    // After Vite's own HTML plugin, so the template already has the hashed asset links.
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        template = html
        portrait = findPortrait(ctx.bundle)
        return render(html, PAGES[0], portrait)
      }
    },
    configResolved(config) {
      ssr = !!config.build.ssr
    },
    buildStart() {
      if (!ssr && !site.url) {
        this.warn('site.url is empty: the share image, canonical and hreflang links are left out.')
      }
    },
    generateBundle() {
      if (ssr) return
      if (!template) this.error('index.html was not transformed before the bundle was written.')
      // The other languages are copies of the finished English page, so they load the same
      // hashed assets; asset URLs are absolute, so they resolve from /sr/ as well.
      for (const page of PAGES.slice(1)) {
        this.emitFile({
          type: 'asset',
          fileName: `${page.path.slice(1)}index.html`,
          source: render(template, page, portrait)
        })
      }
      this.emitFile({ type: 'asset', fileName: '404.html', source: notFoundPage() })
      if (!site.url) return
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap() })
      // robots.txt only counts at the root of a host, so it is written only for an own domain;
      // under a subpath (GitHub Pages project site) the sitemap goes to Search Console instead.
      if (basePath() === '/') {
        this.emitFile({
          type: 'asset',
          fileName: 'robots.txt',
          source: `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`
        })
      }
    }
  }
}
