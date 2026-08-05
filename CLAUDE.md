# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal portfolio SPA for frontend developer Anton Zhilin (Антон Жилин). Bilingual (Russian default, English), built on **Vite 8** with **React 19**, plain JS/JSX (no TypeScript), and plain CSS with BEM naming.

## Commands

```bash
npm start        # Vite dev server at localhost:3000
npm run build    # production build into build/
npm run preview  # serve the production build locally
npm test         # Vitest in watch mode
npm run test:run # Vitest, single run
npm run lint     # eslint src
npm run prod     # build, then serve the static build with `serve -s build`
npm run analyze  # source-map-explorer over the built JS bundles
```

- **Lint**: ESLint 9 flat config in `eslint.config.js`. `eslint-plugin-react` is wired narrowly — only `jsx-runtime` plus the `react/jsx-uses-vars` rule, because without it the base `no-unused-vars` does not see components used in JSX and reports ~200 false positives. The full `react.configs.flat.recommended` is deliberately **not** enabled.
- **Run a single test**: `npm test -- <pattern>` (e.g. `npm test -- projectsReduce`).
- Tests live next to the file under test as `*.test.js`/`*.test.jsx`. Two exist so far: `sections/projects/projectsReduce.test.js` and `utils/lang.test.js` (the latter guards the language-restore fix — see below).
- **Browser cache trap:** after upgrading a dependency major, Vite may reuse the same dep-optimizer hash, so the browser serves the _old_ bundle from its HTTP cache under the same `?v=` URL. `rm -rf node_modules/.vite` and `vite --force` fix the server, not the browser. Verify on a **fresh port** (`npx vite --port 3100`) or with the cache disabled.

## Architecture

**Entry chain**: `index.html` (project root, not `public/`) loads `src/index.jsx` → wraps `App` in `StrictMode` and imports `./utils/i18n/index` for its initialization side effect. `src/App.jsx` sets up `BrowserRouter` → `ScrollToTop` → `LanguageProvider` → a `Suspense`-wrapped `Routes`. All routes nest under a single `Layout` (`Header` / `<Outlet/>` / `Up` / `Footer`). `HomePage` is eager; `AboutPage`, `ProjectsPage`, `PageNotFound` are `React.lazy` code-split.

**SEO / `<head>`**: no Helmet — React 19 hoists `<title>`, `<meta>` and `<link>` written anywhere in the tree. Pages declare them inline. **Inline `<script>` is _not_ hoisted**, so JSON-LD splits by nature: the language-independent `Person` and `WebSite` schemas sit statically in `index.html` (crawlers see them without running JS), while the localized `BreadcrumbList` schemas stay in `AboutPage`/`ProjectsPage` and render into `<body>`, which search engines accept.

**Source layout** (`src/`):

- `pages/` — route-level screens. `sections/` — large page sections composed into pages (promo, about, projects, services, faq, contact, showcasing, advantages). `components/` — reusable UI; each in its own `ComponentName/` folder with `ComponentName.jsx` + `style.css`. `layouts/` — Header/Footer/Layout shell.
- `hooks/`, `context/`, `const/`, `utils/`, `assets/`, `styles/`.

**i18n** is the central cross-cutting concern. Most text in the codebase is a **translation key** (e.g. `'projects.vamvoda.title'`, `'mainNav.home'`), not literal copy — resolved at render time via `useTranslation`/`t()`. Data arrays in `src/const/index.jsx`, `src/sections/projects/projects.js`, `src/sections/advantages/items.js` hold keys, not strings. To change visible text, edit `src/utils/i18n/locales/en/en.json` and `ru/ru.json` (keep both in sync), not the components.

**Language switching** is a two-layer system — understand both before touching it:

1. `context/LanguageProvider.jsx` owns the `lang` state, syncing it to the `?lang=` URL param (via `hooks/useUrlParams.jsx`) and persisting to `localStorage` under `preferredLang`. It does **not** talk to i18next.
2. `hooks/useLanguage.jsx` (distinct from the `useLanguage` exported by `LanguageProvider.jsx` — import the **hook** version) reads the context and runs `i18n.changeLanguage(lang)` in an effect. This is the bridge that actually swaps i18next's active language. Allowed values come from the `LANGUAGES` enum in `const/index.jsx`.

