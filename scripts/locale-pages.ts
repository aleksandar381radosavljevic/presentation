import type { Plugin } from 'vite'
import en from '../src/i18n/locales/en'
import sr from '../src/i18n/locales/sr'
import { site } from '../src/config/site'

/**
 * One HTML page per language: / in English and /sr/ in Serbian. Each page carries its own
 * lang, title, description and Open Graph tags, because link previews (LinkedIn, Slack) read
 * only the HTML and never run the app. The content itself is still rendered by the app.
 */
const PAGES = [
  { locale: 'en', path: '/', messages: en, ogLocale: 'en_US', image: '/og-en.jpg' },
  { locale: 'sr', path: '/sr/', messages: sr, ogLocale: 'sr_RS', image: '/og-sr.jpg' }
] as const
type Page = (typeof PAGES)[number]

const MARKER = '<!-- locale-head -->'
const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function head(page: Page) {
  const m = page.messages.meta
  const abs = (path: string) => `${site.url}${path}`
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
      `<meta property="og:image:alt" content="${escape(m.imageAlt)}" />`
    )
  }
  return tags.join('\n    ')
}

const render = (html: string, page: Page) =>
  html.replace('<html lang="en">', `<html lang="${page.locale}">`).replace(MARKER, head(page))

export function localePages(): Plugin {
  let template = ''
  return {
    name: 'locale-pages',
    // After Vite's own HTML plugin, so the template already has the hashed asset links.
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        template = html
        return render(html, PAGES[0])
      }
    },
    buildStart() {
      if (!site.url) {
        this.warn('site.url is empty: the share image, canonical and hreflang links are left out.')
      }
    },
    generateBundle() {
      if (!template) this.error('index.html was not transformed before the bundle was written.')
      // The other languages are copies of the finished English page, so they load the same
      // hashed assets; asset URLs are absolute, so they resolve from /sr/ as well.
      for (const page of PAGES.slice(1)) {
        this.emitFile({
          type: 'asset',
          fileName: `${page.path.slice(1)}index.html`,
          source: render(template, page)
        })
      }
    }
  }
}
