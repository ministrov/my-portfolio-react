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
 * Появление заголовка: наводка из блюра, без сдвига и поворота.
 *
 * Блюр без движения выбран не случайно. У `.hero__title` стоит
 * `overflow: hidden` — он нужен диагональному блику (`.hero__title-glare`).
 * Пока заголовок был прозрачным, сдвиг снизу маскировала прозрачность; как
 * только он стал виден с первого кадра (см. ниже), нижний край `h1` начал
 * резать текст видимым швом. Поэтому движение из пресета убрано, осталась
 * только наводка из блюра.
 *
 * Прозрачности в пресете нет сознательно (S04-T05): заголовок — элемент LCP на
 * главной, а `opacity: 0` на старте откладывал его отрисовку на всё время
 * появления. Замер до правки: наблюдаемый LCP 1584 мс при FCP 316 мс, в режиме
 * `prefers-reduced-motion` (там от пресета оставалась одна прозрачность) —
 * 912 мс. Без прозрачности заголовок виден с первого кадра, LCP упирается в FCP.
 *
 * При `prefers-reduced-motion` этот пресет отдельной версии не требует:
 * `MotionConfig reducedMotion="user"` сам гасит анимации `transform` и `filter`,
 * и заголовок просто появляется.
 * @type {import('motion/react').MotionProps}
 */
export const titleReveal = {
  initial: { filter: 'blur(10px)' },
  animate: { filter: 'blur(0px)' },
  transition: {
    duration: 1.05,
    delay: ANIMATION_DELAYS.TITLE,
    ease: [0.16, 1, 0.3, 1],
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
