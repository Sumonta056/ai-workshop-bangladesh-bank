<script setup lang="ts">
const { L } = useLocale()
</script>

<template>
  <div class="card">
    <div class="title">{{ L.auctionTitle }}</div>
    <div class="note">{{ L.auctionNote }}</div>
    <div class="row">
      <div v-for="a in L.auctions" :key="a.type" class="slot">
        <div class="type">{{ a.type }}</div>
        <div class="day">{{ a.day }}</div>
        <div class="month">{{ a.month }}</div>
      </div>
    </div>
    <a class="link">{{ L.auctionCal }}<span class="arrow"><BaseIcon name="arrow" :size="16" /></span></a>
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
.title {
  font: 600 11px/1.3 'Inter';
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--bb-ink-2);
}
.note {
  font: 400 11.5px/1.3 'JetBrains Mono';
  color: var(--bb-ink-muted);
  margin: 5px 0 12px;
}
.row {
  display: flex;
  gap: 8px;
}
.slot {
  flex: 1;
  background: var(--bb-green-soft);
  border: 1px solid var(--bb-green-border);
  border-radius: 8px;
  padding: 9px 6px;
  text-align: center;
}
.type {
  font: 700 9px/1 'Inter';
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--bb-green);
}
.day {
  font: 800 22px/1.1 'JetBrains Mono';
  color: var(--bb-green-dark);
  margin: 4px 0 1px;
}
.month {
  font: 400 10px/1 'JetBrains Mono';
  color: var(--bb-ink-2);
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
