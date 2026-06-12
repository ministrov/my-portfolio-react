# Прогресс рефакторинга компонентов

Дата последней сессии: **2026-06-12**
Ветка: `feature/production-tweaks`

**Фаза 1 (`src/components/`) — завершена.** Прошли по всем компонентам по алфавиту, по одному за раз: код-ревью на безопасность / качество кода / общие принципы → исправление всех замечаний → коммит.

**Фаза 2 (`src/sections/`) — завершена.** Прошли по всем секциям (та же методика, плюс при необходимости — дизайн-правки в рамках существующей дизайн-системы). Очередь секций закрыта (`cc7ce40`).

---

### Сделано в этой сессии (2026-06-12)

**Верификация 352px + рефактор `ShowcasingCard`:**

- **Скилл `frontend-architect`** (`4ebca56`) — добавлена секция «Эталон разметки»: аннотированный HTML-пример из «6 cities» (BEM, семантика, ключевые паттерны). SVG-спрайт помечен как устаревший для React.
- **Фикс showcasing при 352px** (`2fac7e4`) — `height: 100%; object-fit: cover; object-position: top` на `.showcasing-card__image` при `≤968px`: изображение заполняет контейнер без пустой полосы снизу.
- **Рефактор `ShowcasingCard`** (`30b58aa`) — удалён лишний `div.showcasing-card__aspect-ratio`; `className` перенесён на `<picture>`; `aspect-ratio: 16/9 + object-fit: cover` применены напрямую на `<img>`; при `≤767px` — `aspect-ratio: 3/4` (portrait, ~427px при 320px ширине); убраны все мёртвые `min-height`-оверрайды.
- **Унификация border-radius** (`dacc040`) — хардкод `border-top-left/right-radius: 17px` заменён на `border-radius: var(--border-radius-s)` во всех состояниях.
- **Верификация About при 352px** — проверены три скрина: AuthorIdentity-карточка, буквица, статистика (2×2), tech-теги, ссылка. Всё в норме, правок не потребовалось.
- **Финальный прогон:**
  - `npx eslint src` — 0 ошибок, 0 предупреждений ✅
  - `npm run build` — Compiled successfully, main JS 173.87 kB gzip ✅
  - `npm run analyze` — source-map-explorer выдаёт «column Infinity» (баг совместимости с CRA, не наш код)
  - Lighthouse (localhost:3001): Performance **52** (localhost-penalty, на реальном деплое выше), Accessibility **99**, Best Practices **100**, SEO **100** ✅

> ⚠️ Console.log в `contactApi.js` и `useContactForm.js` — оставлены намеренно (пользователь использует для обучения).
>
> 🔍 Lighthouse Performance (52) замерен на localhost. Для объективного результата прогнать на реальном деплое.

---

### Сделано в этой сессии (2026-06-11)

**Mobile polish — производственные правки перед релизом:**

