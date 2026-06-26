<script setup lang="ts">
import type { Highlight } from '~/i18n/types'

defineProps<{ highlight: Highlight }>()
</script>

<template>
  <div class="highlight">
    <span class="file-icon"><BaseIcon name="file" :size="24" /></span>
    <div>
      <span class="tag">{{ highlight.tag }}</span>
      <h3 class="title">{{ highlight.title }}</h3>
      <p class="desc">{{ highlight.desc }}</p>
      <div class="actions">
        <button class="primary">{{ highlight.primary }}<span class="arrow"><BaseIcon name="arrow" :size="16" /></span></button>
        <button class="secondary">{{ highlight.secondary }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.highlight {
  border: 1px solid var(--bb-border);
  border-radius: 14px;
  padding: 24px;
  display: flex;
  gap: 20px;
  align-items: flex-start;
  background: var(--bb-green-hover);
}
.file-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--bb-green-soft);
  color: var(--bb-green);
  flex: none;
}
.tag {
  display: inline-block;
  font: 600 10px/1 'Inter';
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #fff;
  background: var(--bb-red);
  padding: 4px 9px;
  border-radius: 999px;
  margin-bottom: 11px;
}
.title {
  font: 600 18px/1.3 'Inter';
  color: var(--bb-green);
  margin: 0 0 8px;
}
.desc {
  font: 400 14px/1.6 'Inter';
  color: var(--bb-ink-2);
  margin: 0 0 18px;
  max-width: 60ch;
}
.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--bb-green);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font: 600 13px 'Inter';
  cursor: pointer;
  transition: background 0.16s;
}
.primary:hover {
  background: var(--bb-green-darker);
}
.secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: var(--bb-green);
  border: 1.5px solid var(--bb-green);
  border-radius: 8px;
  padding: 10px 18px;
  font: 600 13px 'Inter';
  cursor: pointer;
  transition: background 0.16s, color 0.16s;
}
.secondary:hover {
  background: var(--bb-green-soft);
}
.arrow {
  display: inline-flex;
}
</style>
