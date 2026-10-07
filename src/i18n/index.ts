import { computed } from 'vue'
import { createI18n } from 'vue-i18n'
import en from './locales/en'
import sr from './locales/sr'

export const supportedLocales = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'sr', label: 'Српски', short: 'Срп' }
] as const

export type Locale = (typeof supportedLocales)[number]['code']

const DEFAULT_LOCALE: Locale = 'en'

// Each language has its own address (/ and /sr/), so a link always opens the language it was
// shared in. The address is the only source of the language: no stored choice, no browser guess.
const pathFor = (code: Locale) => (code === DEFAULT_LOCALE ? '/' : `/${code}/`)

const isSupported = (code: string | null | undefined): code is Locale =>
  supportedLocales.some((x) => x.code === code)

const detectLocale = (): Locale => {
  const segment = location.pathname.split('/')[1]
  return isSupported(segment) ? segment : DEFAULT_LOCALE
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages: { en, sr }
})

const applyDocumentLocale = (code: Locale) => {
  document.documentElement.lang = code
  document.title = i18n.global.t('meta.title')
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', i18n.global.t('meta.description'))
}

export const currentLocale = computed(() => i18n.global.locale.value as Locale)

export const setLocale = (code: string) => {
  const locale = isSupported(code) ? code : DEFAULT_LOCALE
  i18n.global.locale.value = locale
  // Switch in place, without a reload; the address now points at the chosen language.
  history.replaceState(history.state, '', pathFor(locale) + location.hash)
  applyDocumentLocale(locale)
}

applyDocumentLocale(currentLocale.value)
