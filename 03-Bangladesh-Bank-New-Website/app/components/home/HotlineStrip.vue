<script setup lang="ts">
const { L } = useLocale()
</script>

<template>
  <section>
    <div class="inner">
      <div class="eyebrow-row">
        <span class="bar" />
        <span class="eyebrow">{{ L.hotlineEyebrow }}</span>
      </div>
      <div class="strip">
        <div v-for="h in L.hotlines" :key="h.num" class="card">
          <span class="num">{{ h.num }}</span>
          <span class="label">{{ h.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.inner {
  max-width: var(--bb-max);
  margin: 0 auto;
  padding: 16px var(--bb-gutter) 28px;
}
.eyebrow-row {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 10px;
}
.bar {
  width: 22px;
  height: 3px;
  background: var(--bb-red);
  border-radius: 2px;
}
.eyebrow {
  font: 600 11px/1.2 'Inter';
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--bb-ink-2);
}
.strip {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}
.card {
  background: #fff;
  border: 1px solid var(--bb-border);
  border-radius: 10px;
  padding: 13px 18px;
  display: flex;
  align-items: center;
  gap: 13px;
  flex: 1;
  min-width: 170px;
}
.num {
  font: 700 22px/1 'JetBrains Mono';
  color: var(--bb-red);
}
.label {
  font: 500 12.5px/1.3 'Inter';
  color: var(--bb-ink-2);
}
</style>
