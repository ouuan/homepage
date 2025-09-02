// separate file because Markdown/images can only be imported from Vue, not from TS

import type { ComponentOptions } from 'vue';
import { NAME } from './config';
import zipDescription from './contents/zip.md';

export interface PaperAward {
  name: string;
  url?: string;
  total?: number;
}

export interface Conference {
  title: string;
  authors: string[];
  description: ComponentOptions;
  confAbbr: string;
  confFull: string;
  confUrl: string;
  date: Date;
  address: string;
  publisher: string;
  url?: string;
  pdf?: string;
  scholar?: string;
  slides?: string;
  talk?: string;
  poster?: string;
  code?: string;
  doi?: string;
  isbn?: string;
  equalContribution?: number;
  submissionCount?: number;
  acceptedCount?: number;
  awards?: PaperAward[];
}

// helpers to prevent duplicates and typos
const cjj = 'Jianjun Chen';
const dhx = 'Haixin Duan';
const wq = 'Qi Wang';

export const CONFERENCES: Conference[] = [
  {
    title: 'My ZIP isn’t your ZIP: Identifying and Exploiting Semantic Gaps Between ZIP Parsers',
    authors: [NAME, cjj, wq, dhx],
    description: zipDescription,
    confAbbr: "USENIX Sec '25",
    confFull: '34th USENIX Security Symposium',
    confUrl: 'https://www.usenix.org/conference/usenixsecurity25',
    date: new Date('2025-08-13'),
    address: 'Seattle, WA',
    publisher: 'USENIX Association',
    url: 'https://www.usenix.org/conference/usenixsecurity25/presentation/you',
    pdf: 'https://www.usenix.org/system/files/usenixsecurity25-you.pdf',
    scholar: 'https://scholar.google.com/citations?view_op=view_citation&citation_for_view=Hs9aAgIAAAAJ:u5HHmVD_uO8C',
    poster: '/files/usenixsecurity25-you-poster.pdf',
    code: 'https://github.com/ouuan/ZipDiff',
    isbn: '978-1-939133-52-6',
    submissionCount: 2385,
    acceptedCount: 407,
    awards: [{
      name: 'Distinguished Paper Award',
      total: 8,
    }],
  },
];
