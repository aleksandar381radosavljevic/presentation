<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Badge, Card, GridLayout } from '@/shared/ui'
import en from '@/i18n/locales/en'
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
import oracleUrl from '@/assets/icons/oracle.png'
import mongoUrl from '@/assets/icons/mongo.png'
import redisUrl from '@/assets/icons/redis.png'

const { t } = useI18n()

const domains = Object.keys(en.technologies.domains)
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
  { name: 'Oracle', src: oracleUrl },
  { name: 'MongoDB', src: mongoUrl },
  { name: 'Redis', src: redisUrl }
]
</script>

<template>
  <PageSection id="expertise" :title="t('technologies.expertiseTitle')">
    <ul :class="$style.domains">
      <li v-for="key in domains" :key="key">
        <Badge>{{ t(`technologies.domains.${key}`) }}</Badge>
      </li>
    </ul>
    <h3 class="os-text-h3">{{ t('technologies.stackTitle') }}</h3>
    <GridLayout as="ul" :min-item-width="140" :gap="4" :class="$style.stack">
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
  </PageSection>
</template>

<style module>
.domains {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}
.stack {
  margin: 0;
  padding: 0;
  list-style: none;
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
