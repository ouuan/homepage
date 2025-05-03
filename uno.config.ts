import {
  defineConfig,
  presetIcons,
  presetWind3, // https://github.com/unocss/unocss/issues/4568
  transformerDirectives,
} from 'unocss';

export default defineConfig({
  presets: [
    presetIcons(),
    presetWind3({ dark: 'media' }),
  ],
  transformers: [
    transformerDirectives(),
  ],
  theme: {
    breakpoints: {
      xs: '28em',
      sm: '36em',
      md: '55em',
    },
  },
  rules: [
    [
      // TODO: this is included in presetWind4
      /^scheme-(light|dark)$/,
      ([, scheme]) => (scheme && {
        'color-scheme': scheme,
      }),
    ],
  ],
  shortcuts: {
    'btn-outline': 'b-1 b-black dark:b-gray-2 rd-1 px-1 py-0.5 text-sm',
    'btn-status': [
      'cursor-pointer',
      'hover:bg-gray-1 active:bg-gray-2',
      'dark:hover:bg-dark-8 dark:active:bg-dark-9',
    ],
    'btn': 'btn-outline btn-status',
    'link': [
      'text-blue-6 hover:text-blue-7 active:text-blue-9',
      'dark:text-blue-4 dark:hover:text-blue-5 dark:active:text-blue-6',
      'hover:underline contrast-more:underline',
    ],
  },
});