- **`CopyEmail` компонент** (`c9c5fd5`) — новый компонент `src/components/copyEmail/` (JSX + CSS): заменяет `mailto:` на copy-to-clipboard кнопку с иконкой из `react-icons/md`, aria-live-аннонсом и 2-секундным сбросом. Хук `src/hooks/useCopyToClipboard.jsx` с `isMounted`-guard.
- **Фикс `Up` hover/focus** (`d82e208`) — убраны мёртвые `transform` из transition/hover/active; hover обёрнут в `@media (hover: hover)`; `:focus` → `:focus-visible`; убран touch-undo хак.
- **Фикс белого флэша `Up`** (`7098ba4`) — добавлены недостающие CSS-токены `--color-blue-800: #004889` и `--color-blue-900: #00386b` в `:root`; без них `background-color` давал `transparent` при клике.
- **Флюидный `.container`** (`e84bc9a`) — `padding-inline: clamp(16px, 4vw, 32px)` + `box-sizing: border-box`; удалён дублирующий `@media (max-width: 768px)` блок.
- **`scrollbar-gutter: stable both-edges`** (`37ec21d`) — резервирует равный жёлоб слева и справа, устраняет асимметрию «ушей» контейнера от вертикального скроллбара.
- **Фикс горизонтального скролла на ~772px** (`77a658c`) — `authorIdentity__img` уменьшен до `120×120px` при `≤1104px`; жёсткий `260px` в flex-строке давал выход за вьюпорт.
- **Мобильный `advantages`** (`d2ac300`) — `min-width: 0` + `overflow-wrap: break-word` на `.advantages__item`; одна колонка перенесена с `≤475px` на `≤768px`; шрифт карточек унифицирован до `1.125rem`; `min-height: auto` при ≤768px.
- **Равная высота testimonial-карточек** (`812922d`, `b2113e9`) — `.testimonials__slide` → `display: flex`; `.testimonial-card` — `width: 100%` вместо `height: 100%` (percent-height circular resolve → clip).
- **Флюидный padding FAQ + мягкая анимация** (`7bd8cfe`) — `padding-block/inline: clamp(...)` в `.faq__question`; `itemVariants.y` смягчён (`y: 24`), easing `[0.25, 0.1, 0.25, 1]`; `staggerChildren` `0.32`→`0.12`.
- **Фикс фантомного скролла `ProjectsList`** (`4d81ecb`) — убраны `x: ±100vw` в `itemVariants`; заменены на `y: 32` fade-in, тот же easing.
- **`aboutStory` мобайл** (`241b096`) — `≤768px`: убраны `padding/background/border/border-radius` с `.about-story__card`, `padding-inline: 0` на `.about-story__para`, `display: none` на `::before`; текст «распущен» по контейнеру.
- **i18n** — добавлены ключи `contactForm.info.copy` / `contactForm.info.copied` в `en.json` + `ru.json`.
- **Скилл `frontend-architect`** (`c26ac09`, `e84bc9a`) — `.claude/skills/frontend-architect/SKILL.md`: архитекторский скилл по семантике, адаптиву (desktop-first), SEO, a11y, CLS/performance.
- **План** `mobile-section-polish.md` (`eb80cf3`) — план проверки мобильного 352px прохода.

> ⚠️ Перед релизом (из сессии 2026-06-10): убрать `console.log` из `contactApi.js` и `useContactForm.js`.
>
> 🔍 Ещё не проверено: showcasing-карточки при 352px; gap-ритм секции About при 352px.

---

## ⏹️ Где остановились сегодня

✅ **Фаза 1 (`src/components/`) пройдена полностью** — все компоненты прошли код-ревью и закоммичены (очередь закрыта коммитом `630dc5e`).

✅ **Фаза 2 (`src/sections/`) пройдена полностью** — все 8 секций (`promo`, `about`, `advantages`, `contact`, `faq`, `projects`, `services`, `showcasing`) прошли ревью и закоммичены.

Последний заход (2026-06-08) — **hero** и **footer** (мелкие правки вне основных фаз):

- `d6c1fa3` `refactor(footer)` — убран мёртвый `color="white"` у `Logo` (при заданном `variant` проп игнорируется).
- `ec60824` `style(hero)` — рефакторинг фоновых слоёв: сетка вынесена в `::before` (`opacity: 0.06`), заменён одиночный центральный blur двумя угловыми `radial-gradient` через `::after`; `z-index`-стекирование на `hero__inner`.

Ранее (2026-06-05) — секции **`contact`, `faq`, `projects`, `services`, `showcasing`**:

- `9cf15f9` `refactor(contact)` — убран избыточный `aria-label` кнопки (дублировал видимый текст); `MODAL_AUTO_CLOSE_DELAY` вынесена в модуль; ужат WHAT-JSDoc на хендлерах.
- `c2c5b2e` `refactor(faq)` — убран мёртвый `className="heading-sec__main--second"` (нет такого правила в CSS); `aria-labelledby`/`id` оставлены как корректные.
- `67c835e` `refactor(projects)` — фильтр локализован: `value` (матчинг) отделён от `label` (i18n-ключ), `'All'` теперь переводится; починен мёртвый/асимметричный namespace `filters` (транслит `Реакт/Некст/Скрипт`→`React/Next/JavaScript`, добавлен блок в `en.json`); `aria-label` списка → `t('filters.ariaLabel')`; reducer не тронут (`value` байт-в-байт); мелочи (JSDoc `state.filter`→`state.activeFilter`, `BREADCRUMBS`→camelCase).
- `e6ccda1` `refactor(services)` — убран дубль-`h2` (хардкод-EN `visually-hidden`), секция именуется через `aria-labelledby` на `Heading`; убран мёртвый `services__title`; PropTypes в `ServicesList`.
- `cc7ce40` `refactor(showcasing)` — убран мёртвый `className="showcasing__carousel"` (`Carousel` его не принимает + нет CSS); секция именуется через `aria-labelledby`.

