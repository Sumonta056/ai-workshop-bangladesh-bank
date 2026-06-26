<script setup lang="ts">
import type { DataTable } from '~/i18n/types'

defineProps<{ table: DataTable }>()
</script>

<template>
  <div>
    <div class="head">
      <h3 class="title">{{ table.title }}</h3>
      <span class="note">{{ table.note }}</span>
    </div>
    <div class="table">
      <div class="thead">
        <span class="seg">{{ table.head.seg }}</span>
        <span v-for="(hv, i) in table.head.vals" :key="i" class="hval">{{ hv }}</span>
      </div>
      <div v-for="(row, i) in table.rows" :key="i" class="row">
        <span class="rseg">{{ row.seg }}</span>
        <span v-for="(cv, j) in row.vals" :key="j" class="cval">{{ cv }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}
.title {
  font: 600 16px/1.3 'Inter';
  color: var(--bb-green);
  margin: 0;
}
.note {
  font: 400 12px/1 'JetBrains Mono';
  color: var(--bb-ink-muted);
}
.table {
  border: 1px solid var(--bb-border);
  border-radius: 12px;
  overflow: hidden;
}
.thead {
  display: flex;
  padding: 11px 18px;
  background: var(--bb-page);
  border-bottom: 1px solid var(--bb-border);
}
.seg {
  flex: 1;
  font: 600 11px/1 'Inter';
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--bb-ink-2);
}
.hval {
  width: 88px;
  font: 600 11px/1 'Inter';
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--bb-ink-2);
  text-align: right;
}
.row {
  display: flex;
  padding: 12px 18px;
  border-bottom: 1px solid var(--bb-border-soft);
  align-items: center;
}
.rseg {
  flex: 1;
  font: 400 13.5px/1.3 'Inter';
  color: var(--bb-ink-1);
}
.cval {
  width: 88px;
  font: 600 13.5px/1 'JetBrains Mono';
  color: var(--bb-green);
  text-align: right;
  font-variant-numeric: tabular-nums;
}
</style>
