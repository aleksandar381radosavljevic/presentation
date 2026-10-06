<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Badge, Card, GridLayout } from '@/shared/ui'
import PageSection from './PageSection.vue'

const { t } = useI18n()
// Technology names are the same in every language, so they live here rather than in the messages.
const PROJECTS = [
  {
    key: 'gridVisualization',
    stack: ['React', 'TypeScript', 'Konva.js', 'SignalR', 'PWA']
  },
  { key: 'liveDashboards', stack: ['React', 'TypeScript', 'D3.js'] },
  { key: 'legacyMigration', stack: ['React', 'TypeScript', 'Nx', 'Storybook', 'Keycloak'] },
  { key: 'digitalization', stack: [] },
  { key: 'notificationEngine', stack: [] },
  { key: 'scannerService', stack: ['C#', '.NET', 'NAPS2', 'WIA', 'TWAIN'] }
] as const
// Built on his own time, shown apart from the work done for clients.
const PERSONAL = [{ key: 'pushInstructions', stack: ['.NET', 'React', 'PWA', 'Web Push'] }] as const
</script>

<template>
  <PageSection id="projects" :title="t('projects.title')">
    <p :class="['os-text-body-lg', $style.intro]">{{ t('projects.intro') }}</p>
    <GridLayout as="ul" :columns="{ base: 1, md: 2 }" :class="$style.list">
      <Card
        v-for="project in PROJECTS"
        :key="project.key"
        as="li"
        :title="t(`projects.items.${project.key}.title`)"
        :description="t(`projects.items.${project.key}.meta`)"
      >
        <p :class="$style.text">{{ t(`projects.items.${project.key}.text`) }}</p>
        <ul
          v-if="project.stack.length"
          :class="$style.stack"
          :aria-label="t('projects.stackLabel')"
        >
          <li v-for="tech in project.stack" :key="tech">
            <Badge>{{ tech }}</Badge>
          </li>
        </ul>
      </Card>
    </GridLayout>
    <h3 class="os-text-h3">{{ t('projects.personalTitle') }}</h3>
    <GridLayout as="ul" :columns="{ base: 1, md: 2 }" :class="$style.list">
      <Card
        v-for="project in PERSONAL"
        :key="project.key"
        as="li"
        :title="t(`projects.items.${project.key}.title`)"
        :description="t(`projects.items.${project.key}.meta`)"
      >
        <p :class="$style.text">{{ t(`projects.items.${project.key}.text`) }}</p>
        <ul
          v-if="project.stack.length"
          :class="$style.stack"
          :aria-label="t('projects.stackLabel')"
        >
          <li v-for="tech in project.stack" :key="tech">
            <Badge>{{ tech }}</Badge>
          </li>
        </ul>
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
.text {
  color: var(--ink-muted);
}
.stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: var(--space-4) 0 0;
  padding: 0;
  list-style: none;
}
</style>
