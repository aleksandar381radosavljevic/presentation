<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * A static, decorative "grid monitoring" scene: feeder lines, nodes and a few warning and alarm nodes.
 * Colors come from the theme tokens, so it follows light and dark themes, including a local
 * data-theme on an ancestor. Seeded, so every visit draws the same picture.
 */
const STEP = 14
const SEED = 7

const canvas = ref<HTMLCanvasElement>()
let resizeObserver: ResizeObserver | undefined
let themeObserver: MutationObserver | undefined
let frame = 0

function draw() {
  const c = canvas.value
  const g = c?.getContext('2d')
  if (!c || !g) return
  const { width: w, height: h } = c.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  c.width = Math.round(w * dpr)
  c.height = Math.round(h * dpr)
  g.setTransform(dpr, 0, 0, dpr, 0, 0)
  g.clearRect(0, 0, w, h)

  const css = getComputedStyle(c)
  const color = (name: string) => css.getPropertyValue(name).trim()
  const line = color('--line')
  const node = color('--line-strong')
  const warn = color('--accent')
  const alarm = color('--danger')

  let s = SEED
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647
  const cols = Math.floor(w / STEP)
  const rows = Math.floor(h / STEP)

  g.strokeStyle = line
  g.lineWidth = 1
  g.globalAlpha = 0.7
  for (let r = 1; r < rows; r += 3) {
    g.beginPath()
    g.moveTo(10, r * STEP + 0.5)
    g.lineTo(w - 10, r * STEP + 0.5)
    g.stroke()
  }
  for (let k = 0; k < cols / 3; k++) {
    const x = 10 + Math.floor(rnd() * cols) * STEP + 0.5
    g.beginPath()
    g.moveTo(x, STEP)
    g.lineTo(x, h - STEP)
    g.stroke()
  }

  for (let r = 1; r < rows; r++) {
    for (let q = 1; q < cols; q++) {
      if (rnd() > 0.55) continue
      const x = q * STEP
      const y = r * STEP
      const v = rnd()
      const flagged = v > 0.985
      g.fillStyle = v > 0.995 ? alarm : flagged ? warn : node
      g.globalAlpha = flagged ? 1 : 0.45
      g.beginPath()
      g.arc(x, y, flagged ? 4 : 1.75, 0, Math.PI * 2)
      g.fill()
      if (flagged) {
        g.strokeStyle = g.fillStyle
        g.globalAlpha = 0.35
        g.beginPath()
        g.arc(x, y, 9, 0, Math.PI * 2)
        g.stroke()
      }
    }
  }
  g.globalAlpha = 1
}

function schedule() {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(draw)
}

onMounted(() => {
  draw()
  resizeObserver = new ResizeObserver(schedule)
  if (canvas.value) resizeObserver.observe(canvas.value)
  // The theme lives in data-theme on <html>; redraw when it changes.
  themeObserver = new MutationObserver(schedule)
  themeObserver.observe(document.documentElement, { attributeFilter: ['data-theme'] })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  resizeObserver?.disconnect()
  themeObserver?.disconnect()
})
</script>

<template>
  <canvas ref="canvas" :class="$style.canvas" aria-hidden="true" />
</template>

<style module>
/* Fills the nearest positioned ancestor. */
.canvas {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
}
</style>
