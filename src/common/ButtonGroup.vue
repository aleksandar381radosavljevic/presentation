<template>
  <div class="button-group"><slot></slot></div>
</template>

<style scoped>
.button-group {
  margin-top: 50px;
  display: flex;
  gap: 1rem;
}

@media (max-width: 1024px) {
  .button-group {
    margin-top: 5px;
  }
}
</style>
