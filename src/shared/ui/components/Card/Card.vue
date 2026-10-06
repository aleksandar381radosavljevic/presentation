<script setup lang="ts">
import { computed, useCssModule, useSlots } from 'vue'
import { cx } from '../../utils/cx'

export interface CardProps {
  title?: string
  description?: string
  /** md 24px · sm 16px · none (edge-to-edge tables and images). */
  padding?: 'none' | 'sm' | 'md'
  /** The whole block is a single action (link) — then it contains no other buttons. */
  interactive?: boolean
  /** Element (section, article, a, li…). */
  as?: string
  /** Heading level (default h3). */
  headingLevel?: 2 | 3 | 4 | 5 | 6
}

const props = withDefaults(defineProps<CardProps>(), {
  padding: 'md',
  as: 'section',
  headingLevel: 3
})
defineSlots<{
  default?(): unknown
  /** Header actions (ghost/secondary sm buttons, Badge). */
  actions?(): unknown
  /** Footer — usually form buttons, aligned right. */
  footer?(): unknown
}>()

const styles = useCssModule()
const slots = useSlots()
const hasHead = computed(() => props.title != null || slots.actions != null)
</script>

<template>
  <component :is="as" :class="cx(styles.root, styles[padding], interactive && styles.interactive)">
    <header v-if="hasHead" :class="styles.head">
      <div :class="styles.headText">
        <component :is="`h${headingLevel}`" v-if="title != null" :class="styles.title">
          {{ title }}
        </component>
        <p v-if="description != null" :class="styles.description">{{ description }}</p>
      </div>
      <div v-if="$slots.actions" :class="styles.actions"><slot name="actions" /></div>
    </header>
    <div v-if="$slots.default" :class="cx(styles.body, hasHead && styles.bodyAfterHead)">
      <slot />
    </div>
    <footer v-if="$slots.footer" :class="styles.footer"><slot name="footer" /></footer>
  </component>
</template>

<style module>
.root {
  display: block;
  box-sizing: border-box;
  color: var(--ink);
  text-decoration: none;
  background: var(--surface-raised);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}
.md {
  padding: var(--space-6);
}
.sm {
  padding: var(--space-4);
}
.none {
  padding: 0;
  overflow: hidden;
}
.interactive {
  cursor: pointer;
  transition:
    box-shadow 150ms ease,
    border-color 150ms ease;
}
.interactive:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--line-strong);
}
.interactive:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.head {
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;
  justify-content: space-between;
}
.none .head {
  padding: var(--space-4) var(--space-6);
}
.headText {
  min-width: 0;
}
.title {
  margin: 0;
  font: 600 18px/26px var(--font-sans);
  letter-spacing: -0.01em;
}
.description {
  margin: 2px 0 0;
  font-size: 13px;
  line-height: 20px;
  color: var(--ink-muted);
}
.actions {
  display: flex;
  flex: none;
  gap: var(--space-2);
  align-items: center;
}
.bodyAfterHead {
  margin-top: var(--space-4);
}
.none .bodyAfterHead {
  margin-top: 0;
}
.footer {
  display: flex;
  gap: var(--space-2);
  justify-content: flex-end;
  margin-top: var(--space-6);
  padding-top: var(--space-4);
  border-top: 1px solid var(--line);
}
.none .footer {
  margin-top: 0;
  padding: var(--space-4) var(--space-6);
}
</style>
