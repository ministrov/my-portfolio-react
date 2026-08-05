# План миграции: CRA → Vite 8 + React 19

**Проект:** my-portfolio-react (портфолио Антона Жилина)
**Дата составления:** 2026-08-04
**Целевая платформа:** Vite 8 + React 19, остаёмся SPA
**Ветка для работы:** `chore/migrate-vite-react19` (от `feature/redesign-v4`)

---

## 1. Резюме

Проект переезжает с мёртвого Create React App (`react-scripts` 5.0.1, последний релиз — начало 2022 года) на Vite 8 и поднимается до React 19 вместе со всеми зависимостями.

**Архитектура `src/` не меняется.** Модель рендеринга (SPA), хостинг статики и структура каталогов остаются прежними. Это замена инструментов сборки и апгрейд зависимостей, а не переписывание приложения.

### Почему Vite, а не Next.js

Вариант с SSR рассматривался и отклонён осознанно. Блокеры для перехода на SSR в текущем коде:

- `src/utils/i18n/index.js:24-26` — `getInitialLang()` читает `window.location.search` и `localStorage` **на этапе импорта модуля**. При SSR это гарантированный hydration mismatch с первого рендера; требуется переписывание бутстрапа i18n.
- ~10 хуков и компонентов завязаны на `window` / `document` (`useCharWidths`, `useBodyScrollLock`, `useScrambleText`, `Header`, `Up`, `ScrollToTop`, `Modal`, `MobileMenu`, `AnimatedBackground`).
- `AnimatedBackground` — canvas-звёздное поле, размеры берёт из `window.innerWidth/innerHeight`; на сервере рендерить нечего.
- Смена хостинга со статики на Node-окружение.

Для персонального портфолио из 4 маршрутов выигрыш от SSR не окупает этих затрат. Вариант остаётся открытым в будущем — см. раздел 8.

### Почему проект удобен для этой миграции

Анализ показал необычно чистую картину:

- **Ноль** импортов `import { ReactComponent as X } from './x.svg'` — плагин `vite-plugin-svgr` не нужен.
- **Все** импорты относительные — алиасы путей настраивать не требуется, `jsconfig.json`/`tsconfig.json` в проекте нет.
- `process.env` встречается **ровно один раз** (`src/api/contactApi.js:40`).
- API Framer Motion уже современный (`LazyMotion` / `m` / `AnimatePresence` / `MotionConfig`, `AnimatePresence mode="wait"` вместо устаревшего `exitBeforeEnter`).
- Future-флаги React Router v7 **уже выставлены** в `src/App.jsx:29-32` — апгрейд роутера почти бесплатный.
- `ReactDOM.render` не используется, точка входа уже на `createRoot`.

---

## 2. Матрица версий

Все версии проверены через `npm info` на дату составления плана.

| Пакет                  | Сейчас             | Целевая                                   | Совместимость с React 19                       |
| ---------------------- | ------------------ | ----------------------------------------- | ---------------------------------------------- |
| `react` / `react-dom`  | 18.2               | **19.2.8**                                | —                                              |
| `react-scripts`        | 5.0.1              | **удалить**                               | —                                              |
| `vite`                 | —                  | **8.2.0** (новый)                         | —                                              |
| `@vitejs/plugin-react` | —                  | **6.0.5** (новый)                         | —                                              |
| `react-router-dom`     | 6.11               | **7.18.2**                                | peer `react: >=18` ✅                          |
| `framer-motion`        | 10.15              | **`motion` 12.43.0** (пакет переименован) | peer `^18 \|\| ^19` ✅                         |
| `i18next`              | 24.2               | **26.3.6**                                | —                                              |
| `react-i18next`        | 15.4               | **17.0.11**                               | требует `i18next >= 26` ⚠️                     |
| `swiper`               | 11.2               | **14.0.7**                                | peer react не объявлен ✅                      |
| `react-icons`          | 4.10               | **5.7.0**                                 | peer `react: *` ✅                             |
| `hamburger-react`      | 2.5.2              | без изменений                             | peer уже `^16.8 \|\| ^17 \|\| ^18 \|\| ^19` ✅ |
| `react-helmet-async`   | 2.0.5              | **удалить**                               | 3.0.0 поддерживает 19, но не нужен             |
| `prop-types`           | **не объявлен** ⚠️ | **15.8.1** (объявить явно)                | работает автономно                             |

**Связанные апгрейды** (нельзя обновлять порознь):

- `react-i18next` 17 ↔ `i18next` 26 — жёсткий peer.
- `react` ↔ `react-dom` — всегда одной версией.

---

## 3. Реестр рисков

Отсортировано по убыванию опасности.

### 🔴 Р1. `prop-types` — необъявленная зависимость

**36 файлов** в `src/` импортируют `prop-types`, но пакета **нет в `package.json`**. Он присутствует в `node_modules` исключительно транзитивно:

```
my-portfolio@1.1.0
`-- react-scripts@5.0.1
  `-- eslint-config-react-app@7.0.1
    `-- eslint-plugin-react@7.37.5
      `-- prop-types@15.8.1
```

В момент удаления `react-scripts` на этапе 1 пакет исчезает из `node_modules`, и 36 файлов перестают резолвиться. Ошибка проявится сразу и массово.

**Митигация:** установить `prop-types` явно **до** удаления `react-scripts` (этап 1, шаг 1).

**Отдельно:** React 19 больше не выполняет runtime-валидацию `propTypes` у функциональных компонентов — объявления становятся мёртвым кодом. Удалять их или нет — решается на опциональном этапе 9, к самой миграции это отношения не имеет.

### 🔴 Р7. JSX внутри файлов с расширением `.js`

Обнаружен при повторной проверке плана перед стартом (2026-08-05). Номер выдан по порядку добавления, а не по опасности — чтобы не ломать ссылки на Р1–Р6 в остальном документе; по опасности место риска здесь, сразу после Р1.

Первая редакция плана предполагала (шаг 1.5), что JSX есть только в `src/index.js`, а файлы данных чистые. Фактическая проверка это опровергает — JSX есть ещё в двух файлах:

