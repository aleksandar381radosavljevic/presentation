<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Badge, Card } from '@/shared/ui'
import PageSection from './PageSection.vue'
import GridDiagram from './diagrams/GridDiagram.vue'
import PipelineDiagram from './diagrams/PipelineDiagram.vue'

const { t } = useI18n()
// The two projects closest to the specialization are told as case studies with an illustration;
// the rest are a compact list. Technology names are the same in every language, so they live here.
const FEATURED = [
  {
    key: 'gridVisualization',
    diagram: GridDiagram,
    stack: ['React', 'TypeScript', 'Konva.js', 'SignalR', 'PWA']
  },
  { key: 'liveDashboards', diagram: PipelineDiagram, stack: ['React', 'TypeScript', 'D3.js'] }
] as const
const CASE_PARTS = ['problem', 'constraint', 'role', 'result'] as const
const MORE = [
  { key: 'legacyMigration', stack: ['React', 'TypeScript', 'Nx', 'Storybook', 'Keycloak'] },
  { key: 'digitalization', stack: [] },
  { key: 'notificationEngine', stack: [] },
  { key: 'scannerService', stack: ['C#', '.NET', 'NAPS2', 'WIA', 'TWAIN'] }
] as const
// Built on his own time, shown apart from the work done for clients.
const PERSONAL = [{ key: 'pushInstructions', stack: ['.NET', 'React', 'PWA', 'Web Push'] }] as const
const LISTS = [
  { title: 'projects.moreTitle', items: MORE },
  { title: 'projects.personalTitle', items: PERSONAL }
] as const
</script>

<template>
  <PageSection id="projects" :title="t('projects.title')">
    <p :class="['os-text-body-lg', $style.intro]">{{ t('projects.intro') }}</p>

    <ul :class="$style.featuredList">
      <Card
        v-for="project in FEATURED"
        :key="project.key"
        as="li"
        :title="t(`projects.featured.${project.key}.title`)"
        :description="t(`projects.featured.${project.key}.meta`)"
      >
        <div :class="$style.caseStudy">
          <div :class="$style.story">
            <p :class="$style.figure">
              <strong>{{ t(`projects.featured.${project.key}.figure.value`) }}</strong>
              <span>{{ t(`projects.featured.${project.key}.figure.label`) }}</span>
            </p>
            <dl :class="$style.parts">
              <div v-for="part in CASE_PARTS" :key="part">
                <dt class="os-text-label">{{ t(`projects.labels.${part}`) }}</dt>
                <dd>{{ t(`projects.featured.${project.key}.${part}`) }}</dd>
              </div>
            </dl>
            <ul :class="$style.stack" :aria-label="t('projects.stackLabel')">
              <li v-for="tech in project.stack" :key="tech">
                <Badge>{{ tech }}</Badge>
              </li>
            </ul>
          </div>
          <div :class="$style.visual">
            <component :is="project.diagram" />
            <p :class="['os-text-caption', $style.note]">{{ t('projects.illustrationNote') }}</p>
          </div>
        </div>
      </Card>
    </ul>

    <template v-for="group in LISTS" :key="group.title">
      <h3 class="os-text-h3">{{ t(group.title) }}</h3>
      <ul :class="$style.compactList">
        <li v-for="project in group.items" :key="project.key" :class="$style.row">
          <div>
            <h4 :class="$style.rowTitle">{{ t(`projects.items.${project.key}.title`) }}</h4>
            <p :class="['os-text-caption', $style.muted]">
              {{ t(`projects.items.${project.key}.meta`) }}
            </p>
          </div>
          <div>
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
          </div>
        </li>
      </ul>
    </template>
  </PageSection>
</template>

<style module>
.intro {
  max-width: 60ch;
  margin: 0;
  color: var(--ink-muted);
}
.featuredList {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  margin: 0;
  padding: 0;
  list-style: none;
}
.caseStudy {
  display: grid;
  gap: var(--space-8);
}
.story {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}
/* The key number of the project, pulled out of the prose so it is seen first. */
.figure {
  display: flex;
  flex-direction: column;
  margin: 0;
}
.figure strong {
  font-size: 40px;
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--accent-ink);
}
.figure span {
  color: var(--ink-muted);
}
.parts {
  display: grid;
  gap: var(--space-4);
  margin: 0;
}
.parts dt {
  margin-bottom: var(--space-1);
}
.parts dd {
  margin: 0;
  color: var(--ink-muted);
}
.visual {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-5);
  background: var(--surface-sunken);
  border-radius: var(--radius-md);
}
.note {
  margin: 0;
  color: var(--ink-muted);
}
.compactList {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--line);
}
.row {
  display: grid;
  gap: var(--space-2);
  padding: var(--space-5) 0;
  border-bottom: 1px solid var(--line);
}
.rowTitle {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
}
.muted {
  margin: var(--space-1) 0 0;
  color: var(--ink-muted);
}
.text {
  margin: 0;
  color: var(--ink-muted);
}
.stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: var(--space-3) 0 0;
  padding: 0;
  list-style: none;
}
@media (min-width: 1024px) {
  .caseStudy {
    grid-template-columns: 1.2fr 1fr;
    align-items: start;
  }
  .row {
    grid-template-columns: 1fr 1.6fr;
    gap: var(--space-8);
  }
}
</style>
