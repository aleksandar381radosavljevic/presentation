<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Activity, AppWindow, ClipboardList, MonitorCog, RefreshCcw } from '@lucide/vue'
import { Card, GridLayout, Icon } from '@/shared/ui'
import PageSection from './PageSection.vue'

const { t } = useI18n()
const SERVICES = [
  { key: 'hmi', icon: MonitorCog },
  { key: 'realtime', icon: Activity },
  { key: 'leadership', icon: ClipboardList },
  { key: 'modernization', icon: RefreshCcw },
  { key: 'webApps', icon: AppWindow }
] as const
</script>

<template>
  <PageSection id="services" :title="t('services.title')">
    <p :class="['os-text-body-lg', $style.intro]">{{ t('services.intro') }}</p>
    <GridLayout as="ul" :columns="{ base: 1, md: 2, lg: 3 }" :class="$style.list">
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
.intro {
  max-width: 60ch;
  color: var(--ink-muted);
}
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
