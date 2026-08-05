# Портфолио фронтенд-разработчика — Антон Жилин

Персональный сайт-портфолио (SPA) фронтенд-разработчика, построенный на **React 19** и **Vite 8**. Двуязычный интерфейс (русский по умолчанию, английский), плавные анимации, адаптивная вёрстка и SEO-оптимизация.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)
![i18next](https://img.shields.io/badge/i18n-RU%20%2F%20EN-26A69A?logo=i18next&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-12-0055FF?logo=framer&logoColor=white)

![Превью проекта](my-portfolio.png)

---

## 📑 Содержание

- [📈 Последние улучшения](#-последние-улучшения-v11)
- [✨ Возможности](#-возможности)
- [📄 Страницы и их функции](#-страницы-и-их-функции)
- [🧰 Технологический стек](#-технологический-стек)
- [🧩 Архитектура](#-архитектура)
- [🚀 Установка и запуск](#-установка-и-запуск)
- [💡 Примеры использования](#-примеры-использования)
- [❓ FAQ](#-faq)

---

## 📈 Последние улучшения (v1.1)

### Мобильная адаптация

- Hero-секция стала резиновой по высоте на мобильных (убран `min-height: 100dvh` ниже 768px)
- Единая система отступов для всех секций: `4rem` на ≤768px, `3rem` на ≤475px
- `border-radius: 16px` у всех контентных секций на мобильном
- Улучшена читаемость заголовка Hero на русском: пирамидальный перенос строк через `<Trans>` + `<br/>`
- Исправлены висячие слова в заголовках (неразрывный пробел ` `)

### Оптимизация бандла

- Исправлен tree-shaking Framer Motion (`LazyMotion + domAnimation` вместо полного `motion`)
- Удалены неиспользуемые зависимости (`react-type-animation`, `ajv`, `ajv-keywords`)
- Секции `Showcasing` и `Testimonials` переведены на `React.lazy` — Swiper (~93 KB) вынесен из main chunk
- **main.js: 174.96 KB → 144.57 KB** (gzip, −17%)

### Метрики Lighthouse (desktop)

| Метрика                  | Значение      |
| ------------------------ | ------------- |
| 🟢 Performance           | **98 / 100**  |
| 🟢 Accessibility         | **95 / 100**  |
| 🟢 Best Practices        | **100 / 100** |
| 🟢 SEO                   | **100 / 100** |
| First Contentful Paint   | **0.8 s**     |
| Largest Contentful Paint | **1.0 s**     |
| Total Blocking Time      | **20 ms**     |
| Cumulative Layout Shift  | **0**         |
| Speed Index              | **0.8 s**     |

---

## ✨ Возможности

- 🌐 **Двуязычность (i18n)** — переключение RU/EN на лету. Выбранный язык хранится в URL (`?lang=`) и `localStorage`, поэтому ссылку можно расшарить с нужным языком.
- 🎨 **Анимации** — переходы и эффекты на Motion, анимированный звёздный фон.
- 🗂 **Фильтрация проектов** — фильтры по технологиям (All / React / Next / JavaScript).
- 📱 **Адаптивность** — отдельные изображения проектов для desktop / tablet / mobile, резиновая вёрстка на мобильных.
- ⚡ **Производительность** — code-splitting страниц и тяжёлых секций через `React.lazy`, мемоизация компонентов, оптимизированный tree-shaking Motion.
- 🔍 **SEO** — нативные метаданные React 19 (`title`, `description`, `canonical`, `hreflang`, Open Graph), локализованные мета-теги, JSON-LD `Person`/`WebSite` статикой в `index.html`.
- ♿ **Доступность** — скрытые заголовки `h1`, `aria-label`, обработка `Escape` и блокировка прокрутки для модальных окон.
- 📨 **Форма связи** — модальное окно обратной связи и ссылки на соцсети (GitHub, Telegram, VK, MAX).

---

## 📄 Страницы и их функции

Приложение — одностраничное (SPA) с клиентской маршрутизацией. Все маршруты обёрнуты в общий `Layout` (Header → контент → кнопка «Наверх» → Footer).

| Маршрут     | Страница                     | Что отображает                                                                               |
| ----------- | ---------------------------- | -------------------------------------------------------------------------------------------- |
| `/`         | **Главная** (`HomePage`)     | Промо-блок, «Обо мне», витрина (Showcasing), услуги, преимущества, FAQ, контакты             |
| `/about`    | **Обо мне** (`AboutPage`)    | Хлебные крошки, фото и данные автора, навыки/возможности, опыт работы, образование, контакты |
| `/projects` | **Проекты** (`ProjectsPage`) | Список проектов с фильтрацией по технологиям и контактами                                    |
| `*`         | **404** (`PageNotFound`)     | Страница для несуществующих маршрутов                                                        |

Страницы `About`, `Projects` и `404` загружаются лениво (code-splitting); главная — сразу.

---

## 🧰 Технологический стек

| Категория     | Технология                                                |
| ------------- | --------------------------------------------------------- |
| Сборка        | Vite 8 (`@vitejs/plugin-react`)                           |
| UI            | React 19 (функциональные компоненты + хуки)               |
| Язык          | JavaScript (JSX), типизация через JSDoc                   |
| Маршрутизация | React Router DOM v7                                       |
| Состояние     | Context API (глобальное) + `useReducer` (фильтр проектов) |
| Локализация   | i18next 26 + react-i18next 17                             |
| Анимации      | Motion 12 (бывший Framer Motion)                          |
| Слайдеры      | Swiper 14                                                 |
| SEO           | Нативные метаданные React 19                              |
| Тесты         | Vitest + Testing Library                                  |
| Иконки        | React Icons                                               |
| Меню          | hamburger-react                                           |
| Стили         | Обычный CSS с БЭМ-неймингом                               |

---

## 🧩 Архитектура

```
src/
├── index.js              # Точка входа: StrictMode + HelmetProvider + инициализация i18n
├── App.jsx               # Роутер, провайдеры, ленивые страницы
├── pages/                # Страницы-маршруты (Home, About, Projects, 404)
├── sections/             # Крупные секции страниц (promo, about, projects, faq, ...)
├── components/           # Переиспользуемые компоненты (папка + ComponentName.jsx + style.css)
├── layouts/              # Каркас: Header, Footer, Layout
├── hooks/                # Кастомные хуки (useLanguage, useUrlParams, useProjectsFilter, ...)
├── context/              # LanguageProvider (контекст языка)
├── const/                # Константы и данные (маршруты, услуги, FAQ, навыки)
├── utils/i18n/           # Настройка i18next и словари locales/{en,ru}
├── assets/               # Изображения (.webp), шрифты, PDF
└── styles/               # Глобальные стили (main.css)
```

**Локализация — ключевая особенность.** Большая часть текста в коде — это **ключи перевода** (например, `projects.vamvoda.title`), а не готовые строки. Реальный текст лежит в `src/utils/i18n/locales/en/en.json` и `ru/ru.json` — чтобы изменить надпись, правьте словари (синхронно оба языка), а не компоненты.

**Переключение языка — двухуровневое:**

1. `context/LanguageProvider.jsx` хранит состояние `lang`, синхронизирует его с URL-параметром `?lang=` и сохраняет в `localStorage` (`preferredLang`).
2. Хук `hooks/useLanguage.jsx` читает контекст и вызывает `i18n.changeLanguage(lang)` — именно он переключает активный язык i18next.

**Фильтрация проектов** реализована редьюсером `sections/projects/projectsReduce.js` (экшен `SET_FILTER`) и хуком `useProjectsFilter`.

**Интеграции:** внешних API нет — это статический клиентский сайт. Связь — через модальную форму и ссылки на соцсети (`src/components/socials/socials.js`).

---

## 🚀 Установка и запуск

### Требования

- **Node.js** `^20.19.0 || >=22.12.0` и **npm** (требование Vite 8).
- Git.

### Шаги

```bash
# 1. Клонировать репозиторий
git clone <url-репозитория>
cd my-portfolio-react

# 2. Установить зависимости
npm install

# 3. Запустить в режиме разработки (http://localhost:3000)
npm start
```

### Доступные команды

| Команда            | Назначение                                      |
| ------------------ | ----------------------------------------------- |
| `npm start`        | Дев-сервер с HMR на `localhost:3000`            |
| `npm run build`    | Продакшен-сборка в каталог `build/`             |
| `npm run preview`  | Локальная раздача собранного билда              |
| `npm test`         | Тесты в watch-режиме (Vitest)                   |
| `npm run test:run` | Тесты одним прогоном                            |
| `npm run lint`     | Проверка ESLint по `src`                        |
| `npm run prod`     | Сборка и раздача статики через `serve -s build` |
| `npm run analyze`  | Анализ размера бандла (`source-map-explorer`)   |

---

## 💡 Примеры использования

### Для пользователей

- **Сменить язык** — кнопка переключения RU/EN в шапке. Язык запоминается; ссылку `сайт/projects?lang=en` можно отправить сразу на английском.
- **Посмотреть проекты** — раздел «Проекты», фильтры по технологиям (React / Next / JavaScript) сужают список.
- **Связаться** — кнопка обратной связи открывает модальное окно; в подвале есть ссылки на GitHub, Telegram, VK, MAX.

### Для разработчиков

Добавить новый переиспользуемый компонент (по конвенциям проекта — папка в camelCase, файл в PascalCase, стили рядом):

```jsx
// src/components/greetingMessage/GreetingMessage.jsx
import './style.css';

/**
 * Пример компонента-сообщения.
 * @component
 * @returns {JSX.Element}
 */
const GreetingMessage = () => {
  return <p className="greeting-message">Привет!</p>;
};

export default GreetingMessage;
```

Добавить перевод — в оба словаря синхронно:

> [!IMPORTANT]
> Ключи в `ru.json` и `en.json` должны совпадать. Если добавить ключ только в один словарь, второй язык покажет либо сам ключ, либо устаревший текст.

```jsonc
// src/utils/i18n/locales/ru/ru.json
{ "greeting": { "hello": "Привет" } }
// src/utils/i18n/locales/en/en.json
{ "greeting": { "hello": "Hello" } }
```

```jsx
import { useTranslation } from 'react-i18next';

const Hello = () => {
  const { t } = useTranslation();
  return <span>{t('greeting.hello')}</span>;
};
```

---

## ❓ FAQ

**На каком языке открывается сайт по умолчанию?**
На русском. Язык можно переключить кнопкой; выбор сохраняется в `localStorage` и URL.

**Где менять тексты?**
В словарях `src/utils/i18n/locales/ru/ru.json` и `.../en/en.json` — компоненты используют ключи, а не сами строки. Меняйте оба файла, чтобы языки не разошлись.

**Как добавить новый проект в портфолио?**
Добавьте запись в `src/sections/projects/projects.js` (изображения — в `src/assets/projects/`, тексты — ключами в словари) и при необходимости новый фильтр в массив `filters` в `src/const/index.js`.

**Используется ли TypeScript / Redux?**
Нет. Проект на чистом JavaScript (типизация через JSDoc), глобальное состояние — Context API. Их добавление не планируется без согласования.

**Есть ли бэкенд или база данных?**
Нет. Это статический клиентский сайт без серверной части и внешних API.

**Как задеплоить?**
Соберите проект (`npm run build`) и разместите содержимое каталога `build/` на любом статическом хостинге (Netlify, Vercel, GitHub Pages, Nginx и т.п.). Локально проверить продакшен-сборку — `npm run prod`.

**Каким стандартам следуют коммиты?**
Conventional Commits (`type(scope): описание`). Подробности — в `CLAUDE.md`.