Ранее в тот же день (2026-06-05) — секция **`advantages/`**:

- `d177967` `refactor(advantages)` — локализован `alt` изображений через ключи `advantages.alt.*` (`t(alt)` в `Advantages`); добавлен namespace `advantages.alt` в ru/en; исправлена опечатка ключа `hightlight`→`highlight` в `Trans` и обеих локалях; карточки анимированы Framer Motion (fade-in + `y`, stagger по `index`, обёртка `LazyMotion`/`domAnimation`, `viewport once`); `ICON_SIZE` вынесен в модуль; чистка `Advantages` (инлайн `t()`, деструктуризация в `.map`).

> ⚠️ Секция `advantages` доведена как **refactor** (читаемость + i18n `alt` + опечатка + анимация), а не как полный проход методики Фазы 1. PropTypes не добавлялись (компоненты секции на JSDoc); полноценный a11y-аудит не проводился. При следующем заходе по секции — прогнать остаток методики (a11y / PropTypes / мёртвый код).

Тогда же (2026-06-05, до advantages) — секция **`about/`**:

- `ae79c95` `refactor(about)` — карточка автора вынесена в отдельный компонент `src/components/authorIdentity/` (JSX + `style.css`); БЭМ-блок `about__*`→`author-identity__*`; удалены мёртвые селекторы `about__id-photo/__image`; убраны неиспользуемые импорты `BsGeoAlt`/фото.
- `dcee3d3` `refactor(about)` — общие константы анимации `EASE`/`VIEWPORT` (дедуп повторяющихся значений); нормализован условный рендеринг; инлайн одноразовых `t()`-лукапов; `promoBtnText`→camelCase (пропсы/классы/i18n-ключи сохранены).

> ⚠️ Секция `about` доведена как **refactor** (выделение `AuthorIdentity` + дедуп анимации), а не как полный проход методики Фазы 1. Полноценный a11y/PropTypes-аудит не проводился — прогнать остаток при следующем заходе.

Ранее (2026-06-04) — секция **`promo/`**:

- `67b2938` `refactor(promo)` — единый центрированный текстовый блок: убраны аватар (`promo__image` + импорты `avatar*`) и `SocialList`; снят layout-div `promo__wrapper`; flex-центрирование в `78vh`; флюидная типографика через `clamp()`; `prefers-reduced-motion`; чистка мёртвого CSS (`.promo__image/__avatar/__socials`) и пер-брейкпойнтовых переопределений шрифта; обновлён JSDoc.
- `122dd3f` `style(sections)` — единый вертикальный ритм и `78vh` для коротких секций (затронуты `about`, `advantages`, `contact`, `projects`, `services`, `showcasing`).
- `d63e673` `fix(promo)` — правка line-height и вертикальных отступов.
- `4767836` `fix(projectCard)` — правка значения атрибута height.

> ⚠️ Промо-секция доведена как дизайн-правка (новый одноколоночный hero), а не как обычный a11y/i18n-проход Фазы 1. Остальные секции при ревью прогонять по полной методике (a11y / i18n / PropTypes / мёртвый код), а не только косметику.

## ▶️ С чего продолжить дальше

> Задачи из TODO закрыты. Следующие шаги — по согласованию.

### Открытые задачи перед релизом

