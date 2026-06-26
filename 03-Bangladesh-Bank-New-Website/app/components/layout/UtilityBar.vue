<script setup lang="ts">
const { L, lang, setLang } = useLocale()
</script>

<template>
  <div class="util">
    <div class="util-inner">
      <div class="gov">
        <span class="dot" />
        <span>{{ L.utilGov }}</span>
      </div>
      <div class="right">
        <a class="link">{{ L.utilRti }}</a>
        <a class="link">{{ L.utilSitemap }}</a>
        <a class="link">{{ L.utilFeedback }}</a>
        <div class="sep" />
        <div class="toggle">
          <button :class="['tbtn', lang === 'en' ? 'on' : 'off']" @click="setLang('en')">English</button>
          <button :class="['tbtn', lang === 'bn' ? 'on' : 'off']" @click="setLang('bn')">বাংলা</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.util {
  background: var(--bb-green-dark);
  color: #fff;
}
.util-inner {
  max-width: var(--bb-max);
  margin: 0 auto;
  padding: 0 var(--bb-gutter);
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.gov {
  display: flex;
  align-items: center;
  gap: 8px;
  font: 500 11.5px/1 'Inter';
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.03em;
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--bb-red);
  display: inline-block;
}
.right {
  display: flex;
  align-items: center;
  gap: 20px;
}
.link {
  font: 500 12px/1 'Inter';
  color: rgba(255, 255, 255, 0.78);
  cursor: pointer;
}
.link:hover {
  color: #fff;
}
.sep {
  width: 1px;
  height: 16px;
  background: rgba(255, 255, 255, 0.18);
}
.toggle {
  display: flex;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 999px;
  overflow: hidden;
}
.tbtn {
  border: none;
  cursor: pointer;
  font-family: Inter, sans-serif;
  font-size: 11.5px;
  font-weight: 600;
  padding: 6px 13px;
}
.tbtn.on {
  background: #fff;
  color: var(--bb-green-dark);
}
.tbtn.off {
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
}
</style>
