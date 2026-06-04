import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

/**
 * Декоративный индикатор скролла в виде мыши с анимацией.
 * Используется для визуальной подсказки о возможности прокрутки страницы.
 * Полностью скрыт от вспомогательных технологий (aria-hidden).
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {string} [props.color='var(--color-blue-700)'] - Цвет рамки и точки.
 * @param {number} [props.size=25] - Ширина мыши в пикселях.
 * @param {number} [props.animationDuration=1.3] - Длительность анимации в секундах.
 * @param {string} [props.className=''] - Дополнительные CSS-классы для контейнера.
 * @returns {JSX.Element} Элемент скролла мыши.
 *
 * @example
 * <MouseScroll className="promo__mouse-scroll-cont" />
 */
const MouseScroll = ({
  color = 'var(--color-blue-700)',
  size = 25,
  animationDuration = 1.3,
  className = '',
}) => {
  const containerStyle = {
    '--mouse-color': color,
    '--mouse-width': `${size}px`,
    '--mouse-height': `${size * 1.6}px`,
    '--mouse-dot-size': `${size * 0.2}px`,
    '--mouse-travel-distance': `${size * 0.8}px`,
    '--mouse-animation-duration': `${animationDuration}s`,
  };

  const computedClassName = ['mouse-scroll', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={computedClassName}
      style={containerStyle}
      aria-hidden="true"
    >
      <div className="mouse"></div>
    </div>
  );
};

MouseScroll.propTypes = {
  /** Цвет рамки и точки */
  color: PropTypes.string,
  /** Ширина мыши в пикселях */
  size: PropTypes.number,
  /** Длительность анимации в секундах */
  animationDuration: PropTypes.number,
  /** Дополнительные CSS-классы для контейнера */
  className: PropTypes.string,
};

export default memo(MouseScroll);
