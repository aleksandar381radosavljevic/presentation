<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useId, watch, type Component } from 'vue'
import { Menu, X } from '@lucide/vue'

export interface NavItem {
  id: string
  label: string
  href: string
  icon?: Component
}

export interface NavbarProps {
  items: NavItem[]
  /** id of the current page or section → aria-current. */
  activeId?: string
  /** Sticky header on scroll. */
  sticky?: boolean
  /** Accessible navigation name. */
  label?: string
  /** Accessible names of the menu toggle on narrow screens. */
  openMenuLabel?: string
  closeMenuLabel?: string
}

withDefaults(defineProps<NavbarProps>(), {
  sticky: true,
  label: 'Glavna navigacija',
  openMenuLabel: 'Otvori meni',
  closeMenuLabel: 'Zatvori meni'
})
defineSlots<{
  /** Logo + name, usually a link to the top of the page. */
  brand(): unknown
  /** Right side (language, theme, account). Stays visible on phones too. */
  actions?(): unknown
}>()

const open = ref(false)
const panelId = useId()
const toggle = ref<HTMLButtonElement>()

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    open.value = false
    toggle.value?.focus()
  }
}
watch(open, (isOpen) => {
  if (isOpen) document.addEventListener('keydown', onKeydown)
  else document.removeEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))

// The links collapse into the menu when they do not fit next to the brand and the actions.
// Measured, not a fixed breakpoint: labels differ by language and the actions vary.
const compact = ref(false)
const bar = ref<HTMLElement>()
const brand = ref<HTMLElement>()
const actions = ref<HTMLElement>()
const measure = ref<HTMLElement>()

const fit = () => {
  if (!bar.value || !brand.value || !actions.value || !measure.value) return
  const style = getComputedStyle(bar.value)
  const gap = parseFloat(style.columnGap) || 0
  const inner =
    bar.value.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
  const needed =
    brand.value.offsetWidth + measure.value.offsetWidth + actions.value.offsetWidth + 2 * gap
  compact.value = needed > inner
}
watch(compact, (isCompact) => {
  if (!isCompact) open.value = false
})

