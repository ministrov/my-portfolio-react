---
name: test
description: Add Vitest + Testing Library tests for a given file in the my-portfolio-react portfolio (Vite 8 + React 19, JS/JSX). Use when asked to write, add or extend tests for a component, hook, reducer or util.
model: opus
effort: xhigh
allowed-tools: Read, Glob, Grep, Write, Edit, Bash(npm run test:run:*), Bash(npx vitest:*), Bash(npx eslint:*)
user-invocable: true
argument-hint: <filepath>
---

# Test Skill

Generate tests for the file `$0`, following this repository's conventions.

## Stack

- **Vitest**, configured in the `test` block of `vite.config.js`: `environment: 'jsdom'`,
  `globals: true`, `setupFiles: './src/setupTests.js'`.
- `src/setupTests.js` already registers the **jest-dom** matchers (`toBeInTheDocument`,
  `toHaveAttribute`, …) — don't import them again in test files.
- **Installed:** `@testing-library/react` (`render`, `screen`, `fireEvent`, `waitFor`,
  `renderHook`, `act`), `@testing-library/jest-dom`, `jsdom`.
- **Not installed:** `@testing-library/user-event`. Use `fireEvent`. If a test genuinely needs
  realistic user interaction, **don't install it yourself** (the repo forbids adding dependencies
  without discussion) — offer the user the command instead:

  ```bash
  npm install --save-dev @testing-library/user-event
  ```

## Arguments

- `$0` — path to the file to write tests for (relative to the repo root, or absolute)

## Execution Algorithm

### 1. Read the reference tests, then the target

The existing tests are the canonical style — read them before writing anything
(`Glob src/**/*.test.{js,jsx}` finds all of them). The two reference ones:

- `src/sections/projects/projectsReduce.test.js` — pure reducer
- `src/utils/lang.test.js` — util that touches jsdom state (`localStorage`, URL), reset in `beforeEach`

Then `Read($0)` and analyze:

