<script setup lang="ts">
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
    <AboutSection />
    <ServicesSection />
    <ProjectsSection />
    <ProcessSection />
    <EngagementSection />
    <ExperienceSection />
  </main>
  <SiteFooter />
</template>

<style module>
.main:focus {
  outline: none; /* skip-link target, not an interactive element */
}
</style>
