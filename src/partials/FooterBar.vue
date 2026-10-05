<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <footer class="footer">
    <h1>{{ t('footer.title') }}</h1>
    <a>{{ t('footer.contact') }}</a>
    <p>{{ t('footer.copyright') }}</p>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 1rem;
}
</style>
