<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Card, GridItem, GridLayout } from '@/shared/ui'
import en from '@/i18n/locales/en'
import PageSection from './PageSection.vue'
import TechnologiesList from './TechnologiesList.vue'

const { t } = useI18n()
</script>

<template>
  <PageSection id="experience" :title="t('experience.title')">
    <p :class="['os-text-body-lg', $style.intro]">{{ t('experience.intro') }}</p>
    <GridLayout :columns="{ base: 1, md: 12 }">
      <GridItem :col-span="{ base: 'full', md: 7 }">
        <Card :title="t('experience.company')">
          <ol :class="$style.roles">
            <li v-for="(_, i) in en.experience.roles" :key="i" :class="$style.role">
              <strong>{{ t(`experience.roles.${i}.title`) }}</strong>
              <span :class="['os-text-caption', $style.muted]">
                {{ t(`experience.roles.${i}.period`) }}
              </span>
              <span v-if="en.experience.roles[i].note" :class="['os-text-body-sm', $style.muted]">
                {{ t(`experience.roles.${i}.note`) }}
              </span>
            </li>
          </ol>
        </Card>
      </GridItem>
      <GridItem :col-span="{ base: 'full', md: 5 }">
        <Card>
          <dl :class="$style.facts">
            <dt class="os-text-label">{{ t('experience.educationTitle') }}</dt>
            <dd>{{ t('experience.education') }}</dd>
            <dt class="os-text-label">{{ t('experience.certificationsTitle') }}</dt>
            <dd v-for="(_, i) in en.experience.certifications" :key="`cert-${i}`">
              {{ t(`experience.certifications.${i}`) }}
            </dd>
            <dt class="os-text-label">{{ t('experience.languagesTitle') }}</dt>
            <dd v-for="(_, i) in en.experience.languages" :key="`lang-${i}`">
              {{ t(`experience.languages.${i}`) }}
            </dd>
          </dl>
        </Card>
      </GridItem>
    </GridLayout>
    <TechnologiesList />
  </PageSection>
</template>

<style module>
.intro {
  max-width: 60ch;
  color: var(--ink-muted);
}
.roles {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin: 0;
  padding: 0 0 0 var(--space-4);
  list-style: none;
  border-left: 2px solid var(--line);
}
.role {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.muted {
  color: var(--ink-muted);
}
.facts {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  margin: 0;
}
.facts dt:not(:first-child) {
  margin-top: var(--space-3);
}
.facts dd {
  margin: 0;
  color: var(--ink-muted);
}
</style>
