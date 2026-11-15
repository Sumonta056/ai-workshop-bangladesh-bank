<script setup lang="ts">
import type { InnerPageContent } from '~/i18n/types'

defineProps<{ page: InnerPageContent }>()
const { L } = useLocale()

// Key rates, matching the source `sideRates` (note the indLabels order: 0,2,1,3).
const sideRates = computed(() => [
  { label: L.value.indLabels[0], val: '10.00%' },
  { label: L.value.indLabels[2], val: '9.84%' },
  { label: L.value.indLabels[1], val: '123.10' },
  { label: L.value.indLabels[3], val: '4.00%' },
])
</script>

<template>
  <aside class="sidebar">
    <div class="rates">
      <div class="rates-title">{{ L.sideRatesTitle }}</div>
      <div v-for="(s, i) in sideRates" :key="i" class="rate">
        <span class="rlabel">{{ s.label }}</span>
        <span class="rval">{{ s.val }}</span>
      </div>
    </div>
    <div class="related">
      <div class="related-title">{{ L.relatedTitle }}</div>
      <div class="related-list">
        <a v-for="(rl, i) in page.related" :key="i" class="related-link">
          {{ rl }}<span class="chev"><BaseIcon name="chev" :size="15" /></span>
        </a>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 18px;
  position: sticky;
  top: 80px;
}
.rates {
  background: var(--bb-green);
  border-radius: 14px;
  padding: 22px;
  color: #fff;
}
.rates-title {
  font: 600 11px/1 'Inter';
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--bb-green-300);
  margin-bottom: 14px;
}
.rate {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.13);
}
.rlabel {
  font: 400 13px/1.3 'Inter';
  color: rgba(255, 255, 255, 0.78);
}
.rval {
  font: 700 14px/1 'JetBrains Mono';
  color: #fff;
  font-variant-numeric: tabular-nums;
}
.related {
  border: 1px solid var(--bb-border);
  border-radius: 14px;
  padding: 22px;
}
.related-title {
  font: 600 11px/1 'Inter';
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--bb-ink-2);
  margin-bottom: 12px;
}
.related-list {
  display: flex;
  flex-direction: column;
}
.related-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 0;
  border-bottom: 1px solid var(--bb-border-soft);
  font: 500 13.5px/1.4 'Inter';
  color: var(--bb-green);
  cursor: pointer;
}
.related-link:hover {
  color: var(--bb-red);
}
.chev {
  display: inline-flex;
  opacity: 0.7;
}
</style>
