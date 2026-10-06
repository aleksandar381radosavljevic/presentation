<script setup lang="ts">
defineProps<{ id: string; title: string }>()
</script>

<template>
  <!-- A titled page section; the id is the target of the header navigation. -->
  <section :id="id" :class="$style.section" :aria-labelledby="`${id}-title`">
    <h2 :id="`${id}-title`" class="os-text-h2">{{ title }}</h2>
    <slot />
  </section>
</template>

<style module>
.section {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  /* Keeps the heading clear of the sticky 56px header when jumped to. */
  scroll-margin-top: calc(56px + var(--space-6));
}
</style>
