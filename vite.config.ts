import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import { localePages } from './scripts/locale-pages.ts'
import { site } from './src/config/site.ts'

// https://vitejs.dev/config/
export default defineConfig({
  // Served from the path of the public address (e.g. /presentation/ on GitHub Pages), in dev too,
  // so links and assets behave the same locally and in production.
  base: new URL(site.url || 'http://localhost').pathname.replace(/\/?$/, '/'),
  plugins: [vue(), VueDevTools(), localePages()],
  css: {
    modules: {
      // Readable class names in DevTools, as in Osnova: os-Button__primary.
      generateScopedName: (name, filename) => {
        const component = filename
          .split('?')[0]
          .split('/')
          .at(-1)!
          .replace(/\.(vue|module\.css)$/, '')
        return `os-${component}__${name}`
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