- ~~🔍 Showcasing-карточки при 352px~~ ✅ Закрыто `2fac7e4`, `30b58aa`, `dacc040`
- ~~🔍 Gap-ритм секции About при 352px~~ ✅ Верифицировано — норма, правок не потребовалось
- ~~🚀 Финальный прогон~~ ✅ ESLint чист, билд собран, Lighthouse (localhost) 52/99/100/100
- 🧹 Убрать `console.log` из `src/api/contactApi.js` и `src/hooks/useContactForm.js` — оставлены намеренно до завершения обучения async/await.
- 🔍 Lighthouse Performance на реальном деплое — localhost даёт занижение из-за отсутствия CDN/cache headers.

### Сделано в этой сессии (2026-06-10)

- **Редизайн секции Contact**: двухколоночный layout — карточка с контактными деталями (email, локация, часы, SocialList) слева + форма справа; кнопка «4 шага» → вторичный CTA «Как происходит заказ?» (`bffe206`–`ec9176c`). План: `.claude/plans/contact-form.md`.
  - Новый компонент `ContactForm` (`src/components/contactForm/`): 4 поля, клиентская валидация без библиотек, состояния idle→submitting→success|error, отправка через Web3Forms (`fetch`, без npm), Framer Motion на success-блок и inline-ошибки.
  - Фикс: `box-sizing: border-box` на инпутах (нет глобального сброса в проекте).
  - Форма проверена в браузере — письма реально приходят на `ministrov2018@gmail.com`. Ключ в `.env.local` (`.env.local.example` добавлен в репо).
- **Декомпозиция ContactForm** (`ea26c83`–`a59f2b0`): выделены API-слой (`src/api/contactApi.js`) и хук (`useContactForm.js`); `ContactForm.jsx` — чистый JSX. Добавлены подробные комментарии по async/await и `console.log` на каждом этапе запроса для обучения.
- Мелкие фиксы: плейсхолдер поля «Ваше имя» (`f68714d`).

> ⚠️ Перед релизом: убрать `console.log` из `contactApi.js` и `useContactForm.js`.

### Сделано в предыдущей сессии (2026-06-09)

- **Унификация заголовков страницы «Обо мне»**: i18n-разбивка `heading.capabilities/experience/education` на `name`+`accent` (`b480c5c`); три компонента переведены на `variant="display"` — `AboutCapabilities` (`bf7aba6`), `AboutExperience` (`253212c`), `AboutEducation` (`4c91bee`).
- **Типографика страницы «Обо мне»**: карточный стиль (белый фон, border, radius 16px, левая синяя полоска) и story-типографика (clamp, `line-height: 1.75`, `gray-800`) для `aboutCapabilities` (`8c28b5c`), `aboutExperience` (`b273769`), `aboutEducation` (`4b8882d`); `aboutEducation` получил двухколоночный grid (раньше его не было); удалён мёртвый `.about-experience--dark`. План: `.claude/plans/about-page-typography.md`.
- **Бенто-сетка Advantages**: 4-колоночный CSS grid с nth-child span'ами; добавлены 2 новые карточки (pixel-perfect responsive + WCAG 2.1, иконки react-icons); `AdvantagesItem` поддерживает img-src и react-icon компонент; текст прижат к низу (`margin-top: auto`) во всех карточках; крупный шрифт `52px/57px` на больших карточках (`5282f6f`–`cf88a4f`).
- **FAQ редизайн**: цветной фон секции (gray-600, border-radius), белые карточки с декоративным номером `01/02...` (CSS-счётчик), `div[role=button]` → семантический `<button>`, левая синяя полоска на открытом item, AnimatePresence вместо сломанного `display:none` (плавная анимация высоты), крупная типографика вопроса `22px` / паддинг `2.5rem 2rem` (`226e92e`–`dba3a51`). План: `.claude/plans/faq-redesign.md`.

### Сделано в предыдущей сессии (2026-06-08, production-tweaks вне фаз 1/2)

