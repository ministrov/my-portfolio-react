---
name: project-a11y-platform-traps
description: Site-wide a11y traps from global CSS — li list-style:none drops list semantics in Safari/VoiceOver; forced-colors repaints pseudo-element backgrounds (dots vanish)
metadata:
  type: project
---

Ловушки доступности, которые идут от глобальных стилей и платформы (S02-T09, 2026-10-29):

- **`li { list-style: none }` глобально в `main.css`.** Safari с VoiceOver при `list-style: none` перестаёт объявлять `ul` как список. Это касается всех списков сайта. ТЗ S02 требует «VoiceOver объявляет „список, 3 пункта“» у пунктов `ResumeCard`. Поэтому там у `ul` стоит `role="list"` с комментарием. Это первый такой `role` в кодовой базе, остальные списки не трогали. Решение для всего сайта — за лидом. NVDA и jsdom (`getAllByRole('listitem')`) это не проверяют.
- **`forced-colors: active` красит фон псевдоэлемента в Canvas.** В Playwright (`forcedColors: 'active'`) у точки `::before` с `background: Graphite` вычисленный фон — белый, и точка исчезает. Рамка красится в CanvasText. Отсюда приём: в `@media (forced-colors: active)` — `border: 3px solid` плюс `box-sizing: border-box`, и точка остаётся 6 × 6. Так же сделано в `ShowcaseCarousel` и `ResumeCard`.

- **`aria-label` на `dl` (S02-T12).** По ARIA in HTML у `dl` нет роли, и имя на элементе без роли может теряться. Chromium (CDP `Accessibility.getFullAXTree`) отдаёт `dl` ролью `DescriptionList` с именем, axe его не ругает (у `dl` в axe `chromiumRole: list`). Остальные экранные дикторы не проверены.
- **Одинаковые имена списков на /about.** `about.techAriaLabel` (теги под историей) — «Технологический стек» / «Technology stack». `aboutCapabilities.ariaLabel` из приложения А ТЗ S02 — «Стек технологий» / «Technology stack». В EN имена совпадают дословно, в RU почти совпадают. Вопрос передан лиду в T12. Новое имя списка сверяй grep'ом по `AriaLabel` во всех словарях.

**Why:** обе проблемы не видны ни в обычном браузере, ни в тестах. Первая проявляется только на Apple, вторая — только в режиме высокого контраста.
**How to apply:** новый список под требование скринридера — `role="list"`. Новый декоративный маркер на фоне — правило `forced-colors` и проверка `getComputedStyle(el, '::before')` в контексте с `forcedColors: 'active'`. Связано: [[project-touch-verification]].
