# SITEMAP.md — Rumoo.ev Website Structure

Routes, section-by-section page layouts, and functional specs. Copy for every section is in CONTENT.md — reference by section ID (e.g. `HOME-1`).

## Routes

| Route | Page | Audience |
|---|---|---|
| `/` | Home | Both, B2B-led |
| `/business` | Enterprise Fleet Leasing (Lease-to-Own) | B2B |
| `/riders` | Ride with Rumoo (Ultra rental) | B2C |
| `/scooters` | The Fleet — Lite, HS, Ultra | Both |
| `/pricing` | B2B Pricing + Savings Calculator | B2B |
| `/why-rumoo` | Lease vs Buy, What's Included, Service Policy | B2B |
| `/about` | Company, mission, offices | Both |
| `/contact` | Contact / Book a Pilot | Both |

Header nav: Business · Riders · Scooters · Pricing · Why Rumoo · About — plus a green "Book a Pilot" button (→ /contact). Mobile: full-screen sheet.
Footer: four columns — For Businesses / For Riders / Company / Contact — plus legal line. Floating WhatsApp button on all pages.

---

## Page structures

### `/` Home
1. **HOME-1 Hero** — dark band (`ink` background). Left: headline + subline + two CTAs ("Book a Pilot" primary green → /contact, "Explore Pricing" outline → /pricing). Right: hero scooter image. Orchestrated entrance animation. Small badge row under CTAs: "24-Month Lease-to-Own · 95% Uptime SLA · Pan-India".
2. **HOME-2 Ownership story** — white. Three-step visual: Lease → Operate → Own. The signature section of the site (see Design signature note below).
3. **HOME-3 Two audiences** — mist background. Two large cards side by side: "For Businesses" (→ /business) and "For Riders" (→ /riders).
4. **HOME-4 Stats band** — animated counters (values in CONTENT.md).
5. **HOME-5 What we handle** — six-card grid (leasing, maintenance, insurance, battery swapping, support, ownership transfer).
6. **HOME-6 Industries** — logo-free industry tiles: Quick Commerce, Food Delivery, Logistics, E-commerce, Corporate & Campus.
7. **HOME-7 The scooters** — three ModelCards (Lite, HS, Ultra) → /scooters.
8. **HOME-8 Deployment stepper (condensed)** — 4 milestones from the 7-step timeline, link to /why-rumoo.
9. **HOME-9 CTA band** — dark. Headline + Book a Pilot button.

### `/business`
1. **BIZ-1 Hero** — white, left copy right image. CTA: Book a Pilot.
2. **BIZ-2 How Lease-to-Own works** — 3 steps + ownership-transfer callout card.
3. **BIZ-3 Everything included** — 8-item checklist grid (scooter, insurance, maintenance, breakdown support, replacement vehicle, account manager, fleet support, ownership transfer).
4. **BIZ-4 Optional add-ons** — pill list: battery swapping subscription, additional battery packs, fast charging, GPS & fleet analytics, on-site service engineer. Note: charged separately.
5. **BIZ-5 Commercial terms** — clean two-column definition table (tenure, minimum fleet, deposit, payment, uptime, replacement window, GST, territory).
6. **BIZ-6 Deployment timeline** — full 7-step Stepper, Day 0 → Day 20.
7. **BIZ-7 Service & response commitments** — 4 stat cards: 15-min breakdown acknowledgment, 2-hr technician assignment, 24-hr on-site resolution, 3–5 day replacement.
8. **BIZ-8 CTA band.**

### `/riders`
1. **RID-1 Hero** — energetic but on-brand. Ultra image. CTA: "Book Your Scooter" → anchors to RID-4 form.
2. **RID-2 Why ride Rumoo** — 4 cards: earn more (40 km/h, 80–100 km range), swappable battery (no charging downtime), maintenance covered, plans from ₹200/day.
3. **RID-3 How it works** — 3-step: enquire → verify documents → ride.
4. **RID-4 Booking form** — LeadForm variant: name, phone, city, preferred model (fixed: Ultra), start date. Submits to /api/lead with `type: "rider"`. Success state: "We'll WhatsApp you within 24 hours."
5. **RID-5 FAQ** — rider-specific accordion.

### `/scooters`
1. **SCT-1 Hero** — "The Fleet" intro.
2. **SCT-2 Model showcase** — three alternating full-width blocks (image one side, copy the other): Lite (B2B), HS (B2B), Ultra (Riders). Each has a "Built for" badge and CTA (business models → /contact, Ultra → /riders).
3. **SCT-3 Shared spec table** — single SpecTable, applies to all models. Swappable battery gets a highlighted callout card beside the table.
4. **SCT-4 Use cases** — Perfect-for strip: e-commerce, food delivery, quick commerce, corporate & campuses.
5. **SCT-5 CTA band.**

