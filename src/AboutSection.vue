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
    sameAs: SOCIALS.filter((social) => social.sameAs).map((social) => social.url),
    award: AWARDS.map((award) => award.title),
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
