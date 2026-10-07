<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import en from '@/i18n/locales/en'
import PageSection from './PageSection.vue'

const { t } = useI18n()
</script>

<template>
  <PageSection id="about" :eyebrow="t('about.title')" :title="t('about.heading')">
    <p
      v-for="(_, i) in en.about.paragraphs"
      :key="i"
      :class="['os-text-body-lg', $style.paragraph]"
    >
      {{ t(`about.paragraphs.${i}`) }}
    </p>
  </PageSection>
</template>

<style module>
.paragraph {
  max-width: 65ch;
  margin: 0;
  color: var(--ink-muted);
}
</style>
