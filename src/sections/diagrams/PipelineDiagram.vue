<script setup lang="ts">
import { useI18n } from 'vue-i18n'

// The architecture idea of the IoT dashboards: receiving readings is decoupled from drawing them.
// Plain HTML instead of SVG, so the labels wrap and stay readable on a phone.
const { t } = useI18n()
const label = (key: string) => t(`projects.featured.liveDashboards.diagram.${key}`)
// A made-up series for the small chart in the last box.
const SPARK = '0,22 10,18 20,20 30,12 40,15 50,8 60,11 70,6 80,9 90,4 100,7'
</script>

<template>
  <figure :class="$style.figure" :aria-label="t('projects.illustrationNote')">
    <ol :class="$style.flow">
      <li :class="$style.box">{{ label('devices') }}</li>
      <li :class="$style.arrow" aria-hidden="true">
        <span>{{ label('interval') }}</span>
      </li>
      <li :class="[$style.box, $style.accent]">{{ label('receive') }}</li>
      <li :class="$style.split">
        <span>{{ label('separate') }}</span>
      </li>
      <li :class="[$style.box, $style.accent]">{{ label('draw') }}</li>
      <li :class="$style.arrow" aria-hidden="true" />
      <li :class="$style.box">
        {{ label('charts') }}
        <svg viewBox="0 0 100 26" :class="$style.spark" aria-hidden="true">
          <polyline :points="SPARK" />
        </svg>
      </li>
    </ol>
  </figure>
</template>

<style module>
.figure {
  margin: 0;
}
.flow {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--space-1);
  margin: 0;
  padding: 0;
  list-style: none;
}
.box {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  background: var(--surface-raised);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-md);
}
.accent {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent-ink);
}
.arrow,
.split {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 28px;
  font-size: 12px;
  color: var(--ink-muted);
}
.arrow::before {
  content: '↓';
  margin-right: var(--space-2);
  font-size: 16px;
}
/* The dashed line is the boundary the architecture keeps between intake and rendering. */
.split {
  border-block: 2px dashed var(--line-strong);
  margin-block: var(--space-1);
}
.spark {
  width: 100%;
  height: 26px;
}
.spark polyline {
  fill: none;
  stroke: var(--success);
  stroke-width: 2;
}
</style>
