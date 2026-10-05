<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import HamburgerIcon from '../common/HamburgerIcon.vue'
import DropdownMenu from '../common/DropdownMenu.vue'
import logoUrl from '../assets/images/favicon.png'
import { supportedLocales, currentLocale, setLocale } from '../i18n'

const { t } = useI18n()

const languageOptions = supportedLocales.map((x) => ({ key: x.code, label: x.label }))
const selectedLanguage = computed({
  get: () => languageOptions.find((x) => x.key === currentLocale.value) ?? languageOptions[0],
  set: (option) => setLocale(option.key)
})
const isExpanded = ref(false)

const toggleMenu = () => (isExpanded.value = !isExpanded.value)

const menuItems = ['about', 'experience', 'education', 'certifications', 'skills', 'projects']
</script>

<template>
  <div class="navbar">
    <a class="logo-img" href="#"><img :src="logoUrl" alt="logo" /></a>
    <DropdownMenu :options="languageOptions" v-model="selectedLanguage" />
    <HamburgerIcon @click="toggleMenu" :class="{ hidden: isExpanded }" />
    <div class="close-items" :class="{ hidden: !isExpanded }" @click="toggleMenu()">x</div>
    <div class="menu-items" :class="{ hidden: !isExpanded }">
      <a :key="item" v-for="item in menuItems" :href="`#${item}`">{{ t(`nav.${item}`) }}</a>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  justify-items: center;
  background-color: var(--background-transparent);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  height: 60px;
  border-bottom: 1px solid var(--primary);
  transition: background-color 0.3s ease;
}

.menu-items a {
  color: var(--text);
  margin: 0 15px;
  padding: 0.5rem;
  font-size: 1.2rem;
  border-radius: 5px;
  text-decoration: none;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.menu-items a:hover {
  background-color: var(--primary);
  color: var(--background);
}

.logo-img {
  height: 100%;
  margin-right: auto;
  border-radius: 5px;
  background-color: var(--background-transparent);
}

.logo-img img {
  height: 100%;
}
.logo-img:hover {
  background-color: var(--primary);
}

.close-items {
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 5px;
}

.close-items:hover {
  background-color: var(--primary);
  color: var(--background);
}
</style>
