<template>
  <details class="image-details group mx-auto shrink-0 max-w-full break-inside-avoid">
    <summary class="flex h-full cursor-zoom-in group-open:cursor-zoom-out">
      <span
        class="image-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Enlarged image. Click to close."
        :title="`${alt.replace(/\.$/, '')}.\nClick anywhere to close.`"
      >
        <img
          :src="image.src"
          :height="image.height"
          :width="image.width"
          loading="lazy"
          :alt="alt"
          class="h-auto max-h-90vh w-auto sm:max-w-90vw"
        >
        <span
          class="text-10 text-center w-15 cursor-pointer right-0 top-0 absolute"
          aria-hidden="true"
        >×</span>
        <span class="sr-only">Click to close</span>
      </span>
      <img
        v-bind="{ ...image, type: undefined, sizes }"
        :alt="alt"
        :title="alt"
        :class="imageClass"
        :style="imageStyle"
      >
    </summary>
  </details>
</template>

<script setup lang="ts">
defineProps<{
  image: ImageAttrs;
  sizes: string;
  alt: string;
  imageClass?: string;
  imageStyle?: string;
}>();
</script>

<style>
.image-modal {
  @apply hidden group-open:flex justify-center items-center;
  @apply fixed z-10 inset-0 bg-#888d;
}

body:has(.image-details[open]) {
  overflow: hidden;
}
</style>
