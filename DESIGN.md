# DESIGN.md — RumooEV Visual Design Specification

This file is the authority on how the site looks and feels. CLAUDE.md summarizes the design system; where detail differs, DESIGN.md wins. The goal: a site that reads like Tesla/Stripe built an Indian enterprise mobility brand — white, precise, confident — with one memorable signature moment.

## 1. Design personality

Three words: **precise, assured, electric.**
- Precise: strict 8px grid, aligned baselines, disciplined spacing. Nothing floats arbitrarily.
- Assured: big declarative headlines, real numbers, no exclamation marks, no decoration for its own sake.
- Electric: green used like a current — thin accents, highlighted numbers, the progress rail — never as paint poured over whole sections.

Anti-goals: startup gradient meshes, glassmorphism, emoji in UI, stocky "team high-fiving" photos, more than one font pairing, dark mode (not in v1).

## 2. Color usage rules

| Token | Hex | Use |
|---|---|---|
| `paper` | #FFFFFF | Default page background |
| `mist` | #F4F7F5 | Alternate sections, card fills |
| `ink` | #0A0F0C | Dark bands (hero, CTA, footer), headline text |
| `charcoal` | #1C2420 | Cards on dark bands, secondary dark |
| `brand-green` | #16A34A | CTAs, links, key numbers, active states |
| `brand-green-light` | #DCFCE7 | Badges, tinted callouts, hover fills |
| `slate-text` | #55605A | Body text on white |
| `line` | #E5EAE7 | Borders, dividers, table rules |

Rules:
- Page rhythm: white → mist → white → dark. Never two dark bands adjacent; never more than 3 dark bands per page (hero, CTA, footer).
- Green text only on white/mist; on dark backgrounds use green for buttons/accents, white for text.
- Key numbers (₹0, 24 months, 95%) get `brand-green` + Poppins 700 wherever they appear in body copy.

## 3. Typography

- Display: **Poppins** — 700 for H1/H2, 600 for H3/card titles. Letter-spacing -0.02em above 32px.
- Body/UI: **Inter** — 400 body, 500 UI labels, 600 buttons/emphasis.
- Eyebrow labels: Inter 600, 13px, uppercase, +0.08em tracking, `brand-green`.

Scale (desktop / mobile):
- H1 hero: 64px / 38px, line-height 1.05
- H2 section: 40px / 30px, line-height 1.15
- H3 card: 22px / 20px
- Body: 17px / 16px, line-height 1.65, max-width 65ch
- Caption/footnote: 14px, `slate-text`

Headlines are sentence case ("Lease today. Own tomorrow.") — never all-caps except eyebrows.

## 4. Layout & spacing

- Container: max-width 1200px, side padding 24px mobile / 32px tablet / 48px desktop.
- Section vertical padding: 112px desktop / 64px mobile. Hero: 140px top desktop.
- Grid: 12-col desktop, 4-col mobile. Card grids: 3-up desktop → 2-up tablet → 1-up mobile (gap 24px).
- Radius: cards 16px, buttons 12px, badges/pills 999px, images 20px.
- Borders over shadows. Allowed shadow (hover only): `0 8px 24px rgb(10 15 12 / 0.08)`.

## 5. Component specs

### Buttons
- Primary: `brand-green` fill, white Inter 600 16px, 14px 28px padding, radius 12px. Hover: darken to #15803D + translate-y -1px. Focus: 2px offset green ring.
- Secondary (on white): 1.5px `ink` border, ink text. Hover: ink fill, white text.
- Secondary (on dark): 1.5px white border, white text. Hover: white fill, ink text.
- Never more than two buttons side by side; primary always left.

### Navbar
- 72px tall, white with bottom `line` border. Transparent over the dark homepage hero, gains white bg + border after 40px scroll (smooth transition).
- Logo left (dark version on white, light version over hero). Links Inter 500 15px, `ink`; active link green underline (2px, 4px offset). "Book a Pilot" primary button right.
- Mobile: hamburger → full-screen white sheet, links at 28px Poppins 600, staggered fade-in.

### Cards
- White fill, 1px `line` border, radius 16px, padding 32px. Icon top (see §7), H3, 2–3 line body.
- Hover: border → `brand-green` at 40% opacity + allowed shadow. No lift-scale.

