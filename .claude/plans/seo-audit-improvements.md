# SEO — аудит и план улучшений

Дата аудита: 2026-06-13  
Ветка: `fix/v1.1.1`

---

## Итог аудита

Базовая инфраструктура (Helmet, HelmetProvider, meta-теги на каждой странице) присутствует.
Но есть **критические ошибки** и целый ряд упущенных возможностей, которые снижают
индексацию и видимость сайта в поиске.

---

## Блок 1 — Критические ошибки

### 1.1 `lang="en"` захардкожен в `public/index.html`

**Файл:** `public/index.html`

```html
<html lang="en">
  <!-- ❌ сайт русскоязычный по умолчанию -->
</html>
```

`App.jsx` обновляет `document.documentElement.lang` через `useEffect`, но это
клиентский JS — поисковый краулер видит HTML-источник, где язык всегда `en`.
Все русские страницы индексируются как английские.

**Исправление:** `<html lang="ru">` в `index.html` (язык по умолчанию = русский).
`App.jsx` уже переключает атрибут динамически — этого достаточно для смены языка.

---

### 1.2 Два `<h1>` на главной странице

**Файлы:** `src/pages/HomePage.jsx` + `src/sections/hero/Hero.jsx`

`HomePage` рендерит скрытый `<h1>Главная страница</h1>`,
`Hero` рендерит видимый `<m.h1 className="hero__title">`.
На одной странице два `<h1>` — прямой сигнал дезориентации для Google.

**Исправление:** удалить скрытый `<h1>` из `HomePage.jsx`.
Hero-заголовок уже несёт семантическую роль главного заголовка.

---

### 1.3 Скрытые `<h1>` захардкожены на русском

**Файлы:** `src/pages/HomePage.jsx`, `src/pages/ProjectsPage.jsx`

```jsx
// HomePage
<h1 className="visually-hidden">Главная страница</h1>   // ❌ всегда RU

// ProjectsPage
<h1 className="visually-hidden">Страница проектов автора</h1>  // ❌ всегда RU
```

При переключении на английский язык `<h1>` остаётся русским.

**Исправление:** заменить на `{t('...')}` или удалить (см. п. 1.2).

---

### 1.4 Хардкодированный canonical — одинаковый для всех страниц

**Файл:** `public/index.html`

```html
<link rel="canonical" href="https://antoshkindev.ru/?lang=ru" />
```

Одна статичная ссылка `/?lang=ru` на каждой странице сайта.
Google видит About, Projects и 404 как дубли главной страницы на русском.

**Исправление:** убрать из `index.html`; добавить динамический canonical
через `<Helmet>` в каждом page-компоненте с правильным URL и `?lang=`.

---

### 1.5 `manifest.json` — CRA-заглушка

**Файл:** `public/manifest.json`

```json
"short_name": "React App",
"name": "Create React App Sample",
"theme_color": "#000000"
```

Это дефолтный шаблон Create React App — ни имени, ни темы.
Браузер показывает "React App" при добавлении на рабочий стол.

**Исправление:** заменить на реальные данные:

```json
{
  "short_name": "AntoshkinDev",
  "name": "Anton Zhilin — Frontend Developer Portfolio",
  "theme_color": "#0058A7",
  "background_color": "#ffffff"
}
```

---

### 1.6 Страница 404 — нет `noindex`, тексты-заглушки

**Файл:** `src/pages/pageNotFound/PageNotFound.jsx`

```jsx
<title>A Not Found Page</title>
<meta name="description" content="A page for rendering a not found page" />
```

- Заглушечные тексты, не локализованы
- Нет `<meta name="robots" content="noindex, follow" />` — Google индексирует 404

**Исправление:**

```jsx
<Helmet>
  <title>{t('pageNotFound.title')}</title>
  <meta name="robots" content="noindex, follow" />
</Helmet>
```

---

## Блок 2 — Слабые meta title / description

### 2.1 Title теги неинформативны и с ошибками

| Страница | Текущий (EN)                                         | Проблема                          |
| -------- | ---------------------------------------------------- | --------------------------------- |
| Home     | `A Home page of Anton Zhilin professional portfolio` | Начинается с «A Home page of»     |
| About    | `About Me Page`                                      | Полностью generic                 |
| Projects | `Page of the all projects`                           | Грамматическая ошибка — «the all» |

**Эталон:** `<Ключевые слова> — <Имя> — <Роль>` или `<Действие> — AntoshkinDev`.

Примеры исправлений (EN):

- Home: `Anton Zhilin — Frontend Developer Portfolio | React & Next.js`
- About: `About Anton Zhilin — Frontend Developer from Moscow`
- Projects: `Projects — Anton Zhilin Frontend Developer Portfolio`

### 2.2 Descriptions содержат канцелярит и ошибки

- `"A stunning list of the incredible projects of the frontend developer that call Anton Zhilin"` — «that call» грамматически неверно
- `"A Home page of the frontend developer portfolio about developing stunning apps"` — бессмысленный текст
- Ни один description не содержит CTA (Call to Action) или ключевых технологий

