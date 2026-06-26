<script setup lang="ts">
import type { NavItem } from '~/composables/useNav'

const { items } = useNav()

// `noop` links (to === null) do nothing, matching the original.
function onNav(item: NavItem) {
  if (item.to) navigateTo(item.to)
}
</script>

<template>
  <nav class="nav">
    <div class="nav-inner">
      <button
        v-for="item in items"
        :key="item.key"
        class="nav-btn"
        :class="{ active: item.active }"
        @click="onNav(item)"
      >
        {{ item.label }}
      </button>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  background: #fff;
  border-bottom: 1px solid var(--bb-border);
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 1px 2px rgba(10, 10, 10, 0.03);
}
.nav-inner {
  max-width: var(--bb-max);
  margin: 0 auto;
  padding: 0 var(--bb-gutter);
  display: flex;
  align-items: stretch;
  gap: 2px;
}
.nav-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  padding: 15px 14px;
  color: var(--bb-ink-nav);
  border-bottom: 3px solid transparent;
  margin-bottom: -1px;
  transition: color 0.15s ease;
}
.nav-btn:hover {
  color: var(--bb-green);
}
.nav-btn.active {
  color: var(--bb-green);
  border-bottom-color: var(--bb-green);
}
</style>
