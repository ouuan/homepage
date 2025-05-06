<template>
  <section
    v-for="(awards, category) of AWARDS"
    :key="category"
  >
    <h3 class="mt-2 text-5">
      {{ category }}
    </h3>
    <list-section :list="awards" />
  </section>
</template>

<script setup lang="ts">
import ListSection from './ListSection.vue';
import { AWARDS } from './config';
</script>
