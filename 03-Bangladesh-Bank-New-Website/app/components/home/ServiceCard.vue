<script setup lang="ts">
import type { IconName } from '~/data/icons'
import type { ServiceCard } from '~/i18n/types'
import { VIEW_ROUTES } from '~/data/routes'

defineProps<{ service: ServiceCard; icon: IconName }>()
</script>

<template>
  <div class="card" @click="navigateTo(VIEW_ROUTES.svc)">
    <span class="icon"><BaseIcon :name="icon" :size="20" /></span>
    <div class="title">{{ service.title }}</div>
    <div class="desc">{{ service.desc }}</div>
  </div>
</template>

<style scoped>
.card {
  background: #fff;
  border: 1px solid var(--bb-border);
  border-radius: 12px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 11px;
  cursor: pointer;
  transition: border-color 0.18s, box-shadow 0.18s;
}
.card:hover {
  border-color: var(--bb-green);
  box-shadow: 0 6px 16px rgba(0, 106, 78, 0.08);
}
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: var(--bb-green-pale);
  color: var(--bb-green);
}
.title {
  font: 600 14px/1.3 'Inter';
  color: var(--bb-green);
}
.desc {
  font: 400 12px/1.5 'Inter';
  color: var(--bb-ink-2);
}
</style>
