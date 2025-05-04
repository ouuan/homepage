<template>
  <div>
    <div>
      Selected miscellaneous projects
    </div>
    <ul>
      <li
        v-for="project of PROJECTS"
        :key="project.title"
      >
        <section class="project my-4 flex flex-wrap gap-4">
          <a
            class="mx-auto flex"
            target="_blank"
            :href="project.image[0].src"
          >
            <img
              v-bind="project.image[0]"
              :sizes="SIZES"
              :alt="project.alt"
              :title="project.alt"
              class="b-1 dark:b-dark-5 dark:brightness-80"
            >
          </a>
          <div>
            <h3 class="font-bold">
              {{ project.title }}
            </h3>
            <div class="my-2">
              <component :is="project.description" />
            </div>
            <div class="flex gap-2">
              <template
                v-for="([key, display]) of PROJECT_ITEMS"
                :key="key"
              >
                <a
                  v-if="project[key]"
                  :href="project[key]"
                  class="shrink-0 btn"
                >{{ display }}</a>
              </template>
              <div class="flex-grow text-right">
                {{ project.time }}
              </div>
            </div>
          </div>
        </section>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import {
  PAGE_PADDING,
  PROJECT_IMAGE_AUTO_BREAKPOINT,
  PROJECT_IMAGE_NOWRAP_WIDTH,
  PROJECT_IMAGE_WRAP_BREAKPOINT,
  PROJECT_IMAGE_WRAP_WIDTH,
} from './constants';
import { PROJECTS } from './projects';

const PROJECT_ITEMS = [
  ['code', 'Code'],
  ['video', 'Video'],
] as const;

const SIZES = [
  `(min-width: ${PROJECT_IMAGE_WRAP_BREAKPOINT}) ${PROJECT_IMAGE_NOWRAP_WIDTH}em`,
  `(min-width: ${PROJECT_IMAGE_AUTO_BREAKPOINT}) ${PROJECT_IMAGE_WRAP_WIDTH}em`,
  `calc(100vw-${PAGE_PADDING * 2}em)`,
].join(',');

useHead({
  style: [[
    `@media (min-width: ${PROJECT_IMAGE_WRAP_BREAKPOINT}) {
    .project { flex-wrap: nowrap; }
    .project > a > img { width: ${PROJECT_IMAGE_NOWRAP_WIDTH}rem; }
  }`,
    `@media (min-width: ${PROJECT_IMAGE_AUTO_BREAKPOINT}) {
    .project > a > img { max-width: ${PROJECT_IMAGE_WRAP_WIDTH}rem; }
  }`,
  ].join(' ').replace(/\s+/g, ' ')],
});
</script>
