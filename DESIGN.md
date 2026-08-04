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
- **Label** (600–700, `0.75rem`–`0.875rem`, letter-spacing `0.04em`–`0.12em`, uppercase): nav-adjacent chrome — the scroll hint, the submit button, the modal eyebrow, testimonial attribution.

### Named Rules

**The One Monospace Rule.** The `ui-monospace` stack never appears outside the author card's IDE-window chrome. If a future component wants a "technical" feel, reach for Oswald's condensed weight first — monospace is reserved for the literal console motif.

## Layout

The container caps at `1440px` and steps down at wide breakpoints (`1200px` at ≤1520px, `1068px` at ≤1268px), with fluid inline padding `clamp(16px, 4vw, 32px)`. Section rhythm comes from a shared `.wrapper` (80px top / 60px bottom margin, tightening to 64px top on ≤768px) rather than per-section spacing.

Responsive behavior is **desktop-first**: every component is styled for its widest state first, then narrowed with `max-width` media queries. Breakpoints are tuned per component to that component's own content (1520, 1268, 1024, 992, 893, 768, 580, 475, 396, 375, 360, 320px all appear somewhere) rather than snapped to one fixed global grid — expect a new component to need its own breakpoint tuning, not a lookup into a shared set.

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

Corners default to a gentle **8px** (`--border-radius-s`) on buttons, cards, inputs, and images — the system's baseline geometry. Larger standalone surfaces scale their radius up with their size: 16px for the FAQ item and the about-story card, 20px for the modal (16px, then 14px as it shrinks on small screens), 24px for the author card. Fully circular **pill** radii (999px) are reserved for compact interactive/label chrome — the header's CTA button, the availability badge — never for content containers. The author photo ring is the one deliberate exception to the corner scale: a squircle (24px ring / 21px image, one step past the standalone-surface ceiling) rather than a pill, because its bottom edge carries a scrim gradient that dissolves the photo's cropped edge into its own backdrop — an effect a circular crop would fight rather than support.

Borders are almost always **whisper-thin (1–1.5px) and semi-transparent**, tinted to match their surface rather than a flat gray: Cobalt Shadow-tinted (`rgba(0, 88, 167, 0.1–0.3)`) on project imagery, cards, and the loader spinner, neutral-black-tinted (`rgba(0, 0, 0, 0.06–0.08)`) on light hairline dividers (header, FAQ, about-story card), white-tinted (`rgba(255, 255, 255, 0.05–0.1)`) on the two dark surfaces.

### Named Rules

**The Concentric Radius Rule.** When a rounded frame wraps a rounded child with padding (the hero CTA's rotating-border frame around its glass pill), the frame's radius equals the child's radius plus the padding (`16px` pill + `2px` padding = `18px` frame) so both edges share the same curvature. Don't round this kind of wrapper to a scale token — solve for concentricity instead.

## Components

### Buttons

- **Shape:** 8px radius by default; fully pill (999px) for the header/nav-mobile CTA.
- **Primary (pill):** cobalt background, white text, Oswald label typography, uppercase-free — used in the header and mobile nav for the "Discuss a project" CTA. Hover darkens to Cobalt Deep and lifts `-1px` with a cobalt-tinted glow.
- **Hero Spotlight (CV download):** the one glassmorphic button in the system — frosted white glass (`backdrop-filter: blur(16px) saturate(170%)`), CTA Spotlight Ink text, wrapped in a frame with a rotating CTA Spotlight rainbow border and a pulsing ring on entrance (see Colors → CTA Spotlight). This is the single most important conversion action on the page (CV download) and is the only button allowed this treatment.
- **Submit (form):** cobalt background, white text, uppercase Oswald label with `0.04em` tracking, full-width in the contact form. Hover **inverts** (white background, cobalt text/border) rather than darkening — the one button variant that swaps instead of deepens.
- **Ghost (text link):** no background, cobalt text, an animated underline that retracts on hover instead of appearing — used for "read more" style links.
- **Filter toggle:** white/cobalt-text at rest, solid cobalt with a white ring border when active — a stateful toggle, not a one-off button.

### Chips (Tag)

- **Style:** Frost background, cobalt text, 20px pill radius, tight padding (`2px 10px`) — quiet and label-like, never treated as clickable.

### Cards / Containers

- **Corner Style:** 8px for project/services cards; 16px for the about-story card and FAQ items.
- **Background:** white by default; the project card itself has no fill (transparent over the page), relying on its border and shadow alone.
- **Shadow Strategy:** ambient at rest, cobalt-tinted and deeper on hover (see Elevation & Depth) — except the testimonial card, which never lifts; it's a static reading surface.
- **Border:** whisper-thin, tinted per surface (see Shapes).
- **Internal Padding:** scales with viewport via `clamp()`, typically `1rem`–`2.5rem`.

### Inputs / Fields

- **Style:** Paper background, near-invisible `rgba(0,0,0,0.1)` border, 8px radius.
- **Focus:** background lifts to white, border turns cobalt, and a soft `0 0 0 3px rgba(0,88,167,0.1)` cobalt glow ring appears.
- **Error:** border and background shift to the Signal Magenta / Magenta Mist pairing; the focus ring re-tints to match.

### Navigation

- **Desktop:** plain Oswald text links (no background chrome), Carbon at rest, turning Cobalt on hover/active — restrained and typographic.
- **Mobile:** the same links are "buttonized" into cobalt-bordered pill-ish rows inside a full-screen white drawer — a deliberate shift from typographic to tactile as the nav becomes touch-primary.
- **Header shell:** transparent and borderless at the top of the page; gains a blurred white background, hairline border, and soft shadow once scrolled (`.header--bg`).

### Signature: The Developer's Console

Four cross-cutting moments carry the "developer console" identity, deliberately using the same reserved monospace stack and cobalt hue rather than unrelated ideas:

1. **Logo caret** — the wordmark "AntoshkinDev" ends in a blinking cobalt caret (`steps(1)` blink, 1.06s), a literal cursor.
2. **Author IDE card** (About page) — a dark, 24px-radius card styled as a code editor window: red/yellow/green traffic-light dots, a lowercase monospace title bar, and a syntax-highlighted fake code snippet in the footer.
3. **Decoding hero subtitle** — the hero's identity line decodes itself character-by-character (unresolved characters cycle through random glyphs of the same alphabet in cobalt, then lock to Ink) on load and again on a long loop, echoing a terminal printing text.
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
