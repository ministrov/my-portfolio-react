---
name: project-nav-menu-traps
description: Header/mobile-menu traps — header is the containing block for the fixed drawer, <a>-buttons need border-box, hamburger-react reopens on keyup Enter, 81px came from the burger
metadata:
  type: project
---

Ловушки хедера и мобильного меню (`layouts/header/`, `components/navMobile/`), найденные в S01-T06 (2026-10-21):

- **Хедер — containing block для шторки меню.** Пока меню открыто, на хедере `.header--bg` с `backdrop-filter`. Поэтому `position: fixed` у `.nav-mobile__wrapper` считается от хедера, а не от окна, и `bottom: 0` даёт высоту ≈ 0. Высоту шторки задавать от вьюпорта: `calc(100dvh - 5rem)` плюс `border-box`. Отсюда же исторические `top: 5rem` и `90vh`.
- **Глобального `box-sizing: border-box` в проекте нет.** У `<button>` он есть в UA-стилях, у `<a>` — нет. Ссылка-кнопка с `min-height: 48px` и паддингами получается 64 px, а соседний `<button>` с теми же правилами — 48. Ссылкам, похожим на кнопки, явно ставь `box-sizing: border-box`.
- **`hamburger-react` — это `<div role="button">`, который переключается на keyup Enter.**
  - Пункт меню срабатывает по Enter на keydown: меню закрывается, `MobileMenu` возвращает фокус на бургер.
  - Затем keyup Enter приходит уже на бургер, и меню открывается снова.
  - Баг был до T06, вынесен лиду. Проверять только с разделёнными `keyboard.down` и `keyboard.up`: `press` маскирует порядок.
- **81 px в `--header-height` на ≤ 992 = бургер 48 + паддинги 32 + рамка 1.** Где бургера нет, высоту держит `.nav { min-height: 48px }`. Без него хедер становится 77 px, и переменная врёт.
- **Якорная прокрутка на `/projects` неточна.** Карточки проектов растут при ленивой загрузке: пропорция `width`/`height` у `<img>` не совпадает с `*-tablet.webp` у `<picture>`. Плавный скролл к контактам на 390 промахивается на ~690 px. Это не баг меню — проверяй на `/` и `/about`, а `/projects` сверяй после исправления карточки (T09).

**Why:** ни одно из этого не видно при чтении CSS и JSX по отдельности. Проявляется только при открытом меню, в ландшафте или с клавиатуры.
**How to apply:** правишь шторку или хедер — меряй высоту обёртки при открытом меню на 390×844 и 667×375, а хедера — на 767/768/992. Клавиатуру в меню проверяй Enter-ом с разделёнными down и up. Контекст для замеров — [[project-touch-verification]]; десктоп не меняется — [[project-desktop-unchanged-s01]].
