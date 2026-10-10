<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Monitor, Moon, Sun } from '@lucide/vue'
import {
  DropdownMenu,
  Icon,
  Logo,
  Navbar,
  useTheme,
  type MenuItem,
  type ThemeMode
} from '@/shared/ui'
import { currentLocale, pathFor, setLocale, supportedLocales, type Locale } from '@/i18n'
import { useActiveSection } from './useActiveSection'

const SECTIONS = ['about', 'services', 'projects', 'process', 'engagement', 'experience'] as const

const { t } = useI18n()
const { mode, setTheme } = useTheme()
const activeSection = useActiveSection([...SECTIONS])

const navItems = computed(() =>
  SECTIONS.map((id) => ({ id, label: t(`nav.${id}`), href: `#${id}` }))
)

// Real links, so crawlers find the other language and it opens in a new tab; a plain click
// switches in place without a reload.
const onLanguageClick = (event: MouseEvent, code: Locale) => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  setLocale(code)
}

const THEME_ICONS = { light: Sun, dark: Moon, system: Monitor }
const themeItems = computed<MenuItem[]>(() =>
  (['light', 'dark', 'system'] as ThemeMode[]).map((m) => ({
    id: m,
    label: t(`ui.theme${m[0].toUpperCase()}${m.slice(1)}`),
    icon: THEME_ICONS[m],
    checked: mode.value === m,
    onSelect: () => setTheme(m)
  }))
)
</script>

<template>
  <a :class="$style.skipLink" href="#main-content">{{ t('ui.skipToContent') }}</a>
  <Navbar
    :items="navItems"
    :active-id="activeSection"
    :label="t('ui.mainNav')"
    :open-menu-label="t('ui.openMenu')"
    :close-menu-label="t('ui.closeMenu')"
  >
    <template #brand>
      <a href="#top">
        <Logo :size="32" />
        <span :class="$style.name">{{ t('heading.name') }}</span>
      </a>
    </template>
    <template #actions>
      <!-- Two languages fit a compact toggle; each link names its language in full for screen readers. -->
      <nav :class="$style.language" :aria-label="t('ui.language')">
        <a
          v-for="locale in supportedLocales"
          :key="locale.code"
          :href="pathFor(locale.code)"
          :hreflang="locale.code"
          :lang="locale.code"
          :aria-current="currentLocale === locale.code ? 'page' : undefined"
          @click="onLanguageClick($event, locale.code)"
        >
          <span aria-hidden="true">{{ locale.short }}</span>
          <span :class="$style.srOnly">{{ locale.label }}</span>
        </a>
      </nav>
      <DropdownMenu :items="themeItems" :label="t('ui.theme')" placement="bottom-end">
        <template #trigger="{ triggerProps }">
          <Icon v-bind="triggerProps" :icon="THEME_ICONS[mode]" :size="20" :label="t('ui.theme')" />
        </template>
      </DropdownMenu>
    </template>
  </Navbar>
</template>

<style module>
.skipLink {
  position: absolute;
  left: var(--space-4);
  top: var(--space-2);
  z-index: var(--z-tooltip);
  padding: var(--space-2) var(--space-3);
  background: var(--surface-overlay);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  transform: translateY(-200%);
}
.skipLink:focus {
  transform: none;
}
.name {
  white-space: nowrap;
}
.language {
  display: inline-flex;
  padding: 2px;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
}
.language a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 28px;
  padding: 0 var(--space-2);
  font: 600 13px/1 var(--font-sans);
  color: var(--ink-muted);
  background: transparent;
  border: 0;
  border-radius: var(--radius-sm);
  text-decoration: none;
}
.language a:hover {
  color: var(--ink);
}
.language a[aria-current='page'] {
  color: var(--ink);
  background: var(--surface-sunken);
}
.language a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}
.srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
/* On narrow phones the name is hidden visually but still names the link to the top. */
@media (max-width: 479px) {
  .name {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
}
</style>
