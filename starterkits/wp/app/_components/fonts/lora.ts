import { Lora } from 'next/font/google';

const lora = Lora({
  display: 'auto',
  subsets: ['latin'],
  weight: 'variable',
  fallback: ['Georgia', 'serif'],
  variable: '--font-family-primary',
});

export default lora;
