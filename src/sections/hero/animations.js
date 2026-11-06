/**
 * Пресеты анимации героя для `m.*` из `motion/react` и задержки появления его
 * частей. Раскладываются в элемент целиком: `<m.div {...titleReveal}>`.
 *
 * Лежат в отдельном `.js`, потому что нужны двум компонентам — `Hero` и
 * `HeroSubtitle`. Экспорт объекта из файла с компонентом ломает быстрое
 * обновление в разработке, и линтер ругается правилом
 * `react-refresh/only-export-components`. Порядок появления задан одной
 * таблицей `ANIMATION_DELAYS` — поэтому все пресеты героя в одном месте.
 *
 * @module hero/animations
 */

/**
 * Константы для анимационных задержек появления (в секундах).
 * @type {{ TITLE: number, SUBTITLE: number, BUTTON: number, SCROLL_HINT: number }}
 */
export const ANIMATION_DELAYS = {
  TITLE: 0.25,
  SUBTITLE: 0.4,
  BUTTON: 0.55,
  SCROLL_HINT: 0.7,
};

/**
 * Базовая конфигурация анимации появления элементов снизу вверх.
 * Используется как общий пресет, поверх которого задаётся индивидуальная задержка.
 * @type {import('motion/react').MotionProps}
 */
export const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: {
    duration: 0.8,
    ease: [0.25, 0.1, 0.25, 1],
  },
};

/**
 * Облегчённая версия fadeUp для prefers-reduced-motion: только прозрачность,
 * без вертикального сдвига — контент всё ещё проявляется, но не движется.
 * @type {import('motion/react').MotionProps}
 */
export const fadeUpReduced = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.4, ease: 'linear' },
};

/**
 * Появление заголовка сквозь маску: контент "всплывает" из-под нижней границы
 * h1 (у которого overflow:hidden в CSS) со снятием блюра и лёгким поворотом.
 * Единый блок вместо покадрового reveal по строкам — переносы строк зависят
 * от языка (ru использует <br/>, en переносится естественно), поэтому строки
 * не фиксированы и не могут анимироваться по отдельности без риска разъехаться.
 * @type {import('motion/react').MotionProps}
 */
export const titleReveal = {
  initial: { y: '30%', rotate: 1.2, opacity: 0, filter: 'blur(10px)' },
  animate: { y: 0, rotate: 0, opacity: 1, filter: 'blur(0px)' },
  transition: {
    duration: 1.05,
    delay: ANIMATION_DELAYS.TITLE,
    ease: [0.16, 1, 0.3, 1],
  },
};

/**
 * Облегчённая версия titleReveal для prefers-reduced-motion: только
 * прозрачность, без сдвига, поворота и блюра — задержка сохранена, чтобы
 * порядок появления секций остался прежним.
 * @type {import('motion/react').MotionProps}
 */
export const titleRevealReduced = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    duration: 0.4,
    delay: ANIMATION_DELAYS.TITLE,
    ease: 'linear',
  },
};

/**
 * Появление CTA-кнопки с небольшим "перелётом" (overshoot) по масштабу —
 * кубическая безье с y1 > 1 естественно даёт эффект пружины без keyframe-массивов.
 * @type {import('motion/react').MotionProps}
 */
export const ctaPop = {
  initial: { opacity: 0, scale: 0.82, y: 14 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: {
    duration: 0.95,
    delay: ANIMATION_DELAYS.BUTTON,
    ease: [0.2, 1.5, 0.35, 1],
  },
};

/**
 * Облегчённая версия ctaPop для prefers-reduced-motion: только прозрачность,
 * без масштаба и перелёта — задержка сохранена.
 * @type {import('motion/react').MotionProps}
 */
export const ctaPopReduced = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    duration: 0.4,
    delay: ANIMATION_DELAYS.BUTTON,
    ease: 'linear',
  },
};
