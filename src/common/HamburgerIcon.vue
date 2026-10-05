<template>
  <div class="menu-toggle">
    <div class="hamburger"></div>
    <div class="hamburger"></div>
    <div class="hamburger"></div>
  </div>
</template>

<style scoped>
.hamburger {
  width: 30px;
  height: 3px;
  background-color: #0c0908;
  /* Adjust color as needed */
  margin: 6px 0;
}

.menu-toggle {
  cursor: pointer;
  margin-right: 20px;
  padding: 0.5rem;
  border-radius: 5px;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.menu-toggle:hover {
  background-color: var(--primary);
  color: var(--background);
}
</style>
