<template>
  <div class="flex flex-wrap-reverse gap-4 items-center justify-between sm:flex-nowrap">
    <div>
      <about-content />
      <div>
        <ul class="mt-4 flex flex-wrap justify-center">
          <li
            v-for="(social, index) of SOCIALS"
            :key="social.name"
            class="flex items-center"
          >
            <a
              :href="social.url"
              rel="me"
              class="link flex gap-1 items-center"
            >
              <span :class="`inline-block i-${social.icon}`" />
              <span>{{ social.name }}</span>
            </a>
            <span
              v-if="index < SOCIALS.length - 1"
              aria-hidden="true"
              class="mx-2 after:content-['/']"
            />
          </li>
        </ul>
      </div>
    </div>
    <image-modal
      :image="photo[0]"
      :sizes="`${PHOTO_WIDTH}em`"
      :alt="PHOTO_DESCRIPTION"
      image-class="photo"
      :image-style="`width: ${PHOTO_WIDTH}rem;`"
    />
  </div>
</template>

<script setup lang="ts">
import { definePerson, useSchemaOrg } from '@unhead/schema-org/vue';
import { useHead } from '@unhead/vue';
import type { ImageObject } from 'schema-dts';
import ImageModal from './ImageModal.vue';
import {
  AFFILIATION,
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

const photoHref = new URL(photo[0].src, SITE_URL).href;

useHead({
  meta: [
    { property: 'og:image', content: photoHref },
  ],
});

const photoSchema: ImageObject = {
  '@type': 'ImageObject',
  'contentUrl': photoHref,
  'description': PHOTO_DESCRIPTION,
};

useSchemaOrg([
  definePerson({
    name: NAME,
    image: photoSchema as any, // not sure why the typecheck here is extremely slow
    alternateName: CHINESE_NAME,
    affiliation: {
      '@type': 'Organization',
      'name': AFFILIATION,
    },
    sameAs: SOCIALS.filter((social) => social.sameAs).map((social) => social.url),
    award: Object.values(AWARDS).flatMap((awards) => awards.map((award) => award.title)),
  }),
]);
</script>

<style>
.photo {
  @apply shadow-md;

  @screen sm {
    mask-image: radial-gradient(
      closest-side,
      black 0%,
      rgba(0, 0, 0, 0.8) 95%,
      transparent 100%
    );
  }
}
</style>
