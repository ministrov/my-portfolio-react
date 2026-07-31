# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: hiring managers, tech leads, and recruiters at companies evaluating Anton Zhilin (Антон Жилин) for a full-time frontend developer role (office, hybrid, or remote). Secondary: freelance/direct clients looking to hire a frontend developer for a one-off project. The site deliberately serves both — the CTA pair "Download CV" (employment) and "Discuss a project" (freelance) sit side by side — but employment is the primary goal; freelance is secondary and must not crowd it out.

Job to be done: quickly assess real skill level and stack fit by browsing shipped projects and verified stats, then either download the CV PDF or open the contact form.

## Product Purpose

A personal portfolio SPA that proves frontend craft — React/Next.js/TypeScript, responsive pixel-perfect UI, WCAG 2.1 accessibility, Core Web Vitals performance — through real shipped projects, converting a visiting recruiter or client into a CV download or a contact submission. Success is primarily a job conversation; a freelance inquiry is a secondary but welcome outcome.

## Positioning

What a copy-paste competitor portfolio could not truthfully claim: real shipped projects with live demo links and/or public GitHub repos (not templates or mockups), a verified skill benchmark (confirmed "Middle" level at an HTML Academy championship), openly published, measured technical quality (Lighthouse scores in the README), and a bilingual RU (default) / EN experience with the language choice persisted in the URL and localStorage.

## Operating Context

Visitors typically arrive from a shared link (sometimes carrying `?lang=`), skim hero → about → projects → services, optionally filter the projects list by tech stack (React / Next / JavaScript), then either download the CV PDF or open the contact modal. There is no backend/API — a fully static client-side site; the only "integrations" are the contact modal and social links (GitHub, Telegram, VK, MAX). VK and MAX signal a Russian-market-first audience alongside the RU-default language.

## Capabilities and Constraints

- Bilingual RU (default) / EN, language persisted via URL param and `localStorage`.
- Plain JS/JSX (no TypeScript), functional components only, plain CSS with BEM (no Sass/Tailwind/styled-components), no Redux/other state managers, no UI kit (MUI/Ant) — binding technical constraints for all future work, documented in CLAUDE.md.
- The real project list (currently 8 shipped projects, each with a real demo link and/or GitHub repo) is the load-bearing proof of skill and must not be diluted with placeholder/fake projects.
- Accessibility target is WCAG 2.1, stated explicitly in the site's own about-page SEO copy, and backed by ongoing a11y fixes in the commit history (touch-target sizing, required-field marking, audit findings).

## Brand Commitments

- Name: Anton Zhilin (Антон Жилин).
- Header wordmark/logo: "AntoshkinDev" (with a blinking-cursor-styled accent) — an existing personal-brand logotype distinct from the legal name used in body copy.

## Evidence on Hand

- 8 real shipped projects (`src/sections/projects/projects.js`): vam-voda, waterdel, only-championship, landing-area, ratingus, personal-blog, createX-construction, champ-project — spanning intern (2021) to Senior Frontend Developer (2026) roles, showing genuine progression rather than padding.
- Verified stats (`src/const/index.js` `ABOUT_STATS`): 4+ years of experience, 10+ projects, "Middle" level (HTML Academy championship), English B2.
- Published Lighthouse scores (README, desktop): Performance 98, Accessibility 95, Best Practices 100, SEO 100.
- Testimonials (`src/sections/testimonials/testimonials.js`) are **deliberately not attributed** to real people or companies — an existing, documented decision (see the file's own JSDoc) made to avoid fabricating identities or organizations. Future work must preserve this anonymization rather than inventing named clients.
- Real contact/social channels: GitHub (github.com/ministrov), Telegram (t.me/antonzhilin83), VK, MAX.
- Downloadable CV: `src/assets/pdfs/my-cv.pdf`.

## Product Principles

1. Real work is the proof — every claim of skill routes back to a shippable artifact (a live project, a measured Lighthouse score, a verified benchmark), never a generic claim.
2. Employment is the primary conversion; freelance inquiries are secondary — CTA hierarchy and copy should keep "download CV" at least as prominent as "discuss a project."
3. Bilingual by default, Russian-first — RU is the default language and the primary market signal; EN extends reach without reframing the audience.
4. Don't fabricate — testimonials stay anonymized/generic; no invented clients, companies, or stats beyond what's already confirmed in the data files.
5. Technical craft is demonstrated, not just claimed — accessibility, performance, and pixel-perfect responsive behavior are load-bearing parts of the pitch, not decoration.

## Accessibility & Inclusion

WCAG 2.1 is referenced explicitly in the site's own about-page SEO copy, and the commit history shows active, ongoing accessibility work (touch-target sizing, required-field marking, P1 audit fixes) — this is a genuine, ongoing product commitment, not aspirational copy.
