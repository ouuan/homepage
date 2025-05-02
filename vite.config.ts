import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import unocss from 'unocss/vite';
import markdown from 'unplugin-vue-markdown/vite';
import { defineConfig } from 'vite';
import { CHINESE_NAME } from './src/config';
import fontSubsetPlugin from './src/fontSubset';

export default defineConfig({
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),
    markdown({}),
    unocss(),
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
      name: 'noscript',
      apply: 'build',
      transformIndexHtml(html) {
        return html.replace(/\s*<script type.*?<\/script>/g, '');
      },
    },
  ],
});
