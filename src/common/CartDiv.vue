<template>
<div class="cart">
  <slot></slot>
</div>
</template>

<style scoped>
.cart {
  background-color: var(--background-shaded);
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
</style>