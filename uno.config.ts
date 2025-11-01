import {
  defineConfig,
  presetIcons,
  presetWind4,
  transformerDirectives,
} from 'unocss';

import { SOCIALS } from './src/config';
import { BREAKPOINTS, BUTTON_MAP } from './src/constants';

export default defineConfig({
  presets: [
    presetIcons(),
    presetWind4({
      dark: 'media',
      preflights: { reset: false },
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
  theme: {
    breakpoint: BREAKPOINTS,
  },
  shortcuts: {
    'btn-outline': 'b-1 b-black dark:b-gray-200 rd-1 px-1 py-0.5 text-sm',
    'btn-status': [
      'cursor-pointer',
      'hover:bg-gray-100 active:bg-gray-200',
      'dark:hover:bg-dark-800 dark:active:bg-dark-900',
    ],
    'btn': 'flex items-center gap-1 btn-outline btn-status',
    'link': [
      'text-blue-600 hover:text-blue-700 active:text-blue-900',
      'dark:text-blue-400 dark:hover:text-blue-500 dark:active:text-blue-600',
      'hover:underline contrast-more:underline',
    ],
  },
  safelist: Object.values(BUTTON_MAP).map(({ icon }) => `i-${icon}`)
    .concat(SOCIALS.map(({ icon }) => `i-${icon}`)),
});
