// Single source of truth for global site data drawn verbatim from CONTENT.md.
// Do not add copy here that isn't in CONTENT.md.

export const SITE = {
  name: 'RumooEV',
  url: 'https://www.rumooev.com',
  brandLine: 'Electric Mobility. Endless Possibilities.',
  signOff: 'Smart Fleet. Faster Deliveries. Greener Tomorrow.',
  phoneDisplay: '+91 90990 95698',
  phoneRaw: '919099095698',
  email: 'business@rumooev.com',
  offices: 'Gujarat & Telangana',
  presence: 'Pan-India operations',
  whatsapp: 'https://wa.me/919099095698',
} as const;

// Header nav — CONTENT.md Global + SITEMAP.md
export const NAV_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Why Rumoo', href: '/why-rumoo' },
  { label: 'Business', href: '/business' },
  { label: 'Riders', href: '/riders' },
  { label: 'Scooters', href: '/scooters' },
  { label: 'Pricing', href: '/pricing' },
] as const;

// Footer columns — CONTENT.md Global
export const FOOTER_COLUMNS = [
  {
    title: 'For Businesses',
    links: [
      { label: 'Lease-to-Own', href: '/business' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Deployment', href: '/business#deployment' },
      { label: 'Service Policy', href: '/why-rumoo#service' },
    ],
  },
  {
    title: 'For Riders',
    links: [
      { label: 'Ride with Rumoo', href: '/riders' },
      { label: 'Book a Scooter', href: '/riders#book' },
      { label: 'Rider FAQ', href: '/riders#faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Scooters', href: '/scooters' },
      { label: 'Contact', href: '/contact' },
    ],
  },
] as const;

export const LEGAL_LINE =
  '© 2026 RumooEV. All prices exclusive of GST. Battery swapping services optional and billed separately.';
