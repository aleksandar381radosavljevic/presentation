/** Themes: the user's choice ('system' follows the OS) and the resolved theme that goes into data-theme. */
export type ThemeMode = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

const QUERY = '(prefers-color-scheme: dark)'
const canMatch = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function'

/** Current OS theme ('light' on the server and in old browsers). */
export function getSystemTheme(): ResolvedTheme {
  return canMatch() && window.matchMedia(QUERY).matches ? 'dark' : 'light'
}

/** Reports system theme changes; returns an unsubscribe function. */
export function subscribeSystemTheme(onChange: (theme: ResolvedTheme) => void): () => void {
  if (!canMatch()) return () => {}
  const mql = window.matchMedia(QUERY)
  const handler = () => onChange(mql.matches ? 'dark' : 'light')
  mql.addEventListener('change', handler)
  return () => mql.removeEventListener('change', handler)
}

export const resolveTheme = (mode: ThemeMode): ResolvedTheme =>
  mode === 'system' ? getSystemTheme() : mode

/**
 * App-wide theme: sets data-theme and color-scheme on <html>.
 * For 'system' it follows changes until the returned function is called.
 */
export function applyTheme(
  mode: ThemeMode,
  root: HTMLElement = document.documentElement
): () => void {
  const set = (t: ResolvedTheme) => {
    root.dataset.theme = t
    root.style.colorScheme = t
  }
  set(resolveTheme(mode))
  return mode === 'system' ? subscribeSystemTheme(set) : () => {}
}
