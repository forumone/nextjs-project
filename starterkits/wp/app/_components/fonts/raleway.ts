import { Raleway } from 'next/font/google';

const raleway = Raleway({
  display: 'auto',
  subsets: ['latin'],
  weight: 'variable',
  fallback: ['Arial', 'sans-serif'],
  variable: '--font-family-secondary',
});

export default raleway;
