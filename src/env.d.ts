/// <reference types="vite/client" />
/// <reference types="@total-typescript/ts-reset" />

declare module '*.md' {
  import type { ComponentOptions } from 'vue';

  const Component: ComponentOptions;
  export default Component;
}

type ImageAttrs = Record<'type' | 'srcset' | 'src' | 'width' | 'height', string> & {
  loading: 'eager' | 'lazy';
};

declare module '*?preset=photo' {
  const image: [ImageAttrs];
  export default image;
}

declare module '*?preset=project' {
  const image: [ImageAttrs];
  export default image;
}

declare const __LAST_UPDATED__: string | null;
