---
name: project-pill-measurement
description: S03-T19 verification — Chrome 157 matches baseline.md exactly (0 px); computed display of pills reads blockified flex, so compare sizes not display
metadata:
  type: project
---

Замеры 2026-11-18 (S03-T19, Chrome 157.0.8103.80, Playwright, контексты как в baseline.md):

- Все 40 строк высот страницы и подвала из baseline.md совпали с базой ровно (0 px), как и
  значения `/projects` на 1280 после T14. Предупреждение baseline.md «браузер не 156 — переснять
  базу» для Chrome 157 не понадобилось.
- `getComputedStyle(...).display` у кнопок-пилюль возвращает `flex` даже при авторском
  `inline-flex`: элементы лежат во flex-контейнере и блокифицируются. Намеренное различие
  `flex` / `inline-flex` проверяется по `offsetWidth` (390: 358 = вся колонка; 768: 120/186 = по
  содержимому), а не по computed display.
- `border: 1.5px` в computed shorthand читается как `1px`; фактическую толщину подтверждают
  совпавшие `offsetWidth` и высоты до/после.

**Why:** чтобы следующий замер не переснимал базу из-за версии Chrome и не искал ложную
регрессию в `display` или толщине рамки.

**How to apply:** при регрессии S03 и подобных рефакторингах сравнивать напрямую с baseline.md на
Chrome 157; различия пилюль — по размерам и состояниям. Связано: [[project-tooling-traps]],
[[project-touch-verification]].
