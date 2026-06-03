---
name: test
description: Добавить Jest-тесты для указанного файла в портфолио my-portfolio-react (CRA + React 18, JS/JSX).
model: sonnet
allowed-tools: Read, Glob, Grep, Write, Bash(npm test:*), Bash(npx eslint:*)
user-invocable: true
argument-hint: <filepath>
---

# Test Skill

Сгенерируй Jest-тесты для файла `$0`, соблюдая соглашения этого репозитория.

Проект — **Create React App + React 18**, чистый **JS/JSX** (без TypeScript),
тест-раннер — **Jest через `react-scripts test`** (пресет `react-app/jest`, окружение jsdom).
Тестовых файлов в репозитории пока нет — этот скилл создаёт их по запросу.

## Аргументы

- `$0` — путь к файлу, для которого нужно написать тесты (относительный от корня репо или абсолютный)

## Алгоритм выполнения

### 1. Прочитай целевой файл

```
Read($0)
```

Разбери:

- Что экспортируется (компонент, хук, функция/редьюсер, константы)
- Какие зависимости импортируются (i18n, react-router, framer-motion, контексты)
- Какая логика требует покрытия

### 2. Определи тип файла

- **Компонент** — `*.jsx` в `src/components/`, `src/sections/`, `src/pages/`, `src/layouts/`
- **Хук** — `use`-префиксный файл в `src/hooks/`
- **Функция / редьюсер** — `src/utils/`, `src/sections/**/...Reduce.js` и подобные чистые модули
- **Только типы/константы** — если файл содержит лишь данные/JSDoc-типы без логики, сообщи, что тесты не нужны

### 3. Проверь наличие Testing Library

`@testing-library/react` **не входит** в зависимости проекта по умолчанию.
Проверь `package.json`. Если для компонента/хука его нет — **не устанавливай сам**
(репо запрещает добавлять зависимости без согласования). Сообщи пользователю и
предложи установить как dev-зависимость:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Для чистых функций/редьюсеров Testing Library не нужна — хватает встроенного Jest.

### 4. Проверь, не существует ли уже тест-файл

Тесты лежат **рядом** с исходником как `<имя>.test.jsx`. Если такой файл уже есть —
сообщи об этом и предложи дополнить его, а не создавать новый.

### 5. Сформируй тест-файл

Описания тестов (`it(...)`) — **на русском языке**, начиная с «должен» (как комментарии и JSDoc в проекте).

#### Чистая функция / редьюсер — шаблон

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

#### Компонент — шаблон

Большинство компонентов используют `t()` из `react-i18next` и могут зависеть от
роутера. Импортируй инициализацию i18n (сторона эффекта инициализирует i18next) и
оборачивай рендер в нужные провайдеры.

```jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '../../utils/i18n/index'; // инициализация i18next (путь — от тест-файла)
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

> Если компонент использует `<Link>`/`<NavLink>`/`useNavigate` — оборачивай в `<MemoryRouter>`.
> Если зависит от `LanguageProvider`/`HelmetProvider` — оборачивай и в них.
> Анимации Framer Motion рендерятся синхронно; обычно достаточно проверять итоговый DOM.

#### Хук — шаблон

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

> Если хук читает контекст — передавай `wrapper` с соответствующим провайдером в `renderHook`.

### 6. Покрой основные сценарии

Для каждого публичного экспорта:

- **Happy path** — нормальный сценарий
- **Edge cases** — пустые массивы, отсутствующие пропсы, `null`/`undefined`
- **Error cases** — что происходит при невалидных данных

Не тестируй детали реализации сторонних библиотек (Framer Motion, Swiper, react-i18next) —
только поведение собственного кода. Не добавляй тесты для тривиальных геттеров без логики.

### 7. Запиши тест-файл

`Write` в `<директория исходника>/<имя>.test.jsx`.

### 8. Запусти тесты

`react-scripts test` по умолчанию идёт в watch-режиме. Запускай разово, отключив watch:

```bash
npm test -- <имя файла без расширения> --watchAll=false
```

Например: `npm test -- Loader --watchAll=false`.

Если тесты упали — разбери ошибку, исправь тест-файл и повтори.
Перед завершением прогони `npx eslint <тест-файл>` (пресет `react-app/jest` уже подключён).

---

## Правила

- Описания тестов — **на русском языке**, начиная с «должен»
- Тест-файл — `*.test.jsx` рядом с исходником
- **Не добавляй зависимости** (включая Testing Library) без согласования — предлагай команду установки пользователю
- Мокируй только внешние зависимости и I/O, не бизнес-логику
- Не тестируй реализацию сторонних библиотек — только собственное поведение
- Один `describe` на компонент/функцию/хук, вложенные `describe` — на отдельные методы/сценарии
- Если файл содержит только данные/типы без логики — сообщи, что тесты не нужны
