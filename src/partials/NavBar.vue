<script setup lang="ts">
import { computed, ref } from 'vue'
import HamburgerIcon from '../common/HamburgerIcon.vue'
import DropdownMenu from '../common/DropdownMenu.vue'
import logoUrl from '../assets/images/favicon.png'
import { supportedLanguages, changeLanguage, getSelectedLanguage } from '../utils/localization'

const languageOptions = supportedLanguages.map((x) => ({ key: x.code, label: x.label }))
const currentLanguage = getSelectedLanguage()
const selectedLanguage = computed({
  get: () => ({ key: currentLanguage.value.code, label: currentLanguage.value.label }),
  set: (option) => changeLanguage(option.key)
})
const isExpanded = ref(false)

const toggleMenu = () => (isExpanded.value = !isExpanded.value)

const menuItems = ref([
  { label: 'About', path: '#about' },
  { label: 'Experience', path: '#experience' },
  { label: 'Education', path: '#education' },
  { label: 'Certifications', path: '#certifications' },
  { label: 'Skills', path: '#skills' },
  { label: 'Projects', path: '#projects' }
])
</script>

<template>
  <div class="navbar">
    <a class="logo-img" href="#"><img :src="logoUrl" alt="logo" /></a>
    <DropdownMenu :options="languageOptions" v-model="selectedLanguage" />
    <HamburgerIcon @click="toggleMenu" :class="{ hidden: isExpanded }" />
    <div class="close-items" :class="{ hidden: !isExpanded }" @click="toggleMenu()">x</div>
    <div class="menu-items" :class="{ hidden: !isExpanded }">
      <a :key="item.path" v-for="item in menuItems" :href="item.path">{{ item.label }}</a>
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
