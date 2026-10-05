<script setup lang="ts">
import mark from '@/assets/brand/osnova-znak.svg'
import markInverse from '@/assets/brand/osnova-znak-inverz.svg'
import mark32 from '@/assets/brand/osnova-znak-32.svg'
import mark32Inverse from '@/assets/brand/osnova-znak-32-inverz.svg'

export interface LogoProps {
  /**
   * Rendered size in px. Below 48 the pixel-aligned 32px drawing is used (no dots),
   * never the scaled-down main mark.
   */
  size?: number
  /** Accessible name; empty when the logo sits next to a visible name. */
  alt?: string
}

const props = withDefaults(defineProps<LogoProps>(), { size: 48, alt: '' })
const small = props.size < 48
</script>

<template>
  <!-- The mark is never recolored: the light and inverse files swap with the theme. -->
  <span :class="$style.root" :style="{ width: `${size}px`, height: `${size}px` }">
    <img
      :class="$style.light"
      :src="small ? mark32 : mark"
      :alt="alt"
      :width="size"
      :height="size"
    />
    <img
      :class="$style.dark"
      :src="small ? mark32Inverse : markInverse"
      :alt="alt"
      :width="size"
      :height="size"
    />
  </span>
</template>

<style module>
.root {
  display: inline-flex;
  flex: none;
}
.root > img {
  display: block;
}
.dark {
  display: none !important;
}
:global([data-theme='dark']) .light {
  display: none !important;
}
:global([data-theme='dark']) .dark {
  display: block !important;
}
</style>
