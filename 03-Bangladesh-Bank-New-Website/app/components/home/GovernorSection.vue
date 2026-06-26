<script setup lang="ts">
const { L } = useLocale()
</script>

<template>
  <section>
    <div class="inner">
      <div class="card">
        <BaseImageSlot
          :placeholder="L.govPhoto"
          :radius="14"
          aspect-ratio="4/5"
          class="photo"
        />
        <div>
          <div class="eyebrow-row">
            <span class="bar" />
            <span class="eyebrow">{{ L.govEyebrow }}</span>
          </div>
          <p class="msg">{{ L.govMsg }}</p>
          <div class="meta">
            <div>
              <div class="name">{{ L.govName }}</div>
              <div class="role">{{ L.govRole }}</div>
            </div>
            <button class="btn">{{ L.govBtn }}<span class="arrow"><BaseIcon name="arrow" :size="16" /></span></button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.inner {
  max-width: var(--bb-max);
  margin: 0 auto;
  padding: 16px var(--bb-gutter) 0;
}
.card {
  background: #fff;
  border: 1px solid var(--bb-border);
  border-radius: 14px;
  padding: 28px;
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 32px;
  align-items: center;
}
.photo {
  border-radius: 14px;
}
.eyebrow-row {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 12px;
}
.bar {
  width: 26px;
  height: 3px;
  background: var(--bb-green);
  border-radius: 2px;
}
.eyebrow {
  font: 600 11px/1.2 'Inter';
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--bb-ink-2);
}
.msg {
  font: 400 17px/1.55 'Inter';
  letter-spacing: -0.005em;
  color: var(--bb-ink-1);
  margin: 0 0 18px;
  max-width: 72ch;
}
.meta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.name {
  font: 600 15px/1.3 'Inter';
  color: var(--bb-green);
}
.role {
  font: 400 13px/1.4 'Inter';
  color: var(--bb-ink-2);
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: var(--bb-green);
  border: 1.5px solid var(--bb-green);
  border-radius: 8px;
  padding: 9px 16px;
  font: 600 13px 'Inter';
  cursor: pointer;
  transition: background 0.16s, color 0.16s;
}
.btn:hover {
  background: var(--bb-green);
  color: #fff;
}
.arrow {
  display: inline-flex;
}
</style>
