<template>
  <JumbotronBar :image-url="BackgroundUrl">
    <HighlightedText outline>Здраво, ја сам</HighlightedText>
    <ColorEffectText>Александар Радосављевић</ColorEffectText>
    <HighlightedText>Софтверски инжењер & Вођа тима за фронтенд</HighlightedText>
    <ButtonGroup>
      <a class="primary-button" href="#">Закажи састанак</a>
      <a class="secondary-button" href="#">Погледај мој рад</a>
    </ButtonGroup>
  </JumbotronBar>
</template>

<script setup lang="ts">
import JumbotronBar from '../common/JumbotronBar.vue'
import ColorEffectText from '../common/ColorEffectText.vue'
import HighlightedText from '../common/HighlightedText.vue'
import ButtonGroup from '../common/ButtonGroup.vue'
import BackgroundUrl from '../assets/images/cover.jpg'
</script>
