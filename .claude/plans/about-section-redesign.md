# Plan: About Section — Full Redesign

## Context

The About section currently has a heading + plain photo card on the left (26%) and a text
card (AboutStory) on the right (74%). The previous commit only added a photo under the
heading — the section still feels generic: no personal identity signals, no at-a-glance
professional facts, no visible tech stack. A recruiter scanning the homepage gets almost
nothing scannable from this section.

This plan rebuilds the section into 4 distinct, purposeful zones that cover what a modern
professional developer portfolio About section needs.

---

## Target layout (desktop)

```
┌─────────────────────────────────────────────────────────────────────┐
│  .about (gray bg, border-radius 42px)                               │
│                                                                     │
│  ┌──────────────────────┐   ┌───────────────────────────────────┐   │
│  │  .about__identity    │   │  .about__story (AboutStory card)  │   │
│  │  ─────────────────   │   │  3 layered paragraphs, existing   │   │
│  │  [photo card]        │   └───────────────────────────────────┘   │
│  │  Name / Role         │                                           │
│  │  Location            │   ┌───────────────────────────────────┐   │
│  │  ● Available         │   │  .about__stats                    │   │
│  │  [social icons]      │   │  4+ лет · 10+ проектов · Middle · B2  │
│  │                      │   └───────────────────────────────────┘   │
│  │  ─────────────────   │                                           │
│  │  .about__heading     │   ┌───────────────────────────────────┐   │
│  │  "ОБО МНЕ"           │   │  .about__tech                     │   │
│  │  (moved here, stays  │   │  [React][Next.js][TypeScript]...  │   │
│  │   left-aligned)      │   └───────────────────────────────────┘   │
│  └──────────────────────┘                                           │
│                             ┌───────────────────────────────────┐   │
│                             │  CTA: link or buttons             │   │
│                             └───────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

On **tablet** (≤1104px): columns stack. Identity card becomes a compact horizontal row
(photo 120px + meta alongside). Stats/tags remain below AboutStory.

On **mobile** (≤768px): full single-column stack.

---

## Zone 1 — Identity card (left column, new)

### What it contains
A white card — visually consistent with AboutStory\_\_card (same border, shadow, 16px
radius, blue top-bar `::before`) — containing:

1. **Photo** — `about-image.webp` (realistic portrait, gray bg, already in project).
2. **Name** — `t('authorPhoto.name')` → "Антон Жилин" (key already exists).
3. **Role** — `t('authorPhoto.role')` → "Frontend Developer" (key already exists).
4. **Location** — `t('authorPhoto.location')` (key already exists).
5. **Availability badge** — new pill: pulsing green dot + `t('about.available')`.
   Token `--color-green-500: #22c55e` added to `:root` in `main.css`.
6. **Social icons** — `<SocialList variant="blue" />`.

### Why not reuse `AuthorPhoto` component
`AuthorPhoto` (IDE code card with `photo.webp`) is already placed in `AboutPage.jsx`
directly after `<About />`. Embedding it in `About` would render it twice on the About
page. The identity card here is a different, compact representation.

### CSS classes
```
.about__identity          — card container, same visual style as AboutStory card
.about__identity::before  — 4px blue gradient top bar
.about__id-photo          — photo wrapper, overflow hidden
.about__id-meta           — name + role + location block, padding 1rem 1.25rem
.about__id-name           — Oswald 1.25rem bold, --color-blue-700
.about__id-role           — Open Sans 0.875rem, --color-gray-500
.about__id-location       — 0.8125rem, --color-gray-500, flex row with icon
.about__available         — green pill badge, rgba(34,197,94,...) bg + border
.about__available-dot     — 8px green circle, pulsing animation
```

---

## Zone 2 — Narrative text (right column, unchanged)

`<AboutStory />` stays exactly as-is.

---

## Zone 3 — Stats strip (right column, new)

Four scannable fact-chips after `<AboutStory />`.

| Chip | Number | Label (ru) | Label (en) |
|------|--------|------------|------------|
| Experience | `4+` | `лет опыта` | `years exp.` |
| Projects | `10+` | `проектов` | `projects` |
| Level | `Middle` | `уровень` | `level` |
| Language | `B2` | `английский` | `English` |

Data source: `ABOUT_STATS` array in `src/const/index.js`.
Animation: `m.ul` + `variants` stagger (0.07s between chips, delay 0.55s).

---

## Zone 4 — Tech tags row (right column, new)

`Tag` components (existing) in a flex-wrap list.
Data source: `ABOUT_TECH_TAGS` array in `src/const/index.js`.

Tags: React · Next.js · TypeScript · RTK Query · CSS Modules ·
Framer Motion · WCAG 2.1 · mobile-first · Agile/Scrum

---

## Files changed

| File | What changed |
|------|-------------|
| `src/sections/about/About.jsx` | Identity card, stats strip, tech tags, stagger animations |
| `src/sections/about/style.css` | All new classes, responsive rules, availability pulse |
| `src/styles/main.css` | `--color-green-500: #22c55e` added to `:root` |
| `src/const/index.js` | `ABOUT_TECH_TAGS` and `ABOUT_STATS` exported |
| `src/utils/i18n/locales/ru/ru.json` | `about.available`, `about.stats.*`, `about.techAriaLabel` |
| `src/utils/i18n/locales/en/en.json` | Same keys in English |

**Not touched:** `AboutStory`, `AuthorPhoto`, `Tag`, `SocialList`, `AboutPage.jsx`.
