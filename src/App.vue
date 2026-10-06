<script setup lang="ts">
import { MainContainer } from '@/shared/ui'
import SiteHeader from './sections/SiteHeader.vue'
import HeroSection from './sections/HeroSection.vue'
import ServicesSection from './sections/ServicesSection.vue'
import ProcessSection from './sections/ProcessSection.vue'
import ProjectsSection from './sections/ProjectsSection.vue'
import EngagementSection from './sections/EngagementSection.vue'
import ExperienceSection from './sections/ExperienceSection.vue'
import TechnologiesSection from './sections/TechnologiesSection.vue'
import SiteFooter from './sections/SiteFooter.vue'
</script>

<template>
  <SiteHeader />
  <MainContainer :gap="{ base: 12, lg: 16 }">
    <HeroSection />
    <ServicesSection />
    <ProcessSection />
    <ProjectsSection />
    <EngagementSection />
    <ExperienceSection />
    <TechnologiesSection />
  </MainContainer>
  <SiteFooter />
</template>
