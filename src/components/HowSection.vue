<script setup lang="ts">
import HighlightedText from '@/common/HighlightedText.vue'
import FlexDiv from '@/common/FlexDiv.vue'
import ColorEffectText from '@/common/ColorEffectText.vue'
import { useI18n } from 'vue-i18n'
import en from '@/i18n/locales/en'

const { t } = useI18n()
const STEPS_PER_ROW = 2
const stepRows = Array.from({ length: Math.ceil(en.how.steps.length / STEPS_PER_ROW) }, (_, r) =>
  Array.from({ length: STEPS_PER_ROW }, (_, c) => r * STEPS_PER_ROW + c).filter(
    (step) => step < en.how.steps.length
  )
)
</script>

<template>
  <ColorEffectText style="text-align: center; margin: 5rem">{{ t('how.title') }}</ColorEffectText>
  <FlexDiv
    v-for="(row, r) in stepRows"
    :key="r"
    :style="{ borderBottom: r < stepRows.length - 1 ? '1px solid var(--secondary)' : undefined }"
  >
    <FlexDiv v-for="step in row" :key="step">
      <div>
        <ColorEffectText>{{ step + 1 }}.</ColorEffectText>
      </div>
      <div>
        <HighlightedText>{{ t(`how.steps.${step}.title`) }}</HighlightedText>
        <p>{{ t(`how.steps.${step}.text`) }}</p>
      </div>
    </FlexDiv>
  </FlexDiv>
</template>

<style scoped></style>
