<script setup lang="ts">
const { L } = useLocale()
</script>

<template>
  <div class="panel">
    <div class="head">
      <div class="title">{{ L.newsTitle }}</div>
      <a class="view-all">{{ L.viewAll }}<span class="chev"><BaseIcon name="chev" :size="15" /></span></a>
    </div>
    <div>
      <a v-for="(n, i) in L.news" :key="i" class="item">
        <span class="bullet" />
        <span class="text">{{ n.text }}<span v-if="n.isNew" class="badge">{{ L.newBadge }}</span></span>
      </a>
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
  background: var(--bb-green);
  color: #fff;
  padding: 13px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title {
  font: 600 13px/1 'Inter';
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.view-all {
  font: 500 12px/1 'Inter';
  color: rgba(255, 255, 255, 0.85);
  display: inline-flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}
.view-all:hover {
  color: #fff;
}
.chev {
  display: inline-flex;
}
.item {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  padding: 12px 20px;
  border-bottom: 1px solid var(--bb-border-soft);
  cursor: pointer;
  transition: background 0.12s;
}
.item:hover {
  background: var(--bb-green-hover);
}
.bullet {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--bb-green);
  flex: none;
  margin-top: 7px;
}
.text {
  font: 400 13.5px/1.45 'Inter';
  color: var(--bb-ink-1);
}
.badge {
  background: var(--bb-red);
  color: #fff;
  font: 700 9px/1 'Inter';
  letter-spacing: 0.04em;
  padding: 2px 5px;
  border-radius: 3px;
  margin-left: 7px;
  vertical-align: middle;
}
</style>