- **Hero**: фон переработан в слои — сетка `::before` (`opacity 0.06`) + угловые блики `::after` (`ec60824`); убран мёртвый `color` у `Logo` в `Footer` (`d6c1fa3`).
- **Новая секция Testimonials** (отзывы клиентов): моки + i18n (`45e800e`), `TestimonialCard` (`595e7cf`), секция со Swiper + лого-полоса react-icons (`20b973f`), монтаж между Advantages и Faq (`4d1d346`); правки слайдера full-bleed/равная высота/плавность, убрана пагинация (`bdd2da0`); тексты разной длины (`7a49893`). План: `.claude/plans/testimonials-section.md`.
- **Унификация заголовков секций** под крупный двухтоновый стиль: `Heading` получил `variant="display"` + `accent` (`c777e82`); i18n `accent`-ключи (`d5e2a66`); конвертированы 6 секций главной (`2371b58`), Testimonials на общий `Heading` (`7671b11`), страница Projects (`6db3958`). Hero и 3 подзаголовка About — **не тронуты** (см. TODO выше). План: `.claude/plans/unify-section-headings.md`.

Обе фазы пройдены: компоненты (`src/components/`) и секции (`src/sections/`). Остались только **отложенные нетривиальные пункты** (по согласованию) — слои `layouts/` и структурные правки, не привязанные к одной секции.

> 🧹 Накопленные мелочи (по согласованию, при ревью соответствующих слоёв):
>
> - ~~`layouts/footer/Footer.jsx`: `<Logo variant="white" color="white" />` — проп `color` мёртв.~~ ✅ Закрыто `d6c1fa3`
> - `components/modal/Modal.jsx`: полноценная **ловушка фокуса** (циклирование Tab/Shift+Tab внутри окна) не реализована — сделан только перенос фокуса в окно и возврат на триггер. Добавить focus-trap отдельной задачей (по согласованию — это нетривиальная логика).
> - `Heading`: `slogan` рендерится **внутри** тега заголовка (`<h2><span>title</span><span>slogan</span></h2>`), из-за чего слоган попадает в доступное имя заголовка. Нит a11y, но фикс — структурное изменение по всем секциям, поэтому вне scope компонента.
>
> ✅ Закрыто ранее: мёртвый `className="showcasing__carousel"` (`cc7ce40`); локализация фильтра `'All'` (`67c835e`); мёртвый `color` у `Logo` в `Footer` (`d6c1fa3`).

---

## ✅ Фаза 2 — секции (`src/sections/`)

| Секция     | Коммит(ы)            | Суть                                                                                                                                                                                                                                                                                         |
| ---------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| about      | `ae79c95`, `dcee3d3` | карточка автора вынесена в `src/components/authorIdentity/` (БЭМ `about__*`→`author-identity__*`, чистка мёртвых селекторов и импортов); общие константы анимации `EASE`/`VIEWPORT` (дедуп); нормализация условного рендеринга; инлайн `t()`; `promoBtnText`→camelCase                       |
| advantages | `d177967`            | локализован `alt` через ключи `advantages.alt.*` (`t(alt)`); namespace `advantages.alt` в ru/en; фикс опечатки ключа `hightlight`→`highlight` (`Trans` + локали); Framer Motion fade-in + stagger (`LazyMotion`); `ICON_SIZE` в модуль; чистка `Advantages` (инлайн `t()`, деструктуризация) |
| contact    | `9cf15f9`            | убран избыточный `aria-label` кнопки (дублировал видимый текст); `MODAL_AUTO_CLOSE_DELAY` в модуль; ужат WHAT-JSDoc                                                                                                                                                                          |
| faq        | `c2c5b2e`            | убран мёртвый `className="heading-sec__main--second"` (нет правила в CSS); `aria-labelledby`/`id` оставлены                                                                                                                                                                                  |
| projects   | `67c835e`            | локализация фильтров: `value` (матчинг) отделён от `label` (i18n-ключ), `'All'` переводится; починен мёртвый namespace `filters` (`Реакт/Некст/Скрипт`→`React/Next/JavaScript`, добавлен блок в en); `aria-label` списка → `t()`; reducer не тронут; JSDoc/именование                        |
| services   | `e6ccda1`            | убран дубль-`h2` (хардкод-EN `visually-hidden`) → `aria-labelledby` на `Heading`; мёртвый `services__title`; PropTypes в `ServicesList`                                                                                                                                                      |
| showcasing | `cc7ce40`            | убран мёртвый `className="showcasing__carousel"` (Carousel не принимает + нет CSS); `aria-labelledby` на `Heading`                                                                                                                                                                           |
| promo      | `67b2938`, `d63e673` | одноколоночный центрированный hero: убраны аватар и `SocialList`, снят `promo__wrapper`, `78vh` + флюидный `clamp()`, `prefers-reduced-motion`, чистка мёртвого CSS; правка line-height/отступов                                                                                             |
| (все)      | `122dd3f`            | единый вертикальный ритм и `78vh` для коротких секций (about/advantages/contact/projects/services/showcasing)                                                                                                                                                                                |
| (прочее)   | `4767836`            | `fix(projectCard)` — правка значения атрибута height (попутно при работе над секциями)                                                                                                                                                                                                       |

