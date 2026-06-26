<script setup lang="ts">
import type { LinkGroup } from '~/i18n/types'

defineProps<{ group: LinkGroup }>()
</script>

<template>
  <div>
    <h3 class="title">{{ group.title }}</h3>
    <div class="list">
      <a v-for="(it, i) in group.items" :key="i" class="item">
        <span class="text">{{ it }}</span>
        <span class="chev"><BaseIcon name="chev" :size="15" /></span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.title {
  font: 600 16px/1.3 'Inter';
  color: var(--bb-green);
  margin: 0 0 14px;
}
.list {
  border: 1px solid var(--bb-border);
  border-radius: 12px;
  overflow: hidden;
}
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid var(--bb-border-soft);
  cursor: pointer;
  transition: background 0.14s;
}
.item:hover {
  background: var(--bb-green-hover);
}
.text {
  font: 500 14px/1.4 'Inter';
  color: var(--bb-ink-1);
}
.chev {
  color: var(--bb-green);
  display: inline-flex;
  opacity: 0.75;
}
</style>
