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
- **Hero fits the screen on tablets and phones (≤ 1024 px).** `.hero` is `border-box` with `min-height: 100svh` (`100vh` fallback): at 390×844 it was 1 004 px tall, now exactly the viewport. "Scroll ↓" moved out of `.hero__inner` and is pinned to the bottom edge with `env(safe-area-inset-bottom)`. The "Open to work" badge sits above the heading. Below 768 px a second, outline "Discuss a project" button stands under "Download CV" in a single column. Desktop ≥ 1025 px is unchanged: content-box height, scroll hint in flow, no badge.
- **The hero subtitle decodes exactly once on touch screens.** Under `(hover: none)` it decodes on load and then stays readable: no 7 s loop, and no replay when the hero scrolls back into view. Desktop with a mouse keeps the loop, paused while off-screen.
- `AuthorMeta` renders the availability badge through the new `AvailabilityBadge`; its look in the author card (light on the home page, dark on /about) is unchanged.
- **Best projects become a swipe strip on tablets, phones and touch screens** (`(max-width: 1024px), (hover: none)`). The sticky showcase took 3 120 px of scrolling at 360 px and hid the header while pinned; the new `ShowcaseCarousel` is a native scroll-snap strip with a "01 / 04" counter, dots that follow the swipe, and a "View project" link inside each card. The layout switches on the fly when a tablet rotates across 1024 px, and the header-hiding class never stays on `<body>`. Desktop with a mouse keeps the sticky showcase; reduced motion keeps the static list. Cards snap one per swipe (`scroll-snap-stop: always`). On phones the next card peeks at least 60 px and images are 3:4; on tablets cards are 520 px with 16:9 images. Each card has a white "View project" pill. The strip follows the audit mockup at 390 px to within 2 px on the counter, meta line and slogan. It has its own 160° cobalt → violet gradient; the desktop showcase keeps the site gradient. The counter's "/ 04", the meta line and the slogan are muted, and every alpha still meets AA on that gradient. The dots form a dense group stepped every 24 px, with 24×44 touch targets (40×44 for the active pill). The strip leaves room above and below so focus rings are not clipped. Keyboard focus moving into a card, with Tab or Shift+Tab, scrolls the strip to that card. At 360 px the showcase is 631 px tall instead of 3 120 px.
- **The header shows the regular menu from 768 px.** The burger and its full-screen drawer now appear only at ≤ 767 px instead of ≤ 992 px, so tablets no longer open a drawer for two links. At 768–992 px the header fits on one line in both locales: logo, "About", "Projects", language, "Discuss a project". The actions gap there is 0.75 rem, and the CTA uses 15 px text with 16 px side padding. The header stays 81 px tall, so `--header-height` still matches it. Nav links and the CTA are at least 44 px tall at 768–1024 px. Desktop ≥ 1025 px is unchanged.
- **The mobile menu gains "Contacts" and the CV, and follows the audit mockup.** "Contacts" follows the routes. It closes the menu and scrolls to the contact heading; under reduced motion the scroll is instant. The heading lands right under the header on every page, /projects included, once its card images reserve their space (see Fixed). Below the items:
  - a cobalt "Download CV" (the same PDF as the hero);
  - "Discuss a project" as the outline button;
  - a "Site language" row: a gray label on the left, the switcher on the right, room for a 44 px control.

  Every item now ends in a "›" chevron instead of a per-route icon, and the unused `Icon` fields left `routes`. The density matches the mockup at 390 px to within 2 px:
  - 56 px items 10 px apart, starting 84 px from the top;
  - 48 px buttons, 28 px between groups;
  - Oswald 600 19 px Cobalt Deep labels, a 35% cobalt hairline.

  Phones up to 375 px get the same layout instead of their old centred variant with cobalt rules. The drawer now runs from the header to the bottom of the screen (`100dvh`, was `90vh`) and scrolls on its own, so on a landscape phone nothing is out of reach.

