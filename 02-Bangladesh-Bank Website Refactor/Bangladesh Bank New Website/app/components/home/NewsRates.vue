<template>
  <div class="grid">
    <HomeNewsPanel />
    <div class="rates">
      <HomePolicyRates />
      <HomeReserveRatios />
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: 16px;
  margin-bottom: 16px;
  align-items: start;
}
.rates {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
