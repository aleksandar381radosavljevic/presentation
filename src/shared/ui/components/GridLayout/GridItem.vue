<script setup lang="ts">
import { computed } from 'vue'
import { responsiveVars, type Responsive } from '../../utils/responsive'
import styles from './GridLayout.module.css'

export interface GridItemProps {
  /** How many columns it spans: a number or `"full"` (full width) — or per breakpoint. */
  colSpan?: Responsive<number | 'full'>
  rowSpan?: Responsive<number>
  as?: string
}

const props = withDefaults(defineProps<GridItemProps>(), { colSpan: 1, rowSpan: 1, as: 'div' })

const style = computed(() => ({
  ...responsiveVars<number | 'full'>('col', props.colSpan, 1, (v) =>
    v === 'full' ? '1 / -1' : `span ${v} / span ${v}`
  ),
  ...responsiveVars('row', props.rowSpan, 1, (v) => `span ${v} / span ${v}`)
}))
</script>

<template>
  <component :is="as" :class="styles.item" :style="style"><slot /></component>
</template>
