/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    "no-console": "error", // Warns about console.log and similar statements
    // The base rule misreads TypeScript signatures (parameter names in function types);
    // the typescript-eslint version understands them.
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error", // Warns about unused variables
    "no-undef": "error", // Reports references to undeclared variables
    "prefer-const": "error" // Requires the use of const when declaring variables that are never reassigned
  },
  overrides: [
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
  ]
}
