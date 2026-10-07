import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// Flat config (ESLint 9+). Prettier owns formatting; ESLint checks code only.
export default defineConfigWithVueTs(
  { ignores: ['dist/**', 'node_modules/**', 'coverage/**'] },
  js.configs.recommended,
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,
  {
    rules: {
      'no-console': 'error',
      'prefer-const': 'error'
    }
  },
  {
    // Design system components keep Osnova's names (Button, Card, Navbar…).
    files: ['src/shared/ui/components/**/*.vue'],
    rules: { 'vue/multi-word-component-names': 'off' }
  },
  {
    // Build scripts report to the terminal.
    files: ['scripts/**/*.ts'],
    rules: { 'no-console': 'off' }
  }
)
