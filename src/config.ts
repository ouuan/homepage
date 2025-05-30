import type { UseHeadInput } from '@unhead/vue';

export const NAME = 'Yufan You';
export const CHINESE_NAME = '游宇凡';
export const SITE_URL = 'https://yufanyou.com';
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
  Academic: [
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
  Competitions: [
    {
      title: 'Third Place in SECCON CTF 13 International Finals',
      bold: ['Third Place', 'SECCON CTF 13'],
      note: 'team member',
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
    title: 'Teaching Assistant of Digital Logic Design',
    bold: ['Digital Logic Design'],
    time: 'Spring 2025',
    note: 'Guide students to design FPGA projects',
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
