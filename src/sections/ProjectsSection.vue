<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ChevronDown } from '@lucide/vue'
import { Badge, Card, Icon } from '@/shared/ui'
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
// On phones the case-study text and the compact list entries are a tap away, so the page stays
// shorter; from 768px everything is shown. The prerendered HTML has no screen width, so it shows
// everything (as do search engines) and phones fold the entries once the app is mounted.
const wide = ref(true)
let wideQuery: MediaQueryList | undefined
const onWideChange = (e: MediaQueryListEvent | MediaQueryList) => (wide.value = e.matches)
onMounted(() => {
  wideQuery = matchMedia('(min-width: 768px)')
  onWideChange(wideQuery)
  wideQuery.addEventListener('change', onWideChange)
})
onBeforeUnmount(() => wideQuery?.removeEventListener('change', onWideChange))

const LISTS = [
  { title: 'projects.moreTitle', items: MORE },
  { title: 'projects.personalTitle', items: PERSONAL }
] as const
</script>

<template>
  <PageSection
    id="projects"
    :eyebrow="t('projects.title')"
    :title="t('projects.heading')"
    :intro="t('projects.intro')"
  >
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
            <component :is="wide ? 'div' : 'details'" :class="!wide && $style.collapsible">
              <summary v-if="!wide" :class="[$style.summary, $style.readMore]">
                {{ t('projects.readCase') }}
                <Icon :icon="ChevronDown" :size="20" :class="$style.chevron" />
              </summary>
              <dl :class="$style.parts">
                <div v-for="part in CASE_PARTS" :key="part">
                  <dt class="os-text-label">{{ t(`projects.labels.${part}`) }}</dt>
                  <dd>{{ t(`projects.featured.${project.key}.${part}`) }}</dd>
                </div>
              </dl>
            </component>
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
        <li v-for="project in group.items" :key="project.key">
          <component
            :is="wide ? 'div' : 'details'"
            :class="[$style.row, !wide && $style.collapsible]"
          >
            <component :is="wide ? 'div' : 'summary'" :class="$style.summary">
              <div>
                <h4 :class="$style.rowTitle">{{ t(`projects.items.${project.key}.title`) }}</h4>
                <p :class="['os-text-caption', $style.muted]">
                  {{ t(`projects.items.${project.key}.meta`) }}
                </p>
              </div>
              <Icon v-if="!wide" :icon="ChevronDown" :size="20" :class="$style.chevron" />
            </component>
            <div :class="$style.details">
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
          </component>
        </li>
      </ul>
    </template>
  </PageSection>
</template>

<style module>
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
/* On phones the illustration comes first, next to the key number, before the four blocks of text. */
.visual {
  order: -1;
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
.summary {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: var(--space-3);
}
.collapsible .summary {
  list-style: none;
  cursor: pointer;
}
.collapsible .summary::-webkit-details-marker {
  display: none;
}
.collapsible .summary:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
  border-radius: var(--radius-sm);
}
.chevron {
  flex: none;
  margin-top: 2px;
  color: var(--ink-muted);
  transition: transform 150ms ease;
}
.collapsible[open] .chevron {
  transform: rotate(180deg);
}
.readMore {
  align-items: center;
  justify-content: flex-start;
  font-weight: 600;
  color: var(--accent-ink);
}
.readMore .chevron {
  color: inherit;
}
.collapsible[open] .parts {
  margin-top: var(--space-4);
}
.collapsible[open] .details {
  margin-top: var(--space-2);
}
@media (prefers-reduced-motion: reduce) {
  .chevron {
    transition: none;
  }
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
  .visual {
    order: 0;
  }
  .row {
    grid-template-columns: 1fr 1.6fr;
    gap: var(--space-8);
  }
}
</style>
