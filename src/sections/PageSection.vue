<script setup lang="ts">
import { MainContainer } from '@/shared/ui'

defineProps<{
  id: string
  /** The section's name, shown small above the heading (the same word as in the navigation). */
  eyebrow: string
  /** The section's main claim; this is the real heading. */
  title: string
  intro?: string
  /** Every other section sits on the raised surface, so it is clear where one ends. */
  raised?: boolean
}>()
</script>

<template>
  <!-- A full-width band; the id is the target of the header navigation. -->
  <section
    :id="id"
    :class="[$style.section, raised && $style.raised]"
    :aria-labelledby="`${id}-title`"
  >
    <MainContainer as="div" :padding-y="{ base: 8, md: 12, lg: 16 }">
      <div :class="$style.inner">
        <header :class="$style.head">
          <p :class="$style.eyebrow">{{ eyebrow }}</p>
          <h2 :id="`${id}-title`" :class="$style.title">{{ title }}</h2>
          <p v-if="intro" :class="['os-text-body-lg', $style.intro]">{{ intro }}</p>
        </header>
        <slot />
      </div>
    </MainContainer>
  </section>
</template>

<style module>
.section {
  /* Keeps the band top right under the sticky 56px header when jumped to. */
  scroll-margin-top: 56px;
}
.raised {
  background: var(--surface-raised);
  border-block: 1px solid var(--line);
}
/* Cards inside a raised band take the page surface, so they still stand apart from it. */
.raised .inner {
  --surface-raised: var(--surface);
}
.inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}
.head {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.eyebrow {
  margin: 0;
  font: 600 13px/16px var(--font-sans);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-ink);
}
.title {
  max-width: 28ch;
  margin: 0;
  font: 600 clamp(26px, 2.2vw + 18px, 36px) / 1.2 var(--font-sans);
  letter-spacing: -0.02em;
  color: var(--ink);
  text-wrap: balance;
}
.intro {
  max-width: 60ch;
  margin: 0;
  color: var(--ink-muted);
}
</style>
