<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Gauge, Layers, Network, NotebookPen } from '@lucide/vue'
import { Button, Card, GridLayout, Icon } from '@/shared/ui'
import PageSection from './PageSection.vue'

const { t } = useI18n()
// The only list of what a client can buy: who each package is for and what it ends with.
const OFFERS = [
  { key: 'audit', icon: Gauge },
  { key: 'discovery', icon: NotebookPen },
  { key: 'architectureReview', icon: Network },
  { key: 'migrationPlan', icon: Layers }
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
          <dl :class="$style.facts">
            <dt class="os-text-label">{{ t('engagement.forLabel') }}</dt>
            <dd>{{ t(`engagement.items.${offer.key}.for`) }}</dd>
            <dt class="os-text-label">{{ t('engagement.deliverableLabel') }}</dt>
            <dd>{{ t(`engagement.items.${offer.key}.deliverable`) }}</dd>
          </dl>
        </div>
      </Card>
    </GridLayout>
    <div>
      <Button variant="primary" size="lg" href="#contact">{{ t('engagement.cta') }}</Button>
    </div>
  </PageSection>
</template>

<style module>
.intro {
  max-width: 60ch;
  margin: 0;
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
.offer h3 {
  margin: 0;
}
.text {
  margin: 0;
  color: var(--ink-muted);
}
.facts {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-2) var(--space-4);
  margin: var(--space-3) 0 0;
  padding-top: var(--space-3);
  border-top: 1px solid var(--line);
}
.facts dd {
  margin: 0;
}
</style>
