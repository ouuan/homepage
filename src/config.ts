import type { UseHeadInput } from '@unhead/vue';

export const NAME = 'Yufan You';
export const CHINESE_NAME = '游宇凡';
export const SITE_URL = 'https://yufan.you';
export const AFFILIATION = 'Tsinghua University';
export const DESCRIPTION = [
  'Yufan You at Tsinghua University.',
  'Focused on network, protocol, and web security.',
  'Particularly interested in parser differentials and semantic gaps.',
].join(' ');
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
    url: 'mailto:youyf21@mails.tsinghua.edu.cn',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/ouuan',
    sameAs: true,
  },
  {
    name: 'Google Scholar',
    url: 'https://scholar.google.com/citations?user=Hs9aAgIAAAAJ',
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
    name: 'Mastodon',
    url: 'https://mastodon.online/@ouuan',
    sameAs: true,
  },
];

export interface ListItem {
  title: string;
  time: string;
  note?: string;
  bold?: string[];
}

export const AWARDS: Record<string, ListItem[]> = {
  'Paper Awards': [
    {
      title: 'Distinguished Paper Award, USENIX Security 2025',
      bold: ['Distinguished Paper Award'],
      note: 'first author',
      time: '2025',
    },
  ],
  'Scholarships': [
    {
      title: 'Scholarship for Science and Technology Innovation Excellence, Tsinghua University',
      bold: ['Science and Technology Innovation Excellence'],
      time: '2024',
    },
    {
      title: 'Scholarship for Science and Technology Innovation Excellence, Zhili College',
      bold: ['Science and Technology Innovation Excellence'],
      time: '2023',
    },
  ],
  'Competitions': [
    {
      title: 'Second Place in DEF CON CTF 33',
      bold: ['Second Place', 'DEF CON CTF 33'],
      note: 'team member of Blue Water',
      time: '2025',
    },
    {
      title: 'Third Place in SECCON CTF 13 International Finals',
      bold: ['Third Place', 'SECCON CTF 13'],
      note: 'team member of blue-lotus',
      time: '2025',
    },
    {
      title: 'First Prize in THUCTF 2024',
      bold: ['First Prize', 'THUCTF 2024'],
      note: 'individual, second place among 245 Tsinghua students',
      time: '2024',
    },
    {
    // eslint-disable-next-line @stylistic/max-len
      title: 'Second Prize in 4th National Student Computer System Development Capability Competition (CSCC), Operating System Design Contest, OS Functionality Track',
      bold: ['Second Prize', 'CSCC'],
      note: 'team member',
      time: '2024',
    },
    {
      title: 'Grand Prize in THUCTF 2023',
      bold: ['Grand Prize', 'THUCTF 2023'],
      note: 'individual, first place among 127 Tsinghua students',
      time: '2023',
    },
    {
      title: 'Silver Medal in 37th CCF National Olympiad in Informatics (NOI 2020)',
      bold: ['Silver Medal', 'NOI 2020'],
      note: 'individual',
      time: '2020',
    },
  ],
};

export const SERVICES: ListItem[] = [
  {
    title: 'Teaching Assistant of Programing and Training',
    bold: ['Programing and Training'],
    time: 'Summer 2025',
    note: 'Guide students to learn Rust & build projects',
  },
  {
    title: 'Teaching Assistant of Digital Logic Design',
    bold: ['Digital Logic Design'],
    time: 'Spring 2025',
    note: 'Guide students to design FPGA projects',
  },
];

export const ADDITIONAL_HEAD: UseHeadInput = {
  script: [
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    ...(SITE_URL === 'https://yufan.you'
      ? [{
          'defer': true,
          'data-domain': 'yufan.you',
          'src': 'https://plausible.ouuan.moe/js/script.js',
        }]
      : []),
  ],
};
