<template>
  <ul>
    <li
      v-for="conf of CONFERENCES"
      :key="conf.title"
    >
      <section class="my-4 flex flex-wrap-reverse gap-x-4 justify-between sm:flex-nowrap">
        <div>
          <h3 class="font-bold">
            {{ conf.title }}
          </h3>
          <div>
            <ol>
              <li
                v-for="(author, index) of conf.authors"
                :key="author"
                class="inline"
              >
                <span :class="author === NAME ? 'font-bold' : ''">
                  {{ author }}
                </span>
                <template v-if="index < (conf.equalContribution ?? 0)">
                  <span
                    title="Equal contribution"
                  >*</span>
                  <span class="sr-only">(equal contribution)</span>
                </template>
                <span
                  v-if="index < conf.authors.length - 1"
                  aria-hidden="true"
                >, </span>
              </li>
            </ol>
          </div>
          <div class="font-italic">
            {{ conf.confFull }}
          </div>
          <div class="my-2">
            <component :is="conf.description" />
          </div>
          <div class="mt-1 flex flex-wrap gap-2 items-start md:flex-nowrap">
            <span
              v-if="!conf.url && !conf.pdf"
              class="btn-outline shrink-0"
              title="The submission has been accepted, but the final paper is not yet available"
            >To appear</span>
            <template
              v-for="([key, display]) of CONFERENCE_ITEMS"
              :key="key"
            >
              <a
                v-if="conf[key]"
                :href="conf[key]"
                class="btn shrink-0"
              >{{ display }}</a>
            </template>
            <details
              class="group btn-outline"
              style="padding: 0;"
            >
              <summary class="px-1 py-0.5 rd-1 btn-status group-open:pb-1">
                <span>BibTeX</span>
              </summary>
              <pre class="p-3 b-t-1 whitespace-pre-wrap dark:b-dark-200">{{ bibtex(conf) }}</pre>
            </details>
          </div>
        </div>
        <div class="shrink-0 text-balance sm:text-right sm:max-w-32">
          <div>
            <a
              class="font-bold"
              :href="conf.confUrl"
            >{{ conf.confAbbr }}</a>
          </div>
          <div>
            <a
              v-if="conf.award"
              class="text-red-700 font-bold dark:text-red-500"
              :href="conf.awardUrl"
            >{{ conf.award }}</a>
          </div>
        </div>
      </section>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useSchemaOrg } from '@unhead/schema-org/vue';
import type { ScholarlyArticle } from 'schema-dts';
import { NAME, SITE_URL } from './config';
import { CONFERENCES, type Conference } from './publications';

const CONFERENCE_ITEMS = [
  ['url', 'URL'],
  ['pdf', 'PDF'],
  ['slides', 'Slides'],
  ['talk', 'Talk'],
  ['poster', 'Poster'],
  ['code', 'Code'],
] as const;

function bibtex(conf: Conference) {
  const author = conf.authors.join(' and ');
  const authorKey = conf.authors[0]?.split(' ').at(-1)?.toLowerCase();
  const titleKey = conf.title.split(' ')
    .slice(0, 3)
    .join('')
    .replace(/\W/g, '');
  const key = `${authorKey || 'unknown'}${titleKey || 'unknown'}${conf.date.getFullYear()}`;
  const isbn = (conf.isbn && `\n  isbn = {${conf.isbn}},`) ?? '';
  const doi = (conf.doi && `\n  doi = {${conf.doi}},`) ?? '';
  const url = (conf.url && `\n  url = {${conf.url}},`) ?? '';

  return `@inproceedings{${key},
  author = {${author}},
  title = {{${conf.title}}},
  booktitle = {${conf.confFull}},
  address = {${conf.address}},
  publisher = {${conf.publisher}},${isbn}${doi}${url}
  year = {${conf.date.getFullYear()}},
  month = ${conf.date.toLocaleString('en-US', { month: 'short' }).toLowerCase()},
  day = {${conf.date.getDate()}}
}`;
}

useSchemaOrg(CONFERENCES.map<ScholarlyArticle>((conf) => ({
  '@type': 'ScholarlyArticle',
  'name': conf.title,
  'headline': conf.title,
  'author': conf.authors.map((author) => (
    author === NAME
      ? { '@id': `${SITE_URL}#identity` }
      : { '@type': 'Person', 'name': author }
  )),
  'datePublished': conf.date.toISOString(),
  'publisher': {
    '@type': 'Organization',
    'name': conf.publisher,
  },
  'isPartOf': {
    '@type': 'PublicationVolume',
    'name': conf.confFull,
    'url': conf.confUrl,
  },
  'url': conf.url,
  'sameAs': [
    conf.pdf,
    conf.slides,
    conf.talk,
    conf.code,
  ].filter(Boolean),
  ...((conf.doi && {
    identifier: {
      '@type': 'PropertyValue',
      'propertyID': 'DOI',
      'value': conf.doi,
    },
  }) ?? (conf.isbn && {
    identifier: {
      '@type': 'PropertyValue',
      'propertyID': 'ISBN',
      'value': conf.isbn,
    },
  })),
  ...(conf.award ? { award: conf.award } : {}),
})));
</script>
