---
name: AntoshkinDev — Anton Zhilin Portfolio
description: A clean cobalt/violet frontend-developer portfolio with a recurring "developer console" signature (blinking caret, IDE-window author card, decoding hero text).
colors:
  cobalt: '#2563eb'
  cobalt-deep: '#1d4ed8'
  cobalt-focus: '#60a5fa'
  cobalt-mist: '#d6e7f6'
  cobalt-night: '#0b1220'
  cobalt-shadow: '#0058a7'
  signal-violet: '#7c3aed'
  signal-violet-light: '#a78bfa'
  violet-mist: '#ece7f8'
  terminal-teal: '#0e7490'
  terminal-teal-mist: '#dbeef0'
  signal-magenta: '#c11574'
  magenta-mist: '#fdf2fa'
  success-green: '#15803d'
  available-green: '#22c55e'
  white: '#ffffff'
  black: '#000000'
  paper: '#fafafa'
  frost: '#eef4ff'
  graphite: '#6e6e6e'
  ink: '#26292d'
  carbon: '#171718'
  cta-spotlight-blue: '#2f52f7'
  cta-spotlight-violet: '#8b3ff2'
  cta-spotlight-pink: '#ff5c8a'
  cta-spotlight-ink: '#1b2140'
typography:
  display:
    fontFamily: "'Unbounded', 'Oswald', sans-serif"
    fontSize: 'clamp(2.5rem, 9vw, 6rem)'
    fontWeight: 700
    lineHeight: 1.03
    letterSpacing: '-0.025em'
  headline:
    fontFamily: "'Oswald', sans-serif"
    fontSize: 'clamp(1.5rem, 2.5vw, 1.625rem)'
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 'normal'
  body:
    fontFamily: "'Golos Text', sans-serif"
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 'normal'
  label:
    fontFamily: "'Oswald', sans-serif"
    fontSize: '0.75rem'
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: '0.09em'
rounded:
  sm: '8px'
  md: '16px'
  lg: '20px'
  xl: '24px'
  pill: '999px'
spacing:
  xs: '0.5rem'
  sm: '1rem'
  md: '1.5rem'
  lg: '2rem'
  xl: '3rem'
components:
  button-primary:
    backgroundColor: '{colors.cobalt}'
    textColor: '{colors.white}'
    typography: '{typography.label}'
    rounded: '{rounded.pill}'
    padding: '0.625rem 1.25rem'
  button-primary-hover:
    backgroundColor: '{colors.cobalt-deep}'
  button-submit:
    backgroundColor: '{colors.cobalt}'
    textColor: '{colors.white}'
    typography: '{typography.label}'
    rounded: '{rounded.sm}'
    padding: '0.875rem 1.5rem'
    width: '100%'
  button-submit-hover:
    backgroundColor: '{colors.white}'
    textColor: '{colors.cobalt}'
  button-ghost:
    backgroundColor: 'transparent'
    textColor: '{colors.cobalt}'
    typography: '{typography.headline}'
  chip-tag:
    backgroundColor: '{colors.frost}'
    textColor: '{colors.cobalt}'
    rounded: '20px'
    padding: '2px 10px'
  input-field:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    typography: '{typography.body}'
    rounded: '{rounded.sm}'
    padding: '0.75rem 1rem'
  input-field-focus:
    backgroundColor: '{colors.white}'
---

# Design System: AntoshkinDev — Anton Zhilin Portfolio

## Overview

**Creative North Star: "The Developer's Console"**

The base register is a clean, professional cobalt-and-violet portfolio: generous whitespace, softly rounded 8px corners, an ambient starfield drifting behind everything, and restrained shadows that only deepen on interaction. This is the surface a recruiter skims in thirty seconds — nothing about it should feel like a stunt.

Layered on top, in a handful of deliberate spots, is a recurring "developer console" signature that quietly reinforces the identity of the person behind the site: the logo's wordmark ends in a blinking CLI-style caret, the About page's author card is styled as a literal IDE window (traffic-light dots, a monospace title bar, a syntax-highlighted fake code snippet), and the hero's subtitle decodes itself into place character-by-character like a terminal printing text, looping quietly in the background. These moments use a genuine `ui-monospace` stack reserved exclusively for them — the rest of the site never touches monospace.

The two registers coexist deliberately: most of the site stays warm, approachable, and unmistakably a professional portfolio; the console motif is a grace note for the technically literate visitor, not a full re-skin. Two surfaces are allowed to go properly dark and deep — the contact modal and the About page's author card — everywhere else stays light.

