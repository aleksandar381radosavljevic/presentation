<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Activity, AppWindow, ClipboardList, MonitorCog, RefreshCcw } from '@lucide/vue'
import { Card, Icon } from '@/shared/ui'
import PageSection from './PageSection.vue'

const { t } = useI18n()
// The first two are the specialization and get the wider cards.
const SERVICES = [
  { key: 'hmi', icon: MonitorCog, featured: true },
  { key: 'realtime', icon: Activity, featured: true },
  { key: 'leadership', icon: ClipboardList, featured: false },
  { key: 'modernization', icon: RefreshCcw, featured: false },
  { key: 'webApps', icon: AppWindow, featured: false }
] as const
</script>

<template>
  <PageSection id="services" :title="t('services.title')">
    <p :class="['os-text-body-lg', $style.intro]">{{ t('services.intro') }}</p>
    <ul :class="$style.list">
      <Card
        v-for="service in SERVICES"
        :key="service.key"
        as="li"
        :class="service.featured ? $style.featured : $style.compact"
      >
        <div :class="$style.service">
          <span :class="$style.icon">
            <Icon
              :icon="service.icon"
              :size="service.featured ? 24 : 20"
              color="var(--accent-ink)"
            />
          </span>
          <h3 :class="service.featured ? 'os-text-h2' : 'os-text-h3'">
            {{ t(`services.items.${service.key}.title`) }}
          </h3>
          <p :class="$style.text">{{ t(`services.items.${service.key}.text`) }}</p>
        </div>
      </Card>
    </ul>
  </PageSection>
</template>

<style module>
.intro {
  max-width: 60ch;
  color: var(--ink-muted);
}
.list {
  display: grid;
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
}
.service {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: var(--accent-soft);
}
.featured .icon {
  width: 48px;
  height: 48px;
}
.text {
  margin: 0;
  color: var(--ink-muted);
}
@media (min-width: 768px) {
  .list {
    grid-template-columns: repeat(6, 1fr);
    gap: var(--space-6);
  }
  .featured {
    grid-column: span 3;
  }
  .compact {
    grid-column: span 2;
  }
}
</style>
