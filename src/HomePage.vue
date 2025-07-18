<template>
  <div
    class="mx-auto max-w-220"
    :style="`padding: 0 ${PAGE_PADDING}rem;`"
  >
    <header class="flex flex-wrap justify-center print:hidden sm:justify-between">
      <div class="text-center shrink-0 w-full font-italic sm:w-auto">
        <a
          class="p-2 btn-status block"
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
              class="p-2 btn-status block"
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
      <h1 class="text-8 mx-auto my-6 flex gap-x-4 items-baseline justify-center">
        <span>{{ NAME }}</span>
        <span class="font-chinese top--0.1 relative">{{ CHINESE_NAME }}</span>
      </h1>
      <section
        v-for="(section, index) of SECTIONS"
        :key="section.name"
        class="my-6 relative"
      >
        <!-- eslint-disable-next-line vuejs-accessibility/anchor-has-content -->
        <a
          :id="section.name.toLowerCase()"
          aria-hidden="true"
          class="w-1 top--25 absolute target:pb-100vh sm:top--15"
        />
        <h2 :class="['text-6', index === 0 && 'sr-only']">
          {{ section.name }}
        </h2>
        <component
          :is="section.component"
          v-bind="section.props"
        />
      </section>
    </main>
    <footer class="text-sm text-gray-800 b-t-1 dark:text-gray-300 dark:b-gray-400 print:hidden">
      <div class="my-4 flex flex-wrap gap-2 justify-center">
        <a
          href="https://github.com/ouuan/homepage"
          class="underline"
        >Page Source Code</a>
        <span aria-hidden="true">·</span>
        <span>Designed by Yufan You</span>
        <template v-if="UPDATED">
          <span
            aria-hidden="true"
            class="hidden sm:block"
          >·</span>
          <span class="text-center basis-full sm:basis-auto">
            Last updated on
            <time
              :datetime="UPDATED"
              :title="UPDATED"
            >{{ UPDATED.slice(0, 10) }}</time>
          </span>
        </template>
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
import ListSection from './ListSection.vue';
import ProjectSection from './ProjectSection.vue';
import PublicationSection from './PublicationSection.vue';
import {
  ADDITIONAL_HEAD,
  CHINESE_NAME,
  DESCRIPTION,
  NAME,
  SERVICES,
  SITE_URL,
} from './config';
import { PAGE_PADDING } from './constants';
import inlineStyle from './inline.scss?inline';

const SECTIONS = [
  {
    name: 'About',
    component: AboutSection,
  },
  {
    name: 'Publications',
    abbr: 'Pubs',
    component: PublicationSection,
  },
  {
    name: 'Projects',
    component: ProjectSection,
  },
  {
    name: 'Awards',
    component: AwardSection,
  },
  {
    name: 'Services',
    component: ListSection,
    props: { list: SERVICES },
  },
];

// not using @unocss/preset-web-fonts, because:
// 1. https://github.com/unocss/unocss/issues/4327
// 2. I'm not sure why, but it uses the full-axis font file when specifying separate weights

const fonts = [
  {
    style: 'normal',
    weight: 400,
    url: fontRegularNormal,
    preload: true, // for most text
  },
  {
    style: 'italic',
    weight: 400,
    url: fontRegularItalic,
    preload: false, // no layout shift for now
  },
  {
    style: 'normal',
    weight: 700,
    url: fontBoldNormal,
    preload: true, // to prevent layout shift
  },
  {
    style: 'italic',
    weight: 700,
    url: fontBoldItalic,
    preload: false, // not used yet
  },
];

const fontFaces = fonts.map((font) => `@font-face {
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
    ...fonts.filter((font) => font.preload).map((font) => ({
      rel: 'preload',
      href: font.url,
      as: 'font',
      type: 'font/woff2',
      crossorigin: '',
    } as const)),
  ],
  meta: [
    { name: 'description', content: DESCRIPTION },
    { name: 'og:type', content: 'website' },
    { name: 'og:url', content: SITE_URL },
    { name: 'og:title', content: NAME },
    { name: 'og:site_name', content: NAME },
    { name: 'og:description', content: DESCRIPTION },
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

const UPDATED = __LAST_UPDATED__;
</script>

<style>
:root {
  @apply text-pretty;

  font-family: 'Noto Serif Web', 'Noto Serif', ui-serif, serif;

  body {
    @apply visible;
  }
}

.font-chinese {
  font-family: 'Chinese Name Font', serif;
}

header {
  @apply sticky top-0 z-1;
  @apply 'bg-white shadow-gray-200 shadow-[0_4px_2px_-3px]';
  @apply 'dark:bg-dark-600 dark:shadow-none dark:b-b-1 dark:b-gray-400'
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
