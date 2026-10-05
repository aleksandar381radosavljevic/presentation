<template>
  <JumbotronBar :image-url="BackgroundUrl">
    <HighlightedText outline>{{ t('heading.greeting') }}</HighlightedText>
    <ColorEffectText>{{ t('heading.name') }}</ColorEffectText>
    <HighlightedText>{{ t('heading.role') }}</HighlightedText>
    <ButtonGroup>
      <a class="primary-button" href="#">{{ t('heading.scheduleMeeting') }}</a>
      <a class="secondary-button" href="#">{{ t('heading.seeMyWork') }}</a>
    </ButtonGroup>
  </JumbotronBar>
</template>

<script setup lang="ts">
import JumbotronBar from '../common/JumbotronBar.vue'
import ColorEffectText from '../common/ColorEffectText.vue'
import HighlightedText from '../common/HighlightedText.vue'
import ButtonGroup from '../common/ButtonGroup.vue'
import BackgroundUrl from '../assets/images/cover.jpg'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