| Файл                                | JSX                                                         | Как импортируется                                |
| ----------------------------------- | ----------------------------------------------------------- | ------------------------------------------------ |
| `src/index.js`                      | `<StrictMode>`                                              | из `index.html`                                  |
| `src/components/socials/socials.js` | `<FaGithub />`, `<FaTelegram />`, `<FaVk />`, `<MaxIcon />` | `'./socials.js'` — **с явным расширением**       |
| `src/const/index.js`                | `<SlGlobe />`, `<SiAffinitydesigner />`, `<TbSeo />`        | `'../const'` — резолв индекса каталога, ~10 мест |

`src/sections/projects/projects.js` проверен и **чист** — остаётся `.js`.

esbuild не парсит JSX в файлах с расширением `.js`, поэтому без переименования Vite падает на дев-сервере и на сборке. Ошибка громкая и мгновенная — тем и хороша.

**Митигация:** переименовать все три файла в `.jsx` (шаг 1.5). Отдельно проследить за двумя местами:

- `src/components/socials/SocialList.jsx:3` — импорт с явным `.js`, его нужно поправить руками;
- `src/const/index.jsx` — импортёры используют `'../const'` без имени файла, Vite резолвит индекс каталога через `resolve.extensions` (в дефолте `.jsx` присутствует), поэтому импортёры не трогаем — но проверяем, что сборка их находит.

**Отвергнутая альтернатива:** оверрайд загрузчика esbuild (`optimizeDeps.esbuildOptions.loader` / `esbuild.include` для `.js`). Формально работает, но прячет несоответствие расширения содержимому и расходится с конвенциями репозитория.

### 🟠 Р2. Переменные окружения

`src/api/contactApi.js:40` использует `process.env.REACT_APP_WEB3FORMS_KEY`. В Vite префикс `REACT_APP_` не читается — переменная станет `undefined`, форма обратной связи молча сломается (Web3Forms вернёт `invalid_access_key`).

Билд при этом **не упадёт** — отсюда риск пропустить. Обязательна ручная проверка отправки формы.

### 🟠 Р3. `<div id="portal">`

`public/index.html` переезжает в корень проекта. В нём два узла:

```html
<div id="root"></div>
<div id="portal"></div>
```

`src/components/modal/Modal.jsx:35` делает `document.getElementById('portal')`. Если при переносе потерять второй div — модальные окна перестанут открываться. Тоже без ошибки сборки.

### 🟡 Р4. JSON-LD и нативные метаданные React 19

React 19 нативно поднимает `<title>`, `<meta>` и `<link>` в `<head>` из любого места дерева. Но **инлайновые `<script type="application/ld+json">` он не поднимает** — они рендерятся на месте. В `src/pages/HomePage.jsx:85-86` два таких скрипта (`PERSON_SCHEMA`, `WEBSITE_SCHEMA`).

После удаления Helmet они окажутся в `<body>`. Для Google это валидно (структурированные данные ищутся по всему документу), но факт нужно зафиксировать и проверить через Rich Results Test.

### 🟡 Р5. Латентный баг в `LanguageProvider`

Обнаружен при анализе, **не связан с миграцией**, но всплывёт при проверке StrictMode на этапе 2.

`src/context/LanguageProvider.jsx:47-65`: рефа `isMounted` инициализируется в `true`, а cleanup эффекта ставит `false`. Эффект зависит от `[location.search, setLang]`, то есть cleanup срабатывает **при каждом перезапуске эффекта**, а не только при размонтировании. Обратно в `true` рефа не возвращается никогда.

Следствие: после первого же изменения `location.search` восстановление языка из `localStorage` перестаёт работать навсегда. В StrictMode двойной маунт срабатывает сразу, так что уже второй прогон видит `false`.

**Решение:** восстанавливать `isMounted.current = true` в начале эффекта, либо (правильнее) убрать саму рефу — эффект синхронный, гонки в нём нет, `isMounted` тут не нужен.

### 🟡 Р6. Отсутствие тестов

Тестов в репозитории **нет вообще**. Автоматической страховки у миграции не будет — приёмка каждого этапа только ручная. Отсюда обязательный чек-лист визуальной приёмки (раздел 5) и требование делать этапы мелкими и откатываемыми.

---

## 4. Этапы

Каждый этап — **отдельный коммит**. Формат коммитов — Conventional Commits, см. `.claude/skills/commit/SKILL.md`.

Правило: не переходить к следующему этапу, пока критерий готовности текущего не выполнен.

---

### Этап 0 — Подготовка и эталон

**Цель:** зафиксировать точку возврата и эталонное поведение, чтобы было с чем сравнивать.

**Действия:**

1. Создать ветку от текущей:
   ```bash
   git checkout -b chore/migrate-vite-react19
   ```
2. Собрать текущий прод-билд и зафиксировать метрики — понадобятся для сравнения на этапе 8:
   ```bash
   npm run build
   npm run analyze
   ```
   Записать в этот файл (раздел 9): суммарный вес JS, вес CSS, число чанков.
3. Запустить `npm start`, пройти по чек-листу приёмки (раздел 5) на текущем коде, зафиксировать эталонное поведение.
4. Убедиться, что `.env.local` существует и форма обратной связи реально отправляется — иначе на этапе 1 будет непонятно, что сломалось.
5. Проверить версию Node. Vite 8 требует `^20.19.0 || >=22.12.0`:
   ```bash
   node -v
   ```
   На машине разработки сейчас **v24.16.0** — требование выполнено. Проверить также окружение сборки на хостинге, если оно отличается.

**Критерий готовности:** метрики записаны, чек-лист пройден на CRA-версии, все пункты зелёные, версия Node удовлетворяет требованию Vite 8.

**Откат:** не требуется, изменений кода нет.

---

### Этап 1 — CRA → Vite 8

Самый крупный и самый рискованный этап. React пока остаётся на 18 — меняем **только** сборщик, чтобы при поломке было очевидно, что виноват он.

