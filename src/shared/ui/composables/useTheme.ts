import { readonly, ref } from 'vue'
import { applyTheme, type ThemeMode } from '../utils/theme'

const STORAGE_KEY = 'theme'
const MODES: ThemeMode[] = ['light', 'dark', 'system']

const readStored = (): ThemeMode => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return MODES.includes(stored as ThemeMode) ? (stored as ThemeMode) : 'system'
  } catch {
    return 'system'
  }
}

const mode = ref<ThemeMode>(readStored())
let stop: (() => void) | undefined

/**
 * App-wide theme mode shared by every caller: 'system' by default, the user's choice is remembered.
 * index.html sets the same theme before first paint, so there is no flash on load.
 */
export function useTheme() {
  if (!stop) stop = applyTheme(mode.value)

  const setTheme = (next: ThemeMode) => {
    stop?.()
    mode.value = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage can be unavailable (private mode); the choice then lasts for this visit only.
    }
    stop = applyTheme(next)
  }

  return { mode: readonly(mode), setTheme }
}
