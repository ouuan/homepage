import type { UseHeadInput } from '@unhead/vue';

export const NAME = 'Yufan You';
export const CHINESE_NAME = '游宇凡';
export const SITE_URL = 'https://yufanyou.com';
export const PHOTO_DESCRIPTION
  = 'Receiving the third-place award at SECCON CTF 13 International Finals in 2025.3';

export interface Social {
  name: string;
  url: string;
  sameAs?: boolean; // include in schema.org Person sameAs
}

export const SOCIALS: Social[] = [
  {
    name: 'Email',
    url: 'mailto:ouuansteve@gmail.com',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/ouuan',
    sameAs: true,
  },
  {
    name: 'ORCID',
    url: 'https://orcid.org/0009-0004-2975-2107',
    sameAs: true,
  },
  {
    name: 'Blog',
    url: 'https://ouuan.moe',
    sameAs: true,
  },
  {
    name: 'CTFtime',
    url: 'https://ctftime.org/user/172368',
  },
];

export interface Conference {
  title: string;
  authors: string[];
  confAbbr: string;
  confFull: string;
  confUrl: string;
  year: number;
  month: string;
  address: string;
  publisher: string;
  url?: string;
  pdf?: string;
  slides?: string;
  talk?: string;
  code?: string;
  doi?: string;
  isbn?: string;
  award?: string;
  awardUrl?: string;
  equalContribution?: number;
}

// helpers to prevent duplicates and typos
const cjj = 'Jianjun Chen';
const dhx = 'Haixin Duan';
const wq = 'Qi Wang';

export const CONFERENCES: Conference[] = [
  {
    title: 'My ZIP isn’t your ZIP: Identifying and Exploiting Semantic Gaps Between ZIP Parsers',
    authors: [NAME, cjj, wq, dhx],
    confAbbr: "USENIX Sec '25",
    confFull: '34th USENIX Security Symposium',
    confUrl: 'https://www.usenix.org/conference/usenixsecurity25',
    year: 2025,
    month: 'aug',
    address: 'Seattle, WA',
    publisher: 'USENIX Association',
  },
];

export interface Award {
  title: string;
  year: number;
  note?: string;
}

export const AWARDS: Award[] = [
  {
    title: 'Third Place in SECCON CTF 13 International Finals',
    note: 'As Blue-Lotus Team Member',
    year: 2025,
  },
  {
    title: 'Tsinghua University Innovation and Technology Scholarship',
    year: 2024,
  },
  {
    title: 'Grand Prize in THUCTF 2023',
    note: 'As Individual, First Place Among 127 Tsinghua Students',
    year: 2023,
  },
  {
    title: 'Silver Medal in 37th CCF National Olympiad in Informatics (NOI 2020)',
    year: 2020,
  },
];

export interface Service {
  title: string;
  time: string;
}

export const SERVICES: Service[] = [
  {
    title: 'Teaching Assistant of Digital Logic Design',
    time: 'Spring 2025',
  },
];

export const ADDITIONAL_HEAD: UseHeadInput = {
  script: [
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    ...(SITE_URL === 'https://yufanyou.com'
      ? [{
          'defer': true,
          'data-domain': 'yufanyou.com',
          'src': 'https://plausible.ouuan.moe/js/script.js',
        }]
      : []),
  ],
};
