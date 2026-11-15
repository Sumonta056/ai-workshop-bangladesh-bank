<script setup lang="ts">
// Static reproduction of the design tool's <image-slot> empty state (the drop /
// browse runtime is not part of the shipped static site). Matches the source
// shadow-DOM styling: soft fill, 1.5px dashed ring, centered image icon at .45
// opacity, caption from the placeholder text.
const props = withDefaults(
  defineProps<{ placeholder?: string; radius?: number; aspectRatio?: string }>(),
  { placeholder: 'Drop an image', radius: 12, aspectRatio: undefined },
)

const rootStyle = computed(() => ({
  borderRadius: `${props.radius}px`,
  aspectRatio: props.aspectRatio,
}))
</script>

<template>
  <div class="image-slot" :style="rootStyle">
    <div class="frame" :style="{ borderRadius: `${radius}px` }" />
    <div class="ring" :style="{ borderRadius: `${radius}px` }" />
    <div class="empty">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      <div class="cap">{{ placeholder }}</div>
      <div class="sub">or <u>browse files</u></div>
    </div>
  </div>
</template>

<style scoped>
.image-slot {
  position: relative;
  width: 100%;
  display: block;
  font: 13px/1.3 system-ui, -apple-system, sans-serif;
  color: rgba(0, 0, 0, 0.55);
}
.frame {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.04);
}
.ring {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border: 1.5px dashed rgba(0, 0, 0, 0.25);
}
.empty {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-align: center;
  padding: 12px;
  box-sizing: border-box;
  user-select: none;
}
.empty svg {
  opacity: 0.45;
}
.cap {
  max-width: 90%;
  font-weight: 500;
  letter-spacing: 0.01em;
}
.sub {
  font-size: 11px;
}
.sub u {
  text-underline-offset: 2px;
  text-decoration-color: rgba(0, 0, 0, 0.25);
}
</style>
