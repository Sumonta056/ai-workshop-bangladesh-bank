<script setup lang="ts">
const { L } = useLocale()
</script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="cols">
        <!-- contact column -->
        <div>
          <div class="brand">
            <div class="crest">
              <span class="crest-icon"><BaseIcon name="landmark" :size="28" /></span>
            </div>
            <div>
              <div class="bname">{{ L.bankName }}</div>
              <div class="bsub">{{ L.centralBank }}</div>
            </div>
          </div>
          <div class="heading">{{ L.footerContact }}</div>
          <div class="muted">{{ L.address }}</div>
          <div class="muted">{{ L.phone }}</div>
          <div class="muted">{{ L.email }}</div>
          <div class="socials">
            <span class="social"><BaseIcon name="fb" :size="16" /></span>
            <span class="social"><BaseIcon name="x" :size="16" /></span>
            <span class="social"><BaseIcon name="yt" :size="16" /></span>
          </div>
        </div>

        <!-- useful links -->
        <div>
          <div class="heading">{{ L.footerLinks }}</div>
          <div class="link-list">
            <a v-for="ln in L.usefulLinks" :key="ln" class="flink">{{ ln }}</a>
          </div>
        </div>

        <!-- about -->
        <div>
          <div class="heading">{{ L.footerAbout }}</div>
          <div class="link-list">
            <a v-for="al in L.aboutLinks" :key="al" class="flink">{{ al }}</a>
          </div>
        </div>

        <!-- hotlines -->
        <div>
          <div class="heading">{{ L.footerHotline }}</div>
          <div class="hotline-list">
            <div v-for="fh in L.hotlines" :key="fh.num" class="hotline">
              <span class="hnum">{{ fh.num }}</span>
              <span class="hlabel">{{ fh.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom">
        <span class="copy">{{ L.copy }}</span>
        <div class="bottom-links">
          <a class="blink" @click="navigateTo('/')">{{ L.fHome }}</a>
          <a class="blink">{{ L.fSitemap }}</a>
          <a class="blink">{{ L.fFeedback }}</a>
        </div>
      </div>

      <div class="disclaimer">
        <p><span class="disc-label">{{ L.disclaimerLabel }}</span> {{ L.disclaimer }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--bb-green-dark);
  color: #fff;
  border-top: 3px solid var(--bb-red);
}
.footer-inner {
  max-width: var(--bb-max);
  margin: 0 auto;
  padding: 48px var(--bb-gutter) 0;
}
.cols {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr;
  gap: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.crest {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--bb-green);
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
}
.crest-icon {
  color: #fff;
  display: inline-flex;
  transform: scale(0.7);
}
.bname {
  font: 700 16px/1.1 'Inter';
  color: #fff;
}
.bsub {
  font: 500 10px/1.2 'Inter';
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
  margin-top: 3px;
}
.heading {
  font: 600 11px/1 'Inter';
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--bb-green-300);
  margin-bottom: 14px;
}
/* contact column heading has 11px bottom margin in the source */
.cols > div:first-child .heading {
  margin-bottom: 11px;
}
.muted {
  font: 400 13px/1.7 'Inter';
  color: rgba(255, 255, 255, 0.7);
}
.socials {
  display: flex;
  gap: 9px;
  margin-top: 16px;
}
.social {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: border-color 0.16s, color 0.16s;
}
.social:hover {
  border-color: var(--bb-green);
  color: #fff;
}
.link-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.flink {
  font: 400 13px/1.4 'Inter';
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
}
.flink:hover {
  color: #fff;
}
.hotline-list {
  display: flex;
  flex-direction: column;
  gap: 11px;
}
.hotline {
  display: flex;
  align-items: center;
  gap: 10px;
}
.hnum {
  font: 700 15px/1 'JetBrains Mono';
  color: #fff;
  min-width: 40px;
}
.hlabel {
  font: 400 12px/1.3 'Inter';
  color: rgba(255, 255, 255, 0.6);
}
.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 0;
  flex-wrap: wrap;
}
.copy {
  font: 400 12px/1.4 'Inter';
  color: rgba(255, 255, 255, 0.5);
}
.bottom-links {
  display: flex;
  gap: 22px;
}
.blink {
  font: 500 12px/1 'Inter';
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
}
.blink:hover {
  color: #fff;
}
.disclaimer {
  padding: 0 0 28px;
}
.disclaimer p {
  font: 400 11.5px/1.6 'Inter';
  color: rgba(255, 255, 255, 0.38);
  margin: 0;
  max-width: 120ch;
}
.disc-label {
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
}
</style>
