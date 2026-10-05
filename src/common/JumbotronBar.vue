<script setup lang="ts">
const props = defineProps({
  imageUrl: String
})
const backgroundImageStyle = props.imageUrl ? { backgroundImage: `url(${props.imageUrl})` } : {}
</script>

<template>
  <div class="jumbotron" :style="backgroundImageStyle">
    <slot></slot>
  </div>
</template>

<style scoped>
.jumbotron {
  position: relative;
  background-size: cover;
  background-position: center;
  height: 90vh;
  padding: 6rem 2rem;
  text-align: left;
  margin-top: 60px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
}

@media (max-width: 1024px) {
  .jumbotron {
    background-image: none !important;
  }
}
</style>