**Цель:** приложение собирается и работает на Vite при неизменном React 18.

**Файлы:**

| Файл                       | Действие                                                                        |
| -------------------------- | ------------------------------------------------------------------------------- |
| `package.json`             | переписать `dependencies`, `devDependencies`, `scripts`; удалить `eslintConfig` |
| `public/index.html`        | → перенести в `index.html` в корне проекта                                      |
| `vite.config.js`           | создать                                                                         |
| `eslint.config.js`         | создать (flat config, ESLint 9)                                                 |
| `src/api/contactApi.js:40` | `process.env.REACT_APP_*` → `import.meta.env.VITE_*`                            |
| `.env.local`               | переименовать ключ                                                              |
| `.env.local.example`       | переименовать ключ                                                              |
| `.gitignore`               | добавить `/dist` на случай смены `outDir`                                       |

**Шаг 1.1 — закрыть риск Р1 до удаления CRA:**

```bash
npm i prop-types
```

**Шаг 1.2 — поставить Vite и снять CRA:**

```bash
npm i -D vite@8 @vitejs/plugin-react@6
npm uninstall react-scripts
```

**Сразу после этого — проверить, что риск Р1 закрыт.** `npm uninstall` пересобирает дерево зависимостей: именно здесь `prop-types` либо выживает как объявленный верхнеуровневый пакет, либо исчезает вместе с `react-scripts` и роняет 36 файлов.

```bash
npm ls prop-types
```

Ожидаемый вывод — `prop-types` **прямой зависимостью** проекта:

```
my-portfolio@1.1.0 D:\react-js-projects\my-portfolio-react
`-- prop-types@15.8.1
```

Если он всё ещё показан вложенным под `react-scripts` или пропал вовсе — шаг 1.1 не отработал, вернуться к нему до продолжения.

**Шаг 1.3 — `index.html` в корень.**

Переместить `public/index.html` → `index.html` (корень), убрать токены `%PUBLIC_URL%`, добавить скрипт-точку входа. Остальное содержимое `public/` (`favicon.ico`, `manifest.json`, `robots.txt`, `sitemap.xml`, `logo192.png`, `logo512.png`) Vite копирует в выходной каталог как есть — трогать не нужно.

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="manifest" href="/manifest.json" />
  </head>

  <body>
    <div id="root"></div>
    <div id="portal"></div>
    <script type="module" src="/src/index.js"></script>
  </body>
</html>
```

⚠️ **Риск Р3:** `<div id="portal">` обязан остаться.

