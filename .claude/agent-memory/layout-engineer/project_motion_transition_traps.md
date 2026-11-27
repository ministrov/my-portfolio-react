---
name: project-motion-transition-traps
description: Measuring CSS transitions in Playwright (React flush delay, getAnimations sampling), reduced-motion specificity vs state rules, scroll-lock scrollbar shift
metadata:
  type: project
---

Замер CSS-переходов и ловушки reduced-motion, найденные в S04-T14 (2026-11-27, анимация Squash бургера):

- **`btn.click()` в `page.evaluate` не флашит React синхронно.** Сразу после клика `aria-expanded` ещё старый, `getAnimations()` пуст — первый замер вернул покой на всех кадрах. Клик и замер надо разделить двумя `await new Promise(r => requestAnimationFrame(r))`. После этого `el.getAnimations({ subtree: true })` отдаёт CSSTransitions полосок; фильтровать по `lines.includes(a.effect.target)`, иначе в `document.getAnimations()` 90 анимаций страницы.
- **Сэмплирование кадров:** `a.pause()`, затем `a.currentTime = t` (для Squash — 0/125/250/375/500 при фазе 0,25 с) и читать `getComputedStyle`; задержка входит в `currentTime`, так что до конца `delay` значение начальное. После сэмплов `a.finish()` возвращает конечное состояние без ожидания. `a.effect.getTiming()` даёт duration/delay/easing, `a.transitionProperty` — свойство.
- **`@media (prefers-reduced-motion: reduce) .nav-mobile__burger-line { transition: none }` НЕ выключает открытие.** Правило открытого состояния `.nav-mobile__burger[aria-expanded='true'] .nav-mobile__burger-line--…` — (0,3,0), и его `transition` перебивает базовое (0,1,0); при закрытии выигрывает базовое, то есть без повтора селектора состояния reduced motion работал бы только в одну сторону. В блоке нужно повторять селектор состояния.
- **Блокировка скролла сдвигает шапку на 10 px (headless).** Пока меню открыто, `useBodyScrollLock` убирает классический скроллбар 10 px: `clientWidth` 310 → 320 на 390, правые элементы шапки уезжают на +10 px. Сравнивать центры линий между состояниями в координатах кнопки/текущей раскладки, а не по абсолютному `x`; сама геометрия креста от сдвига не зависит.
- **Минификатор сборки:** `translate: 0 0` становится `translate: 0` — это валидно (второе значение 0), `getComputedStyle` возвращает `0px`.

**Why:** без задержки на кадр замер «не анимируется» врёт; без повтора селектора в reduced motion переход играет при открытии; сдвиг скроллбара выглядит как баг вёрстки бургера.
**How to apply:** замеряешь CSS-переходы в Playwright — [[project-playwright-media-verification]]; пишешь `transition` в правиле состояния — проверь reduced motion в обе стороны; открытие меню — [[project-nav-menu-traps]].
