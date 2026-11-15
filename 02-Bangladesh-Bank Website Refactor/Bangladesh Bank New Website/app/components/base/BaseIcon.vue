<script setup lang="ts">
import { ICON_PATHS, type IconName } from '~/data/icons'

// Reproduces the source `svg(path, size)` helper: a 24x24 viewBox, no fill,
// currentColor stroke at 1.75, round caps/joins. `size` defaults to 22 to
// match the original default. Dimensions are applied via `style` (not the
// width/height attributes) because Vue tries to set those as read-only DOM
// properties on the SVG element during hydration.
const props = withDefaults(defineProps<{ name: IconName; size?: number }>(), {
  size: 22,
})

const path = computed(() => ICON_PATHS[props.name])
const sizeStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
}))
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    :style="sizeStyle"
    v-html="path"
  />
</template>
