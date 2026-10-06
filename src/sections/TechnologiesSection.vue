<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Badge } from '@/shared/ui'
import PageSection from './PageSection.vue'

const { t } = useI18n()

// Grouped by area, specialization first; tool names are the same in every language.
const GROUPS = [
  { key: 'visualization', items: ['HTML5 Canvas', 'Konva.js', 'D3.js'] },
  {
    key: 'frontend',
    items: ['TypeScript', 'React', 'Redux', 'RxJS', 'Vue.js', 'Nx', 'Tailwind CSS', 'PWA']
  },
  {
    key: 'backend',
    items: ['C#', '.NET', 'ASP.NET MVC', 'Entity Framework', 'SignalR', 'RabbitMQ']
  },
  { key: 'data', items: ['SQL Server', 'T-SQL', 'MongoDB', 'Redis', 'Elasticsearch'] },
  { key: 'delivery', items: ['Docker', 'Azure DevOps', 'Argo CD', 'Keycloak (SSO)', 'Windows'] }
] as const
</script>

<template>
  <PageSection id="technologies" :title="t('technologies.title')">
    <dl :class="$style.groups">
      <div v-for="group in GROUPS" :key="group.key" :class="$style.group">
        <dt class="os-text-label">{{ t(`technologies.groups.${group.key}`) }}</dt>
        <dd>
          <ul :class="$style.list">
            <li v-for="item in group.items" :key="item">
              <Badge>{{ item }}</Badge>
            </li>
          </ul>
        </dd>
      </div>
    </dl>
  </PageSection>
</template>

<style module>
.list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.groups {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin: 0;
}
.group {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-2);
}
@media (min-width: 768px) {
  .group {
    grid-template-columns: 200px minmax(0, 1fr);
    align-items: baseline;
  }
}
.group dd {
  margin: 0;
}
.group ul {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
</style>
