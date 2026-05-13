import './style.css';

/**
 * Компонент визуализации скролла мыши с анимацией.
 * Используется для индикации возможности прокрутки страницы.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {string} [props.color='var(--color-blue-700)'] - Цвет рамки и точки.
 * @param {number} [props.size=25] - Ширина мыши в пикселях.
 * @param {number} [props.animationDuration=1.3] - Длительность анимации в секундах.
 * @param {string} [props.className=''] - Дополнительные CSS-классы для контейнера.
 * @returns {JSX.Element} Элемент скролла мыши.
 */
const MouseScroll = ({
  color = 'var(--color-blue-700)',
  size = 25,
  animationDuration = 1.3,
  className = '',
}) => {
  // Вычисляем пропорциональные размеры
  const width = `${size}px`;
  const height = `${size * 1.6}px`; // Соотношение высоты к ширине 40/25 = 1.6
  const dotSize = `${size * 0.2}px`; // Точка составляет 20% от ширины
  const travelDistance = `${size * 0.8}px`; // Расстояние движения точки

  const containerStyle = {
    '--mouse-color': color,
    '--mouse-width': width,
    '--mouse-height': height,
    '--mouse-dot-size': dotSize,
    '--mouse-travel-distance': travelDistance,
    '--mouse-animation-duration': `${animationDuration}s`,
  };

  return (
    <div
      className={`promo__mouse-scroll-cont mouse-scroll-cont ${className}`}
      style={containerStyle}
      role="presentation"
      aria-label="Индикатор скролла мыши"
    >
      <div className="mouse"></div>
    </div>
  );
};

export default MouseScroll;
