<script setup lang="ts">
import { computed, ref } from 'vue'
import { Check } from '@lucide/vue'
import {
  focusMenuByChar,
  focusMenuItem,
  isMenuAction,
  type MenuAction,
  type MenuItem
} from './menu'

/** Shared menu list (WAI-ARIA menu): arrows, Home/End, typeahead, Enter/Space. */
const props = defineProps<{
  items: MenuItem[]
  label?: string
  labelledBy?: string
}>()
const emit = defineEmits<{
  select: [item: MenuAction]
  /** Tab closes the menu (focus returns to the trigger). */
  tab: []
}>()

const root = ref<HTMLDivElement>()
defineExpose({ root })

const hasChecks = computed(() =>
  props.items.some((i) => isMenuAction(i) && i.checked !== undefined)
)

const onKeydown = (e: KeyboardEvent) => {
  const el = e.currentTarget as HTMLElement
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      focusMenuItem(el, 'next')
      break
    case 'ArrowUp':
      e.preventDefault()
      focusMenuItem(el, 'prev')
      break
    case 'Home':
      e.preventDefault()
      focusMenuItem(el, 'first')
      break
    case 'End':
      e.preventDefault()
      focusMenuItem(el, 'last')
      break
    case 'Tab':
      e.preventDefault()
      emit('tab')
      break
    default:
      if (e.key.length === 1 && /\S/.test(e.key)) focusMenuByChar(el, e.key)
  }
}
const onPointerMove = (e: PointerEvent, item: MenuAction) => {
  if (!item.disabled) (e.currentTarget as HTMLElement).focus({ preventScroll: true })
}
</script>

<template>
  <div
    ref="root"
    role="menu"
    :aria-label="labelledBy ? undefined : label"
    :aria-labelledby="labelledBy"
    tabindex="-1"
    :class="$style.menu"
    @keydown="onKeydown"
    @contextmenu.prevent
  >
    <template v-for="item in items" :key="item.id">
      <div v-if="item.type === 'separator'" role="separator" :class="$style.separator" />
      <div v-else-if="item.type === 'label'" role="presentation" :class="$style.groupLabel">
        {{ item.label }}
      </div>
      <button
        v-else
        type="button"
        :role="item.checked !== undefined ? 'menuitemcheckbox' : 'menuitem'"
        :aria-checked="item.checked !== undefined ? item.checked : undefined"
        tabindex="-1"
        :aria-disabled="item.disabled || undefined"
        :class="[$style.item, item.danger && $style.danger]"
        @click="!item.disabled && emit('select', item)"
        @pointermove="onPointerMove($event, item)"
      >
        <span v-if="hasChecks" :class="$style.check">
          <Check v-if="item.checked" :size="16" aria-hidden="true" />
        </span>
        <span :class="$style.icon">
          <component :is="item.icon" v-if="item.icon" :size="16" aria-hidden="true" />
        </span>
        <span :class="$style.label">{{ item.label }}</span>
        <kbd v-if="item.shortcut" :class="$style.shortcut">{{ item.shortcut }}</kbd>
      </button>
    </template>
  </div>
</template>

<style module>
.menu {
  z-index: var(--z-dropdown);
  box-sizing: border-box;
  min-width: 200px;
  max-width: 320px;
  max-height: min(420px, calc(100vh - 16px));
  overflow-y: auto;
  padding: var(--space-1);
  color: var(--ink);
  background: var(--surface-overlay);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  font-family: var(--font-sans);
  animation: appear 120ms ease-out;
}
.menu:focus {
  outline: none;
}

.item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  height: var(--control-sm);
  padding: 0 var(--space-2);
  font: 400 14px/20px var(--font-sans);
  color: var(--ink);
  text-align: start;
  background: none;
  border: 0;
  border-radius: var(--radius-md);
  cursor: pointer;
}
.item:focus {
  outline: none;
  background: var(--accent-soft);
  color: var(--accent-ink);
}
.item:active:not([aria-disabled='true']) {
  background: color-mix(in srgb, var(--accent-soft) 70%, var(--accent) 30%);
}
.item:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;
}
.item[aria-disabled='true'] {
  color: var(--ink-disabled);
  cursor: default;
}
.danger {
  color: var(--danger);
}
.danger:focus {
  color: var(--danger);
  background: var(--danger-soft);
}

.icon {
  display: inline-flex;
  flex: none;
  width: 16px;
  color: var(--ink-muted);
}
.check {
  display: inline-flex;
  flex: none;
  width: 16px;
  color: var(--accent-ink);
}
.item:focus .check {
  color: inherit;
}
.item:focus .icon,
.danger .icon {
  color: inherit;
}
.label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.shortcut {
  flex: none;
  font: 400 12px/16px var(--font-mono);
  color: var(--ink-muted);
}

.separator {
  height: 1px;
  margin: var(--space-1) calc(var(--space-1) * -1);
  background: var(--line);
}
.groupLabel {
  padding: var(--space-2) var(--space-2) var(--space-1);
  font: 500 12px/16px var(--font-sans);
  letter-spacing: 0.02em;
  color: var(--ink-muted);
}

@keyframes appear {
  from {
    opacity: 0;
    transform: scale(0.97);
  }
}
@media (prefers-reduced-motion: reduce) {
  .menu {
    animation: none;
  }
}
</style>
