---
name: frontend-design
description: Build distinctive, production-grade UI for the my-portfolio-react portfolio while staying inside its design system and conventions. Use when asked to build or style a component, section, or page (React/JSX + plain CSS/BEM), or to beautify existing UI. Produces polished, intentional design that fits the existing portfolio — not generic AI aesthetics, and not a new brand per component.
model: sonnet
allowed-tools: Read, Glob, Grep, Write, Edit, Bash(npx eslint:*), Bash(npx prettier:*)
user-invocable: true
---

# Frontend Design Skill

Build distinctive, production-grade frontend that avoids generic "AI slop" aesthetics —
**but inside the constraints of this repo**. This is the portfolio of frontend developer
Anton Zhilin: it already has a coherent design system (blue palette, Oswald/Open Sans,
a starfield background, Framer Motion). Your job is to extend that system with taste and
precision, not to invent a new look for every component.

> Read `CLAUDE.md` and `.codeassistant/rules/` first — those conventions are binding.
> Where the generic "be bold / vary fonts / never converge" design advice conflicts with
> them, **the repo wins**: one consistent identity beats per-component novelty here.

## Stack & hard constraints

- **Create React App + React 18**, plain **JS/JSX** — no TypeScript.
- **Functional components only** (no class components).
- **Plain CSS with BEM** (`.block__element--modifier`) in a `style.css` **beside** the component.
  No Sass/Less, no styled-components/Emotion, no Tailwind, no CSS-in-JS.
- **No inline styles** except genuinely dynamic values (e.g. `style={{ width: \`${w}px\` }}`).
- **Do not add dependencies** — including new fonts, icon sets, or animation libraries.
  Use what's already here: `framer-motion`, `swiper`, `react-icons`, `react-type-animation`.
  If a task truly needs a new dependency, stop and ask the user first.
- File layout: `components/ComponentName/ComponentName.jsx` + `style.css`. Sections live in
  `sections/`, route screens in `pages/`, shell in `layouts/`.

## Design thinking

Before coding, commit to an intentional direction — but one that reads as _this_ portfolio:

- **Purpose & audience**: what does this UI do, who sees it?
- **Fit**: how does it sit next to existing sections (promo, about, projects, services, faq, contact)?
- **Differentiation**: distinctiveness comes from **composition, rhythm, and detail**
  (spacing, hierarchy, motion, a memorable hero moment) — **not** from swapping the fonts or palette.
- **Restraint vs. density**: most of this site is refined, not maximalist. Match that altitude.

Intentionality over intensity. A precise, well-spaced section beats scattered effects.

## Design system — use the existing tokens

All values come from `src/styles/main.css` (`:root`). **Reference variables, never hardcode hex/fonts.**

- **Typography**: `--font-headings: 'Oswald'` for headings/display, `--font-base: 'Open Sans'`
  for body. Both are already `@font-face`-loaded — do not introduce Inter/Roboto/system fonts
  or new font files. Distinctiveness is in weight, size, letter-spacing, and rhythm.
- **Color**: `--color-blue-700` (#0058a7, primary), `--color-blue-300` (accent), the
  `--gradient` (blue→blue), grays `--color-gray-100…900`, and the `--color-red-500`/`--color-red-100`
  pair for highlights. Dominant blue with sharp accents — never the purple-gradient-on-white cliché.
- **Surface**: `--border-radius-s` (8px), `--box-shadow`. Reuse them for visual consistency.
- **Layout utilities**: wrap page content in `.container` (max-width + responsive padding) and
  use `.wrapper` for vertical section rhythm. Use `.visually-hidden` for SR-only labels.
- If a token is genuinely missing, add it to `:root` in `main.css` (don't scatter literals).

## Motion

Framer Motion is the standard. Follow the repo pattern, don't reinvent it:

- Import `{ LazyMotion, m, domAnimation }` and wrap animated subtrees in
  `<LazyMotion features={domAnimation}>`, using `m.*` (not `motion.*`) for smaller bundles.
  Don't nest `LazyMotion` providers.
- Favor one well-orchestrated reveal (staggered entrance) over scattered micro-interactions.
- Always honor reduced motion: add a `@media (prefers-reduced-motion: reduce)` block in `style.css`
  (and/or gate JS animations), as `animatedBackground`/`aboutStory` already do.
- Carousels use **Swiper**; the starfield is tuned by `DEFAULT_CONFIG` in `const/index.js`.

## Internationalization (mandatory)

This is a bilingual app (Russian default, English). **Never hardcode visible copy or
accessible names.**

- Every user-facing string is a translation key resolved via `useTranslation()` / `t()`.
- Add keys to **both** `src/utils/i18n/locales/ru/ru.json` and `.../en/en.json`, kept in sync.
- For `aria-label`s that embed a value, use interpolation: `t('ns.key', { value })`.
- Decorative images get `alt=""`; meaningful ones get localized alt or, better, a label on the
  wrapping control (see how `SocialItem` carries the link's accessible name).

## Accessibility & responsiveness

- Semantic HTML first (`nav`/`ul`/`li`, headings in order, `button` vs `a`). ARIA only to fill gaps.
- Respect label-in-name (WCAG 2.5.3): the accessible name must contain the visible text.
- Responsive: design mobile-up; the site uses `max-width: 768px` / `1268px` CSS breakpoints
  and the `BREAKPOINTS` const (`MOBILE: 375`, `TABLET: 768`) for JS-driven behavior.
- Prefer `ref` over `document.querySelector`; guard state updates in effects against unmount.

## Workflow

1. Read neighboring components/sections to match patterns before writing.
2. Build the `.jsx` (functional, Russian JSDoc with props + `@example`) and its `style.css` (BEM).
3. Add/extend i18n keys in both locales; add PropTypes for the public prop API.
4. Order imports third-party first, then internal.
5. Verify: `npx eslint <files>`, `npx prettier --write <files>`, and validate locale JSON parses.

## Rules (binding)

- One consistent portfolio identity — don't restyle fonts/palette per component.
- Plain CSS + BEM beside the component; tokens via CSS variables, no scattered literals.
- No new dependencies (fonts, libs, icon sets) without asking.
- All copy and accessible names go through i18n, both locales in sync.
- Functional components, Russian JSDoc, `use`-prefixed hooks, PascalCase components.
- Honor `prefers-reduced-motion`; reuse the `LazyMotion`/`m.*` pattern.
- Prettier: single quotes (double in JSX attrs), 2-space indent, semicolons, 100-char lines.
