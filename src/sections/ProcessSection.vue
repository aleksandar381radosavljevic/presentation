<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Badge, Card, GridLayout } from '@/shared/ui'
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
.deliverable {
  margin-top: var(--space-3);
}
</style>
