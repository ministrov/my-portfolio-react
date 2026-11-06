---
name: project-jsdom-test-traps
description: jsdom traps when testing hero-like components — canvas/ResizeObserver/matchMedia crash useCharWidths/useScrambleText; anchor click schedules a jsdom timer; afterEach order with mounted component
metadata:
  type: project
---

Найдено в S03-T12 (2026-11-06) на тестах `HeroSubtitle` / `HeroCvButton`; проверено пробными прогонами:

- **Без подмен `HeroSubtitle` в jsdom падает тремя разными ошибками по очереди:** `getContext('2d')` → `null` и `TypeError: Cannot set properties of null (setting 'font')` (`useCharWidths`); затем `ReferenceError: ResizeObserver is not defined`; затем `TypeError: window.matchMedia is not a function` — `useScrambleText` зовёт его без проверки (у `useMediaQuery` проверка есть). `useReducedMotion` из motion подписывается через `addEventListener` — `addListener` в заглушке не нужен.
- **`afterEach`: язык возвращать ДО `vi.unstubAllGlobals()`.** RTL размонтирует после пользовательского `afterEach`, смена языка перезапускает эффект `useCharWidths` у ещё смонтированного компонента — без подмен он падает.
- **Клик по `<a href>` в jsdom** пишет «Not implemented: navigation to another Document» и ставит свой таймер: `vi.getTimerCount()` даёт +2 вместо +1. Лечится `document.addEventListener('click', e => e.preventDefault())` — React-обработчик всё равно срабатывает.
- **Тест «скрытый текст = полная строка» на десктопной ветке пустой:** `useInView` в jsdom всегда `false` → `active` false → глифы равны тексту, и поломка «скрытый текст из глифов» проходит. Ловит только сценарий с `(hover: none)` + fake timers за `delayMs` (или смена языка).
- `toHaveTextContent('строка')` проверяет вхождение, не равенство — для «строки целиком» сравнивать `textContent` через `toBe`.

**Why:** каждая из ловушек выглядит как баг компонента или даёт зелёный тест, который не умеет падать.
**How to apply:** тесты компонентов с `useCharWidths`/`useScrambleText` или ссылками-скачиваниями — сразу подменять все три API и гасить навигацию; умение падать проверять намеренными поломками с резервной копией файла и `cmp` после восстановления. Связано: [[project-hero-traps]].
