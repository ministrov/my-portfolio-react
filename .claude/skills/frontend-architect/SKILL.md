---
name: frontend-architect
description: Architect-level guidance for building semantic, SEO-friendly markup and modern responsive CSS in this portfolio (React 18 JSX + plain CSS/BEM, mobile-first). Use when structuring or laying out a section/component, building a responsive system, fixing breakpoints, improving HTML semantics, or adding SEO/meta. Complements the ui-design skill — that one owns visual aesthetics, this one owns structure, responsiveness, semantics and SEO.
---

# Frontend Architect — семантика, адаптив и SEO

Скилл «архитектора по вёрстке» для этого портфолио. Отвечает за **структуру, адаптивность,
семантику и SEO**, а не за визуальную эстетику.

## Когда использовать

- Вёрстка новой секции/страницы или рефактор существующей разметки.
- Построение/правка адаптива (брейкпоинты, флюидные размеры, сетки).
- Улучшение семантики HTML и доступности.
- SEO: `<head>`, мета-теги, структурированные данные, мультиязычность.

**Когда НЕ использовать:** подбор палитры, типографики, «вау»-визуала, анимаций ради
красоты — это зона `ui-design`. Здесь — каркас, на который тот визуал ложится.

## Жёсткие рамки проекта (не нарушать)

Из `CLAUDE.md` и `.codeassistant/rules/` — это не обсуждается:

- **Только функциональные React-компоненты** (JSX), без классов.
- **Plain CSS + BEM** (`.block__element--modifier`) в `style.css` рядом с компонентом.
  Запрещены Sass/Less, styled-components/Emotion, **Tailwind**, CSS-модули.
- **Адаптив — desktop-first** (как уже свёрстан проект): базовые стили под десктоп,
  адаптация вниз через `max-width`. На финальной стадии НЕ переписывать на mobile-first —
  держать единый подход со всей кодовой базой.
- **Без новых зависимостей** без согласования.
- **Весь видимый текст — через i18n-ключи** (`t('...')`), правится в `en.json` + `ru.json`,
  не хардкодится в разметке. Держать обе локали синхронными.
- **`<head>`/SEO — только через `react-helmet-async`** (`<Helmet>`), `HelmetProvider`
  уже поднят в `src/index.js`.
- **Inline-стили** только для реально динамических значений (`width: ${w}px`).
- JSDoc/комментарии — **на русском**.

## 1. Семантическая разметка (JSX)

Семантика = одновременно доступность и SEO. Поисковик и скринридер читают одну и ту же
структуру. Правила:

- **Лендмарки вместо `div`-супа:** `<header>`, `<nav>`, `<main>` (ровно один на страницу),
  `<article>`, `<section>` (с заголовком), `<aside>`, `<footer>`.
- **`<section>` без заголовка не нужен** — если нет своего `h2/h3`, это `<div>`.
  Давать `aria-labelledby`, ссылающийся на `id` заголовка (как в `Contact.jsx`).
- **Иерархия заголовков без пропусков:** одна `<h1>` на страницу, дальше `h2 → h3`,
  не прыгать через уровень ради размера шрифта (размер — это CSS, не уровень).
- **Правильные элементы:** списки — `<ul>/<ol>/<li>`; изображение с подписью —
  `<figure>/<figcaption>`; дата — `<time dateTime="2026-06-11">`; контакты — `<address>`;
  навигация — `<nav aria-label="...">`.
- **`<button>` vs `<a>`:** действие на странице (открыть модалку, скролл, отправка) —
  `<button type="button">`; переход по URL/якорю — `<a href>`. Не вешать `onClick` на `<div>`.
- **Формы:** каждый input — свой `<label htmlFor>`; группы — `<fieldset>/<legend>`;
  ошибки — `aria-describedby` + `role="alert"` (см. `ContactForm.jsx`).
- **`alt` у `<img>`:** осмысленный для контентных, `alt=""` (пустой) для чисто декоративных;
  иконки-глифы — `aria-hidden="true"`.

## 2. SEO

### Мета через react-helmet-async

На каждой странице (`pages/`) — свой `<Helmet>`:

```jsx
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();

<Helmet htmlAttributes={{ lang: i18n.language }}>
  <title>{t('metadata.about.title')}</title>
  <meta name="description" content={t('metadata.about.description')} />
  <link rel="canonical" href="https://example.com/about" />

  {/* Open Graph — для шеринга в соцсетях */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content={t('metadata.about.title')} />
  <meta property="og:description" content={t('metadata.about.description')} />
  <meta property="og:image" content="https://example.com/og-cover.jpg" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
</Helmet>;
```

- `title`/`description` берём из секции `metadata.*` локалей (она уже есть в `en.json`/`ru.json`).
- `lang` на `<html>` синхронизировать с текущим языком i18n.

### Мультиязычность (RU/EN)

Сайт двуязычный — дать поисковику `hreflang`, чтобы он не считал версии дублями:

```jsx
<link rel="alternate" hrefLang="ru" href="https://example.com/?lang=ru" />
<link rel="alternate" hrefLang="en" href="https://example.com/?lang=en" />
<link rel="alternate" hrefLang="x-default" href="https://example.com/" />
```

### Структурированные данные (JSON-LD)

