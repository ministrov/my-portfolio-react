import { useMemo } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * Общие настройки viewport для появления по скроллу.
 * `once: true` обязателен: без него motion переигрывает вход каждый раз,
 * когда секция снова попадает в кадр.
 * @type {import('motion/react').ViewportOptions}
 */
export const REVEAL_VIEWPORT = { once: true, margin: '-50px' };

/** Кривая плавности появления, общая для всех секций страницы. */
export const REVEAL_EASE = [0.25, 0.1, 0.25, 1];

/** Стартовое состояние по умолчанию: короткий подъём снизу. */
const DEFAULT_FROM = { opacity: 0, y: 20 };

/** Длительность и кривая облегчённого варианта (prefers-reduced-motion). */
const REDUCED_TRANSITION = { duration: 0.3, ease: 'linear' };

/**
 * Свойства, покоящееся значение которых равно 1, а не 0.
 * Всё остальное (x, y, rotate) приходит в ноль.
 */
const UNIT_REST_PROPS = new Set(['opacity', 'scale', 'scaleX', 'scaleY']);

/**
 * Возвращает пропсы появления секции по скроллу с корректным фолбэком
 * на `prefers-reduced-motion`.
 *
 * ВНИМАНИЕ: сейчас хук никем не импортируется. Появления по скроллу на
 * главной сняты намеренно — движение ниже первого экрана принадлежит
 * взаимодействию, а не прокрутке. Хук оставлен как готовая точка возврата,
 * если решим вернуть раскрытие точечно в одну секцию.
 *
 * Существует, потому что каждая секция главной несла собственную копию
 * конфига `whileInView`, и ни одна из них (кроме hero) не гасила анимацию
 * при системной настройке «уменьшить движение»: CSS-блоки
 * `prefers-reduced-motion` снимали только hover-трансформы, а JS-вход
 * продолжал играть.
 *
 * При включённой настройке от исходного состояния остаётся только
 * прозрачность — контент по-прежнему проявляется, но не движется.
 *
 * @param {Object} [options] - Параметры появления
 * @param {Object} [options.from] - Стартовое состояние (по умолчанию `{ opacity: 0, y: 20 }`).
 *   Держите объект на уровне модуля: инлайновый литерал меняет ссылку каждый
 *   рендер и обнуляет мемоизацию.
 * @param {number} [options.delay=0] - Задержка появления в секундах
 * @param {number} [options.duration=0.5] - Длительность появления в секундах
 * @returns {import('motion/react').MotionProps} Пропсы для `m.*`-элемента
 * @example
 * const reveal = useRevealMotion({ delay: index * 0.06 });
 * return <m.li {...reveal}>…</m.li>;
 */
const useRevealMotion = ({
  from = DEFAULT_FROM,
  delay = 0,
  duration = 0.5,
} = {}) => {
  const prefersReducedMotion = useReducedMotion();

  return useMemo(() => {
    // Ключи стартового состояния задают и целевое: анимируем ровно те
    // свойства, что были смещены, и ничего сверх того
    const initial = prefersReducedMotion ? { opacity: 0 } : from;
    const whileInView = Object.fromEntries(
      Object.keys(initial).map((key) => [key, UNIT_REST_PROPS.has(key) ? 1 : 0])
    );

    return {
      initial,
      whileInView,
      viewport: REVEAL_VIEWPORT,
      transition: prefersReducedMotion
        ? { ...REDUCED_TRANSITION, delay }
        : { duration, delay, ease: REVEAL_EASE },
    };
  }, [prefersReducedMotion, from, delay, duration]);
};

export default useRevealMotion;
