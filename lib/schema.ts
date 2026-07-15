// JSON-LD structured-data builders (schema.org). Rendered via <JsonLd>. All
// facts here must stay consistent with CONTENT.md / lib/site.ts — do not invent.
import { SITE } from '@/lib/site';
import type { FaqItem } from '@/lib/faq';

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;
const HERO_IMAGE = `${SITE.url}/images/hero-scooter.jpg`;
const PHONE = '+919099095698';

const abs = (path: string) => (path === '/' ? SITE.url : `${SITE.url}${path}`);

// --- Organization (home) -----------------------------------------------------
// sameAs URLs are PLACEHOLDERS — swap for the real LinkedIn/Instagram/YouTube.
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'RumooEV',
  url: SITE.url,
  logo: `${SITE.url}/images/rumoo-logo.png`,
  description:
    'Enterprise EV Fleet Lease-to-Own platform. Businesses lease electric delivery scooters on a 24-month plan, then own the fleet.',
  email: SITE.email,
  telephone: PHONE,
  areaServed: 'IN',
  address: [
    { '@type': 'PostalAddress', addressRegion: 'Gujarat', addressCountry: 'IN' },
    { '@type': 'PostalAddress', addressRegion: 'Telangana', addressCountry: 'IN' },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: PHONE,
    contactType: 'sales',
    email: SITE.email,
    areaServed: 'IN',
  },
  sameAs: [
    'https://www.linkedin.com/company/rumooev',
    'https://www.instagram.com/rumooev',
    'https://www.youtube.com/@rumooev',
  ],
};

// --- WebSite (root layout, site-wide) ---------------------------------------
// No SearchAction: the site has no on-site search.
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'RumooEV',
  url: SITE.url,
  description:
    'Enterprise EV Fleet Lease-to-Own in India — electric delivery fleets on a 24-month plan that ends in company ownership.',
  inLanguage: 'en-IN',
  publisher: { '@id': ORG_ID },
};

// --- WebPage (every page) ----------------------------------------------------
export function webPageSchema(opts: { path: string; name: string; description: string }) {
  const url = abs(opts.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'en-IN',
    primaryImageOfPage: HERO_IMAGE,
  };
}

// --- BreadcrumbList (non-home pages) ----------------------------------------
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

// --- FAQPage (/pricing PRC-5, /riders RID-5) --------------------------------
export function faqPageSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

// --- Service (/business): the 24-month Lease-to-Own program ------------------
export const leaseServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '24-Month Lease-to-Own EV Fleet',
  serviceType: 'Enterprise EV fleet leasing',
  description:
    'A fully managed electric delivery fleet on a 24-month Lease-to-Own plan. After 24 months, 100% ownership of every scooter transfers to the business. Insurance, maintenance, breakdown support and replacement vehicles are included; deployed pan-India.',
  provider: { '@id': ORG_ID },
  areaServed: { '@type': 'Country', name: 'India' },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: 4500,
    highPrice: 5500,
    priceRange: '₹4,500–₹5,500 per scooter per month',
  },
};

// --- Product (/scooters): Lite, HS, Ultra share one spec sheet ---------------
// Shared specs only (CLAUDE.md: never motor wattage; no fabricated per-model diffs).
const SHARED_SPECS = [
  { '@type': 'PropertyValue', name: 'Top speed', value: '40 km/h' },
  { '@type': 'PropertyValue', name: 'Range', value: '80–100 km' },
  { '@type': 'PropertyValue', name: 'Battery', value: '1.8 kWh swappable lithium-ion' },
  { '@type': 'PropertyValue', name: 'Loading capacity', value: '180 kg' },
] as const;

export function scooterProductSchema(opts: { name: string; image: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: opts.name,
    image: `${SITE.url}${opts.image}`,
    description: opts.description,
    brand: { '@type': 'Brand', name: 'Rumoo' },
    category: 'Electric delivery scooter',
    additionalProperty: SHARED_SPECS.map((s) => ({ ...s })),
  };
}

// --- LocalBusiness (two offices) --------------------------------------------
// City-only for now — swap in street addresses when provided.
export const officeSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE.url}/#office-gujarat`,
    name: 'RumooEV — Gujarat',
    parentOrganization: { '@id': ORG_ID },
    url: SITE.url,
    image: HERO_IMAGE,
    telephone: PHONE,
    email: SITE.email,
    priceRange: '₹₹',
    address: { '@type': 'PostalAddress', addressRegion: 'Gujarat', addressCountry: 'IN' },
    areaServed: { '@type': 'Country', name: 'India' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE.url}/#office-telangana`,
    name: 'RumooEV — Telangana',
    parentOrganization: { '@id': ORG_ID },
    url: SITE.url,
    image: HERO_IMAGE,
    telephone: PHONE,
    email: SITE.email,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      addressCountry: 'IN',
    },
    areaServed: { '@type': 'Country', name: 'India' },
  },
];