- **The language switch is an RU/EN segment.** The old 34 px pill showed only the current language ("Ру"), so it was unclear what a tap would do. Now RU and EN sit side by side in a labelled group, and the current one is marked with `aria-pressed` and a white face with a Cobalt Shadow on the Frost track. A click on the current language does nothing, and that button stays in the Tab order. The segment is 44 px tall on phones (≤ 767 px) and 40 px in the header at every width, desktop included. This is a deliberate exception to "desktop is unchanged": the old pill was just as unclear on desktop.
- **"↑" stays out of the way on tablets and phones (≤ 1024 px).** It was a 48 px blue square shown after 300 px of scrolling, and it covered services, testimonials, the showcase and form fields. Now it is a 44 px translucent white circle with an 8 px backdrop blur, a thin cobalt border and a cobalt arrow, 16 px from the edges. It appears only when scrolling up more than two screens down the page and hides when scrolling down. Shifts of 8 px or less are ignored, so inertial scrolling on iOS does not make it flicker. It stays hidden while the contact form or the footer is on screen. It fades in with an 8 px slide over 200 ms, instantly under reduced motion. Desktop ≥ 1025 px is unchanged.
- **The mobile menu closes itself when the layout stops being mobile.** Rotating a tablet or zooming past 767 px with the menu open left it open behind the CSS, with page scrolling locked. The condition is the negation of the CSS query `(max-width: 767px)`, so a fractional 767.5 px width is covered too.
- **Project cards read as text, not as links.** All their text used to be cobalt. Titles and the "Project info" / "Project Tools" headings are now Carbon, the description and table values Ink, and the table lines a neutral 8% black hairline. Cobalt stays only on tags, links and buttons. This is the one change of the sprint that deliberately reaches desktop: the layout at ≥ 1025 px is unchanged, only the text colour is.
- **Project cards are more compact on tablets and phones (≤ 1024 px).**
  - Year and role sit in one Label line above the title ("2025 · Frontend Developer": Oswald 700, 12 px, 0.09 em tracking, Graphite) and replace the "Project info" table. On desktop it is the other way round. Both are hidden with `display: none`, so a screen reader never hears both. The title turns bold (Oswald 700, 27 px), and the "Tools" heading is hidden visually but kept for screen readers, so the tags follow the description directly.
  - "Demo" and "GitHub" are 44 px buttons instead of 22 px text links: a cobalt fill and a 1.5 px cobalt outline, side by side 50/50, or full width when a project has a single link. Hover is mouse-only; a tap darkens the fill or gives the outline a Frost background.
  - At ≤ 768 px every image is a 4:5 frame cropped from the top (`object-fit: cover`).
  - The description folds to three lines with a "Read more" button (`aria-expanded`, `aria-controls`) that turns into "Show less". The button appears only when the text is actually cut: it is re-measured on resize, after web fonts load and on a language switch. At 1024 px short descriptions show no button; desktop always shows the full text. The description is set at 16 px with a 26 px line, as in the mockup, instead of a cramped 15/19. The Vam Voda card at 390 px is 763 px instead of 932, and /projects at 360 px is 7 917 px.
