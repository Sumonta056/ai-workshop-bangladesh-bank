<script setup lang="ts">
const { L } = useLocale()
</script>

<template>
  <div class="market-row">
    <HomeMarketCard v-for="(m, i) in L.marketCards" :key="i" :card="m" />
    <HomeAuctionCard />
  </div>
</template>

<style scoped>
.market-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  align-items: stretch;
}
</style>
