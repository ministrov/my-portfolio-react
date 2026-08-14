# Аудит главной страницы

**Дата:** 2026-08-14
**Команда:** `/impeccable audit` (веб, все 8 секций главной)
**Ветка:** `feature/home-motion`
**Метод:** механический детектор (`detect.mjs`, 63 файла, homepage-scope) + ручная проверка в браузере (сборка, Playwright: desktop 1440px, mobile 390px, вычисленные стили, контраст по формуле WCAG)

---

## Implementation Integrity Verdict — PASS (с оговоркой)

Продукт выражает связную, узнаваемую систему: кобальт = действие, фиолетовый = акцент заголовка, «консольная» подпись (мигающий каретка, IDE-карточка, расшифровка текста) держится ровно в задокументированных местах, нигде не расползается. Концептуально — не шаблон.

Но: **63 совпадения** детектора, все — дрейф значений (font-size/color/radius) от типографической шкалы/палитры DESIGN.md, разбросаны по ~30 файлам всех секций главной. Это не концептуальный разнобой, а числовой: DESIGN.md явно генерировался позже большей части этого кода и не был потом протянут по всем файлам.

## Health Score

| #         | Критерий                 | Балл      | Ключевая находка                                                |
| --------- | ------------------------ | --------- | --------------------------------------------------------------- |
| 1         | Accessibility            | 3/4       | У Testimonials нет ручной паузы автоплея — WCAG 2.2.2 (Level A) |
| 2         | Performance              | 3/4       | `waterdel-mobile.webp` — 491 КБ для мобильного варианта         |
| 3         | Responsive               | 3/4       | `.toggle-btn` (RU/EN) — 34px высотой, ниже ориентира 44px       |
| 4         | Theming                  | 3/4       | 12 незадокументированных цветов вне палитры DESIGN.md           |
| 5         | Implementation Integrity | 2/4       | 63 advisory-находки дрейфа токенов по 30 файлам                 |
| **Итого** |                          | **14/20** | **Good — есть что подтянуть**                                   |

## Находки по приоритету

### [P1] Testimonials: автоплей нельзя остановить с клавиатуры/тача

- **Категория:** Accessibility
- **Локация:** `src/sections/testimonials/Testimonials.jsx`
- **WCAG:** 2.2.2 Pause, Stop, Hide (Level A)
- **Как проверено:** в браузере, DOM-запрос внутри `.testimonials` — **ноль** кнопок.
- **Impact:** `pauseOnMouseEnter: true` останавливает автоплей только для мыши. Клавиатурные и тач-пользователи не могут остановить движение вообще.
- **Контекст:** ровно эту же проблему уже решили в Showcasing — там есть `.carousel__toggle` (`src/components/carousel/Carousel.jsx`) с комментарием «единственный способ для клавиатурных и тач-пользователей остановить движение — требование WCAG 2.2.2». В Testimonials починка не долетела.
- **Рекомендация:** добавить в `Testimonials.jsx` кнопку паузы/воспроизведения по образцу `Carousel.jsx`.
- **Команда:** `/impeccable polish testimonials`

### [P2] Растянутые мобильные/планшетные варианты изображений

- **Категория:** Performance
- **Локация:** `build/assets/waterdel-mobile-*.webp`, `mish-tablet-*.webp`, `vam-voda-tablet-*.webp` (источники — `src/sections/projects/projects.js`)
- **Как проверено:** `ls -la build/assets/*.webp`, отсортировано по размеру.
- **Данные:**
  - `waterdel-mobile.webp` — 491 КБ (для сравнения `vam-voda-mobile.webp` — 136 КБ при той же роли)
  - `mish-tablet.webp` — 309 КБ
  - `vam-voda-tablet.webp` — 286 КБ
- **Impact:** все три реально отдаются на главной — Showcasing показывает только `isBest: true` проекты (waterdel и mish входят в их число), то есть это не мёртвый вес, а то, что реально грузит мобильный трафик.
- **Рекомендация:** пересжать/переэкспортировать эти три варианта.
- **Команда:** `/impeccable optimize showcasing`

### [P2] Кольцо фокуса `--color-blue-300` не проходит контраст 3:1

