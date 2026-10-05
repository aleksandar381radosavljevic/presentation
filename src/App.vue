<script setup lang="ts">
import NavBar from './partials/NavBar.vue'
import FooterBar from './partials/FooterBar.vue'
import HeadingSection from './components/HeadingSection.vue'
import AboutSection from './components/AboutSection.vue'
import HowSection from '@/components/HowSection.vue'
import WhySection from '@/components/WhySection.vue'
import TechnologiesSection from '@/components/TechnologiesSection.vue'
</script>

<template>
  <NavBar></NavBar>
  <HeadingSection></HeadingSection>

  <main>
    <AboutSection></AboutSection>
    <HowSection></HowSection>
    <WhySection></WhySection>
    <TechnologiesSection></TechnologiesSection>
  </main>

  <FooterBar></FooterBar>
</template>

<style scoped></style>
