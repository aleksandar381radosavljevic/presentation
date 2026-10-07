<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import en from '@/i18n/locales/en'
import PageSection from './PageSection.vue'

const { t } = useI18n()
</script>

<template>
  <PageSection id="about" :title="t('about.title')">
    <p :class="['os-text-h2', $style.lead]">{{ t('about.lead') }}</p>
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
/* The specialization is the point of the section, so it reads as a statement, not as body text. */
.lead {
  max-width: 30ch;
  margin: 0;
  color: var(--ink);
}
.paragraph {
  max-width: 65ch;
  margin: 0;
  color: var(--ink-muted);
}
</style>
