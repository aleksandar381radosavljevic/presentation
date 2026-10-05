<script setup lang="ts">
import HighlightedText from "@/common/HighlightedText.vue";
import FlexDiv from "@/common/FlexDiv.vue";
import ColorEffectText from "@/common/ColorEffectText.vue";
import CartDiv from "@/common/CartDiv.vue";
import ClockSvg from "@/common/ClockSvg.vue";
import RectSvg from "@/common/RectSvg.vue";
import ApproveSvg from "@/common/ApproveSvg.vue";
</script>

<template>
  <ColorEffectText style="text-align: center; margin: 5rem;">Why to hire me?</ColorEffectText>
  <FlexDiv style="padding: 2rem;">
    <CartDiv>
      <ApproveSvg/>
      <HighlightedText>Quality</HighlightedText>
      <p>Delivered software must be proof of quality</p>
    </CartDiv>
    <CartDiv>
      <ClockSvg/>
      <HighlightedText>Efficiency</HighlightedText>
      <p>Delivered software must be proof of quality</p>
    </CartDiv>
    <CartDiv>
      <RectSvg/>
      <HighlightedText>Maintainability</HighlightedText>
      <p>Delivered software must be proof of quality</p>
    </CartDiv>
  </FlexDiv>
</template>

<style scoped>

</style>