<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { CircleCheck } from '@lucide/vue'
import { Badge, Card, GridLayout, Icon } from '@/shared/ui'
import en from '@/i18n/locales/en'
import PageSection from './PageSection.vue'

const { t } = useI18n()
const stepNumber = (i: number) => String(i + 1).padStart(2, '0')
</script>

<template>
  <PageSection id="process" :title="t('how.title')">
    <p :class="['os-text-body-lg', $style.intro]">{{ t('how.intro') }}</p>
    <GridLayout as="ol" :class="$style.steps">
      <Card v-for="(_, i) in en.how.steps" :key="i" as="li" :title="t(`how.steps.${i}.title`)">
        <template #actions>
          <Badge tone="accent">{{ stepNumber(i) }}</Badge>
        </template>
        <p :class="$style.text">{{ t(`how.steps.${i}.text`) }}</p>
        <p :class="$style.deliverable">
          <strong>{{ t('how.deliverableLabel') }}</strong>
          {{ t(`how.steps.${i}.deliverable`) }}
        </p>
      </Card>
    </GridLayout>
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
.text {
  color: var(--ink-muted);
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
.deliverable {
  margin-top: var(--space-3);
}
</style>