### Tables (pricing, specs, lease-vs-buy)
- No vertical rules. Header row: `mist` fill, Inter 600 13px uppercase labels. Rows separated by `line` hairlines, 20px cell padding.
- Pricing table: monthly price column in Poppins 600 20px `ink`; the row matching calculator selection highlights `brand-green-light`.
- Lease vs Buy: two value columns; Rumoo column has green check icons and a subtle `brand-green-light` header chip; Buy column uses neutral grey crosses — informative, not cartoonishly negative.

### Stepper (deployment timeline)
- Desktop: horizontal rail, numbered green nodes (28px circles, white numeral), connecting 2px `line` that fills green on scroll. Day range as caption under each step.
- Mobile: vertical rail, left-aligned.

### Forms
- Inputs: 52px tall, 1px `line` border, radius 12px, white fill, 16px text. Focus: `brand-green` border + light green ring. Labels above (Inter 500 14px), never placeholder-as-label.
- Errors: #DC2626 text + border, message below field. Success state replaces form with a centered check icon + message.

### Accordion (FAQ)
- Full-width rows divided by hairlines, question Inter 600 17px, plus/minus icon right rotating 45°. Answer max-width 65ch, `slate-text`. One open at a time.

### CTA band
- `ink` background, centered: H2 white, one-line subtext, primary green button. Subtle background texture allowed: faint 1px grid or a single large translucent Rumoo bolt mark at 4% opacity, right-aligned. Nothing busier.

### Floating WhatsApp button
- 56px circle, #25D366, bottom-right 24px, subtle shadow, appears after 300px scroll. Tooltip "Chat with us" on hover.

## 6. The signature: "Lease → Own" rail (HOME-2)

The one bold element on the site. A horizontal SVG rail spanning the section:
- Left endpoint labeled "Day 1 — Leased", right endpoint "Month 24 — Owned by you".
- As the section scrolls through the viewport, the rail fills `brand-green` left-to-right (Framer Motion `useScroll` + `useTransform`) and a minimal scooter glyph travels along it.
- At ~90% progress the right endpoint badge flips from an outlined "Leased" chip to a filled green "Owned" chip with a check.
- The three step cards (Lease / Operate / Own) sit below the rail, each activating (border → green) as the fill passes it.
- Reduced motion: rail renders fully filled, badges static, cards all active.
- Keep everything else on the page quiet so this moment carries.

## 7. Iconography & imagery

- Icons: outline style, 1.5px stroke, 24px grid — use Lucide (`lucide-react`) exclusively for consistency. Icon color `ink`; the icon's containing chip may be `brand-green-light` (40px rounded square).
- Photography: only the provided scooter images. Treatment: on white sections, place scooters on transparent/white; on dark hero use the dark-background shots. Images get radius 20px when framed, or sit unframed when cut-out style.
- No stock photography, no AI-looking illustration, no 3D clip-art. If an asset is missing, use a labeled neutral placeholder block.

## 8. Motion inventory (complete list — nothing beyond this)

1. Homepage hero entrance: headline words rise+fade (staggered 60ms), scooter image fades in from 24px right, badges fade last. Total ≤ 900ms.
2. Scroll reveals: sections fade-up 16px, 0.5s ease-out, once.
3. Card grids: children stagger 80ms.
4. Stat counters: count up over 1.2s when in view, once.
5. The signature rail (§6).
6. Micro: button hover lift, card border tint, accordion rotate.

`prefers-reduced-motion`: kill all transforms and counters (render final values), keep opacity-only fades ≤ 200ms.

## 9. Accessibility & quality floor

- Contrast: body text ≥ 4.5:1 (slate-text on white passes; verify green text usage is ≥ 24px or bold when on mist).
- Visible focus rings on every interactive element (green, 2px, offset).
- All functionality keyboard-operable; accordion and mobile nav trap/restore focus correctly.
- One `h1` per page; landmarks (`header/main/footer/nav`) present.
- Touch targets ≥ 44px.

## 10. Page-level art direction notes

- **Home hero (dark):** ink background, left-aligned text block (max 560px), scooter image right bleeding slightly off-frame bottom-right. A single thin green horizontal line under the eyebrow. No particles, no glow orbs.
- **/scooters showcase:** alternating image/text rows, images large (min 45% width), plenty of air. "Built for" badge sits above each model name.
- **/pricing:** the calculator is the visual centerpiece — give it a mist-filled, green-bordered panel wider than the text column.
- **/riders:** slightly warmer energy is allowed (larger imagery, green used a touch more freely) but same system — it must still look like the same company.
- **Footer:** ink background, four columns, small logo, hairline top border in charcoal, sign-off strip "Smart Fleet. Faster Deliveries. Greener Tomorrow." in green above the legal line.