- What is exported (default vs named — check, don't assume)
- Which dependencies are imported (i18n, react-router, `motion/react`, contexts, Swiper)
- Which logic needs coverage

### 2. Determine the file type

- **Component** — `*.jsx` under `src/components/`, `src/sections/`, `src/pages/`, `src/layouts/`
- **Hook** — a `use`-prefixed file under `src/hooks/`
- **Function / reducer** — `src/utils/`, `src/sections/**/...Reduce.js`, and similar pure modules
- **Data only** — if the file holds only data/JSDoc types without logic, report that no tests are needed

### 3. Check whether a test file already exists

Tests live **next to** the source. If `<name>.test.js` or `<name>.test.jsx` already exists,
report it and offer to extend it (`Edit`) rather than creating a new file.

### 4. Build the test file

**File extension:**

- `<name>.test.js` — the test contains no JSX (pure functions, reducers, utils)
- `<name>.test.jsx` — the test renders JSX (`render(<X />)`, a `wrapper` component).
  esbuild won't parse JSX inside `.js`.

**Imports — always import the test API from `vitest` explicitly** (`describe`, `it`, `expect`,
`vi`, `beforeEach`, `afterEach`), even though `globals: true` is set. `eslint.config.js` only
declares `globals.browser`, so bare `describe`/`it` pass Vitest but fail `npm run lint` with
`no-undef`. Order: `vitest` first, then other third-party (`@testing-library/react`,
`react-router-dom`), then internal modules.

**Mocks** use `vi.fn()`, `vi.spyOn()`, `vi.mock()`, `vi.stubGlobal()` — never `jest.*`.
Undo them in `afterEach` (`vi.restoreAllMocks()`, `vi.unstubAllGlobals()`).

**Descriptions** (`it(...)`) are written **in Russian, present tense, describing the behavior** —
the style of the existing tests: «отдаёт null на невалидное значение», «сужает список до проектов
с нужным навыком», «URL-параметр важнее localStorage». Comments and JSDoc on test helpers are in
Russian too (see `setSearch` in `lang.test.js`).

#### Pure function / reducer

No template — follow `projectsReduce.test.js` and `lang.test.js` directly.

#### Component — template

Most components call `t()` from `react-i18next`. Import the i18n initialization for its side
effect. The language resolves to `ru` (no `?lang=`, empty `localStorage`), so assert on Russian
strings from `ru.json` — or better, query by role and accessible name.

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '../../utils/i18n/index'; // инициализирует i18next (путь — относительно файла теста)
import Loader from './Loader';

describe('Loader', () => {
  it('отдаёт роль status с локализованным доступным именем', () => {
    render(<Loader />);
    expect(
      screen.getByRole('status', { name: 'Загрузка' })
    ).toBeInTheDocument();
  });

  it('показывает переданный текст под спиннером', () => {
    render(<Loader text="Загрузка проектов" />);
    expect(screen.getByText('Загрузка проектов')).toBeInTheDocument();
  });
});
```

Providers and context:

- `<Link>` / `<NavLink>` / `useNavigate` / `useLocation` → wrap in `<MemoryRouter>`.
- **`LanguageProvider` needs a router above it** — it uses `useUrlParams`, which calls
  `useNavigate`/`useLocation`. Wrap as `<MemoryRouter><LanguageProvider>…</LanguageProvider></MemoryRouter>`.
- There are **two `useLanguage`s**: `hooks/useLanguage.jsx` (context + `i18n.changeLanguage` —
  what components import) and the one exported from `context/LanguageProvider.jsx` (bare context).
  Check which one the file under test uses before mocking or wrapping.
- **i18n is a module-level singleton** shared by every test in a file (Vitest isolates files, not
  tests). If a test switches language (`await i18n.changeLanguage('en')`), switch it back in
  `afterEach`, and reset `localStorage`/URL the way `lang.test.js` does.
- React 19 hoists `<title>` / `<meta>` / `<link>` into `document.head` — assert on
  `document.title` or `document.head`, not inside the render `container`.

#### Hook — template

```jsx
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useProjectsFilter from './useProjectsFilter';

describe('useProjectsFilter', () => {
  it('стартует с фильтром All', () => {
    const { result } = renderHook(() => useProjectsFilter());
    expect(result.current.state.activeFilter).toBe('All');
  });

  it('переключает фильтр по handleFilterClick', () => {
    const { result } = renderHook(() => useProjectsFilter());
    act(() => result.current.handleFilterClick('React'));
    expect(result.current.state.activeFilter).toBe('React');
  });
});
```

> If the hook reads a context, pass a `wrapper` with the matching providers to `renderHook`
> (for language: `MemoryRouter` → `LanguageProvider`, as above).

### 5. Fill the jsdom gaps

jsdom doesn't implement several browser APIs this codebase relies on. Stub only what the file under
test actually needs, **inside that test file**:

| API                    | Used by (examples)                                                          |
| ---------------------- | --------------------------------------------------------------------------- |
| `window.matchMedia`    | `useScrambleText`, `AnimatedBackground` (prefers-reduced-motion)            |
| `ResizeObserver`       | `useCharWidths`                                                             |
| `IntersectionObserver` | `useInView` / `whileInView` from `motion/react` (Hero, About, Accordion, …) |
| `window.scrollTo`      | `Up`, `ScrollToTop`, `StickyShowcase` (jsdom logs "Not implemented")        |

```js
beforeEach(() => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
  );
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    }
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});
```

Moving a stub into `src/setupTests.js` is a shared change — if several test files repeat the same
stub, propose it to the user rather than doing it silently.

### 6. Cover the main scenarios

For each public export:

- **Happy path** — the normal case
- **Edge cases** — empty arrays, missing props, `null`/`undefined`, unknown action types
- **Error cases** — what happens with invalid data (e.g. garbage in `?lang=` / `localStorage`)

Don't test the internals of third-party libraries (`motion`, Swiper, react-i18next) — only your own
code's behavior. Assert on the final DOM, not on animation styles or timing; elements leaving via
`AnimatePresence` may linger until the exit animation ends — use `waitFor` / `findBy*`.
Don't add tests for trivial getters without logic.

### 7. Write the test file

`Write` to `<source directory>/<name>.test.js` or `.test.jsx` (see step 4).

### 8. Run and lint

Run once — **never `npm test`**: it is Vitest watch mode and never exits.

```bash
npm run test:run -- <filename without extension>
npx eslint <test file>
```

For example: `npm run test:run -- Loader`.

If tests fail, analyze the error, fix the test file, and retry. If a test exposes a real bug in the
source, report it to the user instead of bending the test to match or silently fixing the source.

---

## Rules

- Test descriptions are written **in Russian, present tense**, matching the existing tests
- Test file sits next to the source: `.test.js` without JSX, `.test.jsx` with JSX
- Import `describe`/`it`/`expect`/`vi` from `vitest` explicitly — ESLint has no test globals
- **Do not add dependencies** (including `user-event`) without discussion — offer the install command to the user instead
- Mock only external dependencies, browser APIs and I/O, not the business logic
- Don't test third-party library internals — only your own behavior
- One `describe` per component/function/hook; nested `describe`s for individual methods/scenarios
- If the file holds only data/types without logic, report that no tests are needed
