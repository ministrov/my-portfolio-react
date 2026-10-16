---
name: project-css-chunk-order
description: Shared component CSS lands in other build chunks, so a parent's one-class override of a component property is order-dependent — raise specificity through the parent instead
metadata:
  type: project
---

В production-сборке Vite (rolldown) CSS общих компонентов попадает не в чанк того, кто их импортирует. На 2026-10-16 база `.cta-button` лежит в `Contact-*.css`, а `AvailabilityBadge` — в `About-*.css`. Порядок `<link>` в `build/index.html`: `Heading → Contact → About → index`. В dev-режиме порядок другой — по порядку вычисления модулей.

Решение лида (S01-T03, раунд 2): если родитель перебивает свойство блока-компонента (`display` у `.cta-button` и т. п.), не полагаться на порядок каскада. Специфичность поднимается через родителя: `.hero__actions .hero__secondary-cta`. Это допустимое отступление от «один класс».

**Why:** при одинаковой специфичности победитель зависит от раскладки чанков. Перераскладка молча вернёт скрытую кнопку на десктоп, и ни один тест этого не поймает.
**How to apply:** перебиваешь свойство чужого блока через класс-микс — пиши селектор «родитель + микс». Проверка устойчивости в превью: допиши в конец `<head>` `<style>` с базовым правилом компонента и убедись, что вычисленное значение не изменилось.
