<template>
  <details class="group mx-auto max-w-full shrink-0">
    <summary class="h-full flex cursor-zoom-in group-open:cursor-zoom-out">
      <img
        v-bind="{ ...image, type: undefined, sizes }"
        :alt="alt"
        :title="alt"
        :class="imageClass"
        :style="imageStyle"
      >
      <span
        class="image-modal"
        role="dialog"
        aria-modal="true"
        :title="`${alt.replace(/\.$/, '')}.\nClick anywhere to exit.`"
      >
        <span
          class="absolute right-0 top-0 w-15 cursor-pointer text-center text-10"
          aria-label="Click to close"
        >
          ×
        </span>
        <img
          :src="image.src"
          :height="image.height"
          :width="image.width"
          loading="lazy"
          :alt="alt"
          class="h-auto max-h-90vh w-auto sm:max-w-90vw"
        >
      </span>
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
</style>
