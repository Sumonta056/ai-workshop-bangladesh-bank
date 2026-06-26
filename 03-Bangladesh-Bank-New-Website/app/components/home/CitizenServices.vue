<script setup lang="ts">
import type { IconName } from '~/data/icons'

const { L } = useLocale()

// Per-service icon, matching the source `svcIcons` array.
const serviceIcons: IconName[] = ['globe', 'file', 'note', 'shield', 'book']
</script>

<template>
  <section>
    <div class="inner">
      <div class="eyebrow-row">
        <span class="bar" />
        <span class="eyebrow">{{ L.svcEyebrow }}</span>
      </div>
      <h2 class="title">{{ L.svcTitle }}</h2>
      <div class="grid">
        <HomeServiceCard
          v-for="(svc, i) in L.services"
          :key="i"
          :service="svc"
          :icon="serviceIcons[i]!"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.inner {
  max-width: var(--bb-max);
  margin: 0 auto;
  padding: 16px var(--bb-gutter);
}
.eyebrow-row {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 4px;
}
.bar {
  width: 22px;
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
  font: 700 18px/1.2 'Inter';
  letter-spacing: -0.01em;
  color: var(--bb-green);
  margin: 0 0 14px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}
</style>
