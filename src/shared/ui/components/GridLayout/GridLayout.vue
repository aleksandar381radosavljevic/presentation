<script lang="ts">
import type { Responsive, SpaceStep } from '../../utils/responsive'

/** Default layout: 1 column on phones, 2 from 640px, 3 from 1024px of container width. */
export const GRID_DEFAULTS = {
  columns: { base: 1, sm: 2, lg: 3 } as Responsive<number>,
  gap: 6 as Responsive<SpaceStep>
}

export type Align = 'start' | 'center' | 'end' | 'stretch'

export interface GridLayoutProps {
  /** Number of columns, or per breakpoint: `{ base: 1, md: 2, xl: 4 }`. */
  columns?: Responsive<number>
  /** Auto-fill mode: as many columns as fit, each at least this wide. Replaces `columns`. */
  minItemWidth?: number | string
  /** Gap (`space-*` step) — or per breakpoint. */
  gap?: Responsive<SpaceStep>
  rowGap?: Responsive<SpaceStep>
  columnGap?: Responsive<SpaceStep>
  /** Vertical alignment of items within a cell. */
  alignItems?: Align
  justifyItems?: Align
  /** Breakpoints follow the container width (default) or the viewport. */
  responsiveTo?: 'container' | 'viewport'
  as?: string
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { responsiveVars, space } from '../../utils/responsive'
import styles from './GridLayout.module.css'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<GridLayoutProps>(), {
  columns: () => GRID_DEFAULTS.columns,
  gap: () => GRID_DEFAULTS.gap,
  alignItems: 'stretch',
  justifyItems: 'stretch',
  responsiveTo: 'container',
  as: 'div'
})

const style = computed(() => {
  const vars: Record<string, string> = {
    ...responsiveVars('cols', props.columns, 1, String),
    ...responsiveVars('row-gap', props.rowGap ?? props.gap, 6 as SpaceStep, space),
    ...responsiveVars('col-gap', props.columnGap ?? props.gap, 6 as SpaceStep, space),
    alignItems: props.alignItems,
    justifyItems: props.justifyItems
  }
  if (props.minItemWidth != null) {
    vars['--min-item'] =
      typeof props.minItemWidth === 'number' ? `${props.minItemWidth}px` : props.minItemWidth
  }
  return vars
})
const gridClass = computed(() => [
  styles.grid,
  props.minItemWidth != null && styles.auto,
  props.responsiveTo === 'viewport' && styles.viewport
])
</script>

<template>
  <!-- A container query needs a parent container — added only when needed.
       Attributes (class, aria-*) go to the grid element itself, not the wrapper. -->
  <div v-if="responsiveTo === 'container'" :class="styles.container">
    <component :is="as" v-bind="$attrs" :class="gridClass" :style="style"><slot /></component>
  </div>
  <component :is="as" v-else v-bind="$attrs" :class="gridClass" :style="style">
    <slot />
  </component>
</template>
