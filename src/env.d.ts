/// <reference types="vite/client" />
/// <reference types="@total-typescript/ts-reset" />

declare module '*.md' {
  import type { ComponentOptions } from 'vue';

  const Component: ComponentOptions;
  export default Component;
}
