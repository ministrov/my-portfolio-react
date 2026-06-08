# Plan: Testimonials Section ("Kind words from satisfied clients")

## Context

New homepage section: client testimonials carousel. Built from the reference mockups —
a centered Swiper of quote cards with a two-tone gradient heading, plus a "trusted by"
brand-logo strip beneath. The reference mockups are dark, but the live site is light
(white body, light/gray sections); per the locked decision below this section is a
**light adaptation** of the dark mockup — same layout, the project's light palette.

Reference (desktop): large centered card (~75% width) with neighbouring cards peeking and
dimmed on both sides; quote text, then avatar + name + position; brand-logo row below.
Reference (mobile): single full-width card per view, logos wrap to a 2-row grid.

**Decisions already locked (asked 2026-06-08):**

- **Placement:** after `Advantages` → `Faq` becomes `Advantages → Testimonials → Faq → Contact`.
- **Logo strip:** included, rendered via `react-icons` (no new image assets).
- **Avatars:** CSS initials (coloured circle + initials), no avatar image files.
- **Theme:** **light adaptation** (decided 2026-06-08, see below).

---

## Theme decision (the central design call) — RESOLVED: light adaptation

**Verified against the real code, not the mockup:**

- `body` has `background-color: var(--color-white)` — the live site is **light**.
- `AnimatedBackground` (`.background`) is `position: fixed; z-index: -1` and **transparent** —
  it only paints faint glowing star dots over the white body. It does **not** make the page
  dark. The `Hero` (no background-color) therefore renders **light** in the running app; its
  darkness exists only in the Figma mockup.

So the dark reference cannot be reproduced by "transparency over a dark page" (there is no
dark page). Making it dark would require an opaque dark island — which the user declined.
**Decision: adapt the layout to the project's light palette.**

- **Section background:** light. Match the established section idiom — either the
  `--color-gray-600`/`--color-gray-100` wash used by `About`, or transparent over the body.
  No new color token needed (the earlier `--color-navy-900` idea is dropped).
- **Heading:** mirrors the **Hero title pattern** (large lead + `var(--gradient)` accent
  clipped to the accent words) — **not** the small `Heading` "ОБО МНЕ" component. Lead text
  is dark (`--color-gray-900`), accent is the project's blue `var(--gradient)`. ⚠️ This
  **intentionally introduces a second heading style on the page** (Hero-title + this one);
  the implementer should **not** "fix" it back to the shared `Heading` component — the
  reference heading is unmistakably the big two-tone style.
- **Cards:** light — white fill (`--color-white`), `1px solid` light-gray border (e.g.
  `--color-gray-200`), large radius (~24px), soft `--box-shadow`. Optional faint blue
  top-left glow via `::before` at low opacity (the Hero `::after` idea, toned for light).
  Quote text `--color-gray-900`, position `--color-gray-500`. Non-active slides dimmed via
  `opacity` on `.swiper-slide` (active slide full opacity) — dimming reads fine on light too.

---

## Target layout

### Desktop (≥1049px)

```
┌───────────────────────────────────────────────────────────────────────┐
│  .testimonials  (light section, vertical rhythm via padding)            │
│                                                                         │
│              Kind words from  satisfied clients   ← H2, dark + gradient  │
│                                                                         │
│   ┌────────┐   ┌─────────────────────────────────┐   ┌────────┐         │
│   │ dimmed │   │  .testimonial-card (active)      │   │ dimmed │        │
│   │ peek   │   │  “Collaborating with John was…”  │   │ peek   │        │
│   │        │   │                                  │   │        │        │
│   │        │   │  (MJ)  Michael Johnson           │   │        │        │
│   │        │   │        Director of AlphaStream…  │   │        │        │
│   └────────┘   └─────────────────────────────────┘   └────────┘        │
│                       ●  ← pagination dots (optional)                    │
│                                                                         │
│   Appwrite    Docker    Vercel    Supabase    Firebase   ← logo strip   │
└───────────────────────────────────────────────────────────────────────┘
```

