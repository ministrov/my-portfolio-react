# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Changed

- **Build tooling: Create React App → Vite 8.** `react-scripts` removed. Dev server cold start 227 ms, production build 1.3 s (was 71 s). `public/index.html` moved to the project root; `outDir` kept as `build/` so deploy settings and `npm run prod` keep working.
- **React 18 → 19** (19.2.8), plus the whole dependency tree: `react-router-dom` 6 → 7, `framer-motion` 10 → `motion` 12, `i18next` 24 → 26, `react-i18next` 15 → 17, `swiper` 11 → 14.
- **SEO now uses React 19 native metadata** — `react-helmet-async` removed. The language-independent `Person` and `WebSite` JSON-LD moved into `index.html`, so crawlers see them without executing JavaScript; the localized `BreadcrumbList` schemas stay in their pages.
- **Linting moved to ESLint 9 flat config** (`eslint.config.js`), replacing the `eslintConfig` block that came with CRA. A real `npm run lint` script exists now.
- Files carrying JSX renamed to `.jsx`: `src/index.jsx`, `src/const/index.jsx`, `src/components/socials/socials.jsx`.
- Web3Forms key switched from `REACT_APP_WEB3FORMS_KEY` to `VITE_WEB3FORMS_KEY`.
- `browserslist` dropped in favour of Vite's `baseline-widely-available` target — a deliberate narrowing of browser support.

### Added

- **Vitest harness** (`vitest`, Testing Library, jsdom) replacing the Jest that left with `react-scripts`, plus `npm test` / `npm run test:run`.
- Tests for the projects filter reducer and for the language resolver.
- `src/utils/lang.js` — single source of truth for the initial-language precedence (`?lang=` → `localStorage` → `ru`), shared by the i18next bootstrap and `LanguageProvider`.

### Fixed

- **Language choice no longer resets to Russian.** `LanguageProvider` restored the language in an effect that raced its own save-to-`localStorage` effect; under StrictMode the second pass read an already-overwritten value and reverted to `ru`. The initial language is now resolved synchronously before first render, and the effect is gone. The `isMounted` ref that had been masking the race was removed with it.
- `hreflang` → `hrefLang` in the three page components — React 19 rejects the lowercase DOM property.
- `m(Tag)` → `m.create(Tag)` in `AboutCapabilities`, silencing a Motion 12 deprecation warning.
- Lexical declaration inside a `case` block in `projectsReduce.js`.
- **Russian `aria-label` in the English UI.** The technologies list in `AboutCapabilities` fell back to a hard-coded `defaultValue` because `aboutCapabilities.ariaLabel` was missing from both locales. The key now exists in `ru.json` and `en.json`, and the fallback is gone.

### Security

- Critical prototype-pollution advisory in `swiper` closed by the v14 upgrade. Remaining production advisories are the React Router RSC-mode issue, which does not apply to this client-side SPA.

## [1.1.0] - 2026-06-12

Major refactoring sprint + design polish. All components and sections audited for
accessibility, i18n, code quality, and visual consistency.

### Added

- **Testimonials section** — Swiper carousel with mock client reviews + logo strip (react-icons)
- **Contact section redesign** — two-column layout: contact info card (email, location, hours, socials) + form
- **`ContactForm` component** — 4 fields, client-side validation, idle→submitting→success|error states, Web3Forms integration (no extra npm)
- **`CopyEmail` component** — replaces `mailto:` with clipboard copy button, aria-live announce, 2 s reset
- **`AuthorIdentity` component** — extracted from About section, own BEM block `author-identity__*`
- **About page typography** — card style (white bg, border, radius, blue left stripe) for Capabilities / Experience / Education; two-column grid for Education
- **FAQ redesign** — gray section background, white cards with CSS counter `01/02…`, left blue stripe on open item, AnimatePresence height animation
- **Advantages bento grid** — 4-column CSS grid with `nth-child` spans; 2 new cards; large `52px` numerals on wide cards
- **`display` variant for `Heading`** — two-tone gradient-accent style; rolled out across all section headings and About page
- **`useCopyToClipboard` hook** — with `isMounted` guard
- **`contactApi.js`** — API layer with detailed async/await inline comments for learning
- **`useContactForm` hook** — form state machine extracted from `ContactForm`
- `.env.local.example` — documents required `REACT_APP_WEB3FORMS_KEY`

### Changed

