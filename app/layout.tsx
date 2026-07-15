import type { Metadata } from 'next';
import { inter, poppins } from '@/lib/fonts';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';
import { RequestModalProvider } from '@/components/RequestModalProvider';
import { JsonLd } from '@/components/JsonLd';
import { SITE } from '@/lib/site';
import { OG_IMAGE } from '@/lib/seo';
import { websiteSchema } from '@/lib/schema';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'RumooEV — Enterprise EV Fleet Lease-to-Own in India',
    template: '%s · RumooEV',
  },
  description:
    'RumooEV: enterprise EV fleet leasing in India on a 24-month Lease-to-Own plan. After 24 months, every scooter belongs to your company. Pan-India.',
  applicationName: 'RumooEV',
  keywords: [
    'Enterprise EV Fleet Leasing',
    'Electric Scooter Leasing India',
    'Lease to Own EV',
    'Fleet Lease India',
    'Last Mile Delivery EV',
    'Commercial EV Leasing',
    'Electric Scooter Rental for Delivery Riders',
  ],
  openGraph: {
    type: 'website',
    siteName: 'RumooEV',
    title: 'RumooEV — Enterprise EV Fleet Lease-to-Own in India',
    description:
      'Deploy an electric delivery fleet with zero upfront investment. Fixed monthly lease for 24 months — then every scooter belongs to your company.',
    url: SITE.url,
    locale: 'en_IN',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RumooEV — Enterprise EV Fleet Lease-to-Own in India',
    description:
      'Deploy an electric delivery fleet with zero upfront investment. Fixed monthly lease for 24 months — then every scooter belongs to your company.',
    images: [OG_IMAGE.url],
  },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-paper">
        <JsonLd data={websiteSchema} />
        <RequestModalProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <Chatbot />
        </RequestModalProvider>
      </body>
    </html>
  );
}
