import { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  LazyMotion,
  m,
  domAnimation,
  AnimatePresence,
  useReducedMotion,
} from 'motion/react';
import { useTranslation } from 'react-i18next';
import { FaLongArrowAltUp } from 'react-icons/fa';
import debounce from '../../utils/debounce';
import useKeyboardHandlers from '../../hooks/useKeyboardHandlers';
import useMediaQuery from '../../hooks/useMediaQuery';
import './style.css';

/** Планшет и телефон: здесь «↑» появляется только при прокрутке вверх. */
const COMPACT_QUERY = '(max-width: 1024px)';

/** Сколько экранов нужно прокрутить, прежде чем «↑» сможет появиться на ≤ 1024 px. */
const REVEAL_AFTER_SCREENS = 2;

/**
 * Сдвиг прокрутки в px, на который кнопка не реагирует: гасит дрожание
 * инерционной прокрутки iOS, где `scrollY` колеблется на несколько пикселей.
 */
const SCROLL_DELTA = 8;

/**
 * Блоки, поверх которых кнопка на ≤ 1024 px не показывается: она закрывала бы
 * поля формы и ссылки футера. Лежат в других компонентах, поэтому ищутся
 * селектором — как `.contact` в `CtaButton`.
 */
const HIDE_OVER_SELECTORS = ['.contact-form', '.main-footer'];

/** Скрытое состояние на ≤ 1024 px: прозрачность и сдвиг на 8 px вниз. */
const COMPACT_HIDDEN = { y: 8, opacity: 0 };

/** Видимое состояние на ≤ 1024 px. */
const COMPACT_SHOWN = { y: 0, opacity: 1 };

/**
 * Кнопка «Наверх» в одной из двух раскладок. Рендерится из `Up` с `key` по
 * раскладке: при повороте планшета через 1024 px компонент монтируется
 * заново, и состояние одной раскладки не протекает в другую.
 *
 * - **≥ 1025 px** — как раньше: синий квадрат, виден после `threshold` px
 *   прокрутки, обработчик прокрутки через debounce.
 * - **≤ 1024 px** — полупрозрачный круг. Виден только при прокрутке вверх
 *   ниже двух экранов и прячется при прокрутке вниз; сдвиги до 8 px не
 *   считаются. Скрыт, пока в кадре форма контактов или футер. Прокрутка
 *   обрабатывается не чаще раза за кадр: направление нужно ловить во время
 *   прокрутки, а debounce сработал бы только после паузы.
 *
 * Пропсы — как у `Up`, плюс раскладка.
 *
 * @component
 * @param {Object} props - Пропсы компонента.
 * @param {boolean} props.isCompact - Раскладка планшета и телефона (≤ 1024 px).
 * @returns {JSX.Element} Кнопка с иконкой стрелки вверх, обёрнутая в анимационные компоненты.
 */
const UpButton = ({
  isCompact,
  threshold,
  icon,
  iconSize,
  iconColor,
  className,
  ariaLabel,
  smoothScroll,
  debounceDelay,
  animationDuration,
  animationEase,
  enableEscape,
  autoFocus,
  tabIndex,
  onClick,
}) => {
  const [isShowed, setIsShowed] = useState(false);
  const [isOverHiddenBlock, setIsOverHiddenBlock] = useState(false);
  const buttonRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const { pathname } = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();

  /**
   * Обработчик события прокрутки страницы.
   * На десктопе показывает кнопку ниже порога; на ≤ 1024 px — только при
   * прокрутке вверх ниже двух экранов.
   * @private
   */
  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return;

    const { scrollY, innerHeight } = window;

    if (!isCompact) {
      setIsShowed(scrollY >= threshold);
      return;
    }

    const delta = scrollY - lastScrollYRef.current;
    if (Math.abs(delta) <= SCROLL_DELTA) return;

    lastScrollYRef.current = scrollY;
    setIsShowed(delta < 0 && scrollY > innerHeight * REVEAL_AFTER_SCREENS);
  }, [isCompact, threshold]);

  /**
   * Плавно скроллит окно к началу страницы.
   * @private
   */
  const scrollToTop = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({
      top: 0,
      behavior: smoothScroll ? 'smooth' : 'auto',
    });
    if (onClick && typeof onClick === 'function') {
      onClick();
    }
  }, [smoothScroll, onClick]);

  // Обработчик глобального Escape для скрытия кнопки
  const { handleGlobalKeyDown } = useKeyboardHandlers({
    isShowed,
    enableEscape,
    setIsShowed,
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // Десктоп: дебаунс ограничивает частоту вызовов. Создаётся здесь, а не в
    // useMemo: обработчик читает ref, а при рендере refs читать нельзя.
    if (!isCompact) {
      const debouncedHandleScroll = debounce(handleScroll, debounceDelay);
      window.addEventListener('scroll', debouncedHandleScroll, {
        passive: true,
      });
      return () => {
        window.removeEventListener('scroll', debouncedHandleScroll);
      };
    }

    // ≤ 1024 px: не чаще раза за кадр, чтобы ловить направление во время прокрутки
    let frameId = 0;
    const handleScrollFrame = () => {
      if (frameId) return;
      frameId = requestAnimationFrame(() => {
        frameId = 0;
        handleScroll();
      });
    };

    window.addEventListener('scroll', handleScrollFrame, { passive: true });
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScrollFrame);
    };
  }, [isCompact, handleScroll, debounceDelay]);

  useEffect(() => {
    if (!enableEscape) return undefined;

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [handleGlobalKeyDown, enableEscape]);

  // На ≤ 1024 px следим, видны ли форма контактов и футер. Поиск повторяется
  // при смене маршрута: на каждой странице своя форма.
  useEffect(() => {
    if (!isCompact) return undefined;

    const targets = HIDE_OVER_SELECTORS.map((selector) =>
      document.querySelector(selector)
    ).filter(Boolean);
    const visibleTargets = new Set();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) visibleTargets.add(target);
        else visibleTargets.delete(target);
      });
      setIsOverHiddenBlock(visibleTargets.size > 0);
    });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [isCompact, pathname]);

  const isVisible = isShowed && !isOverHiddenBlock;

  // Автофокус при появлении кнопки
  useEffect(() => {
    if (isVisible && autoFocus && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [isVisible, autoFocus]);

  // На ≤ 1024 px иконка берёт цвет кнопки из CSS (`currentColor`): react-icons
  // пишет `color` в inline-стиль, и CSS его иначе не перебьёт.
  const IconComponent = icon || (
    <FaLongArrowAltUp
      size={iconSize}
      color={isCompact ? 'currentColor' : iconColor}
    />
  );

  const motionProps = isCompact
    ? {
        initial: COMPACT_HIDDEN,
        animate: COMPACT_SHOWN,
        exit: COMPACT_HIDDEN,
        transition: {
          duration: prefersReducedMotion ? 0 : 0.2,
          ease: 'easeOut',
        },
      }
    : {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 50, opacity: 0 },
        transition: { duration: animationDuration, ease: animationEase },
      };

  return (
    <AnimatePresence>
      {isVisible && (
        <LazyMotion features={domAnimation}>
          <m.button
            ref={buttonRef}
            type="button"
            {...motionProps}
            className={`scroll-to ${className}`.trim()}
            onClick={scrollToTop}
            aria-label={ariaLabel ?? t('up.ariaLabel')}
            tabIndex={tabIndex}
          >
            {IconComponent}
          </m.button>
        </LazyMotion>
      )}
    </AnimatePresence>
  );
};

