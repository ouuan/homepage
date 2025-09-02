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
                :key="author.name"
                class="inline"
              >
                <span
                  v-if="author.name === NAME"
                  class="font-bold"
                >
                  {{ NAME }}
                </span>
                <a
                  v-else
                  :href="author.url"
                >
                  {{ author.name }}
                </a>
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
            {{ conf.confFull }}, {{ conf.date.toLocaleString('en-US', {
              month: 'long',
              year: 'numeric',
            }) }}
          </div>
          <div class="mt-1">
            <component :is="conf.description" />
          </div>
          <div class="mt-2 flex flex-wrap gap-2 items-start">
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
              <pre
                class="p-3 b-t-1 select-all whitespace-pre-wrap dark:b-dark-200"
              >{{ bibtex(conf) }}</pre>
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
          <div
            v-if="conf.submissionCount && conf.acceptedCount"
            class="text-sm"
            :title="`${conf.acceptedCount} accepted out of ${conf.submissionCount} submissions`"
          >
            ({{ calcRate(conf.acceptedCount, conf.submissionCount) }})
          </div>
          <template
            v-for="award of conf.awards"
            :key="award.name"
          >
            <div class="mt-1">
              <a
                class="text-red-700 font-bold dark:text-red-500"
                :href="award.url"
              >{{ award.name }}</a>
            </div>
            <div
              v-if="award.total && conf.acceptedCount"
              class="text-red-700 dark:text-red-500"
              :title="`${award.total} awards out of ${conf.acceptedCount} accepted papers`"
            >
              ({{ calcRate(award.total, conf.acceptedCount) }})
            </div>
          </template>
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
  ['scholar', 'Scholar'],
  ['slides', 'Slides'],
  ['talk', 'Talk'],
  ['poster', 'Poster'],
  ['code', 'Code'],
] as const;

function bibtex(conf: Conference) {
  const names = conf.authors.map((author) => author.name);
  const author = names.join(' and ');
  const authorKey = names[0]?.split(' ').at(-1)?.toLowerCase();
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

function calcRate(target: number, total: number) {
  const rate = (target / total * 100).toFixed(1).replace(/\.?0+$/, '');
  return `${rate}% = ${target}/${total}`;
}

useSchemaOrg(CONFERENCES.map<ScholarlyArticle>((conf) => ({
  '@type': 'ScholarlyArticle',
  'name': conf.title,
  'headline': conf.title,
  'author': conf.authors.map((author) => (
    author.name === NAME
      ? { '@id': `${SITE_URL}#identity` }
      : { '@type': 'Person', 'name': author.name, 'url': author.url }
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
    conf.scholar,
    conf.slides,
    conf.talk,
    conf.poster,
    conf.code,
  ].filter(Boolean),
  'award': conf.awards?.map((award) => award.name),
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
})));
</script>
