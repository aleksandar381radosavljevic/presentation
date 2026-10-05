<script setup lang="ts">
import ColorEffectText from '@/common/ColorEffectText.vue'
import HighlightedText from '@/common/HighlightedText.vue'
import FlexDiv from '@/common/FlexDiv.vue'
</script>

<template>
  <ColorEffectText style="text-align: center; margin: 5rem">About me</ColorEffectText>
  <div class="about">
    <FlexDiv style="border-bottom: 1px solid var(--secondary); padding: 2rem">
      <div style="width: 50%; display: block">
        <HighlightedText> Experienced engineers focused on quality </HighlightedText>
      </div>
      <div style="width: 50%; display: block">
        <p>
          Software engineer with experience in working with coorporate software, involved in whole
          development process. Last 5 years working in Comping Computer Engineering's office in Niš,
          Serbia
        </p>
      </div>
    </FlexDiv>
    <FlexDiv style="border-bottom: 1px solid var(--secondary); padding: 2rem">
      <div style="width: 50%; display: block">
        <HighlightedText>Innovative tech mind</HighlightedText>
      </div>
      <div style="width: 50%; display: block">
        <p>
          Software engineer with experience in working with coorporate software, involved in whole
          development process. Last 5 years working in Comping Computer Engineering's office in Niš,
          Serbia
        </p>
      </div>
    </FlexDiv>
    <FlexDiv style="padding: 2rem">
      <div style="width: 50%; display: block">
        <HighlightedText>Willing to step up</HighlightedText>
      </div>
      <div style="width: 50%; display: block">
        <p>
          Software engineer with experience in working with coorporate software, involved in whole
          development process. Last 5 years working in Comping Computer Engineering's office in Niš,
          Serbia
        </p>
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
