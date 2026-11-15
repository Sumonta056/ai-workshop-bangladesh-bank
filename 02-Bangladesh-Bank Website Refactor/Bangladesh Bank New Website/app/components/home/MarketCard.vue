<script setup lang="ts">
import type { MarketCard } from '~/i18n/types'

defineProps<{ card: MarketCard }>()
</script>

<template>
  <div class="card">
    <div class="label">{{ card.label }}</div>
    <div class="date">{{ card.date }}</div>

    <div v-if="card.single" class="single">{{ card.value }}</div>

    <div v-if="card.dual" class="dual">
      <div>
        <div class="dual-label">{{ card.aLabel }}</div>
        <div class="dual-val">{{ card.aVal }}</div>
      </div>
      <div>
        <div class="dual-label">{{ card.bLabel }}</div>
        <div class="dual-val">{{ card.bVal }}</div>
      </div>
    </div>

    <a class="link">{{ card.link }}<span class="arrow"><BaseIcon name="arrow" :size="16" /></span></a>
  </div>
</template>

<style scoped>
.card {
  background: #fff;
  border: 1px solid var(--bb-border);
  border-top: 3px solid var(--bb-green);
  border-radius: 12px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
}
.label {
  font: 600 11px/1.3 'Inter';
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--bb-ink-2);
}
.date {
  font: 400 11.5px/1.3 'JetBrains Mono';
  color: var(--bb-ink-muted);
  margin: 5px 0 12px;
}
.single {
  font: 700 28px/1 'JetBrains Mono';
  color: var(--bb-green);
  font-variant-numeric: tabular-nums slashed-zero;
}
.dual {
  display: flex;
  gap: 20px;
  border-top: 1px solid var(--bb-border-soft);
  padding-top: 12px;
}
.dual-label {
  font: 500 10px/1 'Inter';
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--bb-ink-muted);
  margin-bottom: 5px;
}
.dual-val {
  font: 700 20px/1 'JetBrains Mono';
  color: var(--bb-green);
  font-variant-numeric: tabular-nums;
}
.link {
  font: 600 12.5px/1 'Inter';
  color: var(--bb-green);
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: auto;
  padding-top: 14px;
  cursor: pointer;
}
.link:hover {
  color: var(--bb-red);
}
.arrow {
  display: inline-flex;
}
</style>
