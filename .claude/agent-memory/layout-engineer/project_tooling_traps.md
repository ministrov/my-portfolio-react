---
name: project-tooling-traps
description: prettier --check fails on untouched files because core.autocrlf=true checks them out as CRLF (index is LF) — not a formatting regression; a PostToolUse formatter rewraps code at 80 chars
metadata:
  type: project
---

Ловушки инструментов в рабочем дереве (S02-T12, 2026-10-29):

- **`core.autocrlf=true`, `.gitattributes` нет.** В индексе файлы с LF, а при checkout часть из них получает CRLF (`git ls-files --eol` показывает `i/lf w/crlf`). На таких файлах `npx prettier --check` падает ещё до правок: у Prettier `endOfLine: lf`. В T12 так упали `AboutCapabilities.jsx` и `style.css`. Файл, переписанный через Write, получает LF и проходит проверку. В diff это не попадает: git нормализует концы строк.
- **Хук-форматтер после Edit/Write** переносит код по ширине Prettier по умолчанию, 80 символов. В `.prettierrc` нет `printWidth`, хотя `CLAUDE.md` пишет про 100. Длинный массив в `const/index.jsx` хук разложил по строкам — это нормально.

**Why:** иначе красный `prettier --check` на нетронутом файле легко принять за свой регресс или начать переформатировать файл целиком и раздуть diff.
**How to apply:** Prettier `--check` прогоняй и до правок. Если файл красный, смотри `git ls-files --eol <файл>`; при `w/crlf` в отчёте пиши «CRLF рабочего дерева, не формат». Связано: [[project-touch-verification]].
