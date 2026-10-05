<script setup lang="ts">
import { ChevronDown } from '@lucide/vue'
import Field from '../Field/Field.vue'
import control from '../Field/control.module.css'
import type { ControlSize } from '../Button/Button.vue'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  label?: string
  /** Keeps the label for screen readers only. */
  hideLabel?: boolean
  hint?: string
  error?: string
  size?: ControlSize
  options: SelectOption[]
  /** "Izaberi…" — only when there is no sensible default value. */
  placeholder?: string
  required?: boolean
  disabled?: boolean
  id?: string
}

withDefaults(defineProps<SelectProps>(), { size: 'md' })
const model = defineModel<string>()
</script>

<template>
  <!-- Native <select> styled to the system: keyboard and mobile work without extra code. -->
  <Field
    v-slot="{ id: fieldId, describedBy, invalid }"
    :label="label"
    :hide-label="hideLabel"
    :hint="hint"
    :error="error"
    :required="required"
    :id="id"
  >
    <div :class="$style.wrap">
      <select
        :id="fieldId"
        v-model="model"
        :required="required"
        :disabled="disabled"
        :aria-invalid="invalid || undefined"
        :aria-describedby="describedBy"
        :class="[control.control, control[size], $style.select]"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option v-for="o in options" :key="o.value" :value="o.value" :disabled="o.disabled">
          {{ o.label }}
        </option>
      </select>
      <ChevronDown :class="$style.chevron" :size="18" aria-hidden="true" />
    </div>
  </Field>
</template>

<style module>
.wrap {
  position: relative;
}
.select {
  appearance: none;
  padding-right: 40px;
  cursor: pointer;
}
.chevron {
  position: absolute;
  right: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  color: var(--ink-muted);
  pointer-events: none;
}
</style>
