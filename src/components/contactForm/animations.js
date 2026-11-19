/**
 * Пресеты анимации формы заявок для `m.*` из `motion/react`: откуда элемент
 * появляется, куда уходит и сколько длится анимация. Раскладываются в элемент
 * целиком: `<m.div {...FADE_UP}>`.
 *
 * Лежат в отдельном `.js`, потому что нужны двум компонентам — `ContactForm`
 * и `ContactFormField`. Экспорт объекта из файла с компонентом ломает быстрое
 * обновление в разработке, и линтер ругается правилом
 * `react-refresh/only-export-components`. Пресеты формы держим в одном месте.
 *
 * @module contactForm/animations
 */

/** Анимация fade + сдвиг вверх — для блока успеха и формы. */
export const FADE_UP = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
};

/** Анимация slide-down — для inline-ошибок и баннера. */
export const SLIDE_DOWN = {
  initial: { opacity: 0, y: -4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.18 },
};
