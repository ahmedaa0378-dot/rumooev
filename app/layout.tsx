import type { Metadata } from 'next';
import { inter, poppins } from '@/lib/fonts';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';
import { RequestModalProvider } from '@/components/RequestModalProvider';
import { SITE } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'RumooEV — Enterprise EV Fleet Lease-to-Own in India',
    template: '%s · RumooEV',
  },
  description:
    'RumooEV leases electric delivery fleets to businesses on a 24-month Lease-to-Own plan — fully managed, deployed pan-India. After 24 months, every scooter belongs to your company.',
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RumooEV — Enterprise EV Fleet Lease-to-Own in India',
    description:
      'Deploy an electric delivery fleet with zero upfront investment. Fixed monthly lease for 24 months — then every scooter belongs to your company.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-paper">
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
