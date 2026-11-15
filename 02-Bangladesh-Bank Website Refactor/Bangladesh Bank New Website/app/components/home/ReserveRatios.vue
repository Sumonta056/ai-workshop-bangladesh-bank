<script setup lang="ts">
const { L } = useLocale()
</script>

<template>
  <div class="panel">
    <div class="head">
      <span class="head-icon"><BaseIcon name="bank" :size="15" /></span>{{ L.reserveTitle }}
    </div>
    <div class="body">
      <div class="thead">
        <span class="cat">{{ L.category }}</span>
        <span class="col">SLR</span>
        <span class="col">CRR</span>
      </div>
      <div v-for="(rv, i) in L.reserves" :key="i" class="row">
        <span class="seg">{{ rv.seg }}</span>
        <span class="num">{{ rv.slr }}</span>
        <span class="num">{{ rv.crr }}</span>
      </div>
      <div class="updated">{{ L.lastUpd }} 09 May 2024</div>
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
  padding: 10px 16px 14px;
}
.thead {
  display: grid;
  grid-template-columns: 1fr 52px 52px;
  padding: 6px 0;
  border-bottom: 1px solid var(--bb-border);
}
.cat {
  font: 600 10px/1 'Inter';
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--bb-ink-2);
}
.col {
  font: 600 10px/1 'Inter';
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--bb-ink-2);
  text-align: right;
}
.row {
  display: grid;
  grid-template-columns: 1fr 52px 52px;
  padding: 8px 0;
  border-bottom: 1px solid var(--bb-border-soft);
  align-items: center;
}
.seg {
  font: 400 12.5px/1.3 'Inter';
  color: var(--bb-ink-1);
}
.num {
  font: 600 12.5px/1 'JetBrains Mono';
  color: var(--bb-green);
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.updated {
  font: 400 10.5px/1 'JetBrains Mono';
  color: var(--bb-ink-muted);
  text-align: right;
  margin-top: 10px;
}
</style>
