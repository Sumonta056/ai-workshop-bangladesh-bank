<script setup lang="ts">
import type { IconName } from '~/data/icons'
import type { ModuleCard } from '~/i18n/types'

const props = defineProps<{
  module: ModuleCard
  icon: IconName
  to: string | null
}>()

function onClick() {
  if (props.to) navigateTo(props.to)
}
</script>

<template>
  <div class="card" @click="onClick">
    <div class="top">
      <span class="icon"><BaseIcon :name="icon" :size="20" /></span>
      <span class="arrow"><BaseIcon name="arrow" :size="16" /></span>
    </div>
    <h3 class="title">{{ module.title }}</h3>
    <ul class="links">
      <li v-for="(link, i) in module.links" :key="i" class="link">
        <span class="bullet" />{{ link }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.card {
  background: #fff;
  border: 1px solid var(--bb-border);
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 13px;
  cursor: pointer;
  transition: box-shadow 0.18s ease, border-color 0.18s ease;
}
.card:hover {
  border-color: var(--bb-green);
  box-shadow: 0 6px 18px rgba(0, 106, 78, 0.08);
}
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 11px;
  background: var(--bb-green-soft);
  color: var(--bb-green);
}
.arrow {
  color: var(--bb-green);
  display: inline-flex;
  opacity: 0.8;
}
.title {
  font: 600 15px/1.25 'Inter';
  color: var(--bb-green);
  margin: 0;
}
.links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.link {
  font: 400 12.5px/1.4 'Inter';
  color: var(--bb-ink-2);
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.bullet {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--bb-green);
  flex: none;
  margin-top: 7px;
}
</style>
