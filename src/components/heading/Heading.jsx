import PropTypes from 'prop-types';
import './style.css';

/**
 * Компонент заголовка секции: крупный двухтоновый вариант — начало
 * обычным цветом + акцентная часть вторым цветом.
 *
 * @component
 * @param {Object} props - Свойства компонента
 * @param {string} props.title - Основной заголовок (обязательный)
 * @param {string} [props.accent] - Акцентная часть заголовка
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {number} [props.level=2] - Уровень заголовка (1-6) для семантики HTML
 * @param {string} [props.id] - HTML-идентификатор для навигации и доступности
 * @returns {JSX.Element} Заголовок секции с семантической разметкой
 */
const Heading = ({ title, accent, className = '', level = 2, id }) => {
  // Валидация уровня заголовка
  const headingLevel = Math.min(Math.max(1, level), 6);
  const HeadingTag = `h${headingLevel}`;

  const displayClasses = [
    'heading',
    'heading-sec',
    'heading-sec--display',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <HeadingTag className={displayClasses} id={id}>
      {title}
      {accent && (
        <>
          {' '}
          <span className="heading-sec__accent">{accent}</span>
        </>
      )}
    </HeadingTag>
  );
};

Heading.propTypes = {
  /** Основной заголовок (обязательный) */
  title: PropTypes.string.isRequired,
  /** Акцентная часть заголовка */
  accent: PropTypes.string,
  /** Дополнительные CSS-классы */
  className: PropTypes.string,
  /** Уровень заголовка (1-6) для семантики HTML */
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  /** HTML-идентификатор для навигации и доступности */
  id: PropTypes.string,
};

export default Heading;
