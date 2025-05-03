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
        <section class="my-4 flex flex-wrap gap-4 md:flex-nowrap">
          <img
            :src="project.image"
            :alt="project.alt"
            :title="project.alt"
            loading="lazy"
            class="mx-auto b-1 md:w-60 xs:max-w-100 dark:b-dark-5 dark:brightness-80"
          >
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
import { PROJECTS } from './projects';

const PROJECT_ITEMS = [
  ['code', 'Code'],
  ['video', 'Video'],
] as const;
</script>
