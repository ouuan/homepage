<template>
  <div class="flex flex-wrap-reverse items-center justify-between gap-4 sm:flex-nowrap">
    <div>
      <about-content />
      <div>
        <ul class="mt-4 flex">
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
    <img
      :src="photo"
      :alt="`Photo: ${PHOTO_DESCRIPTION}`"
      :title="PHOTO_DESCRIPTION"
      class="photo mx-auto w-32 shadow-md"
    >
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
import AboutContent from './contents/about.md';
import photo from './images/photo.webp';

useHead({
  meta: [
    { property: 'og:image', content: new URL(photo, SITE_URL).href },
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
  .photo {
    mask-image: radial-gradient(
      closest-side,
      black 0%,
      rgba(0, 0, 0, 0.8) 95%,
      transparent 100%
    );
  }
}
</style>