**Исправление:** переписать все descriptions по шаблону:
`<Ценность для пользователя>. <Ключевые технологии>. <CTA>.`

### 2.3 Keywords главной и проектов идентичны (EN)

Home и Projects используют один и тот же набор keywords.
Keywords — устаревший сигнал, но их содержание отражает качество SEO-работы.

---

## Блок 3 — Отсутствующие элементы

### 3.1 Open Graph теги — не добавлены нигде

Ни на одной странице нет `og:title`, `og:description`, `og:image`, `og:url`, `og:type`.
Шаринг в соцсетях (ВКонтакте, Telegram, LinkedIn) не показывает превью.

**Минимальный набор для каждой страницы:**

```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://antoshkindev.ru/og-cover.png" />
<meta property="og:url" content="https://antoshkindev.ru/" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="ru_RU" />
<!-- или en_US -->
```

Нужно создать OG-изображение 1200×630px (`public/og-cover.png`).

### 3.2 `hreflang` — не реализован

Сайт двуязычный (RU/EN через `?lang=`), но отсутствует разметка для поисковиков.
Google не знает о языковых вариантах и может дублировать индексирование.

**Добавить в `<Helmet>` каждой страницы:**

```html
<link rel="alternate" hreflang="ru" href="https://antoshkindev.ru/?lang=ru" />
<link rel="alternate" hreflang="en" href="https://antoshkindev.ru/?lang=en" />
<link rel="alternate" hreflang="x-default" href="https://antoshkindev.ru/" />
```

### 3.3 JSON-LD структурированные данные — отсутствуют

Нет ни одной схемы. Для личного портфолио критически важны:

- **`Person`** на главной — имя, профессия, контакты, соцсети
- **`BreadcrumbList`** на About и Projects
- **`WebSite`** на главной — название, URL, поисковая форма (если нужна)

Пример `Person` schema (добавить в `HomePage.jsx`):

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Anton Zhilin",
  "jobTitle": "Frontend Developer",
  "url": "https://antoshkindev.ru",
  "sameAs": ["https://github.com/ministrov", "..."]
}
```

### 3.4 `sitemap.xml` — отсутствует

Нет файла `public/sitemap.xml`. Google нет инструкции, какие страницы индексировать
и с какой частотой.

Минимальный sitemap (3 страницы + 2 языка = 6 URL):

```xml
<urlset>
  <url><loc>https://antoshkindev.ru/?lang=ru</loc></url>
  <url><loc>https://antoshkindev.ru/?lang=en</loc></url>
  <url><loc>https://antoshkindev.ru/about?lang=ru</loc></url>
  <!-- ... -->
</urlset>
```

Добавить `Sitemap: https://antoshkindev.ru/sitemap.xml` в `robots.txt`.

---

## Блок 4 — Мелкие неточности

| #   | Проблема                                                          | Файл                  |
| --- | ----------------------------------------------------------------- | --------------------- |
| 4.1 | `robots.txt` — пустой `Disallow:`, нет ссылки на sitemap          | `public/robots.txt`   |
| 4.2 | PageNotFound: `<h2>` вместо `<h1>` для заголовка страницы         | `PageNotFound.jsx:30` |
| 4.3 | `twitter:card` — отсутствует                                      | все page-компоненты   |
| 4.4 | `theme_color` в manifest (#000000) не совпадает с брендовым синим | `manifest.json`       |
| 4.5 | Keywords для Projects идентичны Home (EN)                         | `en.json`             |

---

## Приоритет реализации

| Приоритет      | Задача                                                  | Трудоёмкость |
| -------------- | ------------------------------------------------------- | ------------ |
| 🔴 Критический | 1.1 — исправить `lang` в `index.html`                   | 1 мин        |
| 🔴 Критический | 1.2 — убрать дублирующий `<h1>` из HomePage             | 2 мин        |
| 🔴 Критический | 1.4 — убрать статичный canonical, добавить динамический | 30 мин       |
| 🔴 Критический | 1.5 — исправить `manifest.json`                         | 5 мин        |
| 🔴 Критический | 1.6 — noindex на 404, исправить тексты                  | 10 мин       |
| 🟠 Высокий     | 2.1–2.3 — переписать title/description/keywords         | 1 ч          |
| 🟠 Высокий     | 3.1 — добавить Open Graph теги + OG-изображение         | 2 ч          |
| 🟠 Высокий     | 3.2 — добавить hreflang                                 | 30 мин       |
| 🟡 Средний     | 3.3 — JSON-LD Person + BreadcrumbList                   | 2 ч          |
| 🟡 Средний     | 3.4 — sitemap.xml + robots.txt                          | 30 мин       |
| 🟢 Низкий      | 4.x — мелкие неточности                                 | 30 мин       |

---

## Примечание по архитектуре языка

Текущий подход `?lang=en` (query-параметр) для языковых версий — не оптимален для SEO.
Google предпочитает субдиректории (`/en/`, `/ru/`) или поддомены.
Переход на субдиректории — крупный рефакторинг маршрутизации, выходит за рамки данного спринта.
Минимальная компенсация: корректные `hreflang` и canonical (пп. 1.4, 3.2).
