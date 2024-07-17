import { Creepster as CreepsterFont } from 'next/font/google';

const creepster = CreepsterFont({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  fallback: ['Arial', 'sans-serif'],
  variable: '--font-family-secondary',
});

export default creepster;
