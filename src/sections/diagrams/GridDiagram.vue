<script setup lang="ts">
import { useI18n } from 'vue-i18n'

// An anonymized sketch of a grid overview screen with made-up topology: most elements calm,
// one in alarm, one with stale data, which is what the operator-screen principles describe.
const { t } = useI18n()

const COLS = 9
const ROWS = 4
const nodes = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS
  const row = Math.floor(i / COLS)
  // A fixed jitter keeps the layout organic without randomness between renders.
  const dx = ((i * 37) % 11) - 5
  const dy = ((i * 53) % 13) - 6
  return { id: i, x: 30 + col * 52 + dx, y: 30 + row * 56 + dy, col, row }
})
const edges = nodes.flatMap((n) => {
  const out: [number, number][] = []
  if (n.col < COLS - 1 && (n.id * 7) % 5 !== 0) out.push([n.id, n.id + 1])
  if (n.row < ROWS - 1 && (n.id * 3) % 4 === 0) out.push([n.id, n.id + COLS])
  return out
})
const ALARM = 22
const STALE = 12
const at = (id: number) => nodes[id]
</script>

<template>
  <figure :class="$style.figure">
    <svg viewBox="0 0 470 210" role="img" :aria-label="t('projects.illustrationNote')">
      <circle cx="456" cy="12" r="5" :class="$style.live" />
      <g :class="$style.edges">
        <line
          v-for="[a, b] in edges"
          :key="`${a}-${b}`"
          :x1="at(a).x"
          :y1="at(a).y"
          :x2="at(b).x"
          :y2="at(b).y"
        />
      </g>
      <g>
        <template v-for="n in nodes" :key="n.id">
          <circle v-if="n.id === ALARM" :cx="n.x" :cy="n.y" r="14" :class="$style.halo" />
          <circle
            :cx="n.x"
            :cy="n.y"
            :r="n.id === ALARM ? 7 : 5"
            :class="n.id === ALARM ? $style.alarm : n.id === STALE ? $style.stale : $style.node"
          />
        </template>
      </g>
    </svg>
    <figcaption :class="$style.legend">
      <span
        ><i :class="[$style.key, $style.keyLive]" />{{
          t('projects.featured.gridVisualization.diagram.live')
        }}</span
      >
      <span
        ><i :class="[$style.key, $style.keyAlarm]" />{{
          t('projects.featured.gridVisualization.diagram.alarm')
        }}</span
      >
      <span
        ><i :class="[$style.key, $style.keyStale]" />{{
          t('projects.featured.gridVisualization.diagram.stale')
        }}</span
      >
    </figcaption>
  </figure>
</template>

<style module>
.figure {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin: 0;
}
.figure svg {
  display: block;
  width: 100%;
  height: auto;
}
.edges line {
  stroke: var(--line-strong);
  stroke-width: 1.5;
  opacity: 0.6;
}
.node {
  fill: var(--surface-raised);
  stroke: var(--ink-muted);
  stroke-width: 1.5;
}
.stale {
  fill: var(--surface-raised);
  stroke: var(--warning);
  stroke-width: 2;
  stroke-dasharray: 3 2;
}
.live {
  fill: var(--success);
}
.alarm {
  fill: var(--danger);
}
.halo {
  fill: var(--danger-soft);
  stroke: var(--danger);
  stroke-width: 1;
  opacity: 0.8;
}
.legend {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-4);
  font-size: 13px;
  color: var(--ink-muted);
}
.legend span {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}
.key {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
}
.keyLive {
  background: var(--success);
}
.keyAlarm {
  background: var(--danger);
}
.keyStale {
  border: 2px dashed var(--warning);
}
</style>
