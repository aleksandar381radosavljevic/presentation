<template>
  <h1>
    <span class="color-effect"><slot></slot></span>
  </h1>
</template>

<style scoped>
.color-effect {
  font-size: 55px;
  font-weight: 700;
  background: linear-gradient(120deg, var(--primary), var(--accent));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
