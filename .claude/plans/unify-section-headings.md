# Plan: Unify section headings to the display (two-tone) style

## Context

The homepage has two competing heading styles: the new `Testimonials` heading is large,
centered, two-tone (dark lead + blue `var(--gradient)` accent), while every other section
uses the small uppercase `Heading` ("ОБО МНЕ" + thin line + slogan). This reads as
inconsistent hierarchy. Decision (asked 2026-06-08): **unify ALL section headings to the
large two-tone style, and remove the slogans/subheadings.**

## Approach — evolve `Heading`, don't replace it

`Heading` is used in two distinct contexts, so a blanket rewrite is wrong:

| Context                        | Where                                                                                                       | Treatment                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Top-level section headings** | about, showcasing, services, advantages, faq, contact (home) + projects page                                | → new **`display`** variant (large, two-tone, no slogan)                          |
| **Nested sub-headings**        | `aboutCapabilities`, `aboutExperience`, `aboutEducation` ("Мои возможности", "Мой опыт", "Моё образование") | **stay compact** (current style) — they sit inside content, must not become giant |
| **Hero**                       | `Hero.jsx` (`hero__title`)                                                                                  | **untouched** — it's the page `<h1>`, its own larger context                      |

So: add a `variant` prop to `Heading` (`'default'` | `'display'`, default `'default'`), plus
an optional `accent` prop. Callers opt in. The 3 nested about sub-headings keep
`variant="default"` (no change). This also lets `Testimonials` drop its bespoke inline
heading and use `<Heading variant="display" .../>` — **one source of truth** for the style.

---

## `Heading` component changes (`src/components/heading/Heading.jsx`)

New API (additive, backward-compatible):

```jsx
<Heading
  variant="display" // 'default' (current) | 'display' (large two-tone)
  title={t('heading.about.name')}
  accent={t('heading.about.accent')} // optional; rendered as gradient span after title
  id="about-heading"
/>
```

- `variant='default'` → render exactly as today (compact, optional line, optional slogan).
- `variant='display'` → render `<HeadingTag class="heading-sec heading-sec--display">`
  with `<span class="heading-sec__main">{title}</span>` + (if `accent`)
  `{' '}<span class="heading-sec__accent">{accent}</span>`. No decorative line, no slogan.
- Keep existing props (`slogan`, `showLine`, `level`, `className`, `subClassName`, `id`).
  `slogan` simply isn't passed by the converted sections (slogans removed).
- `id` still lands on the heading tag → existing `aria-labelledby` wiring keeps working.
- PropTypes: add `variant: PropTypes.oneOf(['default','display'])`, `accent: PropTypes.string`.
- Russian JSDoc updated for the two new props.

### CSS (`src/components/heading/style.css`)

```
.heading-sec--display            font: Oswald clamp(2rem,5vw,3.5rem)/1.1 700; text-align:center; color var(--color-gray-900); margin-bottom 3rem (2rem ≤768px)
.heading-sec--display .heading-sec__main   inline (lead text, dark)
.heading-sec__accent             background var(--gradient); background-clip:text; color transparent
```

(mirrors the values currently in `testimonials/style.css` `.testimonials__heading*`, which
get removed and centralized here.)

---

## i18n changes (`ru.json` + `en.json`, in sync)

For each converted section, add an `accent` key (the highlighted tail of the title) and
keep `name` as the lead. **Remove the now-unused `subheading` keys** for those sections.

Proposed splits (lead `name` / accent) — **copy is tunable, flag for review**:

| Key             | ru lead / accent           | en lead / accent             |
| --------------- | -------------------------- | ---------------------------- |
| about           | Немного / обо мне          | A bit / about me             |
| showcasing      | Лучшие / проекты           | Best / projects              |
| myServices      | Мои / услуги               | My / services                |
| advantages      | Почему / именно я          | Why / me                     |
| faq             | Часто задаваемые / вопросы | Frequently asked / questions |
| contact         | Свяжитесь / со мной        | Get in / touch               |
| projects (page) | Мои / проекты              | My / projects                |