## ✅ Фаза 1 — компоненты (`src/components/`, по порядку)

| Компонент          | Коммит    | Суть                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aboutCapabilities  | `2a789e1` | `motion(Tag)` и варианты вынесены в модуль; `default`→`defaultValue` в i18n                                                                                                                                                                                                                                                                                                                                                             |
| aboutEducation     | `f570bed` | невалидный `<time>`-диапазон → `<span>`; чистка мёртвых данных/CSS                                                                                                                                                                                                                                                                                                                                                                      |
| (локали)           | `319b5db` | развёрнуты названия месяцев в датах образования (ru/en)                                                                                                                                                                                                                                                                                                                                                                                 |
| aboutExperience    | `a864623` | невалидный `<time>`-диапазон → `<span>`; удалены мёртвые ключи дат                                                                                                                                                                                                                                                                                                                                                                      |
| accordion          | `95b14c5` | убран вложенный `LazyMotion`; локализованы aria-label и пустое состояние; варианты в модуль                                                                                                                                                                                                                                                                                                                                             |
| accordionButton    | `5adb752` | иконка-переключатель сделана презентационной (`m.span` + `aria-hidden`)                                                                                                                                                                                                                                                                                                                                                                 |
| animatedBackground | `d66a0c7` | `getStarAnimation` → чистая функция; `prefers-reduced-motion`; `BREAKPOINTS.MOBILE`                                                                                                                                                                                                                                                                                                                                                     |
| authorPhoto        | `8e99307` | дедупликация блока кода (`CodeString`/`StringProp`/`ArrayProp`); локализация меты + alt                                                                                                                                                                                                                                                                                                                                                 |
| breadcrumbs        | `c7d14d6` | семантический `nav > ol > li`; БЭМ-классы; локализован aria-label; чистка CSS                                                                                                                                                                                                                                                                                                                                                           |
| buttonLink         | `90b7338` | `...rest` разворачивается первым (защита `rel`/`className`); `NavLink`→`Link`; убраны лишние пропсы                                                                                                                                                                                                                                                                                                                                     |
| accordionPanel     | `9977225` | БЭМ-модификатор `faq__answer--open` вместо глобального `.open`; чистый className                                                                                                                                                                                                                                                                                                                                                        |
| carousel           | `6016176` | локализован namespace `carousel`; фикс aria-label слайда (`t(project.title)`); удалены мёртвые пропсы `showNavigation/showPagination` и `aria-hidden`                                                                                                                                                                                                                                                                                   |
| errorMessage       | `f7bf49f` | устранён конфликт ARIA (`role=alert` vs `aria-live=polite`); декоративная гифка `alt=""` + иконка `aria-hidden`; локализованы дефолты пропсов; PropTypes                                                                                                                                                                                                                                                                                |
| filterButton       | `a25f6b5` | убраны лишние `aria-label` (хардкод-RU, переопределял видимый текст) и `title`; чистый `className` через `filter(Boolean).join`                                                                                                                                                                                                                                                                                                         |
| heading            | `6e48762` | компонент почти чистый: только косметика — сборка классов через `filter(Boolean).join`; API `level/showLine/subClassName` оставлен (рабочий, не мёртвый)                                                                                                                                                                                                                                                                                |
| loader             | `44c309f` | локализован aria-label (namespace `loader`: `loading`/`loadingText`) вместо хардкод-EN; убран лишний `aria-live` (`role=status` уже polite); PropTypes; API `color/size/fullScreen/text` оставлен (рабочий, мапится на CSS)                                                                                                                                                                                                             |
| logo               | `9249dc4` | локализован aria-label (namespace `logo.ariaLabel`, интерполяция `{{text}}` — сохранён бренд для label-in-name) вместо хардкод-RU; PropTypes; убран no-op вариант `'default'` из доков; API `variant/size/showIcon/text` оставлен                                                                                                                                                                                                       |
| maxIcon            | `084f3ce` | иконка декоративная (`alt=""`) — доступное имя несёт ссылка-обёртка `SocialItem` (убран хардкод-RU alt + дубль-озвучка); синхронизирован JSDoc (дефолты 32×32, были задокументированы 48×48); PropTypes                                                                                                                                                                                                                                 |
| modal              | `ac93d6f` | **фикс клавиатуры**: Escape слушается на `document` (раньше не работал — фокус оставался на триггере вне портала); перенос фокуса в окно при открытии + возврат на триггер при закрытии (focus-trap отложен); убран мёртвый хардкод-EN `aria-label` и `tabIndex` с бэкдропа (`role=presentation` теперь действует); PropTypes на все 3 файла; чистый className в `ModalCloseButton`                                                     |
| modalPromo         | `14c37ee` | **фикс CSS**: битая переменная `--ff-headers` → `--font-headings` (бейдж теперь Oswald, а не fallback-шрифт); иконка-огонёк декоративна (`alt=""`) — снят отсутствующий i18n-ключ `modal.promoIconAlt` (его не было ни в одной локали); убраны `role="status"` (промо — контент, не статус) и дублирующий `aria-label` (поведение: больше не live-region); снят мёртвый EN-дефолт в `t('modal.promoText')`; PropTypes; чистый className |
| modalSteps         | `3b08fad` | вынесены `DEFAULT_STEPS`/варианты в модуль; убран вложенный `LazyMotion`; убран мёртвый класс `modal__modal-step`; локализован `aria-label`; `??` вместо `\|\|`; PropTypes                                                                                                                                                                                                                                                              |
| mouseScroll        | `64cf5b0` | `role="presentation"` + хардкод-RU `aria-label` → `aria-hidden="true"`; убран мёртвый `mouse-scroll-cont`; `promo__mouse-scroll-cont` перенесён в `Promo.jsx`; `prefers-reduced-motion`; PropTypes                                                                                                                                                                                                                                      |
| navDesktop         | `077116d` | **фикс `aria-current`**: извлечён `NavItem` с `useMatch` — флаг только на активной ссылке; `end` для `/`; локализован `aria-label`; PropTypes                                                                                                                                                                                                                                                                                           |
| navMobile          | `521636a` | **фикс `aria-current`** в `MenuItem` (useMatch); сырые EN-ключи (`Hide/Show menu`) локализованы; `role="menu/menuitem"` убраны (навигация, не app-меню); мёртвый `ref`; игнорируемый `aria-label` у `ToggleLang`; `useEscapeKey` — слушатель только при открытом меню; `useBodyOverflow` — `unset` вместо `auto`; мёртвый CSS-селектор; PropTypes                                                                                       |
| projectCard        | `394a416` | локализованы `aria-label` статьи и `alt` изображения; `role="table/row/cell"` → `<dl>/<dt>/<dd>`; сброс UA-маржинов dl/dd; локализованы `aria-label` кнопок с `{{title}}` для различения карточек; убран хардкод-RU `aria-label` у `<ul>` (h4 уже именует группу); мёртвый CSS `.project-card__tag-box`; PropTypes                                                                                                                      |
| projectsList       | `bc440dc` | `parseSkills` вынесена в модуль; убраны `role="list"`, `role="listitem"`, `tabIndex={0}`, `aria-label` у `<m.li>` (лишние tab-stop; aria-label статьи даёт контекст); `filter(Boolean).join` для className; добавлены ключи `projectsList.ariaLabel/noProjects` в локали; PropTypes                                                                                                                                                     |
| scrollToTop        | `9ea9c28` | добавлены PropTypes с `oneOf` для `behavior`; убран WHAT-комментарий                                                                                                                                                                                                                                                                                                                                                                    |
| servicesItem       | `837b188` | **фикс `aria-controls`**: добавлен `id={contentId}` на контент-div (раньше указывал в никуда); `aria-expanded={open}` (boolean вместо строки); локализованы `ariaShowMore`/`ariaHide` с WCAG 2.5.3-совместимыми значениями (содержат видимый текст); убран невалидный синтаксис `{default:...}` i18next; мёртвый CSS `.services__arrow`; PropTypes                                                                                      |
| showcasingCard     | `524fed4` | добавлен ключ `showcasing.alt` (`{{project}}`) — убран невалидный `defaultValue` (хардкод-RU, игнорировал EN); убран `onError` (`/placeholder.jpg` отсутствует в `public/` → бесконечный цикл ошибок); убраны невалидные `width/height={'auto'}` (CLS держит `aspect-ratio` на родителе); мёртвый `background-image: none`; PropTypes                                                                                                   |
| socials            | `3b620bd` | **фикс a11y**: добавлен `max: 'MAX'` в `SOCIAL_NAME_MAP` (раньше aria-label падал в сырой `'max'` — единственное доступное имя ссылки, т.к. `MaxIcon` декоративна); map вынесен в модуль; локализован `aria-label` (`socials.ariaLabel`); `??` вместо `\|\|`; убран `tabIndex={0}` (нативно фокусируемая `<a>`); порядок импортов в `SocialList`                                                                                        |
| tag                | `7bfe7c2` | убраны мёртвые `forwardRef` (ref нигде не передаётся) и проп `color` с логикой `red/purple` (CSS-правил не существует, проп был только в JSDoc-примерах); статический `className="tag"`; PropTypes                                                                                                                                                                                                                                      |
| toggleLang         | `6f9cf6f` | добавлено доступное имя (`toggleLang.ariaLabel`) — раньше кнопка озвучивалась только как `Ру/En`; `filter(Boolean).join` для className; `LANGUAGES.RU` вместо хардкода; PropTypes; **фикс CSS-опечатки** `backgroun-color` → `background-color`; убран мёртвый `transform: translateX(0)`                                                                                                                                               |
| Up                 | `d62bacb` | локализован `aria-label` (дефолт `null` → `t('up.ariaLabel')`; раньше хардкод-RU, не переключался); убран избыточный `handleButtonKeyDown`/`onKeyDown` (нативная кнопка сама активируется по Enter/Space); упрощён хук `useKeyboardHandlers` (только глобальный Escape); слиты два импорта `framer-motion`                                                                                                                              |

