<script setup lang="ts">
import { useCssModule } from 'vue'
import { cx } from '../../utils/cx'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ControlSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  /** primary = main action (at most one per view); secondary is the default. */
  variant?: ButtonVariant
  size?: ControlSize
  fullWidth?: boolean
  /** Renders an `<a>` that looks like a button — for navigation, not actions. */
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'secondary',
  size: 'md',
  type: 'button'
})
defineSlots<{
  default?(): unknown
  /** Usually `<Icon :icon="Plus" :size="18" />`. */
  iconStart?(): unknown
  iconEnd?(): unknown
}>()

const styles = useCssModule()
const classes = () =>
  cx(styles.root, styles[props.variant], styles[props.size], props.fullWidth && styles.full)
</script>

<template>
  <a v-if="href" :href="href" :class="classes()">
    <slot name="iconStart" />
    <span v-if="$slots.default" :class="$style.label"><slot /></span>
    <slot name="iconEnd" />
  </a>
  <button v-else :type="type" :disabled="disabled" :class="classes()">
    <slot name="iconStart" />
    <span v-if="$slots.default" :class="$style.label"><slot /></span>
    <slot name="iconEnd" />
  </button>
</template>

<style module>
.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  height: var(--control-md);
  padding: 0 var(--space-4);
  font: 500 15px/1 var(--font-sans);
  white-space: nowrap;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    background-color 120ms ease,
    border-color 120ms ease,
    color 120ms ease;
}
.root:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.sm {
  height: var(--control-sm);
  padding: 0 var(--space-3);
  font-size: 13px;
}
.md {
  /* default */
}
.lg {
  height: var(--control-lg);
  padding: 0 var(--space-6);
  font-size: 16px;
}
.full {
  width: 100%;
}

.primary {
  background: var(--accent);
  color: var(--on-accent);
}
.primary:hover:not(:disabled) {
  background: var(--accent-hover);
}
.primary:active:not(:disabled) {
  background: var(--accent-pressed);
}

.secondary {
  background: var(--surface-raised);
  color: var(--ink);
  border-color: var(--line-strong);
}
.secondary:hover:not(:disabled) {
  background-image: linear-gradient(var(--surface-hover) 0 0);
}
.secondary:active:not(:disabled) {
  background-image: linear-gradient(var(--surface-pressed) 0 0);
}

.ghost {
  background: transparent;
  color: var(--ink);
}
.ghost:hover:not(:disabled) {
  background: var(--surface-hover);
}
.ghost:active:not(:disabled) {
  background: var(--surface-pressed);
}

.danger {
  background: var(--danger);
  color: var(--on-danger);
}
.danger:hover:not(:disabled) {
  background: var(--danger-hover);
}
.danger:active:not(:disabled) {
  background: var(--danger-pressed);
}

.root:disabled {
  cursor: not-allowed;
  background: var(--surface-sunken);
  color: var(--ink-disabled);
  border-color: var(--line);
}
.label {
  display: inline-block;
}
</style>