**Шаг 1.4 — `vite.config.js`:**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
});
```

`outDir: 'build'` выбран сознательно вместо дефолтного `dist`: сохраняются `/build` в `.gitignore`, скрипт `npm run prod` (`serve -s build`) и любые внешние настройки деплоя. Меньше движущихся частей.

**Шаг 1.5 — переименование файлов с JSX (риск Р7).**

Vite требует расширение `.jsx` для файлов с JSX. Поиск (шаблон `/>` даёт ложные срабатывания на комментариях и регулярках, `src/**/*.js` в bash не рекурсивен без `globstar` — поэтому именно так):

```bash
grep -rlE "</[A-Za-z]|<[A-Za-z][^>]*/>" --include="*.js" src/
```

Результат проверки от 2026-08-05 — **три** файла:

```bash
git mv src/index.js src/index.jsx
git mv src/components/socials/socials.js src/components/socials/socials.jsx
git mv src/const/index.js src/const/index.jsx
```

Сопутствующие правки импортов:

- `index.html` — путь точки входа на `/src/index.jsx`;
- `src/components/socials/SocialList.jsx:3` — `from './socials.js'` → `from './socials'` (расширение убираем совсем, как в остальном коде);
- импортёры `'../const'` — **не трогаем**, Vite резолвит индекс каталога через `resolve.extensions`.

Не переименовываем:

- `src/sections/projects/projects.js` — проверен, JSX нет;
- `src/utils/i18n/index.js` — JSX нет, импорт `'./utils/i18n/index'` в точке входа остаётся как есть.

После переименования — контрольная проверка, что незакрытых `.js` с JSX не осталось (вывод должен быть пустым):

```bash
grep -rlE "</[A-Za-z]|<[A-Za-z][^>]*/>" --include="*.js" src/
```

**Шаг 1.6 — переменные окружения (риск Р2):**

`src/api/contactApi.js:40`:

```js
// было
access_key: process.env.REACT_APP_WEB3FORMS_KEY,
// стало
access_key: import.meta.env.VITE_WEB3FORMS_KEY,
```

В `.env.local` и `.env.local.example`:

```
REACT_APP_WEB3FORMS_KEY=...  →  VITE_WEB3FORMS_KEY=...
```

**Шаг 1.7 — скрипты в `package.json`:**

```json
{
  "scripts": {
    "start": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "prod": "npm run build && serve -s build",
    "lint": "eslint src",
    "analyze": "source-map-explorer 'build/assets/*.js' --no-border-checks"
  }
}
```

Изменения: `eject` удаляется (нечего извлекать), `test` временно убирается (вернётся на этапе 8 как Vitest), `analyze` меняет путь `build/static/js/*.js` → `build/assets/*.js`, появляется настоящий `lint` — которого, вопреки `.codeassistant/rules`, до сих пор не было.

Также удалить из `package.json` секцию `eslintConfig` — она переезжает в flat config (шаг 1.8).

**Про `browserslist` — это не безобидное удаление.** Vite не читает `browserslist`, у него своя опция `build.target` с дефолтом `baseline-widely-available`. Текущий список проекта (`>0.2%, not dead, not op_mini all`) **шире** этого дефолта, то есть удаление секции **сужает поддержку браузеров** — выхлоп сборки реально изменится.

Два варианта:

1. **Принять сужение** (рекомендуется). Для персонального портфолио `baseline-widely-available` покрывает всю релевантную аудиторию, а выхлоп получается компактнее и современнее. Фиксируем как осознанный компромисс.
2. **Сохранить прежний охват** — задать `build.target` явно под старый список, если в аналитике сайта есть заметная доля старых браузеров.

Решение принять на этапе 0, посмотрев реальную статистику браузеров. По умолчанию идём по варианту 1.

**Шаг 1.8 — ESLint 9 flat config.**

`eslint-config-react-app` уходит вместе с CRA.

```bash
npm i -D eslint@9 @eslint/js globals eslint-plugin-react-hooks eslint-plugin-react-refresh
```

`eslint.config.js`:

```js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['build', 'dist', 'node_modules'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];
```

**Критерий готовности:**

- `npm ls prop-types` показывает пакет прямой зависимостью, и он присутствует в `dependencies` в `package.json` (риск Р1 закрыт);
- `npm start` поднимается на `localhost:3000`, консоль браузера чистая;
- `npm run build` проходит без ошибок;
- `npm run preview` отдаёт рабочий билд;
- `npx eslint src` не выдаёт ошибок (предупреждения допустимы);
- пройден **полный** чек-лист приёмки (раздел 5), особое внимание — форма обратной связи (Р2) и модальные окна (Р3);
- шрифты подгрузились, фоновые изображения проектов на месте, PDF резюме скачивается.

**Откат:** `git reset --hard` на коммит этапа 0 + `npm ci`.

---

### Этап 2 — React 18 → 19

**Цель:** поднять React до 19 при работающем Vite.

**Действия:**

```bash
npm i react@19 react-dom@19
```

Опционально прогнать официальные кодмоды (для JS-проекта без TS они почти ничего не найдут, но проверка дешёвая):

```bash
npx codemod@latest react/19/migration-recipe
```

**Что проверять прицельно:**

1. **`prop-types` больше не валидируются.** React 19 не выполняет runtime-проверку `propTypes`. Ошибок это не вызывает, но и пользы от объявлений больше нет. Пакет оставляем установленным (иначе 36 файлов не зарезолвятся), решение об удалении — этап 9.

2. **StrictMode и `LanguageProvider` (риск Р5).** `src/context/LanguageProvider.jsx:47-65` — рефа `isMounted` не восстанавливается в `true` после cleanup. Починить здесь:

   ```js
   useEffect(() => {
     isMounted.current = true; // ← восстановить в начале эффекта
     // ...
     return () => {
       isMounted.current = false;
     };
   }, [location.search, setLang]);
   ```

   Либо убрать `isMounted` целиком — эффект синхронный, асинхронной гонки, от которой рефа защищает, в нём нет. Второй вариант предпочтительнее.

3. **Прочие эффекты с подписками** прогнать на двойной вызов в StrictMode: `useCharWidths`, `useScrambleText`, `AnimatedBackground` (`resize`-листенер + `matchMedia`), `Header` (`scroll`), `Up` (`scroll` + `keydown`), `useEscapeKey`, `Modal`. Все они уже возвращают cleanup — проверить, что подписки действительно снимаются и не дублируются.

4. **`forwardRef`.** `src/components/tag/Tag.jsx:18` использует `forwardRef`. В React 19 `ref` передаётся обычным пропом, но `forwardRef` **не удалён** и работает. Не трогаем — упрощение вне scope миграции.

**Критерий готовности:**

- `npm start` и `npm run build` проходят;
- в консоли нет предупреждений React о deprecated API;
- чек-лист приёмки пройден;
- восстановление языка из `localStorage` работает: переключить на EN, закрыть вкладку, открыть `/` без `?lang=` → должен быть EN.

**Откат:** `npm i react@18.2 react-dom@18.2` + `git revert` коммита этапа.

---

### Этап 3 — react-router-dom 6.11 → 7

**Цель:** перейти на актуальный роутер.

Этап дешёвый: future-флаги v7 (`v7_startTransition`, `v7_relativeSplatPath`) **уже включены** в `src/App.jsx:29-32`, то есть приложение де-факто работает по правилам v7 и на 6.11.

**Действия:**

```bash
npm i react-router-dom@7
```

Убрать проп `future` из `<BrowserRouter>` — в v7 это поведение по умолчанию:

```jsx
// src/App.jsx — было
<BrowserRouter
  future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}
>
// стало
<BrowserRouter>
```

**Проверить импорты.** В v7 пакет `react-router-dom` реэкспортирует всё из `react-router`; используемые в проекте `BrowserRouter`, `Routes`, `Route`, `Outlet`, `Link`, `NavLink`, `useLocation`, `useNavigate` доступны без изменений.

**Затронутые файлы:** `src/App.jsx`, плюс проверить `src/layouts/Layout.jsx`, `src/layouts/header/Header.jsx`, `src/components/breadcrumbs/Breadcrumbs.jsx`, `src/components/scrollToTop/ScrollToTop.jsx`, `src/hooks/useSeoMeta.jsx`, `src/context/LanguageProvider.jsx`, `src/hooks/useUrlParams.jsx`.

**Критерий готовности:**

- переходы между `/`, `/about`, `/projects` работают;
- 404 (`/nonexistent`) рендерит `PageNotFound`;
- `ScrollToTop` отрабатывает — при переходе страница уезжает наверх;
- `?lang=en` сохраняется при навигации;
- хлебные крошки корректны.

**Откат:** `git revert` коммита.

---

### Этап 4 — framer-motion 10 → motion 12

**Цель:** перейти на переименованный пакет и актуальную мажорную версию.

Начиная с v11 пакет называется `motion`, а не `framer-motion`. Содержимое то же.

**Действия:**

```bash
npm uninstall framer-motion
npm i motion
```

Заменить импорты в **22 местах**. Для React-биндингов путь `motion/react`:

```jsx
// было
import { LazyMotion, domAnimation, AnimatePresence, m } from 'framer-motion';
// стало
import { LazyMotion, domAnimation, AnimatePresence, m } from 'motion/react';
```

Найти все вхождения:

```bash
grep -rln "from 'framer-motion'" src/
```

**Почему этап низкорисковый:** используемая поверхность API — `LazyMotion`, `domAnimation`, `m`, `AnimatePresence`, `MotionConfig` — в v12 присутствует целиком. Устаревший `exitBeforeEnter` в коде отсутствует, уже используется современный `AnimatePresence mode="wait"` (`src/components/contactForm/ContactForm.jsx:57`).

**Проверить прицельно:**

- `MotionConfig reducedMotion="user"` в `src/App.jsx:27`;
- анимация `height: 0 → auto` в `src/components/accordionPanel/AccordionPanel.jsx:23-39` — самое хрупкое место, layout-анимации чаще всего меняют поведение между мажорами;
- `src/components/tag/Tag.jsx` — `forwardRef` ради совместимости с `motion()`.

**Критерий готовности:**

- аккордеон FAQ раскрывается/закрывается плавно, без скачков высоты;
- анимации формы обратной связи (шаги, ошибки, успех) отрабатывают;
- `prefers-reduced-motion: reduce` в devtools глушит анимации;
- анимации входа секций при скролле работают.

**Откат:** `git revert` коммита.

---

### Этап 5 — i18next 26 + react-i18next 17

**Цель:** актуализировать i18n-стек.

⚠️ **Связанный апгрейд.** `react-i18next@17` объявляет peer `i18next: >= 26.2.0`. Ставить строго вместе, одной командой.

```bash
npm i i18next@26 react-i18next@17
```

**Затронутые файлы:**

- `src/utils/i18n/index.js` — инициализация;
- `src/hooks/useLanguage.jsx` — мост `i18n.changeLanguage(lang)`;
- все компоненты с `useTranslation` (большинство — текста в коде почти нет, он весь в ключах).

**Что проверить в конфиге** (`src/utils/i18n/index.js:31-39`): текущая инициализация минимальна — `resources`, `fallbackLng`, `lng`, `interpolation.escapeValue`. Всё это в v26 поддерживается без изменений. `getInitialLang()` работает с `window`/`localStorage` — для SPA это допустимо и остаётся как есть.

**Помнить про двухслойность языковой системы** (см. `CLAUDE.md`): `LanguageProvider` владеет состоянием и URL/localStorage, а мост к i18next — это **хук** `hooks/useLanguage.jsx`, а не одноимённый экспорт из провайдера. Проверять надо оба слоя.

**Критерий готовности:**

- переключатель языка меняет весь текст на обеих страницах;
- `?lang=en` в адресной строке даёт английскую версию при прямом заходе;
- выбор языка переживает перезагрузку страницы (localStorage);
- `document.documentElement.lang` меняется (`src/App.jsx:22-24`);
- нет предупреждений в консоли о missing keys;
- проверены обе локали целиком — по 435 строк в `en.json` и `ru.json`.

**Откат:** `git revert` коммита.

---

### Этап 6 — swiper 11 → 14

**Цель:** актуализировать карусели.

```bash
npm i swiper@14
```

**Хорошая новость:** пути импорта CSS в v14 **не изменились** — проверено по полю `exports` пакета. `swiper/css` и `swiper/css/effect-fade` (`src/App.jsx:12-13`) остаются валидными, как и `swiper/react` и `swiper/modules`.

**Затронутые файлы:**

- `src/components/carousel/Carousel.jsx` — модули `Autoplay`, `EffectFade`;
- `src/sections/testimonials/Testimonials.jsx` — модули `Autoplay`, `A11y`;
- `src/App.jsx:12-13` — импорты CSS.

**Критерий готовности:**

- карусель в `Showcasing` листается, fade-переход работает;
- карусель отзывов автопрокручивается;
- клавиатурная навигация по слайдам (модуль `A11y`) работает;
- на мобильной ширине свайп пальцем/мышью работает;
- нет ошибок в консоли.

**Откат:** `git revert` коммита.

---

### Этап 7 — Удаление react-helmet-async

**Цель:** заменить Helmet нативными метаданными React 19.

React 19 умеет сам поднимать `<title>`, `<meta>` и `<link>` в `<head>` из любого места дерева компонентов. Отдельная библиотека становится лишней зависимостью.

**Затронутые файлы (5):**

- `src/index.js` (после этапа 1 — `src/index.jsx`) — убрать `<HelmetProvider>`;
- `src/pages/HomePage.jsx`;
- `src/pages/AboutPage.jsx`;
- `src/pages/ProjectsPage.jsx`;
- `src/pages/pageNotFound/PageNotFound.jsx`.

**Преобразование** — снять обёртку `<Helmet>`, содержимое оставить как есть:

```jsx
// было
<>
  <Helmet>
    <title>{PAGE_TITLE}</title>
    <meta name="description" content={PAGE_DESCRIPTION} />
    <link rel="canonical" href={canonical} />
  </Helmet>
  <Hero />
</>

// стало
<>
  <title>{PAGE_TITLE}</title>
  <meta name="description" content={PAGE_DESCRIPTION} />
  <link rel="canonical" href={canonical} />
  <Hero />
</>
```

Атрибут `data-rh="true"` (`src/pages/HomePage.jsx:66`) — служебный маркер Helmet, удалить.

⚠️ **Риск Р4 — JSON-LD.** `src/pages/HomePage.jsx:85-86` содержит два инлайновых `<script type="application/ld+json">`. React 19 **не** поднимает инлайновые скрипты в `<head>` — они отрендерятся на месте, в `<body>`.

Для Google это валидно: структурированные данные ищутся по всему документу. Но проверить обязательно через [Rich Results Test](https://search.google.com/test/rich-results). Если результат не устроит — вернуть JSON-LD статикой прямо в `index.html` (схемы `Person` и `WebSite` не зависят ни от языка, ни от маршрута, так что статика тут даже уместнее).

**Снять зависимость:**

```bash
npm uninstall react-helmet-async
```

**Критерий готовности:**

- вкладка браузера показывает правильный `<title>` на каждом из 4 маршрутов;
- в devtools → Elements внутри `<head>` присутствуют `description`, `canonical`, `hreflang` (ru/en/x-default), весь блок `og:*` и `twitter:*`;
- при переключении языка мета-теги обновляются;
- при навигации между маршрутами старые теги не накапливаются дублями;
- Rich Results Test находит схемы `Person` и `WebSite`;
- **`hreflang` пережил подъём в `<head>`.** В `HomePage.jsx:69-71`, `AboutPage.jsx:59-61`, `ProjectsPage.jsx:56-58` атрибут написан строчными (`hreflang`), а не как `hrefLang`. Пока теги сериализовал Helmet, это работало; после его снятия `<link>` рендерит сам React. Проверить в devtools, что все три `hreflang` (ru/en/x-default) реально присутствуют в `<head>` — и заодно привести написание к `hrefLang`. Линт об этом не предупредит: правило `react/no-unknown-property` отключено вместе с `react.configs.flat.recommended` на этапе 1;
- превью ссылки корректно рендерится (проверить в Telegram — самый быстрый способ).

**Откат:** `git revert` коммита.

---

### Этап 8 — Хвосты и финальная приёмка

**Цель:** закрыть инфраструктурные остатки и сверить результат с эталоном этапа 0.

**8.1 — Vitest вместо Jest.**

Вместе с `react-scripts` ушёл Jest. Тестов в проекте нет, так что это задел на будущее, а не срочность.

```bash
npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

В `vite.config.js`:

```js
export default defineConfig({
  plugins: [react()],
  // ...
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
});
```

Вернуть скрипты:

```json
"test": "vitest",
"test:run": "vitest run"
```

Соглашение из `CLAUDE.md` сохраняется: тесты лежат рядом с тестируемым файлом как `*.test.jsx`.

**8.2 — Проверить `npm run analyze`.**

Путь уже поправлен на этапе 1 (`build/assets/*.js`). Убедиться, что `source-map-explorer` отрабатывает — `build.sourcemap: true` в конфиге для этого и стоит.

**8.3 — Сравнение с эталоном.**

Сверить с метриками из раздела 9: вес JS, вес CSS, число чанков. Vite обычно даёт меньший бандл за счёт лучшего tree-shaking, но проверить, что code-splitting сохранился: `AboutPage`, `ProjectsPage`, `PageNotFound`, `Showcasing`, `Testimonials` должны остаться отдельными чанками.

**8.4 — Обновить документацию.**

- `README.md` — команды разработки;
- `CLAUDE.md` — секция «Commands» (`react-scripts` → `vite`), упоминание Jest → Vitest, а также снять из раздела «Stale rules» пункт про отсутствующий `npm run lint` — после этапа 1 скрипт существует;
- `CHANGELOG.md` — запись о миграции;
- `.codeassistant/rules` — при необходимости.

**8.5 — Финальная приёмка.** Полный чек-лист (раздел 5) на `npm run preview`, а не на дев-сервере.

**Критерий готовности:** все пункты чек-листа зелёные на прод-билде, метрики зафиксированы, документация обновлена.

---

### Этап 9 — Опционально: чистка `prop-types`

**Не входит в миграцию.** Выполнять отдельной задачей после стабилизации.

React 19 не валидирует `propTypes` в рантайме — объявления в 36 файлах стали мёртвым кодом. Конвенции проекта (`CLAUDE.md`, `.codeassistant/rules`) и без того требуют JSDoc, который у компонентов уже есть.

**Варианты:**

1. **Оставить как есть** — вреда нет, служит документацией. Стоимость: лишняя зависимость + 36 блоков мёртвого кода.
2. **Удалить `propTypes`, оставить JSDoc** — минус зависимость, минус ~200 строк. Требует внимательной вычитки: где JSDoc беднее `propTypes`, информацию надо перенести, а не потерять.

**Рекомендация:** вариант 2, но отдельной задачей и отдельным ревью. Смешивать его с миграцией нельзя — это размывает диффы и ломает откатываемость этапов.

---

## 5. Чек-лист визуальной приёмки

Прогоняется на этапе 0 (эталон) и после **каждого** этапа. Тестов нет — это единственная страховка.

### Главная (`/`)

- [ ] Звёздный фон `AnimatedBackground` анимируется, при ресайзе окна перерисовывается
- [ ] `Hero` — скрамбл-эффект текста отрабатывает
- [ ] Кнопка скачивания резюме отдаёт PDF
- [ ] `Showcasing` — карусель листается, fade работает
- [ ] `Services`, `Advantages` — анимации входа при скролле
- [ ] `Testimonials` — карусель автопрокручивается
- [ ] `Faq` — аккордеон раскрывается плавно, height-анимация без скачков
- [ ] **`Contact` — форма реально отправляется** (риск Р2, письмо должно прийти)
- [ ] Форма показывает ошибки валидации и состояние успеха

### О себе (`/about`)

- [ ] Страница подгружается (lazy-чанк), `Loader` показывается
- [ ] `PhotoRing` — hover-эффект «devtools inspect» работает
- [ ] `AuthorIdentity` — фото выровнено по левому краю на десктопе
- [ ] Блоки Story / Experience / Education / Capabilities на месте

### Проекты (`/projects`)

- [ ] Страница подгружается
- [ ] Фильтры переключаются, список проектов фильтруется корректно
- [ ] Изображения проектов грузятся во всех трёх размерах (desktop/tablet/mobile)
- [ ] **Модальное окно проекта открывается** (риск Р3, `#portal`)
- [ ] Модалка закрывается по Esc и по клику вне

### Сквозное

- [ ] 404 на несуществующем маршруте
- [ ] Переключатель языка меняет весь текст
- [ ] `?lang=en` работает при прямом заходе
- [ ] Язык переживает перезагрузку страницы
- [ ] Мобильное меню открывается, скролл body блокируется, хедер остаётся непрозрачным
- [ ] Кнопка «наверх» появляется при скролле и работает
- [ ] Копирование email в буфер работает
- [ ] Хлебные крошки корректны
- [ ] Шрифты (Oswald, Unbounded, Golos Text) подгрузились — нет системного fallback
- [ ] `prefers-reduced-motion: reduce` глушит анимации
- [ ] Консоль браузера чистая
- [ ] Мета-теги в `<head>` на всех 4 маршрутах

---

## 6. Порядок и обратимость

```
Этап 0 ──► Этап 1 ──► Этап 2 ──► Этап 3 ──► Этап 4 ──► Этап 5 ──► Этап 6 ──► Этап 7 ──► Этап 8
подготовка  Vite 8    React 19   router 7   motion 12  i18next 26  swiper 14   -helmet    хвосты
            🔴 риск   🟠 риск    🟢         🟡         🟡          🟢          🟡
```

**Почему такой порядок:**

1. Сборщик первым и в одиночку — если ломается, виновник однозначен.
2. React 19 сразу после — все последующие апгрейды библиотек тестируются уже на целевой версии React, а не дважды.
3. Роутер третьим — самый дешёвый этап, быстрая победа после двух тяжёлых.
4. Библиотеки (4–6) в порядке возрастания связанности с остальным кодом.
5. Helmet предпоследним — зависит от React 19 (этап 2), но не блокирует ничего.
6. Хвосты последними.

Каждый этап — отдельный коммит с рабочим состоянием приложения. Откат любого этапа — `git revert` одного коммита, кроме этапа 1, где нужен `git reset --hard` + `npm ci` (меняется `package-lock.json`).

---

## 7. Что миграция НЕ затрагивает

Явно фиксируем, чтобы scope не расползался:

- **Структура `src/`** — каталоги, именование, разбиение на `pages`/`sections`/`components`/`layouts` остаются как есть.
- **CSS** — плоский CSS с BEM, `style.css` рядом с компонентом. Никакого CSS-модулей, Tailwind, styled-components. 4612 строк CSS переезжают без единого изменения.
- **Desktop-first подход** — стили на `max-width`-медиазапросах не переписываются на mobile-first.
- **Дизайн и вёрстка** — ни одного визуального изменения. Если что-то изменилось визуально — это регрессия, а не улучшение.
- **i18n-архитектура** — двухслойная система `LanguageProvider` + хук `useLanguage` сохраняется. Ключи переводов не трогаем.
- **Логика фильтрации проектов** — `projectsReduce.js`, `useProjectsFilter.jsx` без изменений.
- **TypeScript не вводится.** **Redux и прочие стейт-менеджеры не вводятся.** **UI-библиотеки не вводятся.** (см. запрет в `CLAUDE.md`).

**Единственное исключение из принципа «поведенческий паритет»** — целевой набор браузеров. Удаление `browserslist` в пользу дефолта Vite сужает поддержку старых браузеров (подробности и альтернатива — шаг 1.7). Это осознанный компромисс, а не побочный эффект.

---

## 8. Задел на будущее

Не входит в этот план, но становится доступным после миграции:

- **Pre-rendering / SSG.** После переезда на Vite можно добавить пререндер статики (`vite-plugin-prerender` и аналоги) — это даст часть SEO-выигрыша SSR без смены хостинга и без переписывания бутстрапа i18n. Разумный следующий шаг, если SEO окажется приоритетом.
- **React Compiler.** Работает с React 19. Потенциально позволит убрать ручные `memo`/`useMemo`/`useCallback`, которых в проекте много (`HomePage`, `LanguageProvider`, и т.д.).
- **React Router v7 framework mode.** Дверь открыта после этапа 3, но упирается в те же SSR-блокеры, что и Next.js (раздел 1).
- **Полноценный SSR.** Требует решения проблемы `getInitialLang()` и ~10 window-зависимых хуков. Оценка — 1–2 недели.

---

## 9. Метрики (заполнить на этапе 0 и этапе 8)

| Метрика                            | До (CRA, этап 0) | После (Vite, этап 8) | Δ   |
| ---------------------------------- | ---------------- | -------------------- | --- |
| Вес JS (gzip)                      | 183.8 kB         | —                    | —   |
| Вес CSS (gzip)                     | 17.4 kB          | —                    | —   |
| Число JS-чанков                    | 8                | —                    | —   |
| Число CSS-чанков                   | 7                | —                    | —   |
| Время холодного старта дев-сервера | —                | —                    | —   |
| Время прод-сборки                  | 71 с             | —                    | —   |

**Детализация базового замера (CRA, `npm run build`, 2026-08-05):**

| Файл                    | gzip      |
| ----------------------- | --------- |
| `static/js/main.*.js`   | 144.95 kB |
| `static/js/100.*.js`    | 28.28 kB  |
| `static/css/main.*.css` | 12.54 kB  |
| `static/js/892.*.js`    | 3.76 kB   |
| `static/js/588.*.js`    | 2.46 kB   |
| `static/js/537.*.js`    | 2.00 kB   |
| `static/css/537.*.css`  | 1.53 kB   |
| `static/css/892.*.css`  | 1.52 kB   |
| `static/js/160.*.js`    | 1.03 kB   |
| `static/js/674.*.js`    | 671 B     |
| `static/js/952.*.js`    | 642 B     |
| `static/css/160.*.css`  | 620 B     |
| `static/css/588.*.css`  | 611 B     |
| `static/css/674.*.css`  | 384 B     |
| `static/css/952.*.css`  | 239 B     |

---

## 10. Журнал выполнения

| Этап                         | Статус      | Коммит  | Дата       | Заметки                                                                                                                                                                                                               |
| ---------------------------- | ----------- | ------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0. Подготовка                | ✅ готов    | a1d2d02 | 2026-08-05 | Ветка `chore/migrate-vite-react19` от `master` (`feature/redesign-v4` уже влита в 71cfb9b). Метрики CRA сняты. Риски Р1–Р6 перепроверены и подтверждены, добавлен Р7 (JSX в `.js`), уточнён шаг 1.5. Node v24.16.0 ✅ |
| 1. CRA → Vite 8              | ✅ готов    | —       | 2026-08-05 | Сборка 468 мс против 71 с. Р1/Р2/Р3/Р7 закрыты и проверены. 4 отступления от плана — см. ниже                                                                                                                         |
| 2. React 18 → 19             | ⬜ не начат | —       | —          | —                                                                                                                                                                                                                     |
| 3. router 6 → 7              | ⬜ не начат | —       | —          | —                                                                                                                                                                                                                     |
| 4. framer-motion → motion 12 | ⬜ не начат | —       | —          | —                                                                                                                                                                                                                     |
| 5. i18next 26                | ⬜ не начат | —       | —          | —                                                                                                                                                                                                                     |
| 6. swiper 14                 | ⬜ не начат | —       | —          | —                                                                                                                                                                                                                     |
| 7. −react-helmet-async       | ⬜ не начат | —       | —          | —                                                                                                                                                                                                                     |
| 8. Хвосты                    | ⬜ не начат | —       | —          | —                                                                                                                                                                                                                     |
| 9. Чистка prop-types (опц.)  | ⬜ не начат | —       | —          | —                                                                                                                                                                                                                     |

### Отступления от плана на этапе 1

1. **Порядок шагов 1.1 и 1.2 перевёрнут.** Поставить `prop-types` поверх ещё живого CRA не вышло: `react-scripts@5.0.1` требует `typescript ^3 || ^4`, а `i18next@24` тянет `typescript ^5` — `ERESOLVE` на любой установке. Тащить `--legacy-peer-deps` в лок не стали, поэтому сначала сняли `react-scripts`, затем поставили `prop-types` и Vite. Суть митигации Р1 (явное объявление + проверка `npm ls`) сохранена: `prop-types@15.8.1` подтверждён прямой зависимостью.
2. **Добавлен `"type": "module"` в `package.json`.** Не был предусмотрен планом, но обязателен: `eslint.config.js` и `vite.config.js` написаны в ESM, а без этого поля Node грузит `.js` как CommonJS и падает. Корень проверен — файлов на CommonJS в нём нет.
3. **Добавлен `eslint-plugin-react` (dev).** Конфиг из шага 1.8 без него нерабочий: базовое `no-unused-vars` не видит использование компонентов в JSX и даёт **200 ложных ошибок**. Подключён узко — только `jsx-runtime` + правило `react/jsx-uses-vars`; полный `react.configs.flat.recommended` сознательно не включён. Формально это новая зависимость, фактически — возврат того, что входило в `eslint-config-react-app` и ушло вместе с CRA.
4. **Две правки кода не по сборке.** Обе продиктованы линтом, поведение не меняют:
   - `src/sections/projects/projectsReduce.js:14` — тело `case` обёрнуто в блок (`no-case-declarations`);
   - `react-hooks/set-state-in-effect` понижено до предупреждения. Правило новое в `eslint-plugin-react-hooks@7`, срабатывает в `AnimatedBackground:200` и `useScrambleText:99`. Замечания по делу, но их разбор означает переписывание анимаций — это нарушило бы визуальную нейтральность миграции (раздел 7). **Вынесено в отдельную задачу.**

### Проверки этапа 1

- `npm ls prop-types` → `prop-types@15.8.1` прямой зависимостью — **Р1 закрыт**;
- ключ из `.env.local` (36 символов) найден подставленным в прод-чанке `Contact-*.js` — **Р2 закрыт механически**, но ручную отправку письма всё равно проверить;
- `<div id="portal">` присутствует и в `index.html`, и в выдаче `vite preview` — **Р3 закрыт**;
- три файла с JSX переименованы в `.jsx`, контрольный `grep` по `--include="*.js"` пуст, все модули отдают 200 на дев-сервере — **Р7 закрыт**;
- `npx eslint src` → 0 ошибок, 5 предупреждений;
- шрифты эмитятся: все 7 `woff2` (Oswald ×3, Unbounded ×2, Golos Text ×2) лежат в `build/assets/` с хешами, `url()` в собранном CSS указывают на `/assets/<имя>-<хеш>.woff2`;
- реальная загрузка в браузере (Playwright, холодный старт): приложение монтируется, рендерятся хедер, hero, все секции включая lazy-подгружаемые `Showcasing` и `Testimonials`, футер; тексты разрешились из i18n-ключей; `?lang=ru` подставился; **консоль чистая** — только HMR-хендшейк Vite и стандартная подсказка React DevTools;
- дев-сервер стартует за 269 мс, прод-сборка — за 468 мс;
- `vite preview`: SPA-фоллбэк отдаёт 200 на `/about`, `/projects`, `/nonexistent`, `/?lang=en`; статика из `public/` (`favicon.ico`, `manifest.json`, `robots.txt`, `sitemap.xml`) на месте;
- code-splitting сохранён: `AboutPage`, `ProjectsPage`, `PageNotFound`, `Showcasing`, `Testimonials`, `Carousel` — отдельные чанки.

**Замер после этапа 1 (React ещё 18):** JS gzip ≈ 183.8 kB в 19 чанках, CSS gzip ≈ 18.6 kB в 11 чанках. По весу JS паритет с CRA, дробление мельче. Финальный замер — на этапе 8.

**Побочная находка.** `npm audit` на CRA-дереве показывал critical prototype pollution в `swiper` (лечится этапом 6) и уязвимости `react-router` (этап 3) — оба этапа заодно закрывают безопасность.

**Решение по `browserslist` (шаг 1.7).** Принят **вариант 1** — секция удалена, сужение до дефолтного `build.target` Vite (`baseline-widely-available`) принято как осознанный компромисс. Это то самое «единственное исключение из поведенческого паритета» из раздела 7.

**Долг, заведённый этапом 1.** Отказ от `react.configs.flat.recommended` заглушил 9 реальных находок `react/no-unknown-property`: в `HomePage.jsx:69-71`, `AboutPage.jsx:59-61` и `ProjectsPage.jsx:56-58` атрибут написан как `hreflang`, а в JSX канонично `hrefLang`. Сейчас безвредно — теги сериализует Helmet, а React пропускает нераспознанный атрибут в DOM как есть. **На этапе 7 это перестаёт быть безобидным:** `<link>` начнёт поднимать в `<head>` сам React 19, а линт об этом больше не предупредит. Пункт добавлен в критерий готовности этапа 7.
