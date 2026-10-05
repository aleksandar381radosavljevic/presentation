<script setup lang="ts">
defineProps({
  outline: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <h2 class="highlighted-text" :class="{ outline: outline }"><slot></slot></h2>
</template>

<style scoped>
.highlighted-text {
  font-weight: 700;
  font-size: var(--h3);
}
.outline {
  color: #fff;
  text-shadow:
    1px 0 0 #000,
    0 -1px 0 #000,
    0 1px 0 #000,
    -1px 0 0 #000;
}
</style>
