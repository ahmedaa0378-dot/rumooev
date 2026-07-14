import { Inter, Poppins } from 'next/font/google';

// next/font/google self-hosts: Next downloads the font files at build time and
// serves them from our own domain. No runtime request to any external font CDN.
export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});
