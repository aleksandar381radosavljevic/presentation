import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'
import { i18n, type Locale } from './i18n'

/**
 * Renders the page in one language to HTML at build time (scripts/prerender.ts), so the content
 * is in the HTML for crawlers that never run JavaScript and shows before the app loads.
 */
export function render(locale: Locale): Promise<string> {
  i18n.global.locale.value = locale
  return renderToString(createSSRApp(App).use(i18n))
}