Swiper: `centeredSlides: true`, `slidesPerView: 1.25`, `spaceBetween: 24`, `loop: true`.

### Mobile (≤768px)

- `slidesPerView: 1`, `spaceBetween: 16`, neighbours hidden (full-width card).
- Logo strip wraps to a 2-row grid (`flex-wrap` / grid), matching the mobile reference.

---

## New files

| File                                                 | Purpose                                         |
| ---------------------------------------------------- | ----------------------------------------------- |
| `src/sections/testimonials/Testimonials.jsx`         | Section: heading + Swiper + logo strip          |
| `src/sections/testimonials/style.css`                | Section + logo-strip BEM styles, responsive     |
| `src/sections/testimonials/testimonials.js`          | Mock data array (i18n keys + structural fields) |
| `src/components/testimonialCard/TestimonialCard.jsx` | Single quote card (reused per slide)            |
| `src/components/testimonialCard/style.css`           | Card BEM styles                                 |

Pattern mirrors the existing Swiper section: `Showcasing` (section) → `Carousel`
(component) → `ShowcasingCard` (component). Here the Swiper lives inline in the section
(config differs enough — centered/peeking — that a generic wrapper adds no value), and the
reused unit `TestimonialCard` is a `components/` component like `ShowcasingCard`.

## Files changed

| File                                | Change                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------- |
| `src/pages/HomePage.jsx`            | Import + render `<Testimonials />` between `<Advantages />` and `<Faq />` |
| `src/utils/i18n/locales/ru/ru.json` | New `testimonials` namespace (heading + 6 clients + a11y)                 |
| `src/utils/i18n/locales/en/en.json` | Same keys in English                                                      |

**Not touched:** existing sections/components, `Heading`, `Carousel`, `ShowcasingCard`,
`src/styles/main.css` (no new token needed — light adaptation reuses existing palette).

---

## Mock data — `src/sections/testimonials/testimonials.js`

Follows the `projects.js` convention: array of objects holding **i18n keys** for visible
text plus structural fields. Proper-noun names stay literal (like `role:` is literal in
`projects.js`); quote + position are keys (translatable). Avatar colour is a per-item
token used as a dynamic inline style (allowed by the rules — genuinely dynamic value).

```js
export const testimonials = [
  {
    id: 1,
    name: 'Michael Johnson',
    initials: 'MJ',
    accent: '#0058a7',
    quote: 'testimonials.michael.quote',
    position: 'testimonials.michael.position',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    initials: 'SC',
    accent: '#7c3aed',
    quote: 'testimonials.sarah.quote',
    position: 'testimonials.sarah.position',
  },
  {
    id: 3,
    name: 'David Müller',
    initials: 'DM',
    accent: '#0e7490',
    quote: 'testimonials.david.quote',
    position: 'testimonials.david.position',
  },
  {
    id: 4,
    name: 'Elena Rossi',
    initials: 'ER',
    accent: '#be185d',
    quote: 'testimonials.elena.quote',
    position: 'testimonials.elena.position',
  },
  {
    id: 5,
    name: 'James Carter',
    initials: 'JC',
    accent: '#15803d',
    quote: 'testimonials.james.quote',
    position: 'testimonials.james.position',
  },
  {
    id: 6,
    name: 'Aisha Khan',
    initials: 'AK',
    accent: '#b45309',
    quote: 'testimonials.aisha.quote',
    position: 'testimonials.aisha.position',
  },
];
```

`initials` and `accent` could be derived, but storing them keeps the card dumb and the
data explicit (easy to tweak a colour without parsing logic).

### i18n keys (both ru.json + en.json, kept in sync)

