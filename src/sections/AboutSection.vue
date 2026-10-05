<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Card, GridLayout } from '@/shared/ui'
import en from '@/i18n/locales/en'
import PageSection from './PageSection.vue'

const { t } = useI18n()
</script>

<template>
  <PageSection id="about" :title="t('about.title')">
    <GridLayout>
      <Card v-for="(_, i) in en.about.items" :key="i" :title="t(`about.items.${i}.title`)">
        <p :class="$style.text">{{ t(`about.items.${i}.text`) }}</p>
      </Card>
    </GridLayout>
  </PageSection>
</template>

<style module>
.text {
  color: var(--ink-muted);
}
</style>
