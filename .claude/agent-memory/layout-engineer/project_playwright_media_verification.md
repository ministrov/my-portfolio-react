---
name: playwright-media-verification
description: Playwright MCP screenshot roots and Windows paths; hashed preview URLs require prefix matching; how to measure visible source pixels of cover images; page-height baseline needs hidden scrollbar
metadata:
  type: project
---

Проверка картинок карточек в браузере (S03-T20, 2026-11-19; дополнено S04-T07, 2026-11-26):

- **Скриншот в `run_code_unsafe` молча не создаётся с путём вида `C:/Users/...`** — ни файла, ни
  ошибки; 16 вызовов `locator.screenshot({ path })` дали 0 файлов. С обратными слэшами
  (`C:\\Users\\...`) работает, но родительская папка должна уже существовать (создать её из bash, а не
  из песочницы: `require`/`import('fs')` там недоступны — `require is not defined`,
  `ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING`). С 2026-11-26 MCP **отказывает** писать вне разрешённых
  корней (`D:\react-js-projects\my-portfolio-react` и `.playwright-mcp/`): «File access denied: outside
  allowed roots». Скриншоты — в `.playwright-mcp/` (gitignored), после просмотра удалить свои файлы.
- **В `vite preview` имена ассетов хэшированы** (`only-mobile-D6eVoTVE.webp`), поэтому карточки ищутся
  не по полному `currentSrc`, а по префиксу: отсортировать известные имена по убыванию длины и взять
  первое, где `base === name || base.startsWith(name + '-')` — иначе `mish` перехватит `mish-tablet`.
- **Высоты страниц для сравнения с baseline/T06 мерить со скрытым скроллбаром.** У Chrome в Playwright
  MCP классический скроллбар 10 px (`clientWidth = innerWidth − 10`), а baseline S04 снят без него.
  На `/projects` это сдвигает высоту: при 375 — 7983 вместо 8083 (8 карточек × 10 px × 5/4), при
  1024 — 10196 вместо 10230. Лечится временной вставкой `html{scrollbar-width:none}
html::-webkit-scrollbar{display:none}` **до** замера `scrollHeight`, затем стиль удалить. На 1280+
  разницы нет: контейнер упирается в `max-width: 1200`. Оба числа (со скроллбаром и без) стоит
  записывать, чтобы лид видел методику.
- **Видимые пиксели исходника** для `object-fit: cover` и десктопной обрезки контейнером:
  `visibleCss = пересечение rect картинки и content-box контейнера`,
  `sourcePx = visibleCss * naturalWidth / imgRect.width`. Совпало с таблицей T20 на 375 / 768 / 1024 /
  1280 (725 / 1920 / 1173 / 1004).
- **Пережатие q90 даёт пиксельный шум на скриншотах, это не сдвиг кадра:** проверять разницу при
  `dy = −2…+2` — минимум должен быть при `dy = 0` (у vam-voda-tablet 14,7 / 10,9 / **5,3** / 8,8 / 13,0).
  После этого можно писать «кадр совпал».

**Why:** иначе можно час искать отсутствующие файлы, сравнить не те карточки, принять шум WebP за
съехавшую раскладку или объявить регрессией разницу в 100 px от скроллбара.
**How to apply:** при любой задаче про картинки карточек, замер «сколько исходника видно» и сверку
высот страниц с baseline — этот порядок. Связано: [[project-touch-verification]],
[[project-project-card-traps]], [[project-pill-measurement]].
