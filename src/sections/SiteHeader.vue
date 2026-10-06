<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Monitor, Moon, Sun } from '@lucide/vue'
import {
  DropdownMenu,
  Icon,
  Logo,
  Navbar,
  Select,
  useTheme,
  type MenuItem,
  type ThemeMode
} from '@/shared/ui'
import { currentLocale, setLocale, supportedLocales } from '@/i18n'
import { useActiveSection } from './useActiveSection'

const SECTIONS = [
  'about',
  'services',
  'process',
  'projects',
  'engagement',
  'experience',
  'technologies'
] as const

const { t } = useI18n()
const { mode, setTheme } = useTheme()
const activeSection = useActiveSection([...SECTIONS])

const navItems = computed(() =>
  SECTIONS.map((id) => ({ id, label: t(`nav.${id}`), href: `#${id}` }))
)
const languageOptions = supportedLocales.map((x) => ({ value: x.code, label: x.label }))
const language = computed({ get: () => currentLocale.value, set: setLocale })

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
      <Select
        v-model="language"
        :class="$style.language"
        :label="t('ui.language')"
        hide-label
        size="sm"
        :options="languageOptions"
      />
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
  width: 120px;
}
@media (max-width: 479px) {
  .name {
    display: none;
  }
}
</style>
