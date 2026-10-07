<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Check, Copy } from '@lucide/vue'
import { Button, Icon, Logo, MainContainer } from '@/shared/ui'
import en from '@/i18n/locales/en'
import { site } from '@/config/site'

const { t } = useI18n()
const year = new Date().getFullYear()

// mailto: does nothing for people without a mail app, so the address is also shown and copyable.
const copied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(site.contactEmail)
  } catch {
    // No clipboard access (insecure context or denied): the address is visible to copy by hand.
    return
  }
  copied.value = true
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => (copied.value = false), 2000)
}
onBeforeUnmount(() => clearTimeout(resetTimer))
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
        <div v-if="site.contactEmail" :class="$style.address">
          <a :class="$style.email" :href="`mailto:${site.contactEmail}`">{{ site.contactEmail }}</a>
          <Button size="sm" @click="copyEmail">
            <template #iconStart>
              <Icon :icon="copied ? Check : Copy" :size="16" />
            </template>
            {{ copied ? t('footer.copied') : t('footer.copy') }}
          </Button>
          <span :class="$style.visuallyHidden" aria-live="polite">{{
            copied ? t('footer.copied') : ''
          }}</span>
        </div>
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
}
/* In the light theme the primary action keeps the light accent, so it matches the hero.
   In the dark theme the footer's own dark tokens already match it. */
:global([data-theme='light']) .footer {
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
.address {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  margin-top: var(--space-2);
}
.email {
  font: 600 20px/1.3 var(--font-sans);
  color: var(--ink);
  text-decoration: underline;
  text-decoration-color: var(--line-strong);
  text-underline-offset: 4px;
  overflow-wrap: anywhere;
}
.email:hover {
  text-decoration-color: var(--accent);
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
.visuallyHidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
</style>