### `/pricing`
1. **PRC-1 Hero** — "Flexible plans. Maximum value."
2. **PRC-2 B2B pricing table** — 6 fleet-size tiers × weekly + monthly rates. Footnotes: GST extra; battery swapping optional/extra; 5,000+ = custom enterprise pricing. Every-plan-includes badge strip below.
3. **PRC-3 Savings Calculator** — interactive (spec below).
4. **PRC-4 Rider pricing teaser** — one card: "Riding solo? Plans from ₹200/day" → /riders.
5. **PRC-5 FAQ** — pricing/commercial accordion (with FAQ JSON-LD).
6. **PRC-6 CTA band** — "Get a custom proposal."

### `/why-rumoo`
1. **WHY-1 Hero.**
2. **WHY-2 Lease vs Buy comparison** — two-column comparison table across 7 dimensions (capital outlay, cash flow, maintenance, downtime, flexibility, ownership risk, end of term).
3. **WHY-3 The bottom line** — 4 benefit cards.
4. **WHY-4 Service & replacement policy** — coverage list + response-time commitments + 5-step service process stepper.
5. **WHY-5 Sustainability** — zero tailpipe emissions, quieter cities, lower energy cost per km.
6. **WHY-6 CTA band.**

### `/about`
1. **ABT-1 Mission & vision.**
2. **ABT-2 What we do** — plain-language explanation of the model.
3. **ABT-3 Presence** — Pan-India operations; offices in Gujarat & Telangana. Simple map graphic or two office cards.
4. **ABT-4 CTA band.**

### `/contact`
1. **CON-1 Split layout** — left: contact details, WhatsApp deep link (https://wa.me/919099095698), offices. Right: LeadForm with reason dropdown: Book a Pilot / Fleet Enquiry / Rider Booking / Partnership / Other. Fields: name, company (optional for riders), phone, email, city, fleet size (shown only for business reasons), message.
2. Success state with expected response time (within 1 business day).

---

## Savings Calculator spec (PRC-3)

Purpose: honest, CFO-credible comparison of leasing vs buying, framed on **capital preservation and total cost of operations**, not a fabricated savings percentage.

**Inputs**
- Fleet size: slider 50–5,000 (log-ish steps: 50, 100, 250, 500, 1000, 2500, 5000), default 100.
- Tenure: fixed 24 months (display only).

**Assumptions object** (single source of truth, easy to edit later — mark values `TO_VALIDATE` in code comments):
```ts
const ASSUMPTIONS = {
  buyPricePerScooter: 60000,        // TO_VALIDATE with Rumoo
  maintenancePerScooter24mo: 9600,
  insurancePerScooter24mo: 3600,
  batteryReplacementPerScooter: 6000,
  downtimeCostBuyPerScooter: 4800,
  downtimeCostLeasePerScooter: 1200,
  otherCostsBuyPerScooter: 3000,    // tax, registration, AMC
};
```

**Lease rate** auto-selected from fleet size tier (see CONTENT.md PRC-2 table).

**Outputs displayed**
1. **Upfront capital required:** Lease ₹0 (plus 2-month refundable deposit, shown as footnote) vs Buy = fleet × buyPrice. Headline: "₹X crore of working capital stays in your business."
2. **Predictable monthly outflow:** fleet × tier rate.
3. **What's bundled in the lease** (checkmarks): maintenance, insurance, battery, breakdown support, replacement vehicle — with the buy-side equivalent cost shown struck-through/summed.
4. **Ownership note:** "After 24 months, all X scooters belong to you."

Do NOT display a "total savings" rupee figure or percentage unless lease TCO is genuinely lower at the computed numbers. If buy TCO < lease TCO, the module emphasizes zero capex + inclusions + ownership instead. Disclaimer line: "All values are estimates, exclusive of GST. Actual figures depend on usage, routes, and deployment location."

---

## Design signature (one bold element)

The HOME-2 "Lease → Operate → Own" section is the site's signature: a horizontal 24-month progress rail that fills green on scroll, with the scooter silhouette traveling along it and the endpoint flipping a badge from "Leased" to "Owned by you". Keep it performant (SVG + Framer Motion scroll progress). Everything else on the site stays quiet and disciplined.

## Build order

1. Design tokens, layout shell (Navbar, Footer, CTABand, WhatsAppButton)
2. Home
3. /pricing (incl. calculator)
4. /business
5. /scooters
6. /riders
7. /why-rumoo, /about, /contact
8. SEO pass (metadata, sitemap.xml, robots.txt, JSON-LD), Lighthouse pass

## Assets

Place provided images in `/public/images/`: logo (dark + light variants), rumoo-lite.jpeg, rumoo-ultra.jpeg, rumoo-hs.jpeg, plus brochure lifestyle shots. If an image is missing, use a neutral gray placeholder block with the image name labeled — never a stock photo.
