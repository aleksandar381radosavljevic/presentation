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
    "no-unused-vars": "error", // Warns about unused variables
    "no-undef": "error", // Reports references to undeclared variables
    "prefer-const": "error" // Requires the use of const when declaring variables that are never reassigned
  }
}
