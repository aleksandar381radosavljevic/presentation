import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import { localePages } from './scripts/locale-pages.ts'

// https://vitejs.dev/config/
export default defineConfig({
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
