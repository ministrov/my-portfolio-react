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
import './style.css';

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
 * селектором — как заголовок контактов в `useGoToContacts`.
 */
const HIDE_OVER_SELECTORS = ['.contact-form', '.main-footer'];

/** Скрытое состояние на ≤ 1024 px: прозрачность и сдвиг на 8 px вниз. */
const COMPACT_HIDDEN = { y: 8, opacity: 0 };

/** Видимое состояние на ≤ 1024 px. */
const COMPACT_SHOWN = { y: 0, opacity: 1 };

/** Сколько px нужно прокрутить на ≥ 1025 px, чтобы кнопка появилась. */
const SCROLL_THRESHOLD = 300;

/** Размер стрелки в px. */
const ICON_SIZE = 20;

/** Цвет стрелки на ≥ 1025 px; на ≤ 1024 px цвет задаёт CSS через `currentColor`. */
const ICON_COLOR = 'white';

/**
 * Задержка дебаунса прокрутки на ≥ 1025 px, мс: кнопка решает, показываться ли,
 * после паузы в прокрутке, а не на каждое событие.
 */
const DEBOUNCE_DELAY = 100;

/** Длительность появления и исчезновения на ≥ 1025 px, с. На ≤ 1024 px — своя, в `motionProps`. */
const ANIMATION_DURATION = 0.65;

/** Плавность появления и исчезновения на ≥ 1025 px. */
const ANIMATION_EASE = 'easeOut';

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
const UpButton = ({ isCompact }) => {
  const [isShowed, setIsShowed] = useState(false);
  const [isOverHiddenBlock, setIsOverHiddenBlock] = useState(false);
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
      setIsShowed(scrollY >= SCROLL_THRESHOLD);
      return;
    }

    const delta = scrollY - lastScrollYRef.current;
    if (Math.abs(delta) <= SCROLL_DELTA) return;

    lastScrollYRef.current = scrollY;
    setIsShowed(delta < 0 && scrollY > innerHeight * REVEAL_AFTER_SCREENS);
  }, [isCompact]);

  /**
   * Плавно скроллит окно к началу страницы.
   * @private
   */
  const scrollToTop = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  // Обработчик глобального Escape для скрытия кнопки
  const { handleGlobalKeyDown } = useKeyboardHandlers({
    isShowed,
    enableEscape: true,
    setIsShowed,
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // Десктоп: дебаунс ограничивает частоту вызовов. Создаётся здесь, а не в
    // useMemo: обработчик читает ref, а при рендере refs читать нельзя.
    if (!isCompact) {
      const debouncedHandleScroll = debounce(handleScroll, DEBOUNCE_DELAY);
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
  }, [isCompact, handleScroll]);

  useEffect(() => {
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [handleGlobalKeyDown]);

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
  // На ≤ 1024 px иконка берёт цвет кнопки из CSS (`currentColor`): react-icons
  // пишет `color` в inline-стиль, и CSS его иначе не перебьёт.
  const IconComponent = (
    <FaLongArrowAltUp
      size={ICON_SIZE}
      color={isCompact ? 'currentColor' : ICON_COLOR}
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
        transition: { duration: ANIMATION_DURATION, ease: ANIMATION_EASE },
      };

  return (
    <AnimatePresence>
      {isVisible && (
        <LazyMotion features={domAnimation}>
          <m.button
            type="button"
            {...motionProps}
            className={'scroll-to'}
            onClick={scrollToTop}
            aria-label={t('up.ariaLabel')}
          >
            {IconComponent}
          </m.button>
        </LazyMotion>
      )}
    </AnimatePresence>
  );
};

export default UpButton;
