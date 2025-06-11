<template>
  <ul class="mt-2 list-disc-outside">
    <li
      v-for="item of list"
      :key="item.title"
      class="my-1 ml-4"
    >
      <div class="flex gap-x-4 items-baseline justify-between md:gap-x-6">
        <div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="itemHtml(item)" />
          <span
            v-if="item.note"
            class="text-sm ml-3"
          >({{ item.note }})</span>
        </div>
        <div class="text-right">
          {{ item.time }}
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { ListItem } from './config';

defineProps<{
  list: ListItem[];
}>();

function itemHtml(item: ListItem) {
  let html = item.title;
  for (const bold of item.bold ?? []) {
    html = html.replace(bold, '<b>$&</b>');
  }
  return html;
}
</script>
