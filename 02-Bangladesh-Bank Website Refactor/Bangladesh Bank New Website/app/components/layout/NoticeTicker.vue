<script setup lang="ts">
const { L } = useLocale()
</script>

<template>
  <div class="ticker">
    <div class="ticker-inner">
      <span class="tag">{{ L.noticeTag }}</span>
      <span class="text">{{ L.notice }}</span>
      <a class="view-all">{{ L.viewAll }}<span class="chev"><BaseIcon name="chev" :size="15" /></span></a>
    </div>
  </div>
</template>

<style scoped>
.ticker {
  background: var(--bb-notice-bg);
  border-bottom: 1px solid var(--bb-notice-border);
}
.ticker-inner {
  max-width: var(--bb-max);
  margin: 0 auto;
  padding: 9px var(--bb-gutter);
  display: flex;
  align-items: center;
  gap: 16px;
}
.tag {
  background: var(--bb-red);
  color: #fff;
  font: 600 10px/1 'Inter';
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 999px;
  flex: none;
}
.text {
  font: 500 13px/1.4 'Inter';
  color: var(--bb-notice-ink);
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.view-all {
  font: 600 12.5px/1 'Inter';
  color: var(--bb-green);
  display: inline-flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
  flex: none;
  cursor: pointer;
}
.view-all:hover {
  color: var(--bb-red);
}
.chev {
  display: inline-flex;
}
</style>
