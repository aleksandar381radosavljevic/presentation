<script setup lang="ts">
import { MainContainer } from '@/shared/ui'
import SiteHeader from './sections/SiteHeader.vue'
import HeroSection from './sections/HeroSection.vue'
import AboutSection from './sections/AboutSection.vue'
import ServicesSection from './sections/ServicesSection.vue'
import ProcessSection from './sections/ProcessSection.vue'
import ProjectsSection from './sections/ProjectsSection.vue'
import EngagementSection from './sections/EngagementSection.vue'
import ExperienceSection from './sections/ExperienceSection.vue'
import SiteFooter from './sections/SiteFooter.vue'
</script>

<template>
  <SiteHeader />
  <main id="main-content" tabindex="-1" :class="$style.main">
    <HeroSection />
    <MainContainer as="div" :gap="{ base: 12, lg: 16 }" :padding-y="{ base: 12, lg: 16 }">
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <EngagementSection />
      <ExperienceSection />
    </MainContainer>
  </main>
  <SiteFooter />
</template>

<style module>
.main:focus {
  outline: none; /* skip-link target, not an interactive element */
}
</style>
