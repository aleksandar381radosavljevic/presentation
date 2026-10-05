<script setup lang="ts">
import { MainContainer } from '@/shared/ui'
import SiteHeader from './sections/SiteHeader.vue'
import HeroSection from './sections/HeroSection.vue'
import AboutSection from './sections/AboutSection.vue'
import ProcessSection from './sections/ProcessSection.vue'
import WhySection from './sections/WhySection.vue'
import ExpertiseSection from './sections/ExpertiseSection.vue'
import SiteFooter from './sections/SiteFooter.vue'
</script>

<template>
  <SiteHeader />
  <MainContainer :gap="{ base: 12, lg: 16 }">
    <HeroSection />
    <AboutSection />
    <ProcessSection />
    <WhySection />
    <ExpertiseSection />
  </MainContainer>
  <SiteFooter />
</template>
