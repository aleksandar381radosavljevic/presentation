<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Button, Logo, MainContainer } from '@/shared/ui'
import en from '@/i18n/locales/en'
import { site } from '@/config/site'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer id="contact" :class="$style.footer" data-theme="dark">
    <MainContainer as="div" :padding-y="{ base: 8, lg: 12 }">
      <div :class="$style.inner">
        <Logo :size="48" />
        <h2 :class="['os-text-h2', $style.title]">{{ t('footer.title') }}</h2>
        <p :class="['os-text-body-lg', $style.muted]">{{ t('footer.text') }}</p>
        <ul :class="$style.checklist">
          <li v-for="(_, i) in en.footer.checklist" :key="i">{{ t(`footer.checklist.${i}`) }}</li>
        </ul>
        <div :class="$style.actions">
          <Button
            v-if="site.contactEmail"
            variant="primary"
            size="lg"
            :href="`mailto:${site.contactEmail}`"
          >
            {{ t('footer.contact') }}
          </Button>
          <Button v-if="site.linkedinUrl" size="lg" :href="site.linkedinUrl">
            {{ t('footer.linkedin') }}
          </Button>
        </div>
        <p :class="['os-text-caption', $style.copyright]">{{ t('footer.copyright', { year }) }}</p>
      </div>
    </MainContainer>
  </footer>
</template>

<style module>
/* Always dark: closes the page the way the hero opens it, in either theme. */
.footer {
  color: var(--ink);
  background: var(--surface);
  border-top: 1px solid var(--line);
  scroll-margin-top: 56px;
  /* The primary action keeps the light theme's accent, so it looks the same as in the hero. */
  --accent: var(--orange-600);
  --accent-hover: var(--orange-700);
  --accent-pressed: var(--orange-800);
  --on-accent: #ffffff;
}
.checklist {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  margin: 0;
  padding: 0 0 0 var(--space-5);
  text-align: left;
  color: var(--ink-muted);
}
.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  margin-top: var(--space-2);
}
.inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  text-align: center;
}
.title {
  max-width: 32ch;
}
.muted,
.copyright {
  color: var(--ink-muted);
}
</style>
