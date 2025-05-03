<template>
  <div class="mx-auto max-w-220 px-4">
    <header
      :class="[
        'sticky top-0 z-1 flex justify-center sm:justify-between flex-wrap',
        'b-b-1 bg-white dark:bg-dark-6 dark:b-gray-4 shadow-sm',
      ]"
    >
      <div class="w-full shrink-0 text-center font-italic sm:w-auto">
        <a
          class="block p-2 btn-status"
          href="#"
        >{{ NAME }}</a>
      </div>
      <nav>
        <ul class="flex justify-center">
          <li
            v-for="{ name, abbr } of SECTIONS"
            :key="name"
          >
            <a
              :href="`#${name.toLowerCase()}`"
              class="block p-2 btn-status"
            >
              <div v-if="abbr">
                <span class="hidden xs:inline">{{ name }}</span>
                <span class="xs:hidden">{{ abbr }}</span>
              </div>
              <div v-else>{{ name }}</div>
            </a>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <h1 class="mx-auto my-6 flex items-baseline justify-center gap-x-4 text-8">
        <span>{{ NAME }}</span>
        <span class="font-chinese relative top--0.1">{{ CHINESE_NAME }}</span>
      </h1>
      <section
        v-for="(section, index) of SECTIONS"
        :key="section.name"
        class="my-6"
      >
        <!-- eslint-disable-next-line vuejs-accessibility/anchor-has-content -->
        <a
          :id="section.name.toLowerCase()"
          :name="section.name.toLowerCase()"
          aria-hidden="true"
          class="relative top--22 sm:top--12"
        />
        <h2 :class="['text-6', index === 0 && 'sr-only']">
          {{ section.name }}
        </h2>
        <component :is="section.component" />
      </section>
    </main>
    <footer class="b-t-1 dark:b-gray-4">
      <div class="mt-4 flex justify-center gap-2 text-sm text-gray-8 dark:text-gray-3">
        <a href="https://github.com/ouuan/homepage">Page Source Code</a>
        <span class="after-content-['·']" />
        <span>Designed by Yufan You</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { defineWebPage, defineWebSite, useSchemaOrg } from '@unhead/schema-org/vue';
import { useHead } from '@unhead/vue';
import fontBoldItalic from '../fonts/NotoSerif/NotoSerif-latin-bold-italic.woff2';
import fontBoldNormal from '../fonts/NotoSerif/NotoSerif-latin-bold-normal.woff2';
import fontRegularItalic from '../fonts/NotoSerif/NotoSerif-latin-regular-italic.woff2';
import fontRegularNormal from '../fonts/NotoSerif/NotoSerif-latin-regular-normal.woff2';
import AboutSection from './AboutSection.vue';
import AwardSection from './AwardSection.vue';
import ProjectSection from './ProjectSection.vue';
import PublicationSection from './PublicationSection.vue';
import ServiceSection from './ServiceSection.vue';
import {
  ADDITIONAL_HEAD,
  CHINESE_NAME,
  DESCRIPTION,
  NAME,
  SITE_URL,
} from './config';
import inlineStyle from './inline.scss?inline';

const SECTIONS = [
  { name: 'About', component: AboutSection },
  { name: 'Publications', abbr: 'Pubs', component: PublicationSection },
  { name: 'Projects', component: ProjectSection },
  { name: 'Awards', component: AwardSection },
  { name: 'Services', component: ServiceSection },
];

// not using @unocss/preset-web-fonts, because:
// 1. https://github.com/unocss/unocss/issues/4327
// 2. I'm not sure why, but it uses the full-axis font file when specifying separate weights

const fontFaces = [
  {
    style: 'normal',
    weight: 400,
    url: fontRegularNormal,
  },
  {
    style: 'italic',
    weight: 400,
    url: fontRegularItalic,
  },
  {
    style: 'normal',
    weight: 700,
    url: fontBoldNormal,
  },
  {
    style: 'italic',
    weight: 700,
    url: fontBoldItalic,
  },
].map((font) => `@font-face {
  font-family: 'Noto Serif Web';
  font-style: ${font.style};
  font-weight: ${font.weight};
  font-display: swap;
  src: url(${font.url}) format('woff2');
}`).join(' ').replace(/\s+/g, ' ');

useHead({
  title: NAME,
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'canonical', href: SITE_URL },
  ],
  meta: [
    {
      name: 'description',
      content: DESCRIPTION,
    },
  ],
  style: [
    inlineStyle + fontFaces,
  ],
});

useSchemaOrg([
  defineWebSite(),
  defineWebPage(),
]);

useHead(ADDITIONAL_HEAD);
</script>

<style>
:root {
  font-family: 'Noto Serif Web', 'Noto Serif', ui-serif, serif;

  body {
    @apply visible;
  }
}

.font-chinese {
  font-family: 'Chinese Name Font', serif;
}

footer {
  margin-bottom: calc(100vh - 7.25rem);

  @screen sm {
    margin-bottom: calc(100vh - 4.75rem);
  }
}

.markdown-body {
  @apply space-y-4;

  p {
    @apply hyphens-auto;
  }

  a {
    @apply link;
  }

  img {
    @apply inline;
  }
}
</style>
