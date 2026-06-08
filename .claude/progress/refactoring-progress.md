# Прогресс рефакторинга компонентов

Дата последней сессии: **2026-06-08**
Ветка: `feature/production-tweaks`

**Фаза 1 (`src/components/`) — завершена.** Прошли по всем компонентам по алфавиту, по одному за раз: код-ревью на безопасность / качество кода / общие принципы → исправление всех замечаний → коммит.

**Фаза 2 (`src/sections/`) — завершена.** Прошли по всем секциям (та же методика, плюс при необходимости — дизайн-правки в рамках существующей дизайн-системы). Очередь секций закрыта (`cc7ce40`).

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
