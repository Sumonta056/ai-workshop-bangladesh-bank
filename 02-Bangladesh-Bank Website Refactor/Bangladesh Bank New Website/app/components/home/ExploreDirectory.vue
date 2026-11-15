<script setup lang="ts">
import type { IconName } from '~/data/icons'
import { VIEW_ROUTES } from '~/data/routes'

const { L } = useLocale()

// Per-module icon + click target, matching the source `modIcons` / `modClicks`
// arrays (zipped positionally with L.modules).
const moduleMeta: { icon: IconName; to: string | null }[] = [
  { icon: 'landmark', to: VIEW_ROUTES.mp },
  { icon: 'shield', to: VIEW_ROUTES.fin },
  { icon: 'globe', to: null },
  { icon: 'coins', to: null },
  { icon: 'card', to: null },
  { icon: 'trend', to: null },
  { icon: 'book', to: VIEW_ROUTES.pub },
  { icon: 'note', to: null },
]
</script>

<template>
  <section>
    <div class="inner">
      <div class="eyebrow-row">
        <span class="bar" />
        <span class="eyebrow">{{ L.exploreEyebrow }}</span>
      </div>
      <h2 class="title">{{ L.exploreTitle }}</h2>
      <div class="grid">
        <HomeModuleCard
          v-for="(m, i) in L.modules"
          :key="i"
          :module="m"
          :icon="moduleMeta[i]!.icon"
          :to="moduleMeta[i]!.to"
        />
      </div>

      <div class="more">
        <span class="more-label">{{ L.moreLabel }}</span>
        <a v-for="(ml, i) in L.moreLinks" :key="i" class="chip">{{ ml }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.inner {
  max-width: var(--bb-max);
  margin: 0 auto;
  padding: 24px var(--bb-gutter) 16px;
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
  margin: 0 0 16px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}
.more {
  margin-top: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.more-label {
  font: 600 11px/1 'Inter';
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--bb-ink-muted);
}
.chip {
  font: 500 12.5px/1 'Inter';
  color: var(--bb-green);
  border: 1px solid var(--bb-green-border);
  background: var(--bb-green-hover);
  border-radius: 999px;
  padding: 7px 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: background 0.15s, border-color 0.15s;
}
.chip:hover {
  background: var(--bb-green-soft);
  border-color: var(--bb-green);
}
</style>
