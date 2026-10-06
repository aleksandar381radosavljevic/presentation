<script setup lang="ts">
import { computed, useAttrs, type Component } from 'vue'

export interface IconProps {
  /** Lucide icon component, imported statically from `@lucide/vue` (tree-shaken). */
  icon: Component
  /** `true` (default) — outline only; `false` — the icon is filled with color. */
  outline?: boolean
  /** Any CSS color or token: `"var(--danger)"`. Inherits the text color by default. */
  color?: string
  /** Size in px (default 20). */
  size?: number
  /** Accessible name. Without it the icon is decorative (aria-hidden). Required with `@click`. */
  label?: string
  /** Stroke width (default 2, as in the rest of the system). */
  strokeWidth?: number
}

const props = withDefaults(defineProps<IconProps>(), {
  outline: true,
  size: 20,
  strokeWidth: 2
})
defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
/** With a click listener the icon renders as a <button> (focus, Enter/Space). */
const interactive = computed(() => typeof attrs.onClick === 'function')
const ink = computed(() => props.color ?? 'currentColor')
const box = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  color: props.color
}))

if (import.meta.env.DEV && interactive.value && !props.label) {
  // eslint-disable-next-line no-console -- dev-only accessibility warning, as in Osnova
  console.warn('[Osnova] <Icon @click> has no `label` — screen readers will not know what it does.')
}
</script>

<template>
  <button
    v-if="interactive"
    type="button"
    v-bind="attrs"
    :aria-label="label"
    :title="label"
    :class="[$style.root, $style.interactive]"
    :style="{ ...box, padding: `${Math.max(4, Math.round(size / 5))}px` }"
  >
    <component
      :is="icon"
      :size="size"
      :color="ink"
      :stroke-width="strokeWidth"
      :fill="outline ? 'none' : ink"
      aria-hidden="true"
      focusable="false"
    />
  </button>
  <span
    v-else
    v-bind="attrs"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : true"
    :class="$style.root"
    :style="box"
  >
    <component
      :is="icon"
      :size="size"
      :color="ink"
      :stroke-width="strokeWidth"
      :fill="outline ? 'none' : ink"
      aria-hidden="true"
      focusable="false"
    />
  </span>
</template>

<style module>
.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  line-height: 0;
  vertical-align: middle;
}
.root > svg {
  display: block;
}
.interactive {
  box-sizing: content-box;
  margin: 0;
  border: 0;
  border-radius: var(--radius-md);
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: background-color 120ms ease;
}
.interactive:hover {
  background: var(--surface-hover);
}
.interactive:active {
  background: var(--surface-pressed);
}
.interactive:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
</style>
