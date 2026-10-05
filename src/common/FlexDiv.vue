<template>
  <div class="flex-div">
    <slot/>
  </div>
</template>

<style scoped>
.flex-div {
  display: flex;
  gap: 2rem;
  margin: 1rem;
}
</style>
