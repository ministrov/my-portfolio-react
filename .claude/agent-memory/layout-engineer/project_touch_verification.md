---
name: project-touch-verification
description: How to verify touch layouts in Playwright here — plain resize lies (classic scrollbar, hover:hover); use a mobile context; what emulation cannot show
metadata:
  type: project
---

Проверка тач-раскладок через Playwright MCP (выводы S01-T05, 2026-10-17):

- **Простой `browser_resize` врёт.**
  - У окна классическая полоса прокрутки 10 px: «360» даёт `clientWidth` 350, и все замеры съезжают.
  - Кроме того, `(hover: none)` не срабатывает.
  - Нужен `browser.newContext({ viewport, isMobile: true, hasTouch: true })` через `browser_run_code_unsafe`. Тогда полосы накладываются поверх контента, `matchMedia('(hover: none)')` возвращает `true`, и ветка ленты включается и на ширинах больше 1024.
- **`addStyleTag` в dev-режиме гоняется с ленивым CSS чанков.** `Showcasing` грузится лениво, его `<style>` может встать после инъекции и перебить её. Сначала дождись элемента компонента. Для экспериментов пиши правила с `!important`.
- **Эмуляция не показывает инерцию.** CDP `Input.synthesizeScrollGesture` вложенный скроллер не двигает. `Input.dispatchTouchEvent` двигает, но флинга не даёт, и результат со `scroll-snap-stop` и без него одинаковый. Инерцию и «одну карточку за свайп» подтверждает только реальное устройство.

**Why:** иначе на одной и той же раскладке получаются ложные замеры и ложные «работает / не работает».
**How to apply:** любой замер на ≤ 1024 px или на тач-ветке делай в мобильном контексте. Что нельзя проверить эмуляцией, выноси лиду в регрессию на устройстве. Связано: [[project-snap-strip-traps]].
