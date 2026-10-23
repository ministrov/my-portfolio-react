---
name: project-author-card-traps
description: Traps in the About section — shared AuthorMeta (home card vs /about IDE card), badge/location centering, <code> UA monospace override, useCharWidths keeping fallback-font widths
metadata:
  type: project
---

Ловушки карточек автора, найденные в S01-T12 (2026-10-23):

- **`AuthorMeta` общий у светлой карточки на главной и тёмной IDE-карточки на /about.** Раскладку меты правь только через родителя: `.author-identity …` или `.author-content …`. Центрирование колонки меты одним `align-items: center` не работает:
  - бейдж держит `.author-meta__badge { align-self: flex-start }`, поэтому нужен `align-self: center`;
  - локация — flex-строка «иконка + текст», `text-align` её не центрирует, нужен `justify-content: center`;
  - список соцсетей в такой колонке и так сжат по иконкам, `justify-content` на нём ничего не меняет.
- **У IDE-карточки на ≤ 720 px смешанное выравнивание.** `.author-content { text-align: center }` центрирует имя и роль, а локация, бейдж и соцсети остаются слева. Это та же «две оси в одной карточке», что T12 убрал на главной. На /about её не трогали: по критерию ТЗ карточка «как раньше». Это кандидат в S02.
- **`<code>` внутри `.author-code` получает UA-стиль `font-family: monospace`**, и он перебивает стек One Monospace у `.author-code`. Вычисленное значение — `monospace`: на Windows это Consolas, `ch` = 7 px при 0.8rem. На macOS шрифт другой, и вид кода другой. «Починка» через `font-family: inherit` поменяет вид на macOS, поэтому это решение лида. `ch` в строках кода считается от шрифта `<code>`, и поэтому `2ch` совпадает с прежними двумя пробелами.

- **Кегль и трекинг имени задаёт `.author-meta--light .author-meta__name` (вес 0-2-0).** Он лежит в другом чанке CSS, поэтому `.author-identity .author-meta__name` с тем же весом выигрывает только по порядку чанков. Перебивай правилом с весом 0-3-0: `.author-identity .author-meta--light .author-meta__name` (S01-T12, раунд 2).
- **Число в плашке может переноситься.** Символы числа — `inline-block`. В 4-колоночной сетке на 568 px «Middle» в 1.6rem с раздутыми ширинами (см. ниже) переносился на вторую строку, и весь ряд плашек вытягивался до 104 px. Лечится `white-space: nowrap` у `.about__stat-number`. При смене кегля чисел перепроверяй 568.
- **`useCharWidths` может навсегда оставить ширины запасного шрифта.** Перемер после `document.fonts.ready` выходит раньше времени: строка `font` не изменилась (`font === lastFont`). А Oswald грузится лениво, по `unicode-range`. Отсюда «разреженные» `Middle` и `B2` в плашках «Обо мне»: на 390 px инлайн-ширина «M» 18.0 px, у Oswald 15.2. Это ошибка, существовавшая до S01-T12, сообщена лиду. Сравнение `numSpare` до и после правки раскладки она не портит, ширины одинаковы в обоих прогонах.

**Why:** ни одна из ловушек не видна при чтении одного файла. Общий компонент и UA-стиль проявляются только в вычисленных значениях.
**How to apply:** правишь мету или код карточки автора — меряй центры элементов (`Range.getBoundingClientRect` содержимого) и `getComputedStyle(code).fontFamily` на обеих страницах. Связано: [[project-css-chunk-order]], [[project-desktop-unchanged-s01]].
