# Баг: Trans не обновляется при смене языка внутри memo-компонента

## Симптом

Последние два элемента секции Advantages (`sixth`, `seventh`) показывают русский текст
при переключении интерфейса на английский. Остальные пять элементов переводятся корректно.

## Причина

Три фактора в связке:

### 1. `Trans` не подписывается на смену языка самостоятельно

`Trans` из `react-i18next` не вызывает `useTranslation()` внутри себя.
Он читает перевод через `getI18n().t(key)` при каждом рендере, но не регистрирует
подписку на событие `languageChanged`. Это значит: `Trans` перерисовывается
**только когда перерисовывается его родитель**.

### 2. `AdvantagesItem` обёрнут в `memo`

`memo` сравнивает пропсы. Если они не изменились — ре-рендер пропускается
и функция компонента (включая `Trans` внутри) не выполняется.

### 3. Items 6–7 не имеют ключа `alt`

В `items.js` элементы `sixth` и `seventh` используют react-icons компоненты
(`BsPhone`, `MdOutlineAccessibility`) и не имеют поля `alt`.

В `Advantages.jsx` родитель передаёт `altText={t(alt)}`.
При `alt = undefined` → `t(undefined)` → `""` на **обоих языках**.

Когда язык меняется с `ru` на `en`:

- `Advantages` ре-рендерится (у него есть `useTranslation`)
- Для items 1–5: `altText` меняется (`"Иконка: сайт"` → `"Website icon"`) → `memo` видит изменение → ре-рендер → `Trans` показывает английский ✓
- Для items 6–7: `altText = ""` в обоих языках → пропсы идентичны → `memo` блокирует ре-рендер → `Trans` остаётся с кешированным русским текстом ✗

## Исправление

Добавить `useTranslation()` непосредственно в `AdvantagesItem`.
Хук регистрирует React-подписку на `languageChanged` через внутренний `useState`.
При смене языка React планирует state-driven ре-рендер для этого конкретного fiber —
он обходит проверку `memo` (которая срабатывает только при parent-driven ре-рендерах).

```jsx
// src/sections/advantages/AdvantagesItem.jsx
import { Trans, useTranslation } from 'react-i18next';

const AdvantagesItem = ({ text, icon: Icon, altText = '', index = 0, ...props }) => {
  useTranslation(); // подписка на languageChanged — обходит memo при смене языка
  return ( ... );
};
```

## Где может повториться

Любой `memo`-компонент, который:

- содержит `<Trans>` для перевода текста, И
- не вызывает `useTranslation()` самостоятельно, И
- получает пропсы, которые не зависят от текущего языка

→ будет "заморожен" на языке первого рендера.

**Правило:** если компонент рендерит переводимый текст через `Trans` и обёрнут
в `memo` — добавь `useTranslation()` в тело компонента.

## Связанное

- `src/sections/advantages/AdvantagesItem.jsx` — исправленный компонент
- `src/sections/advantages/items.js` — items 6–7 без поля `alt`
- `src/sections/advantages/Advantages.jsx` — передаёт `altText={t(alt)}`
- commit: `fix(advantages): subscribe AdvantagesItem to language changes`
