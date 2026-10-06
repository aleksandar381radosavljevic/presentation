<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Activity, AppWindow, ClipboardList, RefreshCcw } from '@lucide/vue'
import { Card, GridLayout, Icon } from '@/shared/ui'
import PageSection from './PageSection.vue'

const { t } = useI18n()
const SERVICES = [
  { key: 'webApps', icon: AppWindow },
  { key: 'realtime', icon: Activity },
  { key: 'modernization', icon: RefreshCcw },
  { key: 'leadership', icon: ClipboardList }
] as const
</script>

<template>
  <PageSection id="services" :title="t('services.title')">
    <GridLayout as="ul" :columns="{ base: 1, md: 2 }" :class="$style.list">
      <Card v-for="service in SERVICES" :key="service.key" as="li">
        <div :class="$style.service">
          <Icon :icon="service.icon" :size="24" color="var(--accent-ink)" />
          <h3 class="os-text-h3">{{ t(`services.items.${service.key}.title`) }}</h3>
          <p :class="$style.text">{{ t(`services.items.${service.key}.text`) }}</p>
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
.service {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.text {
  color: var(--ink-muted);
}
</style>
