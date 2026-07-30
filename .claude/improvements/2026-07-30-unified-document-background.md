# Единый фон документа вместо фонов секций/футера

Дата: 2026-07-30

## Цель

Убрать индивидуальные `background-color` у секций и `background: var(--gradient)` у футера.
Сделать единый фон всего документа — сетка + радиальные пятна + звёзды
(`AnimatedBackground`) — как сейчас реализовано только внутри `.hero`.

## Текущее состояние (аудит)

- Составной фон (сетка + 2 радиальных пятна) существует только как `.hero::before`/`::after`,
  виден только на Home и только в границах `.hero`.
- `AnimatedBackground` (`position: fixed; z-index: -1`) технически уже растянут на весь
  вьюпорт, но подключается **трижды отдельно** — в `HomePage.jsx`, `AboutPage.jsx`,
  `ProjectsPage.jsx`.
- Секции со сплошной заливкой на корне: `about`, `advantages`, `services`, `faq`, `contact`,
  `testimonials` (`--color-gray-600` или `--color-violet-50`). `showcasing` и `projects` фона
  на корне не имеют — не трогаем.
- Футер: `background: var(--gradient)`, весь текст/бордеры рассчитаны на тёмный фон
  (`color: var(--color-white)`, `border-top: 1px solid rgba(255,255,255,.12)`,
  `rgba(255,255,255,.75)` у copyright).
- Внутренние карточки: `about__stat`, `contact__info`/`contact__form-wrap`, `faq__item`,
  `testimonial-card` уже имеют собственный `background: var(--color-white)` — не пострадают.
  `services__item` и `advantages__item` **фона не имеют** — держатся только на цвете секции.

## Зафиксированные решения

1. **Футер** — убрать градиент, перекрасить текст/бордеры в тёмные (`--color-gray-900` и т.п.).
2. **Границы секций** — не добавлять разделители, единый бесшовный фон по всей странице.
3. **Карточки Services/Advantages** — оставить прозрачными (текст прямо на атмосфере, как в
   Hero), фон карточкам не добавляем.

## Этапы

### 8a — Глобальный фоновый слой (сетка + пятна) на уровне документа

**Файлы:** `src/styles/main.css`, `src/sections/hero/style.css`
Перенести `repeating-linear-gradient` (сетка) и 2 `radial-gradient` (пятна) из
`.hero::before`/`.hero::after` в новый `body::before` (один комбинированный `background-image`
список, `position: fixed`, `z-index: -1`). Убрать `.hero::before`/`.hero::after` из
`hero/style.css` (у `.hero` остаются `position: relative; overflow: hidden;` — нужны для
`.hero__bloom`).

### 8b — Один инстанс AnimatedBackground на всё приложение

**Файлы:** `src/layouts/Layout.jsx`, `src/pages/HomePage.jsx`, `src/pages/AboutPage.jsx`,
`src/pages/ProjectsPage.jsx`, `src/components/animatedBackground/styles.css`
Убрать `<AnimatedBackground />` из трёх страниц, подключить один раз в `Layout.jsx`. Сместить
`z-index` фона звёзд с `-1` на `-2`, чтобы звёзды были дальше сетки/пятен (`z-index: -1`).

### 8c — Убрать сплошные фоны секций

**Файлы:** `about/style.css`, `advantages/style.css`, `services/style.css`, `faq/style.css`,
`contact/style.css`, `testimonials/style.css`
Убрать `background-color` на корневом классе каждой секции.

### 8d — Футер в светлой палитре

**Файл:** `src/layouts/footer/style.css`
Убрать `background: var(--gradient)`. `color: var(--color-white)` → `var(--color-gray-900)`,
`border-top: 1px solid rgba(255,255,255,.12)` → тёмный аналог,
`.main-footer__copyright { color: rgba(255,255,255,.75) }` → `var(--color-gray-500)`.
Проверить `Logo variant="white"` в футере — переключить на вариант без `white` (или на
`monochrome`), т.к. `--color-white` перестанет читаться на светлом фоне.

### 8e — Верификация

Скриншоты Home/About/Projects на 1920/768/475, ru/en, проверка контраста текста секций
(особенно faq — синий текст, services/advantages — прозрачные карточки), проверка что
`AnimatedBackground` по-прежнему отключается на ≤375px, `npx eslint src`.

## Коммиты

Как и раньше — отдельный коммит на каждый под-этап (a–d), Conventional Commits, английский текст,
без `Co-Authored-By`, только локально.
