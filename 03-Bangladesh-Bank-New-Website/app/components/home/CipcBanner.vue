<script setup lang="ts">
const { L } = useLocale()
</script>

<template>
  <section>
    <div class="inner">
      <div class="banner">
        <div class="left">
          <span class="phone"><BaseIcon name="phone" :size="22" /></span>
          <div>
            <div class="title">{{ L.cipcTitle }}</div>
            <div class="sub">{{ L.cipcSub }}</div>
          </div>
        </div>
        <div class="right">
          <div class="call">
            <span class="call-label">{{ L.cipcLine }}</span>
            <span class="call-num">16236</span>
          </div>
          <button class="btn">{{ L.cipcBtn }}</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.inner {
  max-width: var(--bb-max);
  margin: 0 auto;
  padding: 16px var(--bb-gutter);
}
.banner {
  background: var(--bb-green);
  border-radius: 14px;
  padding: 22px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  color: #fff;
}
.left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.phone {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--bb-red);
  color: #fff;
  flex: none;
}
.title {
  font: 600 16px/1.25 'Inter';
  color: #fff;
}
.sub {
  font: 400 12.5px/1.4 'Inter';
  color: rgba(255, 255, 255, 0.75);
  margin-top: 3px;
}
.right {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}
.call {
  display: flex;
  align-items: baseline;
  gap: 10px;
}
.call-label {
  font: 400 12px/1 'Inter';
  color: rgba(255, 255, 255, 0.7);
}
.call-num {
  font: 700 30px/1 'JetBrains Mono';
  color: #fff;
}
.btn {
  background: #fff;
  color: var(--bb-green);
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font: 600 13px 'Inter';
  cursor: pointer;
  transition: background 0.15s;
}
.btn:hover {
  background: var(--bb-green-pale);
}
</style>