- **"Why me" is a compact list on tablets and phones (≤ 1024 px).** Seven cards, each about 190 px tall for one line of text, become rows in one white card: a 40 px Frost icon tile next to 16 px text, with a hairline between rows. At 569–1024 px the rows form two columns, at 568 px and below one. At 360 px the section is 715 px tall instead of 1 521 (675 px in English). The card hover lift is now mouse-only (`(hover: hover)`), so a tap no longer leaves a card raised, and the rows never lift. Desktop ≥ 1025 px keeps the bento grid.
- **The "About me" facts hold a grid on tablets and phones (≤ 1024 px).** The four plaques were flex chips of their natural width, about 122 px each: at 360 px they left a 65 px strip empty on the right, at 768 px they took 531 of 707 px. Now they form a grid across the whole column with plaques of equal width: four in a row down to 568 px, 2×2 at 567 px and below. A plaque is 158 px wide at 360 px and 168 px at 768 px. The plaques follow the audit mockup to within 1 px at 390 and 768 px: the value keeps the desktop 1.6 rem (it used to shrink to 1.35 rem below 768 px) and never wraps, the label is set as a Label (Oswald 600, 12 px, 0.08 em tracking), and a plaque is 79 px tall instead of 73. At 568 px the tightest label keeps 21 px from the edge ("АНГЛИЙСКИЙ"; in English "YEARS EXP.", 29 px). Desktop ≥ 1025 px keeps the flex row and its labels.
- **The author card on the home page stays a row down to 480 px.** At 480–768 px it used to stack into a column with the photo centred and the text left-aligned, two axes in one card. Now the photo sits on the left and the name, role, location, badge and socials sit to its right, as they already did at 769–1104 px. At 768 px the card follows the audit mockup to within 2 px: a 150 px photo, the name at 28 px, the role at 15 px, and the "Open to work" badge in one row with 44 px social circles; the card is 206 px tall instead of 371. Between 480 and 768 px the photo, its inset and the name scale linearly from the old row's 120 px, 16 px and 20 px, and where the row is narrow the socials move under the badge. At 769–1024 px they stay at the mockup size; from 1025 px the card is unchanged. Below 480 px the card is a column with everything centred, the location, the "Open to work" badge and the socials included. The rules apply only inside `.author-identity`, so the dark author card on /about, which shares `AuthorMeta`, is unchanged.
- **The code in the /about author card wraps on phones (≤ 480 px).** Lines such as `focus` and `interests` ran past the card's edge, and the horizontal scroll that held them is invisible on a phone. Each property is now a block line indented by CSS (`2ch`) instead of spaces in the text, and the closing `};` is a line of its own. At ≤ 480 px a long line wraps, and its continuation hangs 2 characters to the right of the property name. At 360 px five lines wrap, the block grows by 96 px and nothing scrolls sideways; at 390 px the same four lines wrap as in the audit mockup. Above 480 px the code looks as before: at 1280 and 768 px every token keeps its position to within 0.1 px, and the block keeps its height. Syntax colours and the monospace font are unchanged.
- **The 404 page has a visible heading and two ways out.** Before:
  - the h1 was visually hidden;
  - the only text was a 24 px cobalt paragraph that read as a link;
  - the only exit, a 208 × 22 px "Go back homepage" link with an "opens externally" icon, ended at 798 px at 360 × 780, below the fold.

  Now the page has:
  - an "Error 404" Label;
  - a visible h1 "Page not found";
  - an Ink paragraph that names the missing address in readable form (`/страница`, not `%D1%81…`);
  - two 48 px pill links, "Go to homepage" (cobalt) and "View projects →" (outline).

  Below 576 px the links stack full width; from 576 px they sit in a centred row. At 360 × 780 the second button ends at 698 px, with no scrolling. With a long address of about 150 characters it ends at 770 px, still on the first screen. The robot is 240 px on phones and 320 px elsewhere instead of being stretched to 550 px. It loads at once (`fetchpriority="high"`, no `loading="lazy"`; `width` and `height` reserve its box), and `mix-blend-mode: multiply` removes its white rectangle. `role="alert"` and the nested section are gone. A malformed `%` sequence is shown as it is, and markup in the address shows as text. It is escaped before `Trans` parses the string, so `<path style="…">` in a link cannot crash the page. The `errorMessage.message` and `errorMessage.back` keys, with their English typos, are replaced by the new copy. This change reaches desktop by design (decision R6).

### Added

- **`useMediaQuery` hook** (`src/hooks/useMediaQuery.jsx`) — tracks a CSS media query via `useSyncExternalStore`: the value is correct on the first render and follows `change` events. Groundwork for the touch layouts of the mobile sprint (S01).
- **`AvailabilityBadge` component** (`src/components/availabilityBadge/`) — the pulsing "Open to work" status, extracted from `AuthorMeta` into its own BEM block with `light` / `dark` variants, so the hero and the author card share it.
- **`outline` variant of `CtaButton`** — transparent pill with a 1.5 px cobalt border, 48 px tall, Frost background on hover (mouse only) and on press. A secondary action next to a primary one; used by the hero on phones.
- Tests for `CtaButton` and `AvailabilityBadge`.
- **`ShowcaseCarousel` component** (`src/components/showcaseCarousel/`) — WAI-ARIA carousel: a region with slides as `role="group"` ("1 of 4: Vam Voda") and localized role descriptions. The active slide is derived from the track's `scrollLeft` — the nearest snap point, clamped to the end of the track — rather than from `IntersectionObserver`: at 860–1024 px a neighbouring slide stays more than 60% visible. Dot clicks scroll by the same formula, so the active dot always matches the one pressed. Each "View project" link is named together with its project title ("View project Mish").
- Tests for `ShowcaseCarousel` and `StickyShowcase` (layout branches, rotation while pinned), and a shared `IntersectionObserver` stub in `src/setupTests.js`.
- Tests for `MobileMenu`:
  - the items and their order, and the decorative chevrons;
  - the CV download link;
  - the "Site language" label next to the switcher;
  - "Contacts" closing the menu before it scrolls, instantly under reduced motion.
