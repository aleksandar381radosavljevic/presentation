import { computed } from 'vue'
import { createI18n } from 'vue-i18n'
import en from './locales/en'
import sr from './locales/sr'

export const supportedLocales = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'sr', label: 'Српски', short: 'Срп' }
] as const

export type Locale = (typeof supportedLocales)[number]['code']

const STORAGE_KEY = 'locale'
const DEFAULT_LOCALE: Locale = 'en'

const isSupported = (code: string | null | undefined): code is Locale =>
  supportedLocales.some((x) => x.code === code)

const readStoredLocale = () => {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

const detectLocale = (): Locale => {
  const stored = readStoredLocale()
  if (isSupported(stored)) return stored
  const browser = navigator.language?.split('-')[0]
  return isSupported(browser) ? browser : DEFAULT_LOCALE
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
}

export const currentLocale = computed(() => i18n.global.locale.value as Locale)

export const setLocale = (code: string) => {
  const locale = isSupported(code) ? code : DEFAULT_LOCALE
  i18n.global.locale.value = locale
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // Storage can be unavailable (private mode); the choice then lasts for this visit only.
  }
  applyDocumentLocale(locale)
}

applyDocumentLocale(currentLocale.value)
