import { useState, useEffect, useCallback, useMemo } from 'react';
import { LazyMotion, m, domAnimation } from 'framer-motion';
import debounce from '../../utils/debounce';
import { DEFAULT_CONFIG, BREAKPOINTS } from '../../const';
import './styles.css';

/**
 * @typedef {Object} Star
 * @property {number} id - Уникальный идентификатор звезды
 * @property {number} size - Размер звезды в пикселях
 * @property {number} x - Позиция по X в процентах
 * @property {number} y - Позиция по Y в процентах
 * @property {number} baseOpacity - Базовая непрозрачность
 * @property {'pulse' | 'drift'} animationType - Тип анимации
 * @property {number} driftDistance - Дистанция дрейфа
 * @property {number} driftAngle - Угол дрейфа в градусах
 * @property {number} pulseIntensity - Интенсивность пульсации
 * @property {number} pulseDuration - Длительность пульсации
 * @property {number} duration - Общая длительность анимации
 * @property {string} color - Цвет звезды
 */

/**
 * @typedef {Object} AnimatedBackgroundProps
 * @property {number} [maxStars] - Максимальное количество звёзд
 * @property {number} [minStars] - Минимальное количество звёзд
 * @property {string[]} [colors] - Массив цветов для звёзд
 * @property {boolean} [disabledOnMobile] - Отключить на мобильных устройствах
 * @property {boolean} [responsive] - Адаптировать количество звёзд при изменении размера окна
 */

/** Медиа-запрос для определения предпочтения уменьшенного движения */
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Возвращает конфигурацию анимации для звезды.
 * Чистая функция: зависит только от переданного объекта звезды.
 *
 * @param {Star} star - Объект звезды
 * @returns {Object} Конфигурация анимации для Framer Motion
 */
const getStarAnimation = (star) => {
  if (star.animationType === 'pulse') {
    return {
      opacity: [
        star.baseOpacity,
        star.baseOpacity + star.pulseIntensity,
        star.baseOpacity,
      ],
      scale: [1, 1.3, 1],
      transition: {
        duration: star.pulseDuration,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
      },
    };
  }

  const rad = (star.driftAngle * Math.PI) / 180;
  const x = Math.cos(rad) * star.driftDistance;
  const y = Math.sin(rad) * star.driftDistance;

  return {
    x: [0, x, 0, -x, 0],
    y: [0, y, 0, -y, 0],
    opacity: [
      star.baseOpacity,
      star.baseOpacity * 0.8,
      star.baseOpacity,
      star.baseOpacity * 0.6,
      star.baseOpacity,
    ],
    transition: {
      duration: star.duration,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    },
  };
};

/**
 * Анимированный фон со звёздами для портфолио
 * @param {AnimatedBackgroundProps} props - Свойства компонента
 * @returns {JSX.Element} Компонент анимированного фона
 */
const AnimatedBackground = ({
  maxStars = DEFAULT_CONFIG.MAX_STARS,
  minStars = DEFAULT_CONFIG.MIN_STARS,
  colors = DEFAULT_CONFIG.COLORS,
  disabledOnMobile = true,
  responsive = true,
}) => {
  const [stars, setStars] = useState([]);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia(REDUCED_MOTION_QUERY).matches
  );

  /**
   * Генерирует массив звёзд на основе текущих параметров
   * @returns {Star[]} Массив сгенерированных звёзд
   */
  const generateStars = useCallback(() => {
    if (typeof window === 'undefined') return [];

    // Адаптивное количество звёзд в зависимости от ширины окна
    const countStars = Math.min(
      maxStars,
      Math.max(minStars, Math.floor(windowSize.width / 5))
    );

    const newStars = [];
    for (let i = 0; i < countStars; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() *
        (DEFAULT_CONFIG.STAR_SIZE_MAX - DEFAULT_CONFIG.STAR_SIZE_MIN) +
        DEFAULT_CONFIG.STAR_SIZE_MIN;
      const baseOpacity = Math.random() *
        (DEFAULT_CONFIG.STAR_OPACITY_MAX - DEFAULT_CONFIG.STAR_OPACITY_MIN) +
        DEFAULT_CONFIG.STAR_OPACITY_MIN;

      const animationType = Math.random() > DEFAULT_CONFIG.PULSE_PROBABILITY ? 'pulse' : 'drift';

      newStars.push({
        id: i,
        size,
        x: Math.random() * 100,
        y: Math.random() * 100,
        baseOpacity,
        animationType,
        driftDistance: Math.random() *
          (DEFAULT_CONFIG.DRIFT_DISTANCE_MAX - DEFAULT_CONFIG.DRIFT_DISTANCE_MIN) +
          DEFAULT_CONFIG.DRIFT_DISTANCE_MIN,
        driftAngle: Math.random() * 360,
        pulseIntensity: Math.random() *
          (DEFAULT_CONFIG.PULSE_INTENSITY_MAX - DEFAULT_CONFIG.PULSE_INTENSITY_MIN) +
          DEFAULT_CONFIG.PULSE_INTENSITY_MIN,
        pulseDuration: Math.random() *
          (DEFAULT_CONFIG.PULSE_DURATION_MAX - DEFAULT_CONFIG.PULSE_DURATION_MIN) +
          DEFAULT_CONFIG.PULSE_DURATION_MIN,
        color,
        duration: Math.random() *
          (DEFAULT_CONFIG.DRIFT_DURATION_MAX - DEFAULT_CONFIG.DRIFT_DURATION_MIN) +
          DEFAULT_CONFIG.DRIFT_DURATION_MIN,
      });
    }
    return newStars;
  }, [maxStars, minStars, colors, windowSize.width]);

  /**
   * Обработчик изменения размера окна
   */
  useEffect(() => {
    if (!responsive || typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Debounce для оптимизации производительности
    const debouncedResize = debounce(handleResize, 250);
    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
    };
  }, [responsive]);

  /**
   * Отслеживание системной настройки "уменьшить движение"
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const handleChange = (event) => setPrefersReducedMotion(event.matches);

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  /**
   * Генерация звёзд при изменении зависимостей
   */
  useEffect(() => {
    const newStars = generateStars();
    setStars(newStars);
  }, [generateStars]);

  /**
   * Мемоизированный рендер звёзд для оптимизации.
   * При включённой настройке "уменьшить движение" звёзды рендерятся статично.
   */
  const renderedStars = useMemo(() => {
    return stars.map((star) => (
      <m.div
        key={star.id}
        className="star"
        initial={{
          opacity: star.baseOpacity,
          scale: 1,
          x: 0,
          y: 0,
        }}
        animate={prefersReducedMotion ? undefined : getStarAnimation(star)}
        style={{
          width: `${star.size}px`,
          height: `${star.size}px`,
          left: `${star.x}%`,
          top: `${star.y}%`,
          background: `${star.color}`,
          boxShadow: `0 0 ${star.size * 3}px ${star.color}`,
        }}
      />
    ));
  }, [stars, prefersReducedMotion]);

  // Проверка на мобильные устройства
  const isMobile =
    typeof window !== 'undefined' && window.innerWidth <= BREAKPOINTS.MOBILE;
  if (disabledOnMobile && isMobile) {
    return null;
  }

  return (
    <div
      className="background"
      aria-hidden="true"
      role="presentation"
    >
      <LazyMotion features={domAnimation}>
        {renderedStars}
      </LazyMotion>
    </div>
  );
};

export default AnimatedBackground;
