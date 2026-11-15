<script setup lang="ts">
import type { InnerPageContent } from '~/i18n/types'

defineProps<{ page: InnerPageContent }>()
const { L } = useLocale()
</script>

<template>
  <section class="header">
    <div class="inner">
      <div class="crumb">
        <span class="crumb-home" @click="navigateTo('/')">{{ L.crumbHome }}</span>
        <span class="crumb-chev"><BaseIcon name="chev" :size="15" /></span>
        <span>{{ page.title }}</span>
      </div>
      <div class="eyebrow-row">
        <span class="bar" />
        <span class="eyebrow">{{ page.eyebrow }}</span>
      </div>
      <h1 class="title">{{ page.title }}</h1>
      <p class="lead">{{ page.lead }}</p>
    </div>
  </section>
</template>

<style scoped>
.header {
  background: var(--bb-green-soft);
  border-bottom: 1px solid var(--bb-green-border);
}
.inner {
  max-width: var(--bb-max);
  margin: 0 auto;
  padding: 24px var(--bb-gutter) 40px;
}
.crumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font: 500 12.5px/1 'Inter';
  color: var(--bb-ink-2);
  margin-bottom: 22px;
}
.crumb-home {
  cursor: pointer;
  color: var(--bb-green);
}
.crumb-chev {
  color: var(--bb-green-200);
  display: inline-flex;
}
.eyebrow-row {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 12px;
}
.bar {
  width: 26px;
  height: 3px;
  background: var(--bb-green);
  border-radius: 2px;
}
.eyebrow {
  font: 600 11px/1.2 'Inter';
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--bb-ink-2);
}
.title {
  font: 700 26px/1.15 'Inter';
  letter-spacing: -0.015em;
  color: var(--bb-green);
  margin: 0 0 14px;
}
.lead {
  font: 400 15px/1.6 'Inter';
  color: var(--bb-ink-2);
  margin: 0;
  max-width: 80ch;
}
</style>
