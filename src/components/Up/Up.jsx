import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { LazyMotion, m, domAnimation } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { FaLongArrowAltUp } from 'react-icons/fa';
import PropTypes from 'prop-types';
import debounce from '../../utils/debounce';
import './style.css';

/**
 * Компонент кнопки "Наверх" (Scroll-to-top).
 * Автоматически появляется при прокрутке страницы ниже заданного порога и плавно скроллит к началу.
 * Поддерживает анимации появления/исчезновения через Framer Motion и обработку клавиатуры.
 *
 * @component
 * @param {Object} props - Пропсы компонента.
 * @param {number} [props.threshold=300] - Порог прокрутки в пикселях, после которого кнопка становится видимой.
 * @param {React.ReactNode} [props.icon] - Иконка кнопки. По умолчанию используется FaLongArrowAltUp.
 * @param {number} [props.iconSize=20] - Размер иконки в пикселях.
 * @param {string} [props.iconColor='white'] - Цвет иконки (CSS-значение).
 * @param {string} [props.className=''] - Дополнительный CSS-класс для кнопки.
 * @param {string} [props.ariaLabel='Вернуться в начало страницы'] - Текст для атрибута aria-label.
 * @param {boolean} [props.smoothScroll=true] - Использовать ли плавный скролл.
 * @param {number} [props.debounceDelay=100] - Задержка дебаунса для события прокрутки в миллисекундах.
 * @param {number} [props.animationDuration=0.65] - Длительность анимации появления/исчезновения в секундах.
 * @param {string} [props.animationEase='easeOut'] - Функция плавности анимации (CSS easing).
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
  ariaLabel = 'Вернуться в начало страницы',
  smoothScroll = true,
  debounceDelay = 100,
  animationDuration = 0.65,
  animationEase = 'easeOut',
  enableEscape = true,
  autoFocus = false,
  tabIndex = 0,
  onClick = null,
}) => {
  const [isShowed, setIsShowed] = useState(false);
  const buttonRef = useRef(null);

  /**
   * Обработчик события прокрутки страницы.
   * Обновляет состояние видимости кнопки в зависимости от позиции скролла.
   * @private
   */
  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      setIsShowed(window.scrollY >= threshold);
    }
  }, [threshold]);

  /**
   * Дебаунсированная версия обработчика прокрутки.
   * Ограничивает частоту вызовов для оптимизации производительности.
   * @private
   */
  const debouncedHandleScroll = useMemo(
    () => debounce(handleScroll, debounceDelay),
    [handleScroll, debounceDelay]
  );

  /**
   * Обработчик глобальных клавиш (документ).
   * Обрабатывает только Escape для скрытия кнопки.
   * @param {KeyboardEvent} e - Событие клавиатуры.
   * @private
   */
  const handleGlobalKeyDown = useCallback(
    (e) => {
      if (!isShowed || !enableEscape) return;
      if (e.key === 'Escape') {
        setIsShowed(false);
      }
    },
    [isShowed, enableEscape]
  );

  /**
   * Обработчик клавиш на кнопке.
   * Обрабатывает Enter и Space для скролла наверх.
   * @param {KeyboardEvent} e - Событие клавиатуры.
   * @private
   */
  const handleButtonKeyDown = useCallback(
    (e) => {
      if (!isShowed) return;
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          scrollToTop();
          break;
        default:
          break;
      }
    },
    [isShowed]
  );

  /**
   * Плавно скроллит окно к началу страницы.
   * @private
   */
  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({
      top: 0,
      behavior: smoothScroll ? 'smooth' : 'auto',
    });
    if (onClick && typeof onClick === 'function') {
      onClick();
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    if (enableEscape) {
      document.addEventListener('keydown', handleGlobalKeyDown);
    }

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      if (enableEscape) {
        document.removeEventListener('keydown', handleGlobalKeyDown);
      }
    };
  }, [debouncedHandleScroll, handleGlobalKeyDown, enableEscape]);

  // Автофокус при появлении кнопки
  useEffect(() => {
    if (isShowed && autoFocus && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [isShowed, autoFocus]);

  const IconComponent = icon || (
    <FaLongArrowAltUp size={iconSize} color={iconColor} />
  );

  return (
    <AnimatePresence>
      {isShowed && (
        <LazyMotion features={domAnimation}>
          <m.button
            ref={buttonRef}
            type="button"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: animationDuration, ease: animationEase }}
            className={`scroll-to ${className}`.trim()}
            onClick={scrollToTop}
            onKeyDown={handleButtonKeyDown}
            aria-label={ariaLabel}
            tabIndex={tabIndex}
          >
            {IconComponent}
          </m.button>
        </LazyMotion>
      )}
    </AnimatePresence>
  );
};

Up.propTypes = {
  threshold: PropTypes.number,
  icon: PropTypes.node,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  smoothScroll: PropTypes.bool,
  debounceDelay: PropTypes.number,
  animationDuration: PropTypes.number,
  animationEase: PropTypes.string,
  enableEscape: PropTypes.bool,
  autoFocus: PropTypes.bool,
  tabIndex: PropTypes.number,
  onClick: PropTypes.func,
};

export default Up;
