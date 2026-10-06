<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Button, GridItem, GridLayout } from '@/shared/ui'
import profileUrl from '@/assets/images/profile.jpg'

const { t } = useI18n()
</script>

<template>
  <section :class="$style.hero" aria-labelledby="hero-title">
    <GridLayout :columns="{ base: 1, md: 12 }" :gap="{ base: 8, md: 12 }" align-items="center">
      <GridItem :col-span="{ base: 'full', md: 7 }" :class="$style.text">
        <p :class="['os-text-label', $style.greeting]">{{ t('heading.greeting') }}</p>
        <h1 id="hero-title" class="os-text-display">{{ t('heading.name') }}</h1>
        <p :class="['os-text-body-lg', $style.role]">{{ t('heading.role') }}</p>
        <div :class="$style.actions">
          <Button variant="primary" size="lg" href="#contact">
            {{ t('heading.scheduleMeeting') }}
          </Button>
          <Button size="lg" href="#expertise">{{ t('heading.seeMyWork') }}</Button>
        </div>
      </GridItem>
      <GridItem :col-span="{ base: 'full', md: 5 }">
        <img
          :class="$style.photo"
          :src="profileUrl"
          :alt="t('heading.photoAlt')"
          width="1296"
          height="1296"
        />
      </GridItem>
    </GridLayout>
  </section>
</template>

<style module>
.hero {
  padding-block: var(--space-8) var(--space-12);
}
.text {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.greeting {
  color: var(--accent-ink);
}
.role {
  color: var(--ink-muted);
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-4);
}
.photo {
  display: block;
  width: 100%;
  max-width: 360px;
  height: auto;
  margin-inline: auto;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}
</style>
