<script setup lang="ts">
import HighlightedText from '@/common/HighlightedText.vue'
import FlexDiv from '@/common/FlexDiv.vue'
import ColorEffectText from '@/common/ColorEffectText.vue'
import CartDiv from '@/common/CartDiv.vue'
import ClockSvg from '@/common/ClockSvg.vue'
import RectSvg from '@/common/RectSvg.vue'
import ApproveSvg from '@/common/ApproveSvg.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <ColorEffectText style="text-align: center; margin: 5rem">{{ t('why.title') }}</ColorEffectText>
  <FlexDiv style="padding: 2rem">
    <CartDiv>
      <ApproveSvg />
      <HighlightedText>{{ t('why.quality.title') }}</HighlightedText>
      <p>{{ t('why.quality.text') }}</p>
    </CartDiv>
    <CartDiv>
      <ClockSvg />
      <HighlightedText>{{ t('why.efficiency.title') }}</HighlightedText>
      <p>{{ t('why.efficiency.text') }}</p>
    </CartDiv>
    <CartDiv>
      <RectSvg />
      <HighlightedText>{{ t('why.maintainability.title') }}</HighlightedText>
      <p>{{ t('why.maintainability.text') }}</p>
    </CartDiv>
  </FlexDiv>
</template>

<style scoped></style>
