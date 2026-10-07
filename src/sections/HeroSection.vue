<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Button, MainContainer } from '@/shared/ui'
import en from '@/i18n/locales/en'
import profileUrl from '@/assets/images/profile.jpg'
import GridBackdrop from './GridBackdrop.vue'

const { t } = useI18n()
</script>

<template>
  <section :class="$style.hero" aria-labelledby="hero-title">
    <div :class="$style.backdrop"><GridBackdrop /></div>
    <MainContainer as="div" :padding-y="{ base: 12, lg: 16 }">
      <div :class="$style.inner">
        <div :class="$style.text">
          <h1 id="hero-title" :class="['os-text-display', $style.name]">
            {{ t('heading.name') }}
          </h1>
          <p :class="['os-text-h3', $style.role]">{{ t('heading.role') }}</p>
          <p :class="['os-text-body-lg', $style.pitch]">{{ t('heading.pitch') }}</p>
          <div :class="$style.actions">
            <Button variant="primary" size="lg" href="#contact">
              {{ t('heading.discussProject') }}
            </Button>
            <Button size="lg" href="#projects">{{ t('heading.seeProjects') }}</Button>
          </div>
        </div>
        <div :class="$style.visual">
          <img
            :class="$style.photo"
            :src="profileUrl"
            :alt="t('heading.photoAlt')"
            width="1296"
            height="1296"
          />
          <dl :class="$style.card">
            <div>
              <dt>{{ t('heading.card.locationLabel') }}</dt>
              <dd>{{ t('heading.card.location') }}</dd>
            </div>
            <div>
              <dt>{{ t('heading.card.languagesLabel') }}</dt>
              <dd>{{ t('heading.card.languages') }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </MainContainer>
  </section>

  <section :class="$style.facts" :aria-label="t('heading.factsLabel')">
    <MainContainer as="div" :padding-y="{ base: 6, lg: 8 }">
      <ul :class="$style.factList">
        <li v-for="(_, i) in en.heading.facts" :key="i" :class="$style.fact">
          <strong :class="$style.factValue">{{ t(`heading.facts.${i}.value`) }}</strong>
          <span :class="['os-text-body-sm', $style.muted]">{{
            t(`heading.facts.${i}.label`)
          }}</span>
        </li>
      </ul>
    </MainContainer>
  </section>
</template>

<style module>
.hero {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  background: var(--surface);
}
.backdrop {
  position: absolute;
  inset: 0;
  z-index: -1;
}
/* Fades the dots out behind the text, so the text always reads on a calm surface. */
.backdrop::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, var(--surface), transparent 30%),
    linear-gradient(
      180deg,
      var(--surface) 35%,
      color-mix(in srgb, var(--surface) 70%, transparent) 65%,
      color-mix(in srgb, var(--surface) 20%, transparent)
    );
}
.inner {
  display: grid;
  gap: var(--space-12);
  align-items: center;
}
.text {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.name {
  margin: 0;
  font-size: clamp(36px, 6vw, 56px);
  line-height: 1.05;
}
.role {
  max-width: 28ch;
  color: var(--accent-ink);
}
.pitch {
  max-width: 46ch;
  color: var(--ink-muted);
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-4);
}
/* Smaller on phones, so the portrait does not take a whole screen before the work. */
.visual {
  position: relative;
  width: min(100%, 280px);
  justify-self: center;
}
.photo {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 400 / 440;
  object-fit: cover;
  object-position: 50% 30%;
  border: 1px solid var(--line);
  border-radius: 16px;
  box-shadow: var(--shadow-lg);
}
.card {
  position: absolute;
  bottom: var(--space-8);
  left: calc(-1 * var(--space-4));
  display: flex;
  gap: var(--space-6);
  margin: 0;
  padding: var(--space-3) var(--space-4);
  background: var(--surface-raised);
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
}
.card div {
  display: flex;
  flex-direction: column;
}
.card dt {
  font-size: 11px;
  color: var(--ink-muted);
}
.card dd {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}

.facts {
  background: var(--surface-raised);
  border-block: 1px solid var(--line);
}
.factList {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--space-6);
  margin: 0;
  padding: 0;
  list-style: none;
}
.fact {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.factValue {
  font-size: 34px;
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.muted {
  color: var(--ink-muted);
}

@media (min-width: 1024px) {
  .inner {
    grid-template-columns: 1fr 1.1fr;
    gap: var(--space-16);
  }
  .backdrop::after {
    background: linear-gradient(0deg, var(--surface), transparent 25%),
      linear-gradient(
        90deg,
        var(--surface) 30%,
        color-mix(in srgb, var(--surface) 55%, transparent) 55%,
        transparent 80%
      );
  }
  .visual {
    width: min(100%, 400px);
    justify-self: end;
  }
  .card {
    left: calc(-1 * var(--space-16));
  }
}
</style>
