---
name: playwright-media-verification
description: Playwright MCP screenshots silently drop with forward-slash Windows paths; hashed preview URLs require prefix matching; how to measure visible source pixels of cover images
metadata:
  type: project
---

Проверка картинок карточек в браузере (S03-T20, 2026-11-19):

- **Скриншот в `run_code_unsafe` молча не создаётся с путём вида `C:/Users/...`** — ни файла, ни
  ошибки; 16 вызовов `locator.screenshot({ path })` дали 0 файлов. С обратными слэшами
  (`C:\\Users\\...`) работает, но родительская папка должна уже существовать (создать её из bash, а не
  из песочницы: `require`/`import('fs')` там недоступны — `require is not defined`,
  `ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING`). Относительный путь MCP кладёт в рабочее дерево
  репозитория — для мусорных скриншотов не годится.
- **В `vite preview` имена ассетов хэшированы** (`only-mobile-D6eVoTVE.webp`), поэтому карточки ищутся
  не по полному `currentSrc`, а по префиксу: отсортировать известные имена по убыванию длины и взять
  первое, где `base === name || base.startsWith(name + '-')` — иначе `mish` перехватит `mish-tablet`.
- **Видимые пиксели исходника** для `object-fit: cover` и десктопной обрезки контейнером:
  `visibleCss = пересечение rect картинки и content-box контейнера`,
  `sourcePx = visibleCss * naturalWidth / imgRect.width`. Совпало с таблицей T20 на 375 / 768 / 1024 /
  1280 (725 / 1920 / 1173 / 1004).
- **Пережатие q90 даёт пиксельный шум на скриншотах, это не сдвиг кадра:** проверять разницу при
  `dy = −2…+2` — минимум должен быть при `dy = 0` (у vam-voda-tablet 14,7 / 10,9 / **5,3** / 8,8 / 13,0).
  После этого можно писать «кадр совпал».

**Why:** иначе можно час искать отсутствующие файлы, сравнить не те карточки или принять шум WebP за
съехавшую раскладку.
**How to apply:** при любой задаче про картинки карточек и замер «сколько исходника видно» — этот
порядок. Связано: [[project-touch-verification]], [[project-project-card-traps]].
