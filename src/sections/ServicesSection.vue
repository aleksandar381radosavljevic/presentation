<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import {
  Activity,
  AppWindow,
  CircleCheck,
  ClipboardList,
  MonitorCog,
  RefreshCcw
} from '@lucide/vue'
import { Card, Icon } from '@/shared/ui'
import en from '@/i18n/locales/en'
import PageSection from './PageSection.vue'

const { t } = useI18n()
// The specialization gets cards; the other areas are a plain list, since the packages under
// Work together are what a client actually buys.
const FEATURED = [
  { key: 'hmi', icon: MonitorCog },
  { key: 'realtime', icon: Activity }
] as const
const OTHERS = [
  { key: 'leadership', icon: ClipboardList },
  { key: 'modernization', icon: RefreshCcw },
  { key: 'webApps', icon: AppWindow }
] as const
</script>

<template>
  <PageSection id="services" :title="t('services.title')">
    <p :class="['os-text-body-lg', $style.intro]">{{ t('services.intro') }}</p>
    <ul :class="[$style.list, $style.featured]">
      <Card v-for="service in FEATURED" :key="service.key" as="li">
        <div :class="$style.service">
          <span :class="$style.icon">
            <Icon :icon="service.icon" :size="24" color="var(--accent-ink)" />
          </span>
          <h3 class="os-text-h2">{{ t(`services.items.${service.key}.title`) }}</h3>
          <p :class="$style.text">{{ t(`services.items.${service.key}.text`) }}</p>
        </div>
      </Card>
    </ul>
    <ul :class="[$style.list, $style.others]">
      <li v-for="service in OTHERS" :key="service.key" :class="$style.other">
        <Icon :icon="service.icon" :size="20" color="var(--accent-ink)" />
        <div>
          <h3 class="os-text-h3">{{ t(`services.items.${service.key}.title`) }}</h3>
          <p :class="$style.text">{{ t(`services.items.${service.key}.text`) }}</p>
        </div>
      </li>
    </ul>

    <div :class="$style.principles">
      <h3 class="os-text-h2">{{ t('services.principlesTitle') }}</h3>
      <p :class="['os-text-body-lg', $style.intro]">{{ t('services.principlesIntro') }}</p>
      <ol :class="$style.principleList">
        <li v-for="(_, i) in en.services.principles" :key="i" :class="$style.principle">
          <Icon :icon="CircleCheck" :size="24" color="var(--accent-ink)" />
          <div>
            <h4 :class="$style.principleTitle">{{ t(`services.principles.${i}.title`) }}</h4>
            <p :class="$style.text">{{ t(`services.principles.${i}.text`) }}</p>
          </div>
        </li>
      </ol>
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
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--accent-soft);
}
.text {
  margin: 0;
  color: var(--ink-muted);
}
.other {
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: var(--space-3);
  align-items: start;
}
.other h3 {
  margin: 0 0 var(--space-1);
}
/* The rules an operator screen follows: the clearest sign of HMI expertise, so they get their own block. */
.principles {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-top: var(--space-6);
  padding: var(--space-6);
  background: var(--surface-raised);
  border: 1px solid var(--line);
  border-left: 4px solid var(--accent);
  border-radius: var(--radius-lg);
}
.principles h3 {
  margin: 0;
}
.principleList {
  display: grid;
  gap: var(--space-6);
  margin: var(--space-2) 0 0;
  padding: 0;
  list-style: none;
}
.principle {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: var(--space-3);
  align-items: start;
}
.principleTitle {
  margin: 0 0 var(--space-1);
  font-size: 17px;
  font-weight: 600;
  line-height: 1.4;
}
@media (min-width: 768px) {
  .featured {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }
  .others {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);
  }
  .principleList {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .principles {
    padding: var(--space-8);
  }
}
</style>
