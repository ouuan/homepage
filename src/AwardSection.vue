<template>
  <ul class="mt-2 list-disc-outside">
    <li
      v-for="award of AWARDS"
      :key="award.title"
      class="my-1 ml-4"
    >
      <div class="flex items-baseline justify-between gap-x-4">
        <div>
          <span>{{ award.title }}</span>
          <span
            v-if="award.note"
            class="ml-3 text-sm"
          >({{ award.note }})</span>
        </div>
        <div>
          {{ award.year }}
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { AWARDS } from './config';
</script>