- Tests for `ToggleLang`: the current language is marked with `aria-pressed`, and only a click on the other language switches.
- Tests for `Up`: scroll direction, the two-screen limit, the 8 px dead zone, hiding over the contact form and the footer, and the unchanged desktop behaviour.
- Tests for `HamburgerButton` and `Header`: Enter keydown and keyup as separate events, and the menu closing when the layout stops being mobile.
- Tests for `ProjectCard`: the year and role line above the title, folding and unfolding a long description, no button for a description that fits, and a single link without a GitHub repository.
- Tests for `ErrorMessage` and the 404 page:
  - one h1, no `role="alert"`, and a single section labelled by that h1;
  - a Cyrillic address shown decoded;
  - malformed `%` sequences and markup in the address shown as text, without a crash;
  - links to `/` and `/projects`;
  - the robot's loading attributes;
  - the English copy.
- Tests for `AuthorPhoto`: nine code lines, one per property of `authorData.code`, with their exact text; the closing `};` on its own line; no line-break characters left in the code.
- **Vitest harness** (`vitest`, Testing Library, jsdom) replacing the Jest that left with `react-scripts`, plus `npm test` / `npm run test:run`.
- Tests for the projects filter reducer and for the language resolver.
- `src/utils/lang.js` — single source of truth for the initial-language precedence (`?lang=` → `localStorage` → `ru`), shared by the i18next bootstrap and `LanguageProvider`.

### Removed

- **`propTypes` declarations and the `prop-types` dependency.** React 19 no longer validates them at runtime, so all 36 blocks (402 lines) were dead code. JSDoc is now the single source of prop documentation — it was audited against every declaration first, and enriched where `propTypes` had been more precise: enum unions (`Heading.level`, `ScrollToTop.behavior`, `SocialItem`/`SocialList.variant`), nested shapes (`ModalSteps.steps`, `MenuItem.route`, `FilterList.filters`, `ProjectsHeader.breadcrumbs`) and optionality markers for the two props carrying defaults. Bundle: −1.5 kB gzip.

### Fixed

- **"Discuss a project" and "Contacts" lead to the contacts from any page.** On the 404 page there is no contact section, and the buttons did nothing: `CtaButton` looked for `.contact`, the menu's "Contacts" for `#contact-heading`, and neither changed the address. A new `useGoToContacts` hook gives them one target, the contact heading. Where the heading is on the page (home, /about, /projects), the button scrolls to it without changing the address, as before. Where it is not (404), the button opens `/#contact-heading`, and the home page lands with the heading right under the header. This covers the header pill, the mobile menu's "Contacts" and outline button, the modal's button and the "Discuss a project" cue in Services. Under reduced motion the scroll is now instant in all of them; `CtaButton` and the Services cue used to scroll smoothly regardless.
- **/projects no longer grows while card images load on phones.** Space for an image was reserved in the desktop file's ratio, but at ≤ 768 px `<picture>` loads taller tablet and mobile screenshots: at 390 px the page grew by 687 px as they arrived, and "Contacts" in the mobile menu stopped short of the contact section. The 4:5 frame now reserves the space in CSS, whatever source loads, and the contact heading lands right under the header.
- **Project screenshots are no longer squashed at 769–1024 px.** The image's `height` attribute fixed its height while its width stretched to the card: at 1024 px the rendered ratio was 0.52 instead of the file's 0.72. Each screenshot now keeps its own ratio.
- Typo in the Vam Voda tags: "WooCommerse" → "WooCommerce".
- **Enter on a mobile menu item no longer reopens the menu.** The item fired on keydown and closed the menu, focus went back to the burger, and `hamburger-react` toggled on the keyup that followed. The burger now ignores an Enter keyup whose keydown happened on another element. The bug predates S01 and affected every item.
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
