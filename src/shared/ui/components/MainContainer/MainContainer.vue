<script lang="ts">
import type { Responsive, SpaceStep } from '../../utils/responsive'

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

/** Default: 16px horizontal on phones → 24px from 768px → 32px from 1024px; vertical 24 → 32 → 48. */
export const MAIN_CONTAINER_DEFAULTS = {
  size: 'lg' as ContainerSize,
  paddingX: { base: 4, md: 6, lg: 8 } as Responsive<SpaceStep>,
  paddingY: { base: 6, md: 8, lg: 12 } as Responsive<SpaceStep>
}

export interface MainContainerProps {
  /** Maximum content width: sm 640 · md 960 · lg 1200 · xl 1440 · full. */
  size?: ContainerSize
  /** Horizontal padding (`space-*` step), or per viewport breakpoint. */
  paddingX?: Responsive<SpaceStep>
  /** Top and bottom padding. */
  paddingY?: Responsive<SpaceStep>
  /** Take at least the screen height (100dvh) — for pages with a footer at the bottom. */
  fullHeight?: boolean
  /** Gap between direct children (sections); 0 = none. */
  gap?: Responsive<SpaceStep>
  /** Defaults to <main> — one per page. For nested sections use "div" or "section". */
  as?: string
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { responsiveVars, space } from '../../utils/responsive'

const props = withDefaults(defineProps<MainContainerProps>(), {
  size: () => MAIN_CONTAINER_DEFAULTS.size,
  paddingX: () => MAIN_CONTAINER_DEFAULTS.paddingX,
  paddingY: () => MAIN_CONTAINER_DEFAULTS.paddingY,
  gap: 0,
  as: 'main'
})

const isMain = computed(() => props.as === 'main')
const vars = computed(() => ({
  ...responsiveVars('px', props.paddingX, 4 as SpaceStep, space),
  ...responsiveVars('py', props.paddingY, 6 as SpaceStep, space),
  ...responsiveVars('stack', props.gap, 0 as SpaceStep, space)
}))
</script>

<template>
  <!-- As <main> it is the target of a "Skip to content" link. -->
  <component
    :is="as"
    :id="isMain ? 'main-content' : undefined"
    :tabindex="isMain ? -1 : undefined"
    :class="[$style.root, $style[size], fullHeight && $style.fullHeight]"
    :style="vars"
  >
    <slot />
  </component>
</template>

<style module>
.root {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--stack-base);
  width: 100%;
  margin-inline: auto;
  padding: var(--py-base) var(--px-base);
  padding-left: max(var(--px-base), env(safe-area-inset-left));
  padding-right: max(var(--px-base), env(safe-area-inset-right));
}
.root:focus {
  outline: none; /* skip-link target, not an interactive element */
}

.sm {
  max-width: var(--container-sm);
}
.md {
  max-width: var(--container-md);
}
.lg {
  max-width: var(--container-lg);
}
.xl {
  max-width: var(--container-xl);
}
.full {
  max-width: none;
}
.fullHeight {
  min-height: 100dvh;
}

/* Viewport breakpoints = breakpoint-* tokens (page, not component → media, not container). */
@media (min-width: 640px) {
  .root {
    gap: var(--stack-sm);
    padding: var(--py-sm) max(var(--px-sm), env(safe-area-inset-right)) var(--py-sm)
      max(var(--px-sm), env(safe-area-inset-left));
  }
}
@media (min-width: 768px) {
  .root {
    gap: var(--stack-md);
    padding: var(--py-md) var(--px-md);
  }
}
@media (min-width: 1024px) {
  .root {
    gap: var(--stack-lg);
    padding: var(--py-lg) var(--px-lg);
  }
}
@media (min-width: 1280px) {
  .root {
    gap: var(--stack-xl);
    padding: var(--py-xl) var(--px-xl);
  }
}
</style>
