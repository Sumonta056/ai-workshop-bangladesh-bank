<template>
  <main class="home">
    <div class="top-inner">
      <HomeMarketRow />
      <HomeNewsRates />
    </div>
    <HomeExploreDirectory />
    <HomeCipcBanner />
    <HomeCitizenServices />
    <HomeGovernorSection />
    <HomeHotlineStrip />
  </main>
</template>

<style scoped>
.home {
  background: var(--bb-page);
}
.top-inner {
  max-width: var(--bb-max);
  margin: 0 auto;
  padding: 20px var(--bb-gutter) 0;
}
</style>
