<script setup lang="ts">
import type { InnerPageKey } from '~/i18n/types'

// One template for all four inner views (mp / fin / pub / svc), driven by the
// page data for the given view — exactly like the source's single inner block.
const props = defineProps<{ view: InnerPageKey }>()
const { L } = useLocale()

const page = computed(() => L.value.pages[props.view])

useHead({ title: () => `${page.value.title} · ${L.value.bankName}` })
</script>

<template>
  <main class="inner">
    <InnerHeader :page="page" />
    <section>
      <div class="body">
        <div class="main-col">
          <InnerHighlightCard v-if="page.hasHighlight" :highlight="page.highlight" />
          <InnerLinkGroup v-for="(g, i) in page.groups" :key="i" :group="g" />
          <InnerDataTable v-for="(tb, i) in page.tables" :key="i" :table="tb" />
        </div>
        <InnerSidebar :page="page" />
      </div>
    </section>
  </main>
</template>

<style scoped>
.inner {
  background: #fff;
}
.body {
  max-width: var(--bb-max);
  margin: 0 auto;
  padding: 40px var(--bb-gutter) 64px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 44px;
  align-items: start;
}
.main-col {
  display: flex;
  flex-direction: column;
  gap: 36px;
}
</style>
