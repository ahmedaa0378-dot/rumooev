# CLAUDE.md — Rumoo.ev Website

This file governs everything you build in this repository. Read it fully before writing any code. When in doubt, follow this file over your own defaults.

## What this project is

Rumoo.ev is a pan-India Enterprise EV Fleet Lease-to-Own platform with offices in Gujarat and Telangana. It is NOT an EV manufacturer. Two business lines:

1. **B2B (primary):** Businesses lease electric scooters (models: Rumoo HS, Rumoo Lite) on a 24-month Lease-to-Own plan. After 24 months, 100% ownership transfers to the customer. This ownership transfer is the core differentiator — every page should reinforce it.
2. **B2C (secondary):** Individual riders (gig/delivery workers) book the Rumoo Ultra on daily rental plans from ₹200/day.

Primary audience: fleet procurement decision-makers at quick commerce, food delivery, logistics, and e-commerce companies. Secondary audience: individual delivery riders.

Brand line: "Electric Mobility. Endless Possibilities."
Sign-off line: "Smart Fleet. Faster Deliveries. Greener Tomorrow."

## Tech stack (do not substitute)

- Next.js 14+ (App Router), TypeScript strict mode
- Tailwind CSS
- Framer Motion for animation
- next/font for Poppins + Inter (self-hosted, no external font CDN)
- next/image for all imagery
- Deployed on Vercel

No CSS-in-JS libraries, no component libraries (no MUI/Chakra/shadcn) — build components from scratch per the design system below.

## Design system

### Colors (Tailwind config tokens)

- `brand-green`: #16A34A (primary accent — CTAs, highlights, key numbers)
- `brand-green-light`: #DCFCE7 (tinted backgrounds, badges)
- `ink`: #0A0F0C (near-black — dark sections, headlines on white)
- `charcoal`: #1C2420 (dark section backgrounds, secondary dark)
- `paper`: #FFFFFF (default page background)
- `mist`: #F4F7F5 (alternate section background, cards)
- `slate-text`: #55605A (body text on white)

Rules: white-dominant site. Dark (`ink`/`charcoal`) sections are reserved for high-impact moments only — the homepage hero, pricing CTA band, and footer. Never more than one dark band between two white sections. Green is an accent, never a background for large areas.

### Typography

- Display/headlines: Poppins (600/700). Tight tracking (-0.02em) on large sizes.
- Body/UI: Inter (400/500/600).
- Type scale: hero 56–72px desktop / 36–40px mobile; section titles 36–44px; body 16–18px; captions/labels 13–14px uppercase with letter-spacing.
- Headlines are short and declarative. Sentence case, not title case, except nav items.

### Layout

- Max content width 1200px, generous whitespace (section padding ≥ 96px desktop / 56px mobile).
- 8px spacing grid.
- Border radius: 16px cards, 12px buttons, 999px pills/badges.
- Shadows: subtle only (`0 1px 3px rgb(0 0 0 / 0.06)`); prefer borders (`1px solid #E5EAE7`) over shadows.
- Fully responsive down to 360px. Mobile nav is a full-screen sheet.

### Motion

- Framer Motion. Scroll-triggered fade-up reveals (12–20px translate, 0.5s, ease-out), staggered children on card grids, animated number counters for stats.
- One orchestrated hero entrance on the homepage. Everything else is quiet.
- Respect `prefers-reduced-motion` — disable all transforms, keep opacity fades.

### Components

Build these as reusable components in `/components`: `Button` (primary green, secondary outline, dark variants), `SectionHeading` (eyebrow label + title + subtitle), `StatCounter`, `Card`, `SpecTable`, `PricingTable`, `Stepper` (deployment timeline), `Accordion` (FAQ), `LeadForm`, `SavingsCalculator`, `ModelCard`, `Navbar`, `Footer`, `CTABand`, `WhatsAppButton` (floating).

## Brand & content rules (hard constraints)

1. **NEVER claim** "No RTO Registration required", "No Driving Licence required", or "low-speed / L1 exemption". These scooters are 40 km/h vehicles. Any legacy copy containing these claims must not be used.
2. **Never display motor wattage.** Specs shown are only: 40 km/h top speed, 80–100 km range, 1.8 kWh swappable lithium-ion battery, 180 kg loading capacity, 70 kg vehicle weight, tubeless tyres, anti-theft alarm, keyless entry, USB charging, digital display.
3. **Never invent savings figures, client names, testimonials, or fleet-size statistics.** Use only numbers provided in CONTENT.md.
4. All three models share the same published spec sheet. Do not fabricate spec differences between Lite, HS, and Ultra.
5. B2C pricing is shown only as "from ₹200/day". Never show a full B2C rate card.
6. B2B pricing tiers are public and shown exactly as listed in CONTENT.md. Always note "GST extra" and "Battery swapping optional, charged separately".
7. Tone: confident, plain, specific. No buzzwords ("revolutionize", "seamless", "cutting-edge", "unleash"). Short sentences. Numbers over adjectives.
8. Currency format: ₹5,500 (Indian grouping: ₹1,32,000). Use the ₹ symbol, never "Rs." or "INR" in display copy.

## Contact details (use exactly these)

- Phone/WhatsApp: +91 90990 95698
- Email: info@rumoo.ev
- Website: www.rumoo.ev
- Offices: Gujarat & Telangana · Pan-India operations

## Code standards

- Every page exports proper Next.js `metadata` (title, description, OpenGraph).
- Semantic HTML, one `h1` per page, visible keyboard focus states.
- All images through `next/image` with meaningful `alt`.
- Lighthouse targets: 95+ performance, 100 accessibility/SEO on key pages.
- Forms: client-side validation + a `/api/lead` route handler that logs the payload (stub for CRM integration later). Include honeypot field for spam.
- Copy lives in CONTENT.md — implement it verbatim. Do not write placeholder lorem ipsum anywhere.
- Structure and routes are defined in SITEMAP.md — follow it exactly.

## SEO

Target keywords (weave naturally into headings/metadata, never stuff): Enterprise EV Fleet Leasing, Electric Scooter Leasing India, Lease to Own EV, Fleet Lease India, Last Mile Delivery EV, Commercial EV Leasing, Electric Scooter Rental for Delivery Riders.

Generate: sitemap.xml, robots.txt, JSON-LD Organization schema on the homepage, and FAQ schema on the pricing page.