`testimonials.title` / `testimonials.titleAccent` already exist and already fit this shape
(lead "Тёплые слова от" / accent "довольных клиентов") — reuse as-is.

Sub-headings `capabilities` / `experience` / `education`: **unchanged** (compact variant,
no accent). `mySkills` keys: leave as-is (not rendered on home; out of scope).

---

## Files changed

| File                                         | Change                                                           |
| -------------------------------------------- | ---------------------------------------------------------------- |
| `src/components/heading/Heading.jsx`         | Add `variant` + `accent` props; render display variant           |
| `src/components/heading/style.css`           | `.heading-sec--display`, `.heading-sec__accent`                  |
| `src/sections/about/About.jsx`               | `variant="display"` + `accent`; drop `about__title` if redundant |
| `src/sections/showcasing/Showcasing.jsx`     | `variant="display"` + `accent`; remove `slogan`                  |
| `src/sections/services/Services.jsx`         | same                                                             |
| `src/sections/advantages/Advantages.jsx`     | same                                                             |
| `src/sections/faq/Faq.jsx`                   | same                                                             |
| `src/sections/contact/Contact.jsx`           | same                                                             |
| `src/sections/projects/ProjectsHeader.jsx`   | `variant="display"` + accent; drop slogan                        |
| `src/sections/testimonials/Testimonials.jsx` | Replace inline `<m.h2>` with `<Heading variant="display" .../>`  |
| `src/sections/testimonials/style.css`        | Remove `.testimonials__heading*` (moved to Heading)              |
| `src/utils/i18n/locales/ru/ru.json`          | Add `accent` keys; remove converted `subheading` keys            |
| `src/utils/i18n/locales/en/en.json`          | Same                                                             |

**Not touched:** `Hero`, the 3 about sub-heading components, `mySkills` keys.

---

## A11y notes

- Accent is a `<span>` inside the heading tag → its text stays in the accessible name,
  which is correct (it's part of the title). Same pattern already shipped in Testimonials.
- `id` continues to render on the heading element; sections using `aria-labelledby`
  (showcasing/services/faq/projects) keep their wiring intact.
- No decorative line / no slogan in display variant — purely visual, no a11y impact.

## Animation note

- The converted sections currently animate the heading in various ways. `Heading` itself is
  not a motion component; where a section wraps it in `m.*`/`whileInView` that stays. The
  Testimonials heading currently uses `fadeUp` on the `m.h2` — after switching to `<Heading>`,
  wrap it in an `m.div` (or drop the heading-specific fade) to preserve the entrance. Decide
  per-section during impl; default: keep existing wrappers, render `<Heading>` inside.

## Build order (suggested commits)

1. `feat(heading): add display variant with two-tone accent` — component + CSS only (no callers yet).
2. `feat(i18n): add heading accent keys, drop unused subheadings (ru/en)` — locale changes.
3. `refactor(sections): adopt display heading across home sections` — about/showcasing/services/advantages/faq/contact wiring.
4. `refactor(testimonials): use shared display Heading` — Testimonials + remove its heading CSS.
5. `refactor(projects): adopt display heading on projects page` — ProjectsHeader.

(Steps 3–5 can be split finer or merged; kept logical. Each step: `npx eslint` + JSON validate.)

## Open / to confirm during implementation

- **Accent word choices** above are a copy call — easy to tweak per title once seen on screen.
- **Projects page** (`ProjectsHeader`) is on the `/projects` route, not the home page —
  included for consistency, but its slogan is more informative there; confirm dropping it.
- **`about__title` / `projects__title`** className overrides — check whether they still do
  anything once the display variant owns sizing/alignment; remove if dead.
- Verify vertical rhythm: display headings are taller; confirm section top padding still
  looks balanced (especially the gray sections About/Advantages).
