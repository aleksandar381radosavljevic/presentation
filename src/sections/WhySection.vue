<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { BadgeCheck, Gauge, Layers } from '@lucide/vue'
import { Card, GridLayout, Icon } from '@/shared/ui'
import PageSection from './PageSection.vue'

const { t } = useI18n()
const REASONS = [
  { key: 'quality', icon: BadgeCheck },
  { key: 'efficiency', icon: Gauge },
  { key: 'maintainability', icon: Layers }
] as const
</script>

<template>
  <PageSection id="why" :title="t('why.title')">
    <GridLayout>
      <Card v-for="reason in REASONS" :key="reason.key">
        <div :class="$style.reason">
          <Icon :icon="reason.icon" :size="24" color="var(--accent-ink)" />
          <h3 class="os-text-h3">{{ t(`why.${reason.key}.title`) }}</h3>
          <p :class="$style.text">{{ t(`why.${reason.key}.text`) }}</p>
        </div>
      </Card>
    </GridLayout>
  </PageSection>
</template>

<style module>
.reason {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.text {
  color: var(--ink-muted);
}
</style>
