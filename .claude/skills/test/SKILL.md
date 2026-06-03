---
name: test
description: Add Jest tests for a given file in the my-portfolio-react portfolio (CRA + React 18, JS/JSX).
model: sonnet
allowed-tools: Read, Glob, Grep, Write, Bash(npm test:*), Bash(npx eslint:*)
user-invocable: true
argument-hint: <filepath>
---

# Test Skill

Generate Jest tests for the file `$0`, following this repository's conventions.

The project is **Create React App + React 18**, plain **JS/JSX** (no TypeScript),
with **Jest via `react-scripts test`** as the runner (the `react-app/jest` preset, jsdom environment).
There are no test files in the repo yet — this skill creates them on request.

## Arguments

- `$0` — path to the file to write tests for (relative to the repo root, or absolute)

## Execution Algorithm

### 1. Read the target file

```
Read($0)
```

Analyze:

- What is exported (component, hook, function/reducer, constants)
- Which dependencies are imported (i18n, react-router, framer-motion, contexts)
- Which logic needs coverage

### 2. Determine the file type

- **Component** — `*.jsx` under `src/components/`, `src/sections/`, `src/pages/`, `src/layouts/`
- **Hook** — a `use`-prefixed file under `src/hooks/`
- **Function / reducer** — `src/utils/`, `src/sections/**/...Reduce.js`, and similar pure modules
- **Types/constants only** — if the file holds only data/JSDoc types without logic, report that no tests are needed

### 3. Check for Testing Library

`@testing-library/react` is **not** a default project dependency.
Check `package.json`. If it is missing and you need it for a component/hook — **do not install it yourself**
(the repo forbids adding dependencies without discussion). Tell the user and
offer to install it as a dev dependency:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Pure functions/reducers don't need Testing Library — built-in Jest is enough.

### 4. Check whether a test file already exists

Tests live **next to** the source as `<name>.test.jsx`. If one already exists,
report it and offer to extend it rather than creating a new file.

### 5. Build the test file

Test descriptions (`it(...)`) are written **in Russian**, starting with «должен» (matching the project's comments and JSDoc).

#### Pure function / reducer — template

```jsx
import reducer from './projectsReduce';

describe('projectsReduce', () => {
  it('должен вернуть исходное состояние для неизвестного экшена', () => {
    const state = { filter: 'All' };
    expect(reducer(state, { type: 'UNKNOWN' })).toBe(state);
  });

  it('должен установить фильтр по экшену SET_FILTER', () => {
    const next = reducer({ filter: 'All' }, { type: 'SET_FILTER', payload: 'React' });
    expect(next.filter).toBe('React');
  });
});
```

#### Component — template

Most components use `t()` from `react-i18next` and may depend on the router.
Import the i18n initialization (its import side effect initializes i18next) and
wrap the render in the providers it needs.

```jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '../../utils/i18n/index'; // initializes i18next (path is relative to the test file)
import Loader from './Loader';

describe('Loader', () => {
  it('должен иметь доступную роль status', () => {
    render(<Loader />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('должен показать переданный текст под спиннером', () => {
    render(<Loader text="Загрузка проектов" />);
    expect(screen.getByText('Загрузка проектов')).toBeInTheDocument();
  });
});
```

> If the component uses `<Link>`/`<NavLink>`/`useNavigate`, wrap it in `<MemoryRouter>`.
> If it depends on `LanguageProvider`/`HelmetProvider`, wrap it in those too.
> Framer Motion animations render synchronously; asserting on the final DOM is usually enough.

#### Hook — template

```jsx
import { renderHook, act } from '@testing-library/react';
import { useProjectsFilter } from './useProjectsFilter';

describe('useProjectsFilter', () => {
  it('должен вернуть начальный фильтр', () => {
    const { result } = renderHook(() => useProjectsFilter());
    expect(result.current.filter).toBeDefined();
  });
});
```

> If the hook reads a context, pass a `wrapper` with the matching provider to `renderHook`.

### 6. Cover the main scenarios

For each public export:

- **Happy path** — the normal case
- **Edge cases** — empty arrays, missing props, `null`/`undefined`
- **Error cases** — what happens with invalid data

Don't test the internals of third-party libraries (Framer Motion, Swiper, react-i18next) —
only your own code's behavior. Don't add tests for trivial getters without logic.

### 7. Write the test file

`Write` to `<source directory>/<name>.test.jsx`.

### 8. Run the tests

`react-scripts test` defaults to watch mode. Run it once with watch disabled:

```bash
npm test -- <filename without extension> --watchAll=false
```

For example: `npm test -- Loader --watchAll=false`.

If tests fail, analyze the error, fix the test file, and retry.
Before finishing, run `npx eslint <test file>` (the `react-app/jest` preset is already wired up).

---

## Rules

- Test descriptions are written **in Russian**, starting with «должен»
- Test file is `*.test.jsx` next to the source
- **Do not add dependencies** (including Testing Library) without discussion — offer the install command to the user instead
- Mock only external dependencies and I/O, not the business logic
- Don't test third-party library internals — only your own behavior
- One `describe` per component/function/hook; nested `describe`s for individual methods/scenarios
- If the file holds only data/types without logic, report that no tests are needed
