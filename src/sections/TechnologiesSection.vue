<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Badge, Card, GridLayout } from '@/shared/ui'
import PageSection from './PageSection.vue'
import netUrl from '@/assets/icons/net.png'
import reactUrl from '@/assets/icons/react.png'
import vueUrl from '@/assets/icons/vue.png'
import dockerUrl from '@/assets/icons/docker.png'
import azureUrl from '@/assets/icons/azure.png'
import windowsUrl from '@/assets/icons/windows.png'
import elasticUrl from '@/assets/icons/elastic.png'
import rabbitUrl from '@/assets/icons/rabbit.png'
import sqlServerUrl from '@/assets/icons/sqlserver.png'
import mongoUrl from '@/assets/icons/mongo.png'
import redisUrl from '@/assets/icons/redis.png'

const { t } = useI18n()

// Grouped by area; tool names are the same in every language.
const GROUPS = [
  {
    key: 'frontend',
    items: ['TypeScript', 'React', 'Redux', 'RxJS', 'Vue.js', 'Nx', 'Tailwind CSS', 'PWA']
  },
  { key: 'visualization', items: ['HTML5 Canvas', 'Konva.js', 'D3.js'] },
  {
    key: 'backend',
    items: ['C#', '.NET', 'ASP.NET MVC', 'Entity Framework', 'SignalR', 'RabbitMQ']
  },
  { key: 'data', items: ['SQL Server', 'T-SQL', 'MongoDB', 'Redis', 'Elasticsearch'] },
  { key: 'delivery', items: ['Docker', 'Azure DevOps', 'Argo CD', 'Keycloak (SSO)', 'Windows'] }
] as const
const stack = [
  { name: '.NET', src: netUrl },
  { name: 'React', src: reactUrl },
  { name: 'Vue', src: vueUrl },
  { name: 'Docker', src: dockerUrl },
  { name: 'Azure', src: azureUrl },
  { name: 'Windows', src: windowsUrl },
  { name: 'Elasticsearch', src: elasticUrl },
  { name: 'RabbitMQ', src: rabbitUrl },
  { name: 'SQL Server', src: sqlServerUrl },
  { name: 'MongoDB', src: mongoUrl },
  { name: 'Redis', src: redisUrl }
]
</script>

<template>
  <PageSection id="technologies" :title="t('technologies.title')">
    <GridLayout as="ul" :min-item-width="140" :gap="4" :class="$style.list">
      <Card v-for="tech in stack" :key="tech.name" as="li" padding="sm">
        <figure :class="$style.tech">
          <!-- Brand logos are drawn for light backgrounds, so they sit on a light plate in both themes. -->
          <span data-theme="light" :class="$style.plate">
            <img :src="tech.src" alt="" width="64" height="64" loading="lazy" />
          </span>
          <figcaption class="os-text-label">{{ tech.name }}</figcaption>
        </figure>
      </Card>
    </GridLayout>
    <h3 class="os-text-h3">{{ t('technologies.groupsTitle') }}</h3>
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
.tech {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  margin: 0;
}
.plate {
  display: grid;
  place-items: center;
  width: 80px;
  height: 80px;
  background: var(--surface-raised);
  border-radius: var(--radius-md);
}
.plate > img {
  width: 64px;
  height: 64px;
  object-fit: contain;
}
</style>
