<script setup lang="ts">
export type Tone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info'

export interface BadgeProps {
  tone?: Tone
  /** Dot for live states (running, in progress). */
  dot?: boolean
}

withDefaults(defineProps<BadgeProps>(), { tone: 'neutral' })
</script>

<template>
  <span :class="[$style.root, $style[tone]]">
    <span v-if="dot" :class="$style.dot" aria-hidden="true" />
    <slot />
  </span>
</template>

<style module>
.root {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 22px;
  padding: 0 var(--space-2);
  font: 500 12px/16px var(--font-sans);
  letter-spacing: 0.02em;
  white-space: nowrap;
  border-radius: var(--radius-sm);
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
  background: currentColor;
}
.neutral {
  background: var(--surface-sunken);
  color: var(--ink);
  box-shadow: inset 0 0 0 1px var(--line);
}
.accent {
  background: var(--accent-soft);
  color: var(--accent-ink);
}
.success {
  background: var(--success-soft);
  color: var(--success);
}
.warning {
  background: var(--warning-soft);
  color: var(--warning);
}
.danger {
  background: var(--danger-soft);
  color: var(--danger);
}
.info {
  background: var(--info-soft);
  color: var(--info);
}
</style>
