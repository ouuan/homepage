<template>
  <ul class="mt-2 list-disc-outside">
    <li
      v-for="item of list"
      :key="item.title"
      class="my-1 ml-4"
    >
      <div class="flex items-baseline justify-between gap-x-4">
        <div>
          <span>{{ item.title }}</span>
          <span
            v-if="item.note"
            class="ml-3 text-sm"
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
</script>
