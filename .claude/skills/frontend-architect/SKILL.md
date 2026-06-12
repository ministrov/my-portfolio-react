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

## Эталон разметки

Эталонный HTML из учебного проекта «6 cities» (Htmlacademy). Использовать как образец
правильного BEM + семантики при вёрстке новых компонентов и ревью существующих.
SVG-спрайт (`<symbol>`/`<use>`) в этом образце — устаревший паттерн, в React не применяется
(иконки через `react-icons` или импорт SVG как компонента).

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>6 cities</title>
    <link rel="stylesheet" href="css/main.css" />
  </head>

  <body>
    <div class="page page--gray page--main">
      <header class="header">
        <div class="container">
          <div class="header__wrapper">
            <div class="header__left">
              <a class="header__logo-link header__logo-link--active">
                <img
                  class="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav class="header__nav">
              <ul class="header__nav-list">
                <li class="header__nav-item user">
                  <a
                    class="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div
                      class="header__avatar-wrapper user__avatar-wrapper"
                    ></div>
                    <span class="header__user-name user__name"
                      >Oliver.conner@gmail.com</span
                    >
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main class="page__main page__main--index">
        <h1 class="visually-hidden">Cities</h1>
        <div class="tabs">
          <section class="locations container">
            <ul class="locations__list tabs__list">
              <li class="locations__item">
                <a class="locations__item-link tabs__item" href="#"
                  ><span>Paris</span></a
                >
              </li>
              <li class="locations__item">
                <a class="locations__item-link tabs__item tabs__item--active"
                  ><span>Amsterdam</span></a
                >
              </li>
            </ul>
          </section>
        </div>
        <div class="cities">
          <div class="cities__places-container container">
            <section class="cities__places places">
              <h2 class="visually-hidden">Places</h2>
              <b class="places__found">312 places to stay in Amsterdam</b>
              <form class="places__sorting" action="#" method="get">
                <span class="places__sorting-caption">Sort by</span>
                <span class="places__sorting-type" tabindex="0">Popular</span>
                <ul
                  class="places__options places__options--custom places__options--opened"
                >
                  <li
                    class="places__option places__option--active"
                    tabindex="0"
                  >
                    Popular
                  </li>
                  <li class="places__option" tabindex="0">
                    Price: low to high
                  </li>
                </ul>
              </form>
              <div class="cities__places-list places__list tabs__content">
                <article class="cities__place-card place-card">
                  <div class="place-card__mark"><span>Premium</span></div>
                  <div class="cities__image-wrapper place-card__image-wrapper">
                    <a href="#">
                      <img
                        class="place-card__image"
                        src="img/apartment-01.jpg"
                        width="260"
                        height="200"
                        alt="Place image"
                      />
                    </a>
                  </div>
                  <div class="place-card__info">
                    <div class="place-card__price-wrapper">
                      <div class="place-card__price">
                        <b class="place-card__price-value">&euro;120</b>
                        <span class="place-card__price-text"
                          >&#47;&nbsp;night</span
                        >
                      </div>
                      <button
                        class="place-card__bookmark-button button"
                        type="button"
                      >
                        <span class="visually-hidden">To bookmarks</span>
                      </button>
                    </div>
                    <div class="place-card__rating rating">
                      <div class="place-card__stars rating__stars">
                        <span style="width: 80%"></span>
                        <span class="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 class="place-card__name">
                      <a href="#"
                        >Beautiful &amp; luxurious apartment at great
                        location</a
                      >
                    </h2>
                    <p class="place-card__type">Apartment</p>
                  </div>
                </article>
              </div>
            </section>
            <div class="cities__right-section">
              <section class="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  </body>
</html>
```

### Ключевые паттерны образца

| Паттерн                               | Пример из кода                                                                   | Зачем                                                                |
| ------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `visually-hidden` на `<h1>`/`<h2>`    | `<h1 class="visually-hidden">Cities</h1>`                                        | Даёт лендмарк и `<h*>` для скринридера/SEO без видимого заголовка    |
| `<article>` для карточки              | `<article class="cities__place-card place-card">`                                | Самодостаточный контент — корректная семантика вместо `<div>`        |
| `<nav>` + `<ul>/<li>` для навигации   | `<nav class="header__nav"><ul class="header__nav-list">`                         | Нативный лендмарк, список ссылок — правильная структура              |
| `<button type="button">` для действий | кнопка «To bookmarks»                                                            | Не `<div onClick>`, нативная интерактивность и клавиатура            |
| `width`/`height` на `<img>`           | `width="260" height="200"`                                                       | Браузер резервирует место → нет CLS                                  |
| BEM-модификатор для состояния         | `tabs__item--active`, `place-card__bookmark-button--active`                      | Состояние через CSS-класс, не inline-стиль                           |
| Миксование блоков                     | `class="cities__place-card place-card"`                                          | Один элемент = несколько BEM-блоков, каждый со своими стилями        |
| `<section>` только с заголовком       | `<section class="cities__places places"><h2 class="visually-hidden">Places</h2>` | `<section>` без заголовка → заменить на `<div>`                      |
| `tabindex="0"` для не-кнопок          | `<span class="places__sorting-type" tabindex="0">`                               | Только когда нативного элемента нет; в React предпочитать `<button>` |

## Ссылки

- MDN: Semantics — https://developer.mozilla.org/en-US/docs/Glossary/Semantics
- web.dev: Learn CSS / Responsive — https://web.dev/learn/css/ , https://web.dev/learn/design/
- web.dev: Core Web Vitals (CLS/LCP) — https://web.dev/articles/vitals
- schema.org — https://schema.org/Person , https://schema.org/BreadcrumbList
- WCAG 2.1 quick ref — https://www.w3.org/WAI/WCAG21/quickref/