## ⬜ Очередь (ещё не трогали)

**Компоненты (`src/components/`)** — 🎉 пусто, фаза завершена.

**Секции (`src/sections/`)** — 🎉 пусто, все 8 секций пройдены (см. Фазу 2 выше).

**Дальше (по согласованию):** только отложенные нетривиальные пункты из списка 🧹 выше — focus-trap в `Modal`, структурный фикс `Heading`.

> Примечание: компоненты `accordionItem`, `heading`, `tag` частично затронуты в ходе других ревью, но отдельного полного ревью не имели.

---

## 📋 Рабочие соглашения (чтобы не терять контекст завтра)

- **Коммиты:** Conventional Commits (`type(scope): subject` + тело-буллеты). Авторитет — conventionalcommits.org. Подробности в `CLAUDE.md`.
- **Авторство:** коммитить **от имени пользователя машины** (`Zhila`), **без** `Co-Authored-By: Claude`.
- **i18n:** при локализации править **оба** словаря `ru.json` и `en.json` синхронно; после правок валидировать JSON (`node -e "JSON.parse(...)"`).
- **Проверка:** прогонять `npx eslint <файлы>` перед коммитом.
- **Стиль:** только функциональные компоненты, обычный CSS с БЭМ, JSDoc на русском, без новых зависимостей.
- **Принцип:** не рефакторить ради рефакторинга — отделять реальные проблемы от косметики, крупные переделки (напр. canvas) — только по согласованию.
