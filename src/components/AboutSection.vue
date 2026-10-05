<script setup lang="ts">
import ColorEffectText from '@/common/ColorEffectText.vue'
import HighlightedText from '@/common/HighlightedText.vue'
import FlexDiv from '@/common/FlexDiv.vue'
import { useI18n } from 'vue-i18n'
import en from '@/i18n/locales/en'

const { t } = useI18n()
const ABOUT_ITEM_COUNT = en.about.items.length
</script>

<template>
  <ColorEffectText style="text-align: center; margin: 5rem">{{ t('about.title') }}</ColorEffectText>
  <div class="about">
    <FlexDiv
      v-for="i in ABOUT_ITEM_COUNT"
      :key="i"
      :style="{
        padding: '2rem',
        borderBottom: i < ABOUT_ITEM_COUNT ? '1px solid var(--secondary)' : undefined
      }"
    >
      <div style="width: 50%; display: block">
        <HighlightedText>{{ t(`about.items.${i - 1}.title`) }}</HighlightedText>
      </div>
      <div style="width: 50%; display: block">
        <p>{{ t(`about.items.${i - 1}.text`) }}</p>
      </div>
    </FlexDiv>
  </div>
</template>

<style scoped>
.about {
  background-color: var(--background-shaded);
  margin: 2rem;
  padding: 2rem;
  font-weight: normal;
  border-radius: 50px;
}

hr {
  width: 90%;
  border-top: 1px solid var(--secondary);
}
</style>
