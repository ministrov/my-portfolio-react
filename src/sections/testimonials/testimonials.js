/**
 * Данные отзывов для секции Testimonials.
 *
 * Видимый текст хранится в виде i18n-ключей (резолвится через `t()` в карточке),
 * как в `src/sections/projects/projects.js`. Отзывы не привязаны к конкретному
 * реальному человеку или компании — вместо имени указывается тип проекта
 * (`context`), чтобы не выдумывать личности и названия организаций.
 * Поле `accent` управляет цветом CSS-иконки цитаты и подставляется как
 * динамический inline-стиль.
 *
 * @typedef {Object} Testimonial
 * @property {number} id - Уникальный идентификатор отзыва
 * @property {string} accent - HEX-цвет иконки цитаты (динамический inline-стиль)
 * @property {string} quote - i18n-ключ текста отзыва
 * @property {string} context - i18n-ключ типа проекта (например, «Клиент · Корпоративный сайт»)
 *
 * @type {Testimonial[]}
 */
export const testimonials = [
  {
    id: 1,
    accent: '#0058a7',
    quote: 'testimonials.cards.one.quote',
    context: 'testimonials.cards.one.context',
  },
  {
    id: 2,
    accent: '#7c3aed',
    quote: 'testimonials.cards.two.quote',
    context: 'testimonials.cards.two.context',
  },
  {
    id: 3,
    accent: '#0e7490',
    quote: 'testimonials.cards.three.quote',
    context: 'testimonials.cards.three.context',
  },
  {
    id: 4,
    accent: '#be185d',
    quote: 'testimonials.cards.four.quote',
    context: 'testimonials.cards.four.context',
  },
  {
    id: 5,
    accent: '#15803d',
    quote: 'testimonials.cards.five.quote',
    context: 'testimonials.cards.five.context',
  },
  {
    id: 6,
    accent: '#b45309',
    quote: 'testimonials.cards.six.quote',
    context: 'testimonials.cards.six.context',
  },
];
