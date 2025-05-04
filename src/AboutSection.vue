<template>
  <div class="flex flex-wrap-reverse items-center justify-between gap-4 sm:flex-nowrap">
    <div>
      <about-content />
      <div>
        <ul class="mt-4 flex flex-wrap">
          <li
            v-for="social of SOCIALS"
            :key="social.name"
            class="after:mx-2 after:content-['/'] last:after:content-none"
          >
            <a
              :href="social.url"
              rel="me"
              class="link"
            >{{ social.name }}</a>
          </li>
        </ul>
      </div>
    </div>
    <a
      class="mx-auto shrink-0"
      :href="photo[0].src"
      target="_blank"
    >
      <img
        v-bind="photo[0]"
        :sizes="`${PHOTO_WIDTH}em`"
        :alt="`Photo: ${PHOTO_DESCRIPTION}`"
        :title="PHOTO_DESCRIPTION"
        class="photo-mask shadow-md"
        :style="`width: ${PHOTO_WIDTH}rem;`"
      >
    </a>
  </div>
</template>

<script setup lang="ts">
import { definePerson, useSchemaOrg } from '@unhead/schema-org/vue';
import { useHead } from '@unhead/vue';
import {
  AWARDS,
  CHINESE_NAME,
  NAME,
  PHOTO_DESCRIPTION,
  SITE_URL,
  SOCIALS,
} from './config';
import { PHOTO_WIDTH } from './constants';
import AboutContent from './contents/about.md';
import photo from './images/photo.webp?preset=photo';

useHead({
  meta: [
    { property: 'og:image', content: new URL(photo[0].src, SITE_URL).href },
  ],
});

useSchemaOrg([
  definePerson({
    name: NAME,
    image: photo,
    alternateName: CHINESE_NAME,
    sameAs: SOCIALS.filter((social) => social.sameAs).map((social) => social.url),
    award: AWARDS.map((award) => award.title),
  }),
]);
</script>

<style>
@screen sm {
  .photo-mask {
    mask-image: radial-gradient(
      closest-side,
      black 0%,
      rgba(0, 0, 0, 0.8) 95%,
      transparent 100%
    );
  }
}
</style>
