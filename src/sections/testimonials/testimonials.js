/**
 * Моковые данные отзывов клиентов для секции Testimonials.
 *
 * Видимый текст хранится в виде i18n-ключей (резолвится через `t()` в карточке),
 * как в `src/sections/projects/projects.js`. Имена клиентов — имена собственные,
 * поэтому оставлены литералами. Поля `initials` и `accent` управляют CSS-аватаром
 * (цветной кружок с инициалами); `accent` подставляется как динамический inline-стиль.
 *
 * @typedef {Object} Testimonial
 * @property {number} id - Уникальный идентификатор отзыва
 * @property {string} name - Имя клиента (литерал, имя собственное)
 * @property {string} initials - Инициалы для аватара-заглушки
 * @property {string} accent - HEX-цвет фона аватара (динамический inline-стиль)
 * @property {string} quote - i18n-ключ текста отзыва
 * @property {string} position - i18n-ключ должности/компании
 *
 * @type {Testimonial[]}
 */
export const testimonials = [
  {
    id: 1,
    name: 'Michael Johnson',
    initials: 'MJ',
    accent: '#0058a7',
    quote: 'testimonials.michael.quote',
    position: 'testimonials.michael.position',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    initials: 'SC',
    accent: '#7c3aed',
    quote: 'testimonials.sarah.quote',
    position: 'testimonials.sarah.position',
  },
  {
    id: 3,
    name: 'David Müller',
    initials: 'DM',
    accent: '#0e7490',
    quote: 'testimonials.david.quote',
    position: 'testimonials.david.position',
  },
  {
    id: 4,
    name: 'Elena Rossi',
    initials: 'ER',
    accent: '#be185d',
    quote: 'testimonials.elena.quote',
    position: 'testimonials.elena.position',
  },
  {
    id: 5,
    name: 'James Carter',
    initials: 'JC',
    accent: '#15803d',
    quote: 'testimonials.james.quote',
    position: 'testimonials.james.position',
  },
  {
    id: 6,
    name: 'Aisha Khan',
    initials: 'AK',
    accent: '#b45309',
    quote: 'testimonials.aisha.quote',
    position: 'testimonials.aisha.position',
  },
];