```
testimonials.title          → "Тёплые слова от"            / "Kind words from"
testimonials.titleAccent    → "довольных клиентов"          / "satisfied clients"
testimonials.ariaLabel      → "Отзывы клиентов"             / "Client testimonials"  (Swiper region)
testimonials.logosAriaLabel → "Технологии и партнёры"       / "Technologies and partners"
testimonials.<client>.quote     → full review paragraph (ru/en)
testimonials.<client>.position  → e.g. "Директор AlphaStream Technologies" / "Director of AlphaStream Technologies"
```

Mock clients (6): AlphaStream Technologies, Nimbus Labs, Hauptbahn Digital, Vela Studio,
Northpeak, Lumen Co. — quotes written fresh (2–4 sentences each), reference quote reused
for Michael Johnson.

---

## `TestimonialCard` component

Props: `quote` (key), `name` (literal), `position` (key), `initials`, `accent`.
Resolves `quote`/`position` via `t()`. Russian JSDoc + PropTypes (project convention).

Semantics (a11y):

```jsx
<figure className="testimonial-card">
  <blockquote className="testimonial-card__quote">{t(quote)}</blockquote>
  <figcaption className="testimonial-card__author">
    <span
      className="testimonial-card__avatar"
      style={{ backgroundColor: accent }}
      aria-hidden="true"
    >
      {initials}
    </span>
    <span className="testimonial-card__meta">
      <span className="testimonial-card__name">{name}</span>
      <span className="testimonial-card__position">{t(position)}</span>
    </span>
  </figcaption>
</figure>
```

- `<figure>/<blockquote>/<figcaption>` give correct quote semantics.
- Avatar is decorative (`aria-hidden`) — the name text already names the author.
- `backgroundColor: accent` is the one allowed inline style (dynamic value).

### Card BEM classes

```
.testimonial-card              white card, light-gray border, radius ~24px, --box-shadow, optional faint blue ::before glow
.testimonial-card__quote       Open Sans, ~1.125rem, --color-gray-900, line-height 1.6
.testimonial-card__author      flex row, gap, align-center, margin-top
.testimonial-card__avatar      48px circle, white bold initials on `accent` bg, grid-center, flex-shrink 0
.testimonial-card__meta        column
.testimonial-card__name        Oswald, --color-gray-900, 600
.testimonial-card__position    0.8125rem, --color-gray-500
```

---

## `Testimonials` section component

Structure (mirrors `Showcasing` animation idiom — `LazyMotion`/`m`/`domAnimation`):

```jsx
<section className="testimonials" aria-labelledby="testimonials-heading">
  <div className="container">
    <LazyMotion features={domAnimation}>
      <m.h2
        id="testimonials-heading"
        className="testimonials__heading"
        {...fadeUp}
      >
        {t('testimonials.title')}{' '}
        <span className="testimonials__heading-accent">
          {t('testimonials.titleAccent')}
        </span>
      </m.h2>

      <Swiper
        {...swiperConfig}
        aria-label={t('testimonials.ariaLabel')}
        role="region"
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.id} className="testimonials__slide">
            <TestimonialCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <ul
        className="testimonials__logos"
        aria-label={t('testimonials.logosAriaLabel')}
      >
        {/* SiAppwrite, SiDocker, SiVercel, SiSupabase, SiFirebase — each in <li>, icon aria-hidden, brand name visually-hidden */}
      </ul>
    </LazyMotion>
  </div>
</section>
```

### Swiper config

```js
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const swiperConfig = {
  modules: [Autoplay, Pagination, A11y],
  centeredSlides: true,
  slidesPerView: 1.25,
  spaceBetween: 24,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: { clickable: true },
  a11y: {
    enabled: true,
    prevSlideMessage: t('carousel.prevSlide'), // reuse existing carousel a11y keys
    nextSlideMessage: t('carousel.nextSlide'),
  },
  breakpoints: {
    0: { slidesPerView: 1, spaceBetween: 16 },
    1049: { slidesPerView: 1.25, spaceBetween: 24 },
  },
};
```

Reuses the existing `carousel.prevSlide` / `carousel.nextSlide` i18n keys (already present)
for prev/next a11y messages — no duplication.

