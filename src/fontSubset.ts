/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable import/no-extraneous-dependencies */

import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import subsetFont from 'subset-font';
import type { Plugin } from 'vite';

interface Options {
  originalFontPath: string;
  glyphs: string;
  fontName: string;
  fontFamily: string;
}

async function generateFont(opts: Options) {
  const fontBuffer = await fs.readFile(opts.originalFontPath);
  const fontHash = crypto.createHash('sha256').update(fontBuffer).digest();
  const nameHash = crypto.createHash('sha256').update(opts.glyphs).digest();
  const assetHash = crypto.createHash('sha256')
    .update(fontHash)
    .update(nameHash)
    .digest('hex')
    .slice(0, 8);
  const outName = `${opts.fontName}.${assetHash}.woff2`;

  const outFolder = path.resolve(import.meta.dirname, '../public/assets');
  await fs.mkdir(outFolder, { recursive: true });
  const outPath = path.join(outFolder, outName);

  try {
    await fs.access(outPath);
  } catch {
    const subset = await subsetFont(fontBuffer, opts.glyphs, { targetFormat: 'woff2' });
    await fs.writeFile(outPath, subset);
  }

  const url = `/assets/${outName}`;

  const css = `<style>
  @font-face {
    font-family: '${opts.fontFamily}';
    src: url('${url}') format('woff2');
    font-display: swap;
  }
  </style>`;

  const preload = `<link rel="preload" as="font" href="${url}" type="font/woff2" crossorigin>`;

  return (css + preload).replace(/\s+/g, ' ');
}

export default function fontSubsetPlugin(opts: Options): Plugin {
  const generated = generateFont(opts);
  return {
    name: 'font-subset',
    async transformIndexHtml(html: string) {
      const injection = await generated;
      return html.replace('</head>', () => `${injection}</head>`);
    },
  };
};
