# Plan: Mobile (≤768px) Section Polish

## Context

Reviewed the homepage at **352px** (full-page screenshot, RU locale) for per-section mobile
polish before release. The goal is a cleaner, more even, more user-friendly feel on small
phones — **mobile only, no desktop changes, no new features.**

Important caveat that shapes this plan: a static full-page capture **misrepresents anything
animated, carousel-based, or scroll-triggered.** Two first-pass reads were already debunked
this way — the "empty gap" in _Мои услуги_ is the `whileInView` fade-in (cards are still at
`opacity: 0` in a static shot), and the "two cramped columns" in _Тёплые слова_ is the Swiper
neighbor-peek (`opacity: 0.4`). So every item below is tagged by **verification status**, and
the screenshot-only items must be confirmed live at 352px before any CSS is touched.

### Legend

- ✅ **Code-verified** — confirmed by reading the CSS; citable and safe to act on.
- 🔍 **Verify at 352px** — an impression from the screenshot; confirm in-browser first.

Out of scope: desktop layout; the legacy, mostly-commented-out `promo` section (the rendered
hero replaces it); and a11y basics this repo already satisfies — ≥44px tap targets (`Up`),
`:focus-visible` (`Up`, `CopyEmail`), `prefers-reduced-motion` (multiple sections). Do **not**
pad the plan by re-auditing those.

---

## 1. Global vertical rhythm — ✅ code-verified (low-risk cleanup)

`min-height: 78vh` + `justify-content: center` sits on `.services` and `.advantages` and is
**not reset on mobile**, unlike `.hero`, which already drops to `min-height: auto`
(`hero/style.css:135`).

Honest framing: this is a **latent inconsistency, not a visible defect** in most cases — it
only forces dead centered space when a section's content is _shorter_ than 78vh. `.advantages`
on mobile is 7 stacked cards (far taller than 78vh → moot); `.services` short state is the
animation noted above. So treat this as a consistency tidy-up, not a redesign.

- **Action:** in the `≤768px` media block of `services/style.css` and `advantages/style.css`,
  add `min-height: auto` (mirror hero) and let consistent `padding-block` carry the rhythm.
- **Risk:** minimal; cannot introduce overflow, only removes forced height.

---

## 2. Hero — 🔍 verify

Title + kicker + «Скачать резюме» button. Read `hero/style.css` mobile block first; only act
if, at 352px, the title is oversized, the kicker wraps awkwardly, or the CTA isn't a
comfortable full-width tap target. No code-confirmed defect yet.

## 3. About «Немного обо мне» — 🔍 audit, not fix

Dense single-column stack: identity card → AboutStory → stat chips (`4+ / 18+ / Middle / B2`)
→ tech tags → two CTAs. **Dense ≠ broken.** Audit the `gap` rhythm between sub-blocks at 352px;
adjust spacing only if it reads cramped. No structural change. (Identity-card avatar already
handled this session: 120px in the tablet row, back to column ≤768.)

## 4. Projects / showcasing «Лучшие проекты» — 🔍 verify

Carousel block. Confirm card copy legibility and the inner CTA button at 352px (contrast,
wrapping, tap size).

## 5. Advantages «Почему именно я» — ✅ mostly done

Already fixed this session: single column ≤768, unified 1.125rem text, `min-width: 0` +
`overflow-wrap`, fluid hero font. Only the §1 `78vh` tidy-up remains. **No further work.**

## 6. Testimonials «Тёплые слова» — 🔍 design choice

Swiper with neighbor-peek (`opacity: 0.4`) and long quotes; active slide `88vw` at ≤768
(`testimonials/style.css:71`). At 352px the peek + a long quote may feel tight. _Optional,
design-level_ tweak: reduce the neighbor peek (e.g. wider active slide / less overhang) or
trim quote density on small mobile. Confirm live; this is a taste call, not a bug.

## 7. FAQ «Часто задаваемые вопросы» — 🔍 verify

Accordion. Confirm row spacing and tap comfort at 352px. (Don't re-audit 44px / focus basics.)

## 8. Contact «Свяжись со мной» — 🔍 verify

Info rows + social + form. Confirm inputs are full-width and spacing is comfortable at 352px.
(Input `box-sizing: border-box` was already fixed — see git history.)

---

## Suggested order of work

1. **One verification pass in-browser at 352px** (RU _and_ EN — Russian strings run longer).
   Keep only the 🔍 items that _visibly_ hurt; drop the rest.
2. Apply the ✅ §1 `78vh` rhythm cleanup (safe, do regardless).
3. Fix confirmed 🔍 items, one section at a time, touching **mobile `@media` blocks only**.

## Files likely touched (mobile media blocks only — pending verification)

| File                                  | Change (conditional on verify)  |
| ------------------------------------- | ------------------------------- |
| `src/sections/services/style.css`     | ✅ `min-height: auto` on mobile |
| `src/sections/advantages/style.css`   | ✅ `min-height: auto` on mobile |
| `src/sections/hero/style.css`         | 🔍 title/kicker/CTA spacing     |
| `src/sections/about/style.css`        | 🔍 sub-block `gap` rhythm       |
| `src/sections/showcasing/style.css`   | 🔍 carousel card legibility     |
| `src/sections/testimonials/style.css` | 🔍 optional peek/quote density  |
| `src/sections/faq/style.css`          | 🔍 row spacing                  |
| `src/sections/contact/style.css`      | 🔍 form/input spacing           |

**Not touched:** desktop styles, JSX/structure, i18n keys, `promo` (legacy), a11y primitives
already in place.
