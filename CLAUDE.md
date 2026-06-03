# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal portfolio SPA for frontend developer Anton Zhilin (Антон Жилин). Bilingual (Russian default, English), built on **Create React App** with **React 18**, plain JS/JSX (no TypeScript), and plain CSS with BEM naming.

## Commands

```bash
npm start        # dev server (react-scripts start) at localhost:3000
npm run build    # production build into build/
npm test         # Jest + react-scripts test runner (watch mode)
npm run prod     # build, then serve the static build with `serve -s build`
npm run analyze  # source-map-explorer over the built JS bundles
```

- **Lint**: ESLint runs through `react-scripts` (config `react-app` + `react-app/jest` in `package.json`). There is no standalone `npm run lint` script despite what `.codeassistant/rules` claim — lint surfaces during `npm start`/`npm run build`, or run `npx eslint src`.
- **Run a single test**: `npm test -- <pattern>` (e.g. `npm test -- ProjectsReduce`), or press `p`/`t` in watch mode to filter by filename/test name.
- No test files currently exist in the repo; tests live next to the file under test as `*.test.jsx`.

## Architecture

**Entry chain**: `src/index.js` → wraps `App` in `StrictMode` + `HelmetProvider` (react-helmet-async for SEO/`<head>`), and imports `./utils/i18n/index` for its initialization side effect. `src/App.jsx` sets up `BrowserRouter` (with v7 future flags) → `ScrollToTop` → `LanguageProvider` → a `Suspense`-wrapped `Routes`. All routes nest under a single `Layout` (`Header` / `<Outlet/>` / `Up` / `Footer`). `HomePage` is eager; `AboutPage`, `ProjectsPage`, `PageNotFound` are `React.lazy` code-split.

**Source layout** (`src/`):
- `pages/` — route-level screens. `sections/` — large page sections composed into pages (promo, about, projects, services, faq, contact, showcasing, advantages). `components/` — reusable UI; each in its own `ComponentName/` folder with `ComponentName.jsx` + `style.css`. `layouts/` — Header/Footer/Layout shell.
- `hooks/`, `context/`, `const/`, `utils/`, `assets/`, `styles/`.

**i18n** is the central cross-cutting concern. Most text in the codebase is a **translation key** (e.g. `'projects.vamvoda.title'`, `'mainNav.home'`), not literal copy — resolved at render time via `useTranslation`/`t()`. Data arrays in `src/const/index.js`, `src/sections/projects/projects.js`, `src/sections/advantages/items.js` hold keys, not strings. To change visible text, edit `src/utils/i18n/locales/en/en.json` and `ru/ru.json` (keep both in sync), not the components.

**Language switching** is a two-layer system — understand both before touching it:
1. `context/LanguageProvider.jsx` owns the `lang` state, syncing it to the `?lang=` URL param (via `hooks/useUrlParams.jsx`) and persisting to `localStorage` under `preferredLang`. It does **not** talk to i18next.
2. `hooks/useLanguage.jsx` (distinct from the `useLanguage` exported by `LanguageProvider.jsx` — import the **hook** version) reads the context and runs `i18n.changeLanguage(lang)` in an effect. This is the bridge that actually swaps i18next's active language. Allowed values come from the `LANGUAGES` enum in `const/index.js`.

**Projects filtering**: `sections/projects/projectsReduce.js` is a `useReducer` reducer (`SET_FILTER` action) driving project list filtering; consumed via `hooks/useProjectsFilter.jsx`. Filter buttons come from the `filters` array in `const/index.js`. Note `project.skills` is a comma-separated **string**, filtered with `.includes()`.

**Animations**: Framer Motion throughout (`motion.*`, `animate`/`transition`). The starfield `AnimatedBackground` is tuned by `DEFAULT_CONFIG` in `const/index.js`. Carousels use Swiper.

## Project conventions (from `.codeassistant/rules/`)

These rules are marked `alwaysApply` and define how code in this repo is expected to look:

- **Comments & JSDoc are written in Russian.** Add JSDoc to components (props + example), functions (params/returns), and modules. Match the existing dense JSDoc style in `context/`, `hooks/`, `layouts/`.
- **Functional components only** — class components are forbidden.
- **Plain CSS with BEM** (`.block__element--modifier`) in a `style.css` beside the component. No inline styles except genuinely dynamic values (e.g. `width: ${w}px`). No Sass/Less, no styled-components/Emotion, no Tailwind.
- **Do not add without discussion**: TypeScript, other state managers (Redux/MobX/Zustand), UI libraries (MUI/Ant), or any new dependency.
- Naming: PascalCase files/components, `use`-prefixed camelCase hooks, UPPER_SNAKE_CASE constants, CamelCase enum objects. Event handlers `handle*`, callback props `on*`. Prefer `ref` over `document.querySelector`. When mutating state in a `useEffect`, guard against unmount (see the `isMounted` ref in `LanguageProvider`).
- Imports ordered: third-party first, then internal modules.

**Formatting** (`.prettierrc`): single quotes (double for JSX attributes), 2-space tabs, semicolons, `es5` trailing commas, 100-char lines. Editor formats on save with Prettier + ESLint autofix (`.vscode/settings.json`).

### Stale rules — ignore these parts

The rule files were partly copied from a different (Redux/TypeScript) project and contain criteria that **do not apply** to this codebase. Treat the following as obsolete:

- **Redux** — `quality-criteria.md` Б13 and Д12–Д19 require Redux/redux-thunk/selectors/`combineReducer`. This project has **no Redux**; global state is the Context API + a single `useReducer` (`projectsReduce.js`). Do not introduce Redux.
- **TypeScript** — references to `.ts`/`.tsx`, "TSX-файла structure" (Д8), and `.types.ts` files. This is a **plain JS/JSX** project; types are JSDoc-only. Do not add TypeScript.
- **`npm run lint`** — `project-rules.md` says to run it before commits, but no such script exists. Lint runs via `react-scripts`; use `npx eslint src` for a standalone check.
- **Mandatory tests** — Д22–Д24/Б "tests required" criteria. There are currently **no tests** in the repo; add them next to the file as `*.test.jsx` only when the task calls for it.

The parts of the rules that **do** apply are already reflected above (Russian JSDoc, functional components, plain CSS/BEM, naming, the "do not add" list, and the commit format).

## Commits

Commit-message rules live in the **`commit` skill** (`.claude/skills/commit/SKILL.md`) — invoke it when writing a commit. In short: Conventional Commits format (`<type>(scope): subject` + optional bulleted body), and commit **as the repo owner only** — never add a `Co-Authored-By: Claude` trailer.
