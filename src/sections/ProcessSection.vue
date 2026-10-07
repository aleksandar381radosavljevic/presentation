<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Badge } from '@/shared/ui'
import en from '@/i18n/locales/en'
import PageSection from './PageSection.vue'

const { t } = useI18n()
const stepNumber = (i: number) => String(i + 1).padStart(2, '0')
// Which package under Work together covers each step; the later steps happen only inside his team.
const STEP_PACKAGES: (keyof typeof en.engagement.items)[][] = [
  ['discovery'],
  ['discovery'],
  ['architectureReview', 'migrationPlan'],
  [],
  []
]
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
          <p :class="['os-text-caption', $style.scope]">
            <template v-if="STEP_PACKAGES[i].length">
              {{ t('how.packageLabel') }}
              <a v-for="key in STEP_PACKAGES[i]" :key="key" href="#engagement">
                <Badge tone="accent">{{ t(`engagement.items.${key}.title`) }}</Badge>
              </a>
            </template>
            <template v-else>{{ t('how.teamOnly') }}</template>
          </p>
        </div>
        <p :class="$style.deliverable">
          <strong>{{ t('how.deliverableLabel') }}</strong>
          {{ t(`how.steps.${i}.deliverable`) }}
        </p>
      </li>
    </ol>
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
/* Ties each step to the package that covers it, so the process reads as an offer, not a whole build. */
.scope {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  margin: var(--space-1) 0 0;
  color: var(--ink-muted);
}
.scope a {
  text-decoration: none;
}
</style>
