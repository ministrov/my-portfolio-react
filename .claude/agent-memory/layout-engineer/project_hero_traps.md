---
name: project-hero-traps
description: Hidden traps in the hero section — dormant spotlight width rule, frame overflow, scramble restart whenever `active` turns on
metadata:
  type: project
---

Ловушки героя (`src/sections/hero/`), найденные в S01-T03 (2026-10-16):

- **Правило `.hero__btn-frame { width: 100% }` на ≤475 фактически мёртвое.** Пока у `.hero__btn-col` нет определённой ширины, процент считается от ширины, которую даёт сама кнопка. Если задать колонке `.hero__actions` фиксированную ширину (например `min(300px, 100%)`), правило оживает: spotlight растягивается, а текст и иконка расходятся к краям (`space-between`). Лид это отклонил: spotlight в S01 не меняется. Колонка кнопок на ≤767 — `fit-content`, то есть по ширине spotlight.
- **Рамка spotlight на ≤475 на 4 px шире своей колонки** (`width: 100%` + `padding: 2px` без `border-box`), по 2 px с каждой стороны. Так было до S01, и лид оставил как есть.
- **`useScrambleText` перезапускает расшифровку при каждом включении `active`.** Поэтому в герое `active: isTouch || isSubtitleInView`: на таче расшифровка одна, при загрузке; на десктопе цикл на паузе вне кадра. Смена языка (`text`) расшифровку тоже перезапускает — это ожидаемо.

**Why:** все пункты не видны при чтении кода по отдельности и проявляются только на определённых ширинах или при скролле.
**How to apply:** правишь раскладку кнопок героя — сравни ширину spotlight и отступы внутри неё с раскладкой «до» (инлайн-стилем верни колонке `flex-direction: row`) на 360/390/600. Трогаешь `active` или `loop` у скрамбла — проверь на эмуляции тача уход из кадра и возврат. Связано: [[project-desktop-unchanged-s01]], [[project-css-chunk-order]].
