<template>
  <ul class="mt-2 list-disc-outside">
    <li
      v-for="service of SERVICES"
      :key="service.title"
      class="my-1 ml-4"
    >
      <div class="flex items-baseline justify-between gap-x-4">
        <div>
          {{ service.title }}
        </div>
        <div class="text-right">
          {{ service.time }}
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { SERVICES } from './config';
</script>
