<script setup lang="ts">
const { L } = useLocale()
</script>

<template>
  <div class="panel">
    <div class="head">
      <span class="head-icon"><BaseIcon name="trend" :size="15" /></span>{{ L.policyRatesTitle }}
    </div>
    <div class="body">
      <div v-for="(p, i) in L.policyRates" :key="i" class="rate">
        <span class="rlabel">{{ p.label }}</span>
        <span class="rval">{{ p.val }}</span>
      </div>
      <div class="updated">{{ L.lastUpd }} 15 Feb 2026</div>
    </div>
  </div>
</template>

<style scoped>
.panel {
  background: #fff;
  border: 1px solid var(--bb-border);
  border-radius: 12px;
  overflow: hidden;
}
.head {
  background: var(--bb-green-dark);
  color: #fff;
  padding: 11px 16px;
  font: 600 12px/1 'Inter';
  letter-spacing: 0.05em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
}
.head-icon {
  display: inline-flex;
  opacity: 0.9;
}
.body {
  padding: 6px 16px 14px;
}
.rate {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 0;
  border-bottom: 1px solid var(--bb-border-soft);
}
.rlabel {
  font: 400 13px/1.3 'Inter';
  color: var(--bb-ink-2);
}
.rval {
  font: 700 14px/1 'JetBrains Mono';
  color: var(--bb-green);
  font-variant-numeric: tabular-nums;
}
.updated {
  font: 400 10.5px/1 'JetBrains Mono';
  color: var(--bb-ink-muted);
  text-align: right;
  margin-top: 10px;
}
</style>
