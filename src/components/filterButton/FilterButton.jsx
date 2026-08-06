import './style.css';

/**
 * Компонент кнопки фильтра для переключения между категориями проектов.
 * Доступным именем служит видимый текст кнопки (`filterName`),
 * состояние передаётся через `aria-pressed`.
 *
 * @component
 * @param {Object} props - Свойства компонента
 * @param {Function} props.onClick - Обработчик клика по кнопке
 * @param {string} props.filterName - Отображаемое название фильтра
 * @param {string} props.active - Активный фильтр (значение)
 * @param {string} props.currentBtn - Значение фильтра этой кнопки
 * @param {boolean} [props.disabled] - Неактивное состояние кнопки
 * @returns {JSX.Element} Кнопка фильтра с состоянием активности
 */
const FilterButton = ({
  onClick,
  filterName,
  active,
  currentBtn,
  disabled = false,
}) => {
  const isActive = active === currentBtn;

  /**
   * Формирует строку классов для кнопки на основе состояния
   * @returns {string} Строка CSS-классов
   */
  const getButtonClasses = () =>
    [
      'filter__btn',
      isActive && 'filter__btn--active',
      disabled && 'filter__btn--disabled',
    ]
      .filter(Boolean)
      .join(' ');

  return (
    <button
      className={getButtonClasses()}
      onClick={onClick}
      type="button"
      disabled={disabled}
      aria-pressed={isActive}
    >
      {filterName}
    </button>
  );
};

export default FilterButton;
