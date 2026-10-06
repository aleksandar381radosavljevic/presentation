<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { CircleCheck } from '@lucide/vue'
import { Icon } from '@/shared/ui'
import en from '@/i18n/locales/en'
import PageSection from './PageSection.vue'

const { t } = useI18n()
const stepNumber = (i: number) => String(i + 1).padStart(2, '0')
</script>

<template>
  <PageSection id="process" :title="t('how.title')">
    <p :class="['os-text-body-lg', $style.intro]">{{ t('how.intro') }}</p>
    <ol :class="$style.steps">
      <li v-for="(_, i) in en.how.steps" :key="i" :class="$style.step">
        <span :class="$style.number" aria-hidden="true">{{ stepNumber(i) }}</span>
        <div :class="$style.body">
          <h3 class="os-text-h3">{{ t(`how.steps.${i}.title`) }}</h3>
          <p :class="$style.text">{{ t(`how.steps.${i}.text`) }}</p>
        </div>
        <p :class="$style.deliverable">
          <strong>{{ t('how.deliverableLabel') }}</strong>
          {{ t(`how.steps.${i}.deliverable`) }}
        </p>
      </li>
    </ol>
    <h3 class="os-text-h3">{{ t('how.principlesTitle') }}</h3>
    <ul :class="$style.principles">
      <li v-for="(_, i) in en.how.principles" :key="i" :class="$style.principle">
        <Icon :icon="CircleCheck" :size="20" color="var(--accent-ink)" />
        <span>{{ t(`how.principles.${i}`) }}</span>
      </li>
    </ul>
  </PageSection>
</template>

<style module>
.intro {
  max-width: 60ch;
  color: var(--ink-muted);
}
.steps {
  margin: 0;
  padding: 0;
  list-style: none;
}
/* Numbers on the left, joined by a line, so the order of the steps reads at a glance. */
.step {
  position: relative;
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: var(--space-2) var(--space-4);
  padding-bottom: var(--space-8);
}
.step:last-child {
  padding-bottom: 0;
}
.step:not(:last-child)::before {
  content: '';
  position: absolute;
  top: 44px;
  bottom: 4px;
  left: 19px;
  width: 2px;
  background: var(--line);
}
.number {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--accent-ink);
  background: var(--accent-soft);
  border-radius: var(--radius-full);
}
.body {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding-top: var(--space-2);
}
.body h3 {
  margin: 0;
}
.text {
  max-width: 60ch;
  margin: 0;
  color: var(--ink-muted);
}
.deliverable {
  grid-column: 2;
  margin: 0;
  padding: var(--space-3) var(--space-4);
  background: var(--surface-raised);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
}
@media (min-width: 1024px) {
  .step {
    grid-template-columns: 40px 1.4fr 1fr;
    gap: var(--space-6);
    align-items: start;
  }
  .deliverable {
    grid-column: 3;
    margin-top: var(--space-1);
  }
}
.principles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--space-3) var(--space-6);
  margin: 0;
  padding: 0;
  list-style: none;
}
.principle {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
}
</style>