**The initial language is resolved synchronously**, before first render, by `resolveInitialLang()` in `src/utils/lang.js` — precedence `?lang=` → `localStorage` → `ru`. That one resolver feeds **both** the i18next bootstrap (`utils/i18n/index.js`) and `LanguageProvider`'s initial state, so the two layers always start in agreement. Do not reintroduce an effect that restores the language after mount: the previous version raced its own save-to-`localStorage` effect and, under StrictMode, reset the user's choice back to `ru`. `utils/lang.test.js` guards this.

**Projects filtering**: `sections/projects/projectsReduce.js` is a `useReducer` reducer (`SET_FILTER` action) driving project list filtering; consumed via `hooks/useProjectsFilter.jsx`. Filter buttons come from the `filters` array in `const/index.jsx`. Note `project.skills` is a comma-separated **string**, filtered with `.includes()`.

**Animations**: the `motion` package (formerly `framer-motion`, renamed at v11) — import from `motion/react`. Uses `LazyMotion`/`m`/`AnimatePresence`/`MotionConfig`; wrap a component with `m.create(X)`, not the deprecated `m(X)`. The starfield `AnimatedBackground` is tuned by `DEFAULT_CONFIG` in `const/index.jsx`. Carousels use Swiper.

**Files carrying JSX must be `.jsx`** — esbuild will not parse JSX inside `.js`. This bites data modules: `const/index.jsx` and `components/socials/socials.jsx` hold React-icon elements and are named accordingly, while `sections/projects/projects.js` is plain data and stays `.js`.

## Project conventions (from `.codeassistant/rules/`)

These rules are marked `alwaysApply` and define how code in this repo is expected to look:

- **Comments & JSDoc are written in Russian.** Add JSDoc to components (props + example), functions (params/returns), and modules. Match the existing dense JSDoc style in `context/`, `hooks/`, `layouts/`.
- **Functional components only** — class components are forbidden.
- **Plain CSS with BEM** (`.block__element--modifier`) in a `style.css` beside the component. No inline styles except genuinely dynamic values (e.g. `width: ${w}px`). No Sass/Less, no styled-components/Emotion, no Tailwind.
- **Do not add without discussion**: TypeScript, other state managers (Redux/MobX/Zustand), UI libraries (MUI/Ant), or any new dependency.
- Naming: PascalCase files/components, `use`-prefixed camelCase hooks, UPPER_SNAKE_CASE constants, CamelCase enum objects. Event handlers `handle*`, callback props `on*`. Prefer `ref` over `document.querySelector`. Guard against unmount when an effect resolves **asynchronously**; do not add an `isMounted` ref to a synchronous effect — `LanguageProvider` used to carry one and it masked a real race rather than preventing one.
- Imports ordered: third-party first, then internal modules.

**Formatting** (`.prettierrc`): single quotes (double for JSX attributes), 2-space tabs, semicolons, `es5` trailing commas, 100-char lines. Editor formats on save with Prettier + ESLint autofix (`.vscode/settings.json`).

### Stale rules — ignore these parts

The rule files were partly copied from a different (Redux/TypeScript) project and contain criteria that **do not apply** to this codebase. Treat the following as obsolete:

- **Redux** — `quality-criteria.md` Б13 and Д12–Д19 require Redux/redux-thunk/selectors/`combineReducer`. This project has **no Redux**; global state is the Context API + a single `useReducer` (`projectsReduce.js`). Do not introduce Redux.
- **TypeScript** — references to `.ts`/`.tsx`, "TSX-файла structure" (Д8), and `.types.ts` files. This is a **plain JS/JSX** project; types are JSDoc-only. Do not add TypeScript.
- **Mandatory tests** — Д22–Д24/Б "tests required" criteria. The repo has a Vitest harness and two test files, not a suite; add tests next to the file under test when the task calls for it, but full coverage is not a gate.

(`npm run lint` used to be listed here as non-existent. It exists now — the note is gone.)

The parts of the rules that **do** apply are already reflected above (Russian JSDoc, functional components, plain CSS/BEM, naming, the "do not add" list, and the commit format).

## Commits

Commit-message rules live in the **`commit` skill** (`.claude/skills/commit/SKILL.md`) — invoke it when writing a commit. In short: Conventional Commits format (`<type>(scope): subject` + optional bulleted body), and commit **as the repo owner only** — never add a `Co-Authored-By: Claude` trailer.
