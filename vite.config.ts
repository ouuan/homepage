import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import git from 'simple-git';
import unocss from 'unocss/vite';
import markdown from 'unplugin-vue-markdown/vite';
import { defineConfig } from 'vite';
import imagePresets, { widthPreset } from 'vite-plugin-image-presets';
import { CHINESE_NAME } from './src/config';
import {
  PHOTO_WIDTH,
  PROJECT_IMAGE_NOWRAP_WIDTH,
  PROJECT_IMAGE_WRAP_WIDTH,
  PX_PER_EM,
} from './src/constants';
import fontSubsetPlugin from './src/fontSubset';

function widthsWithDifferentDpi(width: number) {
  return [1, 1.5, 2, 3, 4].map((times) => times * width);
}

export default defineConfig({
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),
    markdown({
      markdownItSetup(md) {
        const defaultRender = md.renderer.rules.image;
        md.renderer.rules.image = (tokens, idx, options, env, self) => {
          const token = tokens[idx];
          token?.attrSet('loading', 'lazy');
          return defaultRender?.(tokens, idx, options, env, self)
            ?? self.renderToken(tokens, idx, options);
        };
      },
    }),
    unocss(),
    imagePresets({
      photo: widthPreset({
        loading: 'eager',
        inferDimensions: true,
        widths: widthsWithDifferentDpi(PHOTO_WIDTH * PX_PER_EM),
        formats: {
          webp: { quality: 90 },
        },
      }),
      project: widthPreset({
        loading: 'lazy',
        inferDimensions: true,
        widths: widthsWithDifferentDpi(PROJECT_IMAGE_NOWRAP_WIDTH * PX_PER_EM)
          .concat(widthsWithDifferentDpi(PROJECT_IMAGE_WRAP_WIDTH * PX_PER_EM))
          .sort((a, b) => a - b),
        formats: {
          webp: { quality: 90 },
        },
      }),
    }),
    fontSubsetPlugin({
      originalFontPath: resolve(
        import.meta.dirname,
        './fonts/LXGWWenKai/LXGWWenKai-Regular.ttf',
      ),
      glyphs: CHINESE_NAME,
      fontName: 'ChineseName',
      fontFamily: 'Chinese Name Font',
    }),
    {
      name: 'last updated',
      async config() {
        const logs = await git().log();
        const commit = logs.all.find((commit) => commit.message.startsWith('content'));
        return { define: { __LAST_UPDATED__: JSON.stringify(commit?.date ?? null) } };
      },
    },
    {
      name: 'noscript',
      apply: 'build',
      transformIndexHtml(html) {
        return html.replace(/\s*<script type.*?<\/script>/g, '');
      },
    },
  ],
});