### Logo strip (react-icons)

**Constraint found:** this `react-icons` version has **no** `SiCloudinary`, `SiHostinger`,
or `SiStream` (the exact reference brands). Use available brand icons instead — keep 2 from
the reference (Appwrite, Docker) + 3 well-known substitutes:

```js
import {
  SiAppwrite,
  SiDocker,
  SiVercel,
  SiSupabase,
  SiFirebase,
} from 'react-icons/si';
```

Rendered muted/low-opacity in a flex row; each `<li>` holds an icon (`aria-hidden`) + a
`visually-hidden` brand name for screen readers. Hover → slight opacity lift (respect
`prefers-reduced-motion` for any transition).

### Section BEM classes

```
.testimonials               light section, vertical rhythm (padding ~6rem), overflow hidden
.testimonials__heading      Hero-title style: clamp(2rem,5vw,3.5rem), Oswald 700, --color-gray-900, centered, margin-bottom
.testimonials__heading-accent   background var(--gradient) + background-clip:text + color transparent
.testimonials__slide        height auto; align stretch so cards equal-height
.testimonials__slide:not(.swiper-slide-active)  opacity 0.4 (desktop peek dimming)
.testimonials__logos        flex row, centered, gap, margin-top; wraps on mobile
.testimonials__logo         icon size ~2rem, fill --color-gray-500, transition opacity (hover → --color-gray-900)
```

---

## Animations

- Heading + (optionally) the swiper wrapper fade-up via Framer Motion `fadeUp` preset
  (copy the `Hero`/`Showcasing` idiom: `initial/whileInView`, `viewport once`, cubic ease).
- Slide transitions handled by Swiper.
- `@media (prefers-reduced-motion: reduce)` — disable logo hover transition; Swiper autoplay
  left on (content rotation, not motion-sickness vector) but acceptable to disable if desired.

## Accessibility checklist

- Section named via `aria-labelledby="testimonials-heading"`.
- Swiper: `role="region"` + localized `aria-label`; A11y module on with localized prev/next.
- Each card: `figure/blockquote/figcaption`; avatar `aria-hidden`; name is real text.
- Logo strip: `<ul>` with `aria-label`; icons `aria-hidden`; brand names `visually-hidden`.
- Heading accent: gradient is on a `<span>` **inside** the `h2` — same minor caveat as the
  existing `Heading` (accent text still in the accessible name, which is correct here since
  it's part of the title). No empty/duplicate names.

---

## Conventions honoured

- Functional component, plain CSS + BEM, Russian JSDoc, PropTypes, no new dependencies
  (`swiper` and `react-icons` already installed).
- i18n: both ru/en updated in sync; validate JSON after edits
  (`node -e "JSON.parse(require('fs').readFileSync('…','utf8'))"`).
- One inline style only (dynamic avatar `backgroundColor`) — permitted exception.
- Lint before commit: `npx eslint src/sections/testimonials src/components/testimonialCard`.

## Build order (suggested commits)

1. `feat(testimonials): add mock data + i18n keys (ru/en)` — data file + locale blocks.
2. `feat(testimonials): add TestimonialCard component` — card JSX + CSS.
3. `feat(testimonials): add section with Swiper carousel and logo strip` — section JSX + CSS.
4. `feat(home): mount testimonials section between advantages and faq` — HomePage wiring.

(Or squash 1–3 if preferred — kept granular to match the repo's per-unit commit history.)

## Open / to verify during implementation

- Confirm `SiVercel`/`SiSupabase`/`SiFirebase` render at the chosen size (they exist in this
  version; Cloudinary/Hostinger/Stream do not). Swap freely among installed `Si*` brands.
- Tune `slidesPerView` (1.25 vs 1.3) and dim opacity against the real viewport — the reference
  peek is ~12% each side.
- Decide pagination dots: reference desktop shows a single dot under the card; keep
  `pagination` or drop to match exactly (cheap to toggle).
