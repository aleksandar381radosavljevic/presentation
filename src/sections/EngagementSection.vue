<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Gauge, Layers, Network, NotebookPen } from '@lucide/vue'
import { Card, GridLayout, Icon } from '@/shared/ui'
import PageSection from './PageSection.vue'

const { t } = useI18n()
const OFFERS = [
  { key: 'audit', icon: Gauge },
  { key: 'discovery', icon: NotebookPen },
  { key: 'migrationPlan', icon: Layers },
  { key: 'architectureReview', icon: Network }
] as const
</script>

<template>
  <PageSection id="engagement" :title="t('engagement.title')">
    <p :class="['os-text-body-lg', $style.intro]">{{ t('engagement.intro') }}</p>
    <GridLayout as="ul" :columns="{ base: 1, md: 2 }" :class="$style.list">
      <Card v-for="offer in OFFERS" :key="offer.key" as="li">
        <div :class="$style.offer">
          <Icon :icon="offer.icon" :size="24" color="var(--accent-ink)" />
          <h3 class="os-text-h3">{{ t(`engagement.items.${offer.key}.title`) }}</h3>
          <p :class="$style.text">{{ t(`engagement.items.${offer.key}.text`) }}</p>
        </div>
      </Card>
    </GridLayout>
  </PageSection>
</template>

<style module>
.intro {
  max-width: 60ch;
  color: var(--ink-muted);
}
.list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.offer {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.text {
  color: var(--ink-muted);
}
</style>