/**
 * Компонент кнопки "Наверх" (Scroll-to-top).
 * Появляется при прокрутке страницы и плавно скроллит к началу. Поддерживает
 * анимации появления/исчезновения через Motion и обработку клавиатуры.
 *
 * На ≥ 1025 px кнопка видна после `threshold` px прокрутки. На ≤ 1024 px она
 * не закрывает текст при чтении: появляется только при прокрутке вверх после
 * двух экранов и прячется, пока в кадре форма контактов или футер (подробно —
 * в `UpButton`).
 *
 * @component
 * @param {Object} props - Пропсы компонента.
 * @param {number} [props.threshold=300] - Порог прокрутки в пикселях, после которого кнопка становится видимой на ≥ 1025 px.
 * @param {React.ReactNode} [props.icon] - Иконка кнопки. По умолчанию используется FaLongArrowAltUp.
 * @param {number} [props.iconSize=20] - Размер иконки в пикселях.
 * @param {string} [props.iconColor='white'] - Цвет иконки (CSS-значение) на ≥ 1025 px; на ≤ 1024 px цвет задаёт CSS.
 * @param {string} [props.className=''] - Дополнительный CSS-класс для кнопки.
 * @param {string} [props.ariaLabel] - Текст для aria-label. По умолчанию берётся локализованный ключ `up.ariaLabel`.
 * @param {boolean} [props.smoothScroll=true] - Использовать ли плавный скролл.
 * @param {number} [props.debounceDelay=100] - Задержка дебаунса для события прокрутки в миллисекундах (≥ 1025 px).
 * @param {number} [props.animationDuration=0.65] - Длительность анимации появления/исчезновения в секундах (≥ 1025 px).
 * @param {string} [props.animationEase='easeOut'] - Функция плавности анимации (≥ 1025 px).
 * @param {boolean} [props.enableEscape=true] - Разрешить скрытие кнопки по клавише Escape.
 * @param {boolean} [props.autoFocus=false] - Автоматически фокусировать кнопку при появлении.
 * @param {number} [props.tabIndex=0] - Значение tabindex для кнопки.
 * @param {Function} [props.onClick] - Дополнительный обработчик клика (вызывается после скролла).
 * @returns {JSX.Element} Кнопка с иконкой стрелки вверх, обёрнутая в анимационные компоненты.
 *
 * @example
 * // Базовое использование
 * <Up />
 *
 * @example
 * // С кастомными параметрами
 * <Up
 *   threshold={500}
 *   icon={<CustomIcon />}
 *   iconSize={24}
 *   iconColor="#ff0000"
 *   className="my-up-button"
 *   ariaLabel="Scroll to top"
 *   smoothScroll={false}
 *   debounceDelay={200}
 *   animationDuration={0.8}
 *   animationEase="easeInOut"
 *   enableEscape={false}
 *   autoFocus={true}
 * />
 */
const Up = ({
  threshold = 300,
  icon = null,
  iconSize = 20,
  iconColor = 'white',
  className = '',
  ariaLabel = null,
  smoothScroll = true,
  debounceDelay = 100,
  animationDuration = 0.65,
  animationEase = 'easeOut',
  enableEscape = true,
  autoFocus = false,
  tabIndex = 0,
  onClick = null,
}) => {
  const isCompact = useMediaQuery(COMPACT_QUERY);

  return (
    <UpButton
      key={isCompact ? 'compact' : 'desktop'}
      isCompact={isCompact}
      threshold={threshold}
      icon={icon}
      iconSize={iconSize}
      iconColor={iconColor}
      className={className}
      ariaLabel={ariaLabel}
      smoothScroll={smoothScroll}
      debounceDelay={debounceDelay}
      animationDuration={animationDuration}
      animationEase={animationEase}
      enableEscape={enableEscape}
      autoFocus={autoFocus}
      tabIndex={tabIndex}
      onClick={onClick}
    />
  );
};

export default Up;
