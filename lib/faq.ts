// Single source of truth for FAQ content (verbatim from CONTENT.md). Shared by
// the pricing/rider pages (accordions) and the chatbot.

export type FaqItem = { q: string; a: string };

// PRC-5 — business / pricing FAQ.
export const BUSINESS_FAQ: FaqItem[] = [
  {
    q: 'What happens after 24 months?',
    a: 'Ownership of every scooter in your fleet is transferred to your company, at no additional cost. The fleet becomes your asset.',
  },
  {
    q: 'Is there a minimum fleet size?',
    a: 'Yes — 50 scooters. For 50–99 scooters, contact us for a custom quote; published tiers start at 100.',
  },
  {
    q: "What's included in the monthly lease?",
    a: 'The scooter, comprehensive insurance, preventive maintenance, breakdown support, replacement vehicles, fleet support, and a dedicated account manager.',
  },
  {
    q: 'What costs extra?',
    a: 'GST, and optional add-ons: battery swapping subscriptions, additional battery packs, fast charging infrastructure, GPS & fleet analytics, and on-site service engineers.',
  },
  {
    q: 'Is there a security deposit?',
    a: "Yes — two months' lease amount, collected at onboarding.",
  },
  {
    q: 'How fast can you deploy?',
    a: 'Typically 15–20 days from agreement to on-road, depending on fleet size and location.',
  },
  {
    q: 'Do you operate in my city?',
    a: "We support deployments pan-India, with offices in Gujarat and Telangana. Share your locations and we'll confirm coverage.",
  },
];

// RID-5 — rider FAQ.
export const RIDER_FAQ: FaqItem[] = [
  {
    q: 'What documents do I need?',
    a: 'A valid driving licence and standard KYC documents (Aadhaar/PAN). Our team will guide you through verification.',
  },
  {
    q: 'What does ₹260/day include?',
    a: "The scooter, maintenance, and breakdown support. Final plan pricing depends on your city and rental duration — we'll confirm before you book.",
  },
  {
    q: 'How does battery swapping work?',
    a: 'The Ultra runs on a swappable battery. Swap a low battery for a charged one at a partner point in minutes.',
  },
  {
    q: 'What if the scooter breaks down?',
    a: 'Call or WhatsApp our support line. Breakdown assistance is included with every plan.',
  },
  {
    q: 'Which cities are you in?',
    a: "We operate pan-India with offices in Gujarat and Telangana. Tell us your city in the form and we'll confirm availability.",
  },
];
