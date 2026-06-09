# План: редизайн секции FAQ

Ветка: `feature/production-tweaks`
Дата: 2026-06-09

## Текущие проблемы

1. **Монотонная синяя плашка** — каждый вопрос — одинаковая тёмная кнопка. Взгляд не цепляется, не хочется читать.
2. **Нет визуальной иерархии** — вопросы одного веса, нет якорей для сканирования.
3. **Сломанная анимация ответа** — `display: none → block` с CSS `transition: opacity` не работает (display не анимируется). Ответ появляется резко.
4. **Мелкая типографика** — вопрос 18px, ответ 16px / `line-height: 20px` — неудобно читать.
5. **Секция без фона** — FAQ «теряется» на белом фоне, нет визуального отделения от соседних секций.

---

## Что делаем

### 1. Фон секции — цветная панель

Обернуть FAQ в цветной блок как у `about` и `advantages`:

```css
.faq {
  background-color: var(--color-gray-600);
  border-radius: 42px;
}
```

Создаёт визуальный «контейнер», секция становится самостоятельным блоком.

---

### 2. Двухколоночный grid на десктопе

7 вопросов в одну колонку — длинный скучный список. На десктопе — 2 колонки:

```css
.faq__list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start; /* открытый item не двигает соседнюю колонку */
  gap: 1rem;
}
```

На `≤768px` — обратно в 1 колонку.

---

### 3. Карточка на каждый item + порядковый номер

Каждый вопрос — белая карточка с номером `01`, `02`... в углу:

```css
.faq__item {
  background: var(--color-white);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  overflow: hidden;
}
```

Номер — псевдоэлемент `::before` через CSS-счётчик (`counter-increment: faq`), стилизован как крупный мутный акцент в правом верхнем углу карточки:

```css
.faq__list {
  counter-reset: faq;
}
.faq__item {
  counter-increment: faq;
}
.faq__item::before {
  content: counter(faq, decimal-leading-zero); /* 01, 02, ... */
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  font-size: 2.5rem;
  font-weight: 700;
  font-family: var(--font-headings);
  color: var(--color-blue-700);
  opacity: 0.07;
  pointer-events: none;
}
```

Число видно, но не кричит — даёт взгляду «за что зацепиться».

---

### 4. Стиль вопроса — чистый, без синей заливки

Убрать `background-color: var(--color-blue-700)`, сделать вопрос читаемым тёмным текстом:

```css
.faq__question {
  padding: 1.25rem 1.5rem;
  background: transparent;
  border-radius: 0; /* скругление на .faq__item */
}

.faq__question h3 {
  font-size: 20px;
  line-height: 1.4;
  font-weight: 600;
  color: var(--color-blue-700);
}
```

Акцент при открытии — левая цветная полоска на `.faq__item--open`:

```css
.faq__item--open {
  border-left: 3px solid var(--color-blue-700);
}
```

(нужно добавить класс `faq__item--open` в `AccordionItem.jsx` по флагу `isActive`)

---

### 5. Плавная анимация ответа — Framer Motion

Текущий `display: none / block` убить, заменить на `AnimatePresence` + `m.div` с `height: 0 → auto`:

```jsx
// AccordionPanel.jsx
import { AnimatePresence, m } from 'framer-motion';

const AccordionPanel = ({ item, open }) => (
  <AnimatePresence initial={false}>
    {open && (
      <m.div
        key="answer"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ overflow: 'hidden' }}
        id={`faq-answer-${item.id}`}
        role="region"
        aria-labelledby={`faq-question-${item.id}`}
      >
        <p className="faq__answer-text">{t(item.answer)}</p>
      </m.div>
    )}
  </AnimatePresence>
);
```

---

### 6. Типографика ответа

```css
.faq__answer-text {
  padding: 0 1.5rem 1.5rem;
  font-size: clamp(1rem, 0.96rem + 0.3vw, 1.0625rem);
  line-height: 1.75;
  color: var(--color-gray-800);
  text-wrap: pretty;
}
```

---

## Порядок коммитов

1. `style(faq)` — фон секции, двухколоночный grid, карточки на item, номера через CSS-счётчик
2. `style(accordionItem)` — чистый стиль вопроса (без синей заливки), класс `--open`, типографика
3. `refactor(accordionPanel)` — AnimatePresence + плавная анимация высоты, новый класс `faq__answer-text`

## Scope

- CSS: `faq/style.css`, `accordionItem/style.css`, `accordionPanel/style.css`
- JSX: `AccordionItem.jsx` (добавить класс `--open`), `AccordionPanel.jsx` (AnimatePresence)
- Без новых зависимостей (Framer Motion уже есть)

## Открытые вопросы (согласовать при реализации)

- Оставить ли иконку-стрелку в `AccordionButton` или убрать (она дублирует `--open`-индикатор)?
- Кнопка аккордеона сейчас — `div[role=button]`. Оставить или заменить на семантический `<button>`?