let observer: ResizeObserver | undefined
onMounted(() => {
  fit()
  observer = new ResizeObserver(fit)
  for (const el of [bar.value, brand.value, actions.value, measure.value]) {
    if (el) observer.observe(el)
  }
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <!-- Main header. When the items do not fit in one row, they move into a menu panel (disclosure). -->
  <header :class="[$style.root, sticky && $style.sticky, compact && $style.compact]">
    <div ref="bar" :class="$style.bar">
      <div ref="brand" :class="$style.brand"><slot name="brand" /></div>
      <nav :aria-label="label" :class="$style.desktopNav">
        <ul :class="$style.list">
          <li v-for="it in items" :key="it.id">
            <a
              :href="it.href"
              :aria-current="it.id === activeId ? 'location' : undefined"
              :class="[$style.link, it.id === activeId && $style.current]"
            >
              <component :is="it.icon" v-if="it.icon" :size="16" aria-hidden="true" />
              <span>{{ it.label }}</span>
            </a>
          </li>
        </ul>
      </nav>
      <!-- Invisible copy of the links at their natural width, used only to measure whether they fit. -->
      <div :class="$style.measureBox" aria-hidden="true">
        <ul ref="measure" :class="[$style.list, $style.measure]">
          <li v-for="it in items" :key="it.id">
            <span :class="$style.link">
              <component :is="it.icon" v-if="it.icon" :size="16" />
              <span>{{ it.label }}</span>
            </span>
          </li>
        </ul>
      </div>
      <div :class="$style.end">
        <div ref="actions" :class="$style.actions"><slot name="actions" /></div>
        <button
          ref="toggle"
          type="button"
          :class="$style.toggle"
          :aria-expanded="open"
          :aria-controls="panelId"
          :aria-label="open ? closeMenuLabel : openMenuLabel"
          @click="open = !open"
        >
          <X v-if="open" :size="20" aria-hidden="true" />
          <Menu v-else :size="20" aria-hidden="true" />
        </button>
      </div>
    </div>
    <nav
      :id="panelId"
      :aria-label="label"
      :class="[$style.panel, open && $style.panelOpen]"
      :hidden="!open"
    >
      <ul :class="$style.panelList">
        <li v-for="it in items" :key="it.id">
          <a
            :href="it.href"
            :aria-current="it.id === activeId ? 'location' : undefined"
            :class="[$style.panelLink, it.id === activeId && $style.current]"
            @click="open = false"
          >
            <component :is="it.icon" v-if="it.icon" :size="20" aria-hidden="true" />
            <span>{{ it.label }}</span>
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style module>
.root {
  z-index: var(--z-sticky);
  background: var(--surface-raised);
  border-bottom: 1px solid var(--line);
  font-family: var(--font-sans);
}
.sticky {
  position: sticky;
  top: 0;
}
.bar {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-6);
  box-sizing: border-box;
  height: 56px;
  padding: 0 var(--space-4);
}
.brand {
  display: flex;
  flex: none;
  align-items: center;
  gap: var(--space-2);
  font-weight: 600;
  font-size: 15px;
}
.brand :where(a) {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--ink);
  text-decoration: none;
  border-radius: var(--radius-sm);
}
.brand :where(a):focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.desktopNav {
  flex: 1;
  min-width: 0;
  align-self: stretch;
  /* Until the links are measured (prerendered HTML before the app loads), links that do not fit
     are cut off instead of running under the actions; the active underline below still shows. */
  overflow-x: clip;
}
.list {
  display: flex;
  align-items: stretch;
  gap: var(--space-1);
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}
.list > li {
  display: flex;
}
.link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0 var(--space-3);
  font-size: 14px;
  font-weight: 500;
  color: var(--ink-muted);
  text-decoration: none;
  white-space: nowrap;
}
.link::after {
  content: '';
  position: absolute;
  left: var(--space-3);
  right: var(--space-3);
  bottom: -1px;
  height: 2px;
  border-radius: 2px 2px 0 0;
  background: transparent;
}
.link:hover {
  color: var(--ink);
  background: var(--surface-hover);
}
.link:active {
  background: var(--surface-pressed);
}
.link:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;
  border-radius: var(--radius-md);
}
.link.current {
  color: var(--accent-ink);
}
.link.current::after {
  background: var(--accent);
}
.measureBox {
  position: absolute;
  inset: 0;
  overflow: hidden;
  visibility: hidden;
  pointer-events: none;
}
.measure {
  width: max-content;
}
.end {
  display: flex;
  flex: none;
  align-items: center;
  gap: var(--space-2);
  margin-left: auto;
}
.actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.toggle {
  display: none;
  place-items: center;
  width: var(--control-md);
  height: var(--control-md);
  padding: 0;
  color: var(--ink);
  background: none;
  border: 0;
  border-radius: var(--radius-md);
  cursor: pointer;
}
.toggle:hover {
  background: var(--surface-hover);
}
.toggle:active {
  background: var(--surface-pressed);
}
.toggle:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.panel {
  display: none;
}
.panelList {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 0;
  padding: var(--space-2) var(--space-3) var(--space-3);
  list-style: none;
}
.panelLink {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  height: var(--control-lg);
  padding: 0 var(--space-3);
  font-size: 15px;
  font-weight: 500;
  color: var(--ink);
  text-decoration: none;
  border-radius: var(--radius-md);
}
.panelLink:hover {
  background: var(--surface-hover);
}
.panelLink:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;
}
.panelLink.current {
  color: var(--accent-ink);
  background: var(--accent-soft);
}

.compact .desktopNav {
  display: none;
}
.compact .toggle {
  display: grid;
}
.compact .panelOpen {
  display: block;
  border-top: 1px solid var(--line);
}
</style>
