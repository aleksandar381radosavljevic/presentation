<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Badge } from '@/shared/ui'

const { t } = useI18n()
// Grouped by area, specialization first; tool names are the same in every language.
// `key` marks what he uses most, so a client sees the core stack at a glance.
const GROUPS = [
  {
    key: 'visualization',
    items: [
      { name: 'HTML5 Canvas', key: true },
      { name: 'Konva.js', key: true },
      { name: 'D3.js', key: true }
    ]
  },
  {
    key: 'frontend',
    items: [
      { name: 'TypeScript', key: true },
      { name: 'React', key: true },
      { name: 'Redux' },
      { name: 'RxJS' },
      { name: 'Vue.js', key: true },
      { name: 'Nx' },
      { name: 'Tailwind CSS' },
      { name: 'PWA' }
    ]
  },
  {
    key: 'backend',
    items: [
      { name: 'C#', key: true },
      { name: '.NET', key: true },
      { name: 'ASP.NET MVC' },
      { name: 'Entity Framework' },
      { name: 'SignalR', key: true },
      { name: 'RabbitMQ' }
    ]
  },
  {
    key: 'data',
    items: [
      { name: 'SQL Server', key: true },
      { name: 'T-SQL' },
      { name: 'MongoDB' },
      { name: 'Redis' },
      { name: 'Elasticsearch' }
    ]
  },
  {
    key: 'delivery',
    items: [
      { name: 'Docker', key: true },
      { name: 'Azure DevOps' },
      { name: 'Argo CD' },
      { name: 'Keycloak (SSO)' }
    ]
  }
] as const satisfies readonly { key: string; items: readonly { name: string; key?: boolean }[] }[]
</script>

<template>
  <!-- Part of the Experience section: the stack backs up the CV rather than selling on its own. -->
  <div :class="$style.root">
    <h3 id="technologies" class="os-text-h3">{{ t('technologies.title') }}</h3>
    <p :class="['os-text-caption', $style.note]">{{ t('technologies.keyNote') }}</p>
    <dl :class="$style.groups">
      <div v-for="group in GROUPS" :key="group.key" :class="$style.group">
        <dt class="os-text-label">{{ t(`technologies.groups.${group.key}`) }}</dt>
        <dd>
          <ul :class="$style.list">
            <li v-for="item in group.items" :key="item.name">
              <Badge :tone="'key' in item ? 'accent' : 'neutral'">{{ item.name }}</Badge>
            </li>
          </ul>
        </dd>
      </div>
    </dl>
  </div>
</template>

<style module>
.root {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.root h3 {
  margin: 0;
}
.note {
  margin: 0;
  color: var(--ink-muted);
}
.list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.groups {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin: var(--space-2) 0 0;
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
