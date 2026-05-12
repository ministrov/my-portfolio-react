import PropTypes from 'prop-types';
import './style.css';

/**
 * Компонент кнопки фильтра для переключения между категориями проектов.
 * 
 * @component
 * @param {Object} props - Свойства компонента
 * @param {Function} props.onClick - Обработчик клика по кнопке
 * @param {string} props.filterName - Отображаемое название фильтра
 * @param {string} props.active - Активный фильтр (значение)
 * @param {string} props.currentBtn - Значение фильтра этой кнопки
 * @param {boolean} [props.disabled] - Неактивное состояние кнопки
 * @param {string} [props.ariaLabel] - ARIA-метка для доступности
 * @returns {JSX.Element} Кнопка фильтра с состоянием активности
 */
const FilterButton = ({ 
  onClick, 
  filterName, 
  active, 
  currentBtn, 
  disabled = false,
  ariaLabel = `Фильтр: ${filterName}`
}) => {
  const isActive = active === currentBtn;
  
  /**
   * Формирует строку классов для кнопки на основе состояния
   * @returns {string} Строка CSS-классов
   */
  const getButtonClasses = () => {
    const baseClass = 'filter__btn';
    const activeClass = isActive ? 'filter__btn--active' : '';
    const disabledClass = disabled ? 'filter__btn--disabled' : '';
    return `${baseClass} ${activeClass} ${disabledClass}`.trim();
  };

  return (
    <button
      className={getButtonClasses()}
      onClick={onClick}
      type="button"
      disabled={disabled}
      aria-pressed={isActive}
      aria-label={ariaLabel}
      title={filterName}
    >
      {filterName}
    </button>
  );
};

FilterButton.propTypes = {
  /** Обработчик клика по кнопке */
  onClick: PropTypes.func.isRequired,
  /** Отображаемое название фильтра */
  filterName: PropTypes.string.isRequired,
  /** Активный фильтр (значение) */
  active: PropTypes.string.isRequired,
  /** Значение фильтра этой кнопки */
  currentBtn: PropTypes.string.isRequired,
  /** Неактивное состояние кнопки */
  disabled: PropTypes.bool,
  /** ARIA-метка для доступности */
  ariaLabel: PropTypes.string,
};

export default FilterButton;
