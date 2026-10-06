<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Button, Logo, MainContainer } from '@/shared/ui'
import { site } from '@/config/site'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer id="contact" :class="$style.footer">
    <MainContainer as="div" :padding-y="{ base: 8, lg: 12 }">
      <div :class="$style.inner">
        <Logo :size="48" />
        <h2 :class="['os-text-h2', $style.title]">{{ t('footer.title') }}</h2>
        <p :class="['os-text-body-lg', $style.muted]">{{ t('footer.text') }}</p>
        <Button v-if="site.contactEmail" variant="primary" :href="`mailto:${site.contactEmail}`">
          {{ t('footer.contact') }}
        </Button>
        <p :class="['os-text-caption', $style.copyright]">{{ t('footer.copyright', { year }) }}</p>
      </div>
    </MainContainer>
  </footer>
</template>

<style module>
.footer {
  background: var(--surface-sunken);
  border-top: 1px solid var(--line);
  scroll-margin-top: 56px;
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
