// separate file because Markdown/images can only be imported from Vue, not from TS

import type { ComponentOptions } from 'vue';
import cpeditorDescription from './contents/cpeditor.md';
import dinoDescription from './contents/dino.md';
import routerDescription from './contents/router.md';
import verusProjectDescription from './contents/verus.md';
import bitmapAllocatorImage from './images/bitmap-allocator.webp?preset=project';
import cpeditorImage from './images/cpeditor.webp?preset=project';
import dinoImage from './images/dino.webp?preset=project';
import routerMcImage from './images/router-mc.webp?preset=project';

export interface Project {
  title: string;
  description: ComponentOptions;
  image: [ImageAttrs];
  alt: string;
  time: string;
  code?: string;
  video?: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'Formal Verification for Operating System Memory Components',
    code: 'https://github.com/LearningOS/osbiglab-2024s-verifyingkernel/',
    description: verusProjectDescription,
    image: bitmapAllocatorImage,
    alt: 'Design of the bitmap allocator',
    time: 'Spring 2024',
  },
  {
    title: 'Hardware IPv6 Router and RISC-V CPU on FPGA',
    code: 'https://github.com/ouuan/course-assignments/tree/master/joint-lab',
    description: routerDescription,
    image: routerMcImage,
    alt: 'Playing Minecraft on LAN through our own routers',
    time: 'Fall 2023',
  },
  {
    title: 'Motion-Controlled Chrome Dino Game on FPGA (“Dino Fit Adventure”)',
    code: 'https://github.com/ouuan/course-assignments/tree/master/digital-design',
    description: dinoDescription,
    image: dinoImage,
    alt: 'Playing the Dino game',
    time: 'Spring 2023',
    video: 'https://www.bilibili.com/video/av230053693/',
  },
  {
    title: 'CP Editor: IDE for Competitive Programming',
    code: 'https://github.com/cpeditor/cpeditor',
    description: cpeditorDescription,
    image: cpeditorImage,
    alt: 'Screenshot of CP Editor with the classic A+B problem',
    time: 'Since 2019',
  },
];
