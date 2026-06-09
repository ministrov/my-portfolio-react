# План: типографика и стили страницы «Обо мне»

Ветка: `feature/production-tweaks`  
Дата: 2026-06-09

## Проблемы

1. **Плоский текст** — `.about-capabilities__text`, `.about-experience__item-text`, `.about-education__item` используют старый стиль (`font-size: 18px; line-height: 24px; color: var(--color-blue-700)`). Нет визуальной «подложки» — текст висит на фоне без карточки.
2. **Перекос колонок** — `grid-template-columns: 50% 50%` не подходит для крупного `display`-заголовка: левая колонка слишком широкая.
3. **`about-education` без сетки** — заголовок просто сверху над списком, нет двухколонного layout'а как у capabilities/experience.
4. **Мёртвый CSS** — `.about-experience--dark { background-color: paleturquoise }` — класс нигде не используется.

## Эталон

`about-story` (`src/components/aboutStory/style.css`):

- Карточка: `background: white; border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; padding: clamp(1.4rem, 1rem + 1.6vw, 2.25rem)`
- Текст: `font-size: clamp(1rem, 0.96rem + 0.3vw, 1.0625rem); line-height: 1.75; color: var(--color-gray-800); text-wrap: pretty`

Применить тот же карточный стиль и типографику к текстовому контенту трёх секций.

---

## Изменения по секциям

### 1. `about-capabilities` (CSS only)

**Пропорции колонок:**

```css
/* было */
.about-capabilities__wrapper {
  grid-template-columns: 50% 50%;
}

/* станет */
.about-capabilities__wrapper {
  grid-template-columns: 1fr 2fr;
}
```

**Карточка на `__text-container`:**

```css
.about-capabilities__text-container {
  max-width: 100%; /* убрать старые 80% */
  background: var(--color-white);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  padding: clamp(1.4rem, 1rem + 1.6vw, 2.25rem);
}
```

**Типографика текста:**

```css
.about-capabilities__text {
  font-size: clamp(1rem, 0.96rem + 0.3vw, 1.0625rem);
  line-height: 1.75;
  color: var(--color-gray-800);
  text-wrap: pretty;
  margin-bottom: 1.25rem; /* было 32px */
}
```

---

### 2. `about-experience` (CSS only)

**Пропорции колонок** (убрать дублированный брейкпойнт 1228px):

```css
/* было */
.about-experience__wrapper {
  grid-template-columns: 50% 50%;
}
/* + медиа 1228px: grid-template-columns: 35% 65%; */

/* станет — сразу правильные пропорции */
.about-experience__wrapper {
  grid-template-columns: 1fr 2fr;
}
/* брейкпойнт 1228px убрать */
```

**Карточка на каждый `article.about-experience__item`:**

```css
.about-experience__item {
  background: var(--color-white);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  padding: clamp(1.4rem, 1rem + 1.6vw, 2.25rem);
}
```

**Типографика:**

```css
.about-experience__item-text {
  font-size: clamp(1rem, 0.96rem + 0.3vw, 1.0625rem);
  line-height: 1.75;
  color: var(--color-gray-800);
  text-wrap: pretty;
}

.about-experience__title {
  font-size: clamp(1.05rem, 1rem + 0.4vw, 1.2rem);
  font-weight: 600;
  color: var(--color-blue-700); /* оставить фирменный цвет */
}

.about-experience__name {
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-gray-500);
  margin-bottom: 0.75rem;
}

.about-experience__date {
  font-size: 0.875rem;
  color: var(--color-gray-500);
  white-space: nowrap;
}
```

**Убрать мёртвый CSS:**

```css
/* удалить */
.about-experience--dark {
  background-color: paleturquoise;
}
```

---

### 3. `about-education` (CSS only)

**Добавить двухколоночный layout** (сейчас нет `display: grid`):

```css
.about-education__wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
}
```

**Карточка на каждый `article.about-education__item`:**

```css
.about-education__item {
  background: var(--color-white);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  padding: clamp(1.4rem, 1rem + 1.6vw, 2.25rem);
  font-size: clamp(1rem, 0.96rem + 0.3vw, 1.0625rem);
  line-height: 1.75;
  color: var(--color-gray-800);
}
```

**Типографика внутри item:**

```css
.about-education__title {
  max-width: 100%; /* убрать хардкод 850px */
  font-size: clamp(1rem, 0.96rem + 0.3vw, 1.05rem);
  font-weight: 600;
  color: var(--color-blue-700);
  margin-bottom: 0.25rem;
}

/* добавить стиль даты (сейчас нет) */
.about-education__date {
  font-size: 0.875rem;
  color: var(--color-gray-500);
  white-space: nowrap;
}
```

**Убрать устаревшее медиа-правило** `max-width: 1228px` для `__head` (не нужно при grid layout).

---

## Порядок коммитов

1. `style(aboutCapabilities)` — сетка 1fr/2fr, карточка на text-container, типографика
2. `style(aboutExperience)` — сетка 1fr/2fr (убрать дубль брейкпойнта), карточки на item, типографика, удалить мёртвый `.about-experience--dark`
3. `style(aboutEducation)` — добавить grid, карточки на item, типографика

## Scope

- Только CSS (`style.css` трёх компонентов)
- JSX не трогаем (структура уже корректная)
- Не добавляем новые зависимости

## Открытые вопросы (согласовать при реализации)

- Нужна ли левая цветная полоска (`::before`) как у `about-story__para`? Или достаточно только карточки?
- Уменьшать ли `gap` между элементами списков (сейчас `80px`) с учётом карточек?
