import UpButton from './UpButton';
import useMediaQuery from '../../hooks/useMediaQuery';

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

/** Планшет и телефон: здесь «↑» появляется только при прокрутке вверх. */
const COMPACT_QUERY = '(max-width: 1024px)';

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
