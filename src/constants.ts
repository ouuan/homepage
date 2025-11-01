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

export const BUTTON_MAP = {
  url: { text: 'URL', icon: 'bi:globe' },
  pdf: { text: 'PDF', icon: 'bi:file-pdf-fill' },
  scholar: { text: 'Scholar', icon: 'fa7-brands:google-scholar' },
  slides: { text: 'Slides', icon: 'bi:file-slides-fill' },
  video: { text: 'Video', icon: 'bi:play-circle-fill' },
  poster: { text: 'Poster', icon: 'bi:file-image-fill' },
  code: { text: 'Code', icon: 'bi:git' },
} as const;