- **Hero section** — layered background: grid `::before` (`opacity: 0.06`) + two corner blurs `::after`; `min-height: 78vh → 70vh`
- **Services section** — `background-color: var(--color-gray-600)`, `border-radius: 42px` (16px mobile); removed `min-height: 78vh`
- **Advantages items** — `border: 3px solid rgba(0,88,167,0.1)` + `box-shadow` + hover lift (`translateY(-4px)`)
- **Project cards** — initial border + shadow; hover lift (`translateY(-3px)`) + stronger shadow
- **ServicesItem hover** — `translateY(-5px)`, stronger shadow, border-color reveal
- **Testimonials** — inactive slide `opacity: 0.4 → 0.55`
- **Contact form** — `border-left: 4px solid var(--color-blue-700)` on `.contact__form-wrap`
- **`--color-gray-600`** — removed semi-transparent alpha (`#f7f7f7c7 → #f5f8ff`)
- **`Heading` mobile** — `@media ≤480px { font-size: 2.75rem }`
- **`wrapper` margins** — `margin-top: 120px → 80px`, `margin-bottom: 40px → 60px`
- **`wrapper` mobile** — `margin-top: 16px → 64px` (matches fixed header height)
- **Container breakpoints** — intermediate steps: 1520px→1200px, 1268px→1068px
- **Accordion** — fluid `padding-block: clamp(1.25rem, 0.9rem+1.8vw, 1.75rem)` and `padding-inline: clamp(1.25rem, 1rem+1vw, 2rem)`
- **AccordionButton** — mobile toggle icon `1rem → 1.25rem` at ≤575px
- **`.container`** — `padding-inline: clamp(16px, 4vw, 32px)` + `box-sizing: border-box`; removed duplicate `@media (max-width: 768px)` block
- Removed `scrollbar-gutter: stable both-edges`

### Removed

- `src/sections/promo/` — old Promo component (100% commented out, replaced by Hero section)
- `src/components/mouseScroll/` — MouseScroll component (all usages commented out in Hero and Promo)
- `src/assets/png/my-avatar.webp`, `my-avatar-1000.webp`, `my-avatar-1500.webp` — avatar images used only in the removed Promo
- `src/assets/svg/gitHub.svg`, `vk.svg` — replaced by `FaGithub` / `FaVk` from react-icons
- `src/assets/svg/advantages-icon.svg` — no references anywhere

### Fixed

- Mobile wrapper `margin-top: 16px → 64px` preventing header overlap on scroll
- `ShowcasingCard` 352px image void — `object-fit: cover` + `object-position: top` at ≤968px
- `ProjectsList` phantom horizontal scroll — replaced `x: ±100vw` entrance with `y: 32` fade-in
- `aboutStory` mobile — removed card chrome (padding/background/border/radius), text flows free
- FAQ stagger softened — `staggerChildren: 0.32s → 0.12s`, gentler `y: 24` easing
- `Up` button hover/focus — removed dead `transform` values; hover wrapped in `@media (hover: hover)`; `:focus → :focus-visible`
- `Up` button white flash — added missing CSS tokens `--color-blue-800: #004889`, `--color-blue-900: #00386b`
- `authorIdentity__img` overflow at ≤1104px — width reduced to `120×120px`
- Advantages mobile — one column at ≤768px; `min-width: 0` + `overflow-wrap: break-word`
- Testimonial cards equal height — `.testimonials__slide → display: flex`; `.testimonial-card → width: 100%`
- `Modal` keyboard — Escape now listened on `document`; focus transferred to modal on open, returned to trigger on close
- `ModalPromo` — broken CSS variable `--ff-headers → --font-headings`; removed spurious `role="status"` + duplicate `aria-label`
- `ServicesItem aria-controls` — added `id={contentId}` on content div (previously pointed nowhere)
- `Socials` — added `max: 'MAX'` to `SOCIAL_NAME_MAP` (aria-label was falling back to raw `'max'`)
- `ToggleLang` CSS typo `backgroun-color → background-color`
- Filter `'All'` key now translated in both locales

### Refactored

- **All 26 components** (`src/components/`) — a11y (aria roles, labels, keyboard), i18n (localized hardcoded strings), PropTypes, dead code removal
- **All 8 sections** (`src/sections/`) — same methodology; `promo` redesigned to single-column centred hero
- `ShowcasingCard` — removed aspect-ratio wrapper `div`; `aspect-ratio + object-fit` applied directly on `<img>`; `3/4` portrait ratio at ≤767px
- `AuthorIdentity` extracted from `About` into its own component
- Filter value/label separated in `Projects` (value = match key, label = i18n key)
- `contactApi.js` / `useContactForm` — API layer and state hook split from `ContactForm`

---

## [1.0.0]

Initial portfolio launch — baseline before the refactoring sprint.
