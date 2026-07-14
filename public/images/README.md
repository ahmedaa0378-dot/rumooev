# /public/images

Drop the real brand assets here. Until a file exists, the site renders a labeled
neutral placeholder in its place (see `components/Figure.tsx`).

Expected files (referenced by `lib/images.ts`):

- `logo-dark.svg` / `logo-light.svg` — wordmark art (currently a text wordmark fallback)
- `hero-scooter.png` — homepage hero, dark-background cut-out, transparent PNG
- `rumoo-lite.jpeg` — Lite model
- `rumoo-hs.jpeg` — HS model
- `rumoo-ultra.jpeg` — Ultra model

When you add a file, set its `available: true` flag in `lib/images.ts` (or just
pass a real `src` to `<Figure>`), and it will render through `next/image`.
