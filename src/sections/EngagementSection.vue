<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Gauge, Layers, Network, NotebookPen } from '@lucide/vue'
import { Button, Card, GridLayout, Icon } from '@/shared/ui'
import { site } from '@/config/site'
import PageSection from './PageSection.vue'

const { t } = useI18n()
// Each package opens an email with its name in the subject, so the client does not have to
// phrase the request and the message says which package it is about.
const askHref = (key: string) =>
  site.contactEmail
    ? `mailto:${site.contactEmail}?subject=${encodeURIComponent(t(`engagement.items.${key}.title`))}`
    : '#contact'
// The only list of what a client can buy: who each package is for and what it ends with.
const OFFERS = [
  { key: 'audit', icon: Gauge },
  { key: 'discovery', icon: NotebookPen },
  { key: 'architectureReview', icon: Network },
  { key: 'migrationPlan', icon: Layers }
] as const
</script>

<template>
  <PageSection
    id="engagement"
    :eyebrow="t('engagement.title')"
    :title="t('engagement.heading')"
    :intro="t('engagement.intro')"
  >
    <GridLayout as="ul" :columns="{ base: 1, md: 2 }" :class="$style.list">
      <Card v-for="offer in OFFERS" :key="offer.key" as="li" :class="$style.card">
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
          <div :class="$style.ask">
            <Button :href="askHref(offer.key)">
              {{ t('engagement.ask') }}
              <span :class="$style.visuallyHidden"
                >: {{ t(`engagement.items.${offer.key}.title`) }}</span
              >
            </Button>
          </div>
        </div>
      </Card>
    </GridLayout>
  </PageSection>
</template>

<style module>
.list {
  margin: 0;
  padding: 0;
  list-style: none;
}
/* Cards in a row share a height, so the buttons line up at the bottom. */
.card {
  display: flex;
  flex-direction: column;
}
.card > div {
  display: flex;
  flex: 1;
}
.offer {
  flex: 1;
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
.ask {
  margin-top: auto;
  padding-top: var(--space-3);
}
.visuallyHidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
</style>
