<script setup lang="ts">
const { L } = useLocale()
</script>

<template>
  <div class="masthead">
    <div class="mast-inner">
      <div class="brand" @click="navigateTo('/')">
        <div class="crest">
          <span class="crest-icon"><BaseIcon name="landmark" :size="28" /></span>
        </div>
        <div>
          <div class="name">{{ L.bankName }}</div>
          <div class="sub">{{ L.centralBank }}</div>
        </div>
      </div>
      <div class="search">
        <span class="search-icon"><BaseIcon name="search" :size="17" /></span>
        <input :placeholder="L.searchPh" class="search-input" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.masthead {
  background: var(--bb-green);
  color: #fff;
  border-bottom: 3px solid var(--bb-red);
}
.mast-inner {
  max-width: var(--bb-max);
  margin: 0 auto;
  padding: 0 var(--bb-gutter);
  height: 92px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
}
.crest {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid rgba(255, 255, 255, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}
.crest-icon {
  color: var(--bb-green);
  display: inline-flex;
}
.name {
  font: 700 22px/1.05 'Inter';
  letter-spacing: -0.01em;
  color: #fff;
}
.sub {
  font: 500 11px/1.2 'Inter';
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.82);
  margin-top: 4px;
}
.search {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 999px;
  padding: 9px 18px;
  width: 300px;
  max-width: 34vw;
}
.search-icon {
  color: rgba(255, 255, 255, 0.85);
  display: inline-flex;
  flex: none;
}
.search-input {
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font: 400 14px 'Inter';
  width: 100%;
}
</style>
