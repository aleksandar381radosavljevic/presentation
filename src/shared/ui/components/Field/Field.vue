<script setup lang="ts">
import { computed, useId } from 'vue'
import { CircleX } from '@lucide/vue'

export interface FieldProps {
  label?: string
  /** Keeps the label for screen readers only (e.g. a compact control in a toolbar). */
  hideLabel?: boolean
  hint?: string
  error?: string
  required?: boolean
  id?: string
}

const props = defineProps<FieldProps>()
defineSlots<{
  /** Field provides the id and aria wiring, you provide the control. */
  default(field: { id: string; describedBy: string | undefined; invalid: boolean }): unknown
}>()

const autoId = useId()
const id = computed(() => props.id ?? autoId)
const messageId = computed(() => (props.error || props.hint ? `${id.value}-message` : undefined))
</script>

<template>
  <div :class="$style.root">
    <label v-if="label" :class="hideLabel ? $style.visuallyHidden : $style.label" :for="id">
      {{ label }}<span v-if="required" :class="$style.required" aria-hidden="true"> *</span>
    </label>
    <slot :id="id" :described-by="messageId" :invalid="Boolean(error)" />
    <p v-if="error" :id="messageId" :class="$style.error">
      <CircleX :size="16" aria-hidden="true" />
      <span>{{ error }}</span>
    </p>
    <p v-else-if="hint" :id="messageId" :class="$style.hint">{{ hint }}</p>
  </div>
</template>

<style module>
.root {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  min-width: 0;
}
.label {
  margin-bottom: 2px;
  font: 500 13px/16px var(--font-sans);
  color: var(--ink);
}
.visuallyHidden {
  position: absolute !important;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
.required {
  color: var(--danger);
}
.hint {
  margin: 0;
  font-size: 13px;
  line-height: 20px;
  color: var(--ink-muted);
}
.error {
  margin: 0;
  display: flex;
  gap: var(--space-1);
  align-items: flex-start;
  font-size: 13px;
  line-height: 20px;
  color: var(--danger);
}
.error > svg {
  flex: none;
  margin-top: 2px;
}
</style>