- **Категория:** Accessibility
- **Локация:** `src/components/socials/style.css` (`.socials__link--blue:focus-visible`), `src/components/Up/style.css` (`.scroll-to:focus-visible`), `src/components/ctaButton/style.css` (`.cta-button--pill:focus-visible`), `src/components/logo/style.css` (`.logo__link:focus-visible`)
- **WCAG:** 1.4.11 Non-text Contrast (AA), порог 3:1
- **Как проверено:** формула контраста WCAG, `#60a5fa` (--color-blue-300) на `#ffffff` = **2.54:1**.
- **Контекст:** это исходный выбор кодовой базы (был в `cta-button--pill`, `Logo` до текущей сессии). В этой же сессии тем же цветом дополнительно починили `.socials__link--blue` и `.scroll-to` (заменяя невидимое белое кольцо на видимое, но недостаточно контрастное) — итого сейчас 4 компонента с одним и тем же пограничным кольцом.
- **Рекомендация:** заменить `--color-blue-300` на более тёмный оттенок кобальта либо добавить контрастную обводку/halo для колец на светлом фоне.
- **Команда:** `/impeccable polish`

### [P3] 63 advisory-находки дрейфа design-system

- **Категория:** Implementation Integrity
- **Локация:** ~30 файлов по всем секциям главной (детектор: `font-size` — 42, `color` — 12, `radius` — 9)
- **Как проверено:** `node detect.mjs --json <homepage files>` → 63 anti-patterns, все `severity: advisory`.
- **Impact:** DESIGN.md документирует типографическую шкалу/палитру/радиусы, которым код не следует буквально. Часть значений повторяется в нескольких файлах (например, `12px` radius, `32px` font-size) — кандидаты не на подгонку под существующую шкалу, а на новый документированный токен.
- **Команда:** `/impeccable extract`

### [P3] Hover-подъём `.socials__link` без `prefers-reduced-motion`

- **Категория:** Accessibility
- **Локация:** `src/components/socials/style.css`
- **Как проверено:** `grep` на `transition`/`prefers-reduced-motion` в файле — 3 transition-объявления, 0 guard'ов.
- **Impact:** `transform: translateY(-2px) scale(1.02)` на hover — реальное движение без возможности отключить через системную настройку, в отличие от почти всех остальных анимированных компонентов сайта (DESIGN.md заявляет 100%-е покрытие — здесь фактически нет).
- **Команда:** `/impeccable polish`

## Паттерны и системные проблемы

- **Кольцо фокуса светлым кобальтом на белом** — не единичная ошибка, а повторяемый (уже 4 раза) выбор цвета ниже порога контраста.
- **Дрейф токенов** — не 2-3 файла, а системная черта почти всех секций главной; DESIGN.md документирует шкалу, которой код не придерживается буквально.

## Положительные находки (сохранить как есть)

- Контраст текста — проверен для `gray-500`/`gray-800`/`blue-700`/`violet-500` на белом: все ≥4.89:1, с запасом выше AA.
- Форма Contact — образцовая: `aria-required`, `aria-invalid`, `aria-describedby` → `role="alert"`, звёздочка обязательности скрыта от AT (`aria-hidden`), чтобы не дублировать объявление.
- Иерархия заголовков — один H1, чистые H2/H3 без пропусков уровней; decorative-иконки соцсетей с пустым `alt` корректно прикрыты `aria-label` на самой ссылке.
- `useAutoplayProgress` пишет прогресс-бар напрямую в CSS-переменную через ref, минуя re-render React — без layout thrashing.
- `will-change` — ровно одно применение (звёздный фон `AnimatedBackground`), не разбросано по проекту.
- Lazy-загрузка секций (Showcasing, Testimonials через `React.lazy`) и картинок (`loading="lazy"`), `<picture>` с WebP+JPEG fallback — уже сделано.

## Рекомендуемые действия (по приоритету)

1. **[P1]** `/impeccable polish testimonials` — вернуть ручную паузу автоплея
2. **[P2]** `/impeccable optimize showcasing` — сжать переразмеренные mobile/tablet-варианты изображений
3. **[P2]** `/impeccable polish` — заменить `--color-blue-300` на кольцо фокуса ≥3:1 в 4 местах
4. **[P3]** `/impeccable extract` — вынести повторяющиеся значения в токены DESIGN.md
5. **[P3]** `/impeccable polish` — reduced-motion guard для hover-подъёма соцссылок

Перезапустить `/impeccable audit` после фиксов — сравнить рост счёта.
