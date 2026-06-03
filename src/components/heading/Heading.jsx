import PropTypes from 'prop-types';
import './style.css';

/**
 * Компонент заголовка секции с декоративной линией и подзаголовком.
 * 
 * @component
 * @param {Object} props - Свойства компонента
 * @param {string} props.title - Основной заголовок (обязательный)
 * @param {string} [props.slogan] - Подзаголовок (слоган)
 * @param {string} [props.className] - Дополнительные CSS-классы для основного заголовка
 * @param {string} [props.subClassName] - Дополнительные CSS-классы для подзаголовка
 * @param {number} [props.level=2] - Уровень заголовка (1-6) для семантики HTML
 * @param {boolean} [props.showLine=true] - Показывать декоративную линию под заголовком
 * @param {string} [props.id] - HTML-идентификатор для навигации и доступности
 * @returns {JSX.Element} Заголовок секции с семантической разметкой
 */
const Heading = ({
  title,
  slogan,
  className = '',
  subClassName = '',
  level = 2,
  showLine = true,
  id,
}) => {
  // Валидация уровня заголовка
  const headingLevel = Math.min(Math.max(1, level), 6);
  const HeadingTag = `h${headingLevel}`;

  // Формирование классов для основного заголовка
  const mainClasses = ['heading-sec__main', className, !showLine && 'heading-sec__main--no-line']
    .filter(Boolean)
    .join(' ');

  // Формирование классов для подзаголовка
  const subClasses = ['heading-sec__sub', subClassName].filter(Boolean).join(' ');

  return (
    <HeadingTag className="heading heading-sec heading-sec__mb-med" id={id}>
      <span className={mainClasses}>{title}</span>
      {slogan && <span className={subClasses}>{slogan}</span>}
    </HeadingTag>
  );
};

Heading.propTypes = {
  /** Основной заголовок (обязательный) */
  title: PropTypes.string.isRequired,
  /** Подзаголовок (слоган) */
  slogan: PropTypes.string,
  /** Дополнительные CSS-классы для основного заголовка */
  className: PropTypes.string,
  /** Дополнительные CSS-классы для подзаголовка */
  subClassName: PropTypes.string,
  /** Уровень заголовка (1-6) для семантики HTML */
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  /** Показывать декоративную линию под заголовком */
  showLine: PropTypes.bool,
  /** HTML-идентификатор для навигации и доступности */
  id: PropTypes.string,
};

export default Heading;
