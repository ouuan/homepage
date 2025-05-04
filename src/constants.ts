export const PX_PER_EM = 16;

export const PHOTO_WIDTH = 8;
export const PROJECT_IMAGE_WRAP_WIDTH = 25;
export const PROJECT_IMAGE_NOWRAP_WIDTH = 15;

export const PAGE_PADDING = 1;

export const BREAKPOINTS = {
  xs: `${PROJECT_IMAGE_WRAP_WIDTH + PAGE_PADDING * 2}em`,
  sm: '36em',
  md: '55em',
} as const;

export const PROJECT_IMAGE_WRAP_BREAKPOINT = BREAKPOINTS.md;
export const PROJECT_IMAGE_AUTO_BREAKPOINT = BREAKPOINTS.xs;