Портфолио фронтендера → `Person` + `WebSite`; на страницах с хлебными крошками —
`BreadcrumbList`. Вставлять скриптом через Helmet:

```jsx
<Helmet>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Anton Zhilin',
      jobTitle: 'Frontend Developer',
      url: 'https://example.com',
      sameAs: ['https://github.com/...', 'https://t.me/...'],
    })}
  </script>
</Helmet>
```

### Прочее

- Текст ссылок осмысленный («Смотреть проект», не «сюда»/«читать далее»).
- `robots.txt` + `sitemap.xml` в `public/` для публичного сайта.
- Один `H1` = главный посыл страницы, с ключевыми словами, но человекочитаемый.

## 3. Современный адаптив (CSS)

### Флюидность вместо россыпи брейкпоинтов

`clamp()` для типографики и отступов — плавный рост без скачков:

```css
.section__title {
  /* min 1.5rem, идеал 5vw, max 3rem */
  font-size: clamp(1.5rem, 1rem + 2.5vw, 3rem);
}
.section {
  padding-block: clamp(2rem, 5vw, 5rem);
}
```

### Сетки, которые подстраиваются сами

`auto-fit` + `minmax()` = адаптивные карточки без единого медиа-запроса:

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: clamp(1rem, 2vw, 2rem);
}
```

### Container queries — адаптив по контейнеру, а не по экрану

Когда компонент должен реагировать на свою ширину (в узкой колонке vs широкой):

```css
.card-wrap {
  container-type: inline-size;
}

@container (min-width: 30rem) {
  .card {
    grid-template-columns: 8rem 1fr;
  }
}
```

### Логические свойства и современные единицы

- `margin-inline`, `padding-block`, `inset` вместо привязки к left/right — корректнее и
  готово к RTL.
- `min()/max()/clamp()` для отзывчивых ограничений: `width: min(100%, 60rem)`.
- `gap` в flex и grid вместо `margin`-хаков.
- `aspect-ratio` для медиа (см. ниже, против CLS).

### Брейкпоинты — стратегия

Брейкпоинт ставится там, где **ломается макет**, а не под конкретный девайс. Проект —
**desktop-first**: базовая раскладка под десктоп, адаптация вниз через `@media (max-width: …)`
(как `max-width: 375px` в `Up`). Сначала выжать максимум из `clamp`/`auto-fit`/container
queries — медиа-запрос только когда реально меняется сама раскладка (число колонок,
направление flex). Общие точки держать согласованно по всей кодовой базе.

## 4. Доступность (пересекается с SEO)

- **`:focus-visible`** для outline (клавиатура), не голый `:focus` — см. `Up`, `CopyEmail`.
- **`@media (hover: hover)`** оборачивать hover-эффекты, чтобы не «залипали» на тач.
- **`prefers-reduced-motion: reduce`** — отключать/смягчать анимации и параллакс.
- **Контраст** текста ≥ 4.5:1 (WCAG AA), крупного ≥ 3:1.
- **Тач-цели** ≥ 44×44px (как `min-width/height: 44px` в `Up`).
- **`aria-*` по необходимости** — нативная семантика лучше навешанных ролей.

## 5. Производительность / CLS

- **Отзывчивые картинки:** `srcset` + `sizes`, либо `<picture>` для арт-дирекшена;
  `loading="lazy"` для всего ниже первого экрана; `decoding="async"`.
- **`aspect-ratio` у медиа** — резервирует место, убирает layout shift (CLS).
- **Шрифты:** `font-display: swap` (уже в `@font-face` проекта) против невидимого текста.
- **Above-the-fold** не лениво грузить; критичное — приоритетно.

## Чек-лист ревью (вопросы архитектора)

- [ ] Одна `<h1>`? Иерархия заголовков без пропусков?
- [ ] Лендмарки на месте, нет ли `<section>` без заголовка/`aria-label`?
- [ ] `<button>` для действий, `<a href>` для переходов?
- [ ] У всех `<img>` корректный `alt` (или `alt=""`/`aria-hidden` для декора)?
- [ ] Весь текст через i18n-ключи, обе локали синхронны?
- [ ] `<Helmet>` с `title`/`description`/canonical/OG? `hreflang` для RU/EN?
- [ ] Адаптив выжимает `clamp`/`auto-fit`/container queries до медиа-запросов?
- [ ] Единый desktop-first подход (`max-width`, как в проекте), логические свойства, `gap`?
- [ ] `:focus-visible`, `@media (hover: hover)`, `prefers-reduced-motion`?
- [ ] `aspect-ratio` у медиа, `loading="lazy"` ниже первого экрана?
- [ ] Plain CSS/BEM, без inline-стилей (кроме динамики), без новых зависимостей?

## Ссылки

- MDN: Semantics — https://developer.mozilla.org/en-US/docs/Glossary/Semantics
- web.dev: Learn CSS / Responsive — https://web.dev/learn/css/ , https://web.dev/learn/design/
- web.dev: Core Web Vitals (CLS/LCP) — https://web.dev/articles/vitals
- schema.org — https://schema.org/Person , https://schema.org/BreadcrumbList
- WCAG 2.1 quick ref — https://www.w3.org/WAI/WCAG21/quickref/