**Key Characteristics:**

- Cobalt blue (`#2563eb`) is the one unmistakable action color — links, active nav, focus rings, primary buttons.
- Corners default to a gentle 8px; pills (999px) are reserved for compact, tappable chrome (the header CTA, tags, the availability badge).
- Borders and hover shadows are tinted with the brand's own blue hue, not neutral black.
- A three-color cobalt → indigo → violet diagonal gradient exists in exactly four places, never as generic decoration.
- The hero's flagship CV-download button carries its own one-off "spotlight" rainbow (cobalt → violet → pink), distinct from the shared gradient token.
- A "developer console" motif (blinking caret, IDE-window card, decoding text) recurs as a signature, not a re-theme.

## Colors

Mostly a two-color system — cobalt as the one true action color, violet as a quieter secondary accent — plus a handful of narrowly-scoped utility colors that never leak outside their one job.

### Primary

- **Cobalt** (`#2563eb`): the site's one unmistakable action color — links, active nav state, focus rings, primary CTA buttons, the fixed scroll-to-top button. If something is clickable and important, it's cobalt.
- **Cobalt Deep** (`#1d4ed8`): the hover/press state for cobalt surfaces — buttons and the scroll-to-top button darken to this on hover, darken further to Cobalt Night on `:active`.
- **Cobalt Focus** (`#60a5fa`): focus-ring and light-border accents (logo focus outline, filter-button active border).
- **Cobalt Mist** (`#d6e7f6`): a pale cobalt tint used as a soft background layer (the first of about-story's three text-highlight layers).
- **Cobalt Night** (`#0b1220`): the deepest cobalt step, used only for the scroll-to-top button's `:active` press state.
- **Cobalt Shadow** (`#0058a7`): a deeper, more desaturated cobalt reserved exclusively for tinting shadows, borders, and background glow — never text or interactive fill. Alpha rises from a near-invisible ~0.08 at rest toward ~0.2–0.3 on hover/emphasis, rather than snapping between fixed steps (the same organic, content-driven tuning as the breakpoints in Layout). Appears in project cards, services items, advantages cards, about-story, the contact form's focus ring, the loader spinner, and the page background's corner glow (`main.css`). This is the literal color behind The Colored Shadow Rule below — pitched lower/duller than interactive Cobalt (`#2563eb`) so depth never reads as a second link color. A lighter tint step (`#3073c5`) appears once, in the About page author card's hover glow ring.

### Secondary

- **Signal Violet** (`#7c3aed`): the section-heading accent word color and the tail-end of the signature gradient. Never used for interactive chrome — it's reserved for one accent word per heading.
- **Signal Violet Light** (`#a78bfa`): the white/dark-mode logo variant's caret color.
- **Violet Mist** (`#ece7f8`): the third of about-story's three text-highlight layers.

### Tertiary

- **Terminal Teal** (`#0e7490`) / **Terminal Teal Mist** (`#dbeef0`): used in exactly one place — the second of about-story's three hue-differentiated highlight layers. Not used anywhere else in the system.

### Neutral

- **Carbon** (`#171718`): the darkest neutral — heading text, the logo wordmark, dark-surface backgrounds (author card).
- **Ink** (`#26292d`): primary body-copy color (about, contact, form labels) — one step lighter than Carbon, reserved for reading text rather than headings.
- **Graphite** (`#6e6e6e`): secondary/meta text — captions, hints, the footer copyright line, testimonial attribution. Never primary reading text.
- **Frost** (`#eef4ff`): a pale cobalt-tinted near-white — tag backgrounds, testimonial-card borders.
- **Paper** (`#fafafa`): warm near-white for input fields at rest and the About page's photo-card wrapper.
- **White** (`#ffffff`) / **Black** (`#000000`): page background and the rare true-black asset background.

### Utility (semantic, single-purpose)

- **Signal Magenta** (`#c11574`, named `--color-red-500` in code — it reads as magenta/pink, not red): form validation errors and the one "sharp CTA accent" phrase in about-story. Never decorative.
- **Magenta Mist** (`#fdf2fa`): the error-banner and error-field background tint that pairs with Signal Magenta.
- **Success Green** (`#15803d`): the contact form's success-state icon. Nothing else.
- **Available Green** (`#22c55e`): the pulsing "open to offers" status-dot only.

### CTA Spotlight (one-off, single component)

- **CTA Spotlight Blue** (`#2f52f7`), **CTA Spotlight Violet** (`#8b3ff2`), **CTA Spotlight Pink** (`#ff5c8a`): a hand-tuned, more saturated rainbow used only by the hero's rotating conic-gradient CTA border (`.hero__btn-spin`) and its matching focus outline, glow ring, and icon-badge gradient — a deliberately punchier variant of the site's cobalt/violet reserved for the single flagship CV-download button. Distinct from the shared `--gradient` token; do not merge the two.
- **CTA Spotlight Ink** (`#1b2140`): the near-black navy text color inside that same glassmorphic button — one step darker/bluer than Carbon, used nowhere else.

### Named Rules

**The Colored Shadow Rule.** Interactive surfaces rest with a neutral, near-invisible shadow (or none) and _deepen into a Cobalt Shadow-tinted shadow_ (`rgba(0, 88, 167, …)` — see Colors → Cobalt Shadow) specifically on hover — the brand's own hue casts the light, rather than generic black. The project card is the one exception that carries the cobalt tint even at rest, since it's the most showcase-forward surface in the system.

**The One Gradient Rule.** The signature `linear-gradient(120deg, #2563eb 0%, #6366f1 50%, #7c3aed 100%)` diagonal appears in exactly four places — the hero title's accent text, the About page's showcasing overlay, and the photo ring shared by `AuthorPhoto` and `AuthorIdentity` (both compose the same `PhotoRing` component). It is a hero-moment device, never a general decorative fill. The hero CTA button's rotating border is a _separate_ device (see CTA Spotlight) and does not use this token.

**The CTA Spotlight Rule.** The hero's CV-download button is the one place allowed to break from the documented cobalt/violet palette into its own punchier rainbow (CTA Spotlight Blue/Violet/Pink/Ink). It is a single, deliberately hand-tuned exception for the site's most important CTA — not a precedent for adding more one-off colors elsewhere.

## Typography

**Display Font:** Unbounded (with Oswald, sans-serif fallback)
**Headings/UI Font:** Oswald — condensed, used for nav links, card/modal titles, buttons, and uppercase labels
**Body Font:** Golos Text (with sans-serif fallback) — all reading copy and form fields
**Signature Mono Font:** `ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace` — reserved exclusively for the "developer console" motif (the author card's window title bar and fake code block). Never used for general UI.

**Character:** Unbounded's heavy geometric weight gives the hero and section headings real presence; Oswald's condensed, slightly technical feel carries UI chrome without competing with it; Golos Text stays warm and legible for long-form reading in both Cyrillic and Latin.

### Hierarchy

- **Display** (700–800, `clamp(2.5rem, 9vw, 6rem)` down to `clamp(2rem, 5vw, 3.5rem)` for section headings, line-height 1.03–1.1): the hero title and every section's `## heading`. Appears once per section, always centered on section headings. On the narrowest phones (≤475px) the hero title drops to a confirmed flat floor of `1.9rem` with `-1.5px` letter-spacing — the `clamp()`'s own minimum reads too large at that width, so this override is the documented floor, not an arbitrary number.
- **Headline** (500–700, `1.25rem`–`1.8rem`, line-height ~1.22–1.25): card and modal titles — project-card info title, modal title, author name, services subheading.
- **Body** (400, `1rem`–`1.125rem`, line-height 1.5–1.75): paragraph copy, form fields, testimonial quotes. About-story's long-form paragraphs stretch to line-height 1.75 for readability; the hero subtitle stays tighter at 1.5.
- **Meta** (400–600, `0.8125rem`–`0.9375rem`, line-height 1.4–1.5, sentence case): secondary text sitting below primary content, never uppercase or tracked (that's what separates it from Label at an overlapping size) — the author card's location line, Contact's info lines and its compact secondary links, the contact form's required-field hint and inline field errors. The tag chip, loader status line, and the mobile-width ButtonLink/`.cta-button--block` labels sit at this step's own `0.875rem` ceiling for the same reason: small, sentence-case, secondary — not Label's uppercase chrome.
- **Label** (600–700, `0.75rem`–`0.875rem`, letter-spacing `0.04em`–`0.12em`, uppercase): nav-adjacent chrome — the scroll hint, the submit button, the modal eyebrow, testimonial attribution.

### Named Rules

**The One Monospace Rule.** The `ui-monospace` stack never appears outside the author card's IDE-window chrome. If a future component wants a "technical" feel, reach for Oswald's condensed weight first — monospace is reserved for the literal console motif.

## Layout

The container caps at `1440px` and steps down at wide breakpoints (`1200px` at ≤1520px, `1068px` at ≤1268px), with fluid inline padding `clamp(16px, 4vw, 32px)`. Section rhythm comes from a shared `.wrapper` (80px top / 60px bottom margin, tightening to 64px top on ≤768px) rather than per-section spacing. The page frame keeps the footer on the bottom edge: when a page is shorter than the screen (the 404), the spare height goes to `main`, above the footer, never into a band below it.

Responsive behavior is **desktop-first**: every component is styled for its widest state first, then narrowed with `max-width` media queries. Breakpoints are tuned per component to that component's own content (1520, 1268, 1024, 992, 893, 768, 580, 567, 479, 475, 396, 375, 360, 320px all appear somewhere) rather than snapped to one fixed global grid — expect a new component to need its own breakpoint tuning, not a lookup into a shared set.

### Named Rules

**The Desktop-First Rule.** Base styles target the largest viewport; `@media (max-width: …)` narrows down from there. Do not introduce `min-width` mobile-first queries — it would fight the rest of the codebase's cascade.

## Elevation & Depth

The system is mostly flat-at-rest with soft, low-alpha ambient shadows that _deepen on interaction_ rather than sitting permanently heavy (services items, project cards, the scroll-to-top button all lift and darken their shadow on hover). Two surfaces are the deliberate exception and go genuinely deep: the contact modal (a dark navy card floating over a blurred near-black backdrop) and the About page's author card (a near-black card with a heavy `0 24px 60px rgba(0,0,0,0.55)` rest shadow that grows further on hover). Everywhere else, depth stays quiet.

### Shadow Vocabulary

- **Ambient** (`0px 0px 8px 0px #00000026`): the default token (`--box-shadow`) for services items and testimonial cards at rest — a near-invisible presence shadow.
- **Cobalt Hover** (`0 8px 32px rgba(0, 88, 167, 0.18)` to `0 12px 36px rgba(0, 88, 167, 0.18)`, i.e. Cobalt Shadow at ~0.18): the hover-lift shadow for project cards and services items — brand-tinted, not neutral.
- **Deep Surface** (`0 24px 60px rgba(0,0,0,0.35), 0 8px 20px rgba(0,0,0,0.25)` for the modal; `0px 24px 60px rgba(0,0,0,0.55)` for the author card): reserved for the two "night" surfaces only.

### Named Rules

**The Flat-Until-Touched Rule.** Nearly every card in the system starts at rest with a whisper of shadow (or none) and only earns real depth on `:hover` — a static screenshot of the page should look calm; interaction is what reveals dimension.

## Shapes

Corners default to a gentle **8px** (`--border-radius-s`) on buttons, cards, inputs, and images — the system's baseline geometry. Larger standalone surfaces scale their radius up with their size: 16px for the FAQ item, the about-story card, the stack card and the resume card, 20px for the modal (16px, then 14px as it shrinks on small screens), 24px for the author card. Fully circular **pill** radii (999px) are reserved for compact interactive/label chrome — the header's CTA button, the availability badge — never for content containers. The author photo ring is the one deliberate exception to the corner scale: a squircle (24px ring / 21px image, one step past the standalone-surface ceiling) rather than a pill, because its bottom edge carries a scrim gradient that dissolves the photo's cropped edge into its own backdrop — an effect a circular crop would fight rather than support.

Borders are almost always **whisper-thin (1–1.5px) and semi-transparent**, tinted to match their surface rather than a flat gray: Cobalt Shadow-tinted (`rgba(0, 88, 167, 0.1–0.3)`) on project imagery, cards, and the loader spinner, neutral-black-tinted (`rgba(0, 0, 0, 0.06–0.08)`) on light hairline dividers (header, FAQ, about-story card), white-tinted (`rgba(255, 255, 255, 0.05–0.1)`) on the two dark surfaces.

### Named Rules

**The Concentric Radius Rule.** When a rounded frame wraps a rounded child with padding (the hero CTA's rotating-border frame around its glass pill), the frame's radius equals the child's radius plus the padding (`16px` pill + `2px` padding = `18px` frame) so both edges share the same curvature. Don't round this kind of wrapper to a scale token — solve for concentricity instead.

## Components

### Buttons

- **Shape:** 8px radius by default; fully pill (999px) for the header CTA and the button pairs of the mobile menu, the 404 page and /about.
- **Primary (pill):** cobalt background, white text, Oswald label typography, uppercase-free. Hover darkens to Cobalt Deep and lifts `-1px` with a cobalt-tinted glow (mouse only in the mobile menu, on the 404 page and on /about). Four uses: "Discuss a project" in the header, "Download CV" in the mobile menu and on /about, and "Go to homepage" on the 404 page. The menu one is a `download` link, not a button: full width, `min-height: 48px`, a "↓" after the label. It leads the menu's button pair, because the CV comes first and freelance second. The /about one repeats it under the tags of the first section, so the CV is reachable without the burger menu and on desktop: the same values and the same order, in a row 10px apart from 576px, a full-width column below. The 404 one is a route link leading its pair: `min-height: 48px`, and a 1.5px cobalt border that turns Cobalt Deep with the fill, so it matches its Outline partner to the pixel.
- **Outline (secondary):** transparent background, a 1.5px cobalt border, cobalt Oswald text, `min-height: 48px`, fully pill — the quiet partner placed next to a primary action, never on its own. Frost background on hover (mouse only, under `@media (hover: hover)`) and on `:active` as touch feedback. "Discuss a project" uses it in three places, each time after a CV download. In the hero below 768px it is sized to the Spotlight button's width. In the mobile menu it sits under the cobalt "Download CV" pill, full width, with the arrow 4px from the label, as in that pill. On /about it follows that pill the same way, with the arrow 4px from the label: beside it from 576px, under it at full width below. On the 404 page "View projects →" wears it as a route link with its own class (not `CtaButton`), next to "Go to homepage": in a centred row 10px apart from 576px, a full-width column below. Its arrow sits 4px from the label and moves 3px forward on hover, as `CtaButton`'s does.
- **Hero Spotlight (CV download):** the one glassmorphic button in the system — frosted white glass (`backdrop-filter: blur(16px) saturate(170%)`), CTA Spotlight Ink text, wrapped in a frame with a rotating CTA Spotlight rainbow border and a pulsing ring on entrance (see Colors → CTA Spotlight). This is the single most important conversion action on the page (CV download) and is the only button allowed this treatment.
- **Submit (form):** cobalt background, white text, uppercase Oswald label with `0.04em` tracking, full-width in the contact form. Hover **inverts** (white background, cobalt text/border) rather than darkening — the one button variant that swaps instead of deepens.
- **Ghost (text link):** no background, cobalt text, an animated underline that retracts on hover instead of appearing — used for "read more" style links.
- **Filter toggle:** underline tab, matching the header nav's text-link language — gray-900 Oswald text at rest, turning cobalt on hover/active, with a cobalt underline sliding beneath the active item. No background chrome. Still a stateful toggle (`aria-pressed`), not real ARIA tabs — it filters a list in place rather than switching panels.

### Chips (Tag)

- **Style:** Frost background, cobalt text, 20px pill radius, tight padding (`2px 10px`) — quiet and label-like, never treated as clickable.

### Cards / Containers

- **Corner Style:** 8px for project/services cards; 16px for the about-story card, the stack card, resume cards and FAQ items.
- **Background:** white by default; the project card itself has no fill (transparent over the page), relying on its border and shadow alone.
- **Shadow Strategy:** ambient at rest, cobalt-tinted and deeper on hover (see Elevation & Depth) — except the testimonial card, which never lifts; it's a static reading surface.
- **Border:** whisper-thin, tinted per surface (see Shapes).
- **Internal Padding:** scales with viewport via `clamp()`, typically `1rem`–`2.5rem`.

**Project card (/projects).** Card text reads as text, not as links: titles and section headings are Carbon, the description and table values Ink, table lines a neutral `rgba(0, 0, 0, 0.08)` hairline; cobalt stays only on tags, links and buttons. On tablets and phones (≤ 1024px) the card turns compact:

- Year and role become one Label line above the title: Oswald 700 0.75rem, 0.09em tracking, Graphite, a drawn 3px dot with 6px either side. The "Info" table is hidden. On phones (≤ 580px) the line sits 12px under the image.
- The title is a bold Headline, Oswald 700 1.6875rem, the same step as the showcase strip title.
- The description is Body at 1rem with a 1.625 line and folds to three lines. Under it, a Ghost "Read more ⌄" toggle (cobalt Oswald 500 1rem, 44px tall, `aria-expanded`) turns into "Show less" with the chevron flipped. It is rendered only when the text is actually cut, so a short description has no toggle; desktop always shows the full text.
- The "Tools" heading is hidden visually but kept for screen readers, so the tags follow the description directly.
- "Demo" and "GitHub" become card actions, a distinct button variant rather than the pill Outline: 44px tall, 8px radius, a 1.5px cobalt border on both. Demo is filled cobalt with white text and a small 11px "opens the site" arrow; GitHub is transparent with cobalt text and a 16px logo. Label and icon sit 10px apart. They share the row 50/50, and a single link takes the full width. Hover is mouse-only (Cobalt Deep / Frost); a tap gives the same feedback.
- From 768px down every card image is a 4:5 frame, `object-fit: cover`, anchored to the top. At 769–1024px screenshots keep their own ratio under a 46rem cap.

**Resume card (experience, education).** One card per job or course on /about, shared by both sections. It is a white surface with a 16px radius and a neutral 6% hairline, padded `clamp(1.4rem, 1rem + 1.6vw, 2.25rem)`: 22.4px at 390px, 28.3px at 768px, 36px on desktop. As on the project card, the text reads as text, not as links: there is no cobalt in it. Top to bottom:

- An optional Label for the company or school: Oswald 700 0.75rem, 0.09em tracking, Graphite, 8px above the title. Freelance work has none.
- A Headline h3 for the role or programme: Oswald 600 `clamp(1.5rem, 2.5vw, 1.625rem)` with a 1.25 line, Carbon, balanced when it wraps.
- Meta dates: Golos 400 0.875rem, Graphite, never wrapping. From 769px they sit on the title's baseline at the right edge, and the title wraps first. At 768px and below they move 8px under the title.
- Stages, the first 16px under the dates. Each has a stage date (Golos 600 0.875rem, Ink), then a one-sentence Body summary (1rem, 1.625 line, Ink), then points 8px apart. A point is the same Body with a 16px indent and a 6px Graphite dot 10px from its top, centred on the first 26px line. The list keeps `role="list"`, so VoiceOver still announces it despite `list-style: none`. Stages are split by the project card's 8% hairline, with 24px above and below it.
- Without stages, one Body paragraph 16px under the dates (education).

The card never lifts: it is a static reading surface, like the testimonial card. In forced-colors mode the dot is drawn with a 3px border, because the mode paints backgrounds over. Spacing between cards belongs to the parent list.

**Stack groups ("My stack", /about).** The technologies on /about, in five groups without a paragraph: core stack, layout, quality, also worked with, learning. They sit on one white card, the about-story surface: 16px radius, a neutral 6% hairline, padded `clamp(1.4rem, 1rem + 1.6vw, 2.25rem)`. The markup is a description list, one `div` around each group's `dt` and `dd`:

- The group name is the resume card's Label: Oswald 700 0.75rem with a 1.4 line, 0.09em tracking, uppercase, Graphite.
- The chips are Tag chips (see Chips), 8px apart within a row and between rows. Each group's chips are a list with `role="list"` that follows its label; the whole `dl` is named "Technology stack".
- From 576px the label sits in a 160px column, 24px from the chips and on the baseline of their first row; groups are 16px apart. At 575px and below the label stands 8px above its chips, and groups are 24px apart.

Technology names are spelled as everywhere else on the site: jQuery, RTK Query, Next.js. Nothing in the card is clickable, and the labels never take cobalt. Each group's chips fade in one by one as the group scrolls into view; the labels stay still.

**Advantages list ("Why me", home).** On desktop the seven advantages are a bento grid of cards that lift on hover, mouse only. On tablets and phones (≤ 1024px) they become rows inside one white card: 16px radius, a 1px Frost border, 16px padding. Each row is a 40px Frost icon tile (8px radius, 9px inset, cobalt icon) beside Body text at 1rem with a 1.4 line, centred vertically. Rows are 14px apart with a Frost hairline under every row but the last. At 569–1024px the rows run in two columns 14px apart, at 568px and below in one; the hairline reads as a row boundary, so in two columns the last row of the right column keeps it. Rows never lift — the hover lift belongs to the bento cards only.

**About facts and author card (home).** On desktop the four fact plaques are a flex row of natural-width chips. On tablets and phones (≤ 1024px) they are a grid of equal plaques across the column, four in a row down to 568px and 2×2 at 567px and below. The value keeps the desktop Oswald 700 1.6rem and never wraps; the label is a Label, Oswald 600 0.75rem with 0.08em tracking, as in the audit mockup (desktop keeps its Golos label). The light author card stays a row down to 480px: photo on the left, meta on the right. At ≤ 1024px it follows the mockup — the photo grows from 120px at 480px to 150px at 768px, the name is a Headline growing from 1.25rem to 1.75rem, the role sits at 0.9375rem and the location at 0.875rem, and the "Open to work" badge shares a row with 44px social circles, the circles wrapping under the badge where the row is narrow. Below 480px the card is a column with everything centred. These rules live under `.author-identity` only: the dark IDE card on /about shares `AuthorMeta` and keeps its own layout.

### Showcase Strip (touch layouts)

On tablets, phones and any touch screen (`(max-width: 1024px), (hover: none)`) the home page's best projects become a native CSS scroll-snap strip instead of the sticky showcase; desktop with a mouse keeps the sticky one, reduced motion keeps the static list. The strip carries its own background from the audit mockup: `linear-gradient(160deg, cobalt, Signal Violet)` (`--color-blue-700` → `--color-violet-500`), almost top to bottom and with no indigo midpoint. It covers the section wrapper, whose 120° site gradient stays with the desktop showcase. This is a separate device from the One Gradient token, and the muted text colors below are tuned to it: on the indigo middle of the site gradient they fail AA. One swipe moves exactly one card (`scroll-snap-stop: always`); on phones (≤ 767px) the next card peeks at least 60px (card = width − 56px, capped at 340px), from 768px up cards are 520px. The image keeps the shared showcasing-card treatment — `cover`, anchored to the top, 16/9 on tablets and 3/4 below 768px, the same breakpoint as its `<picture>` sources. Under it:

- a Label meta line, Oswald 700 0.75rem with 0.12em tracking, white at 0.85 — year and role split by a text "·" with roughly 7px of space each side;
- a Headline title, Oswald 700 1.6875rem, pure white;
- the slogan at 0.9375rem with a 22px line, white at 0.9.

These alphas are the lowest that hold 4.5:1 across the strip's gradient at 360–1366px. "View project" is a white pill with cobalt Oswald text (the sticky showcase's CTA precedent), pinned to the card's bottom so the buttons line up across cards. Above the strip, the "01 / 04" counter sits on the left — Oswald 700 1.1875rem, the current number white and "/ 04" at 0.65. That is large bold text, so 3:1 applies; 0.6 would drop to 2.9:1. Dots sit on the right in a dense group stepped every 24px with 16px visible gaps: an 8px dot in a 24×44 button, and the active one a 24×8 pill in a 40×44 button, so state reads by shape, not only by color. The buttons sit edge to edge, so hit areas never overlap. 24px is the WCAG 2.5.8 AA minimum; the owner chose it over the brief's 44×44, which does not fit the mockup's group. Inactive dots are white at 0.62, the lowest that keeps 3:1 against the strip under them. Focus is a white 2px ring with a 3px gap, drawn around the visible dot rather than its hit area; the track keeps vertical padding so no ring is clipped top or bottom, and keyboard focus moving into a card — Tab or Shift+Tab — scrolls the strip to that card.

### Inputs / Fields

- **Style:** Paper background, near-invisible `rgba(0,0,0,0.1)` border, 8px radius.
- **Focus:** background lifts to white, border turns cobalt, and a soft `0 0 0 3px rgba(0,88,167,0.1)` cobalt glow ring appears.
- **Error:** border and background shift to the Signal Magenta / Magenta Mist pairing; the focus ring re-tints to match.

### Navigation

- **Desktop:** plain Oswald text links (no background chrome), Carbon at rest, turning Cobalt on hover/active — restrained and typographic.
- **Mobile:** the same links are "buttonized" into rows inside a full-screen white drawer — a deliberate shift from typographic to tactile as the nav becomes touch-primary.
  - Each row is 56px tall with a 12px radius, a 35% cobalt hairline, a Cobalt Deep Oswald label and a cobalt "›" chevron on the right. The chevron reads as "go there", so rows carry no per-route icons.
  - "Contacts" is a row like the routes, but it is an anchor to the contact section.
  - Below the rows sit the CV / "Discuss a project" pair and a "Site language" row: a gray label on the left, the switcher on the right.
- **Header shell:** transparent and borderless at the top of the page; gains a blurred white background, hairline border, and soft shadow once scrolled (`.header--bg`).

### 404 page

One centred column inside `.container`, top padding `--header-height` + 2rem. It holds the robot GIF, then a Label eyebrow ("Error 404"), then a visible Display h1, then a Body paragraph, then the Primary / Outline pair ("Go to homepage" / "View projects →"). The steps between them are 1.5rem, 0.5rem, 1rem and 2rem.

- **h1.** The section heading component at level 1: "Page" in Carbon plus "not found" as the Signal Violet accent. The accent never breaks, so phones get two clean lines.
- **Text.** Ink, not cobalt, so it does not read as a link, capped at 32rem. The missing address inside it is Golos 600 Carbon. It is decoded (`/страница`, not `%D1%81…`) and breaks anywhere, and it is deliberately not monospace (One Monospace Rule).
- **Robot.** 320px, 240px at ≤ 575px, never wider than its 400px source. It loads eagerly. `mix-blend-mode: multiply` dissolves the GIF's white background into the page grid; the robot's own white fill lets the grid through a little, which the mockup accepts.
- **Fit.** At 360 × 780 the eyebrow, heading, text and both buttons fit on the first screen: the second button ends at 698px.
- **Semantics.** No `role="alert"`: the page is static content, not an urgent announcement.

### Signature: The Developer's Console

Four cross-cutting moments carry the "developer console" identity, deliberately using the same reserved monospace stack and cobalt hue rather than unrelated ideas:

1. **Logo caret** — the wordmark "AntoshkinDev" ends in a blinking cobalt caret (`steps(1)` blink, 1.06s), a literal cursor.
2. **Author IDE card** (About page) — a dark, 24px-radius card styled as a code editor window: red/yellow/green traffic-light dots, a lowercase monospace title bar, and a syntax-highlighted fake code snippet in the footer. Each property of the snippet is a block line indented `2ch` by CSS, not by spaces in the text; on phones (≤ 480px) the snippet wraps instead of scrolling sideways, and a wrapped continuation hangs `2ch` further in, to the right of the property name.
3. **Decoding hero subtitle** — the hero's identity line decodes itself character-by-character (unresolved characters cycle through random glyphs of the same alphabet in cobalt, then lock to Ink) on load and again on a long loop, echoing a terminal printing text. On touch screens (`hover: none`) it decodes exactly once, on load, and then stays readable.
4. **PhotoRing inspect hover** — hovering the author photo ring (shared by `AuthorIdentity` and `AuthorPhoto`) reveals a dashed cobalt outline and a `<PhotoRing />` tag chip in the reserved monospace stack, echoing a browser devtools "inspect element" highlight — a grace note for the technically literate visitor that doubles as a wink at the site's own React/JSX stack.

All four respect `prefers-reduced-motion` by disabling their transition and rendering statically (the caret, card glow, and subtitle stop animating; the inspect overlay's hover fade becomes instant rather than eased).

## Do's and Don'ts

### Do:

- **Do** default every new surface to **8px** corners; only go larger (16–24px) for a big standalone surface, and only go full pill (999px) for compact interactive or label chrome.
- **Do** tint borders and hover shadows with the brand's own cobalt hue (`rgba(0, 88, 167, …)`) on interactive/elevated surfaces rather than neutral black.
- **Do** keep the signature gradient to genuine hero moments — it currently has exactly four uses; a fifth needs a real reason. Don't reach for it when what you actually want is a new one-off accent (see the CTA Spotlight exception).
- **Do** treat the "developer console" motif (caret, IDE card, decoding text) as an occasional signature shared across the whole site, not a one-off per component — reuse the reserved monospace stack rather than introducing a new one.
- **Do** ship a `prefers-reduced-motion` fallback for any new animation; every existing animated component in this codebase already does.
- **Do** style desktop-first with `max-width` media queries, matching the rest of the codebase.

### Don't:

- **Don't** introduce a new hue outside the existing role-assigned palette (cobalt = action, violet = heading accent, teal = about-story-only, magenta = error, green = success/available, CTA Spotlight = the one hero button) — extend an existing role before adding a new color.
- **Don't** extend the CTA Spotlight rainbow to any other button — it is a documented exception for exactly one component, not a second brand palette.
- **Don't** give testimonials real names, companies, or logos — they are deliberately anonymized; see PRODUCT.md.
- **Don't** use the monospace stack for general UI — it is reserved for the console motif specifically.
- **Don't** flatten the contact modal or the author card into the site's light, restrained-shadow language; they are the two intentionally deep/dark surfaces in the system.
- **Don't** switch any component to mobile-first `min-width` queries.
