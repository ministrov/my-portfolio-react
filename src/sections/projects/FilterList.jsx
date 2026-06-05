import PropTypes from 'prop-types';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import FilterButton from '../../components/filterButton/FilterButton';
import './style.css';

/**
 * Список фильтров для проектов.
 * Отображает кнопки фильтров и управляет активным состоянием.
 * Значение фильтра (`value`) используется для матчинга, `label` — ключ
 * перевода для видимого текста кнопки.
 *
 * @component
 * @param {Object} props - Свойства компонента
 * @param {Array} props.filters - Массив фильтров с `id`, `value` и `label`
 * @param {string} props.activeFilter - Активный фильтр (значение)
 * @param {Function} props.onFilterClick - Обработчик клика по фильтру
 * @returns {JSX.Element} Список фильтров
 */
const FilterList = ({ filters, activeFilter, onFilterClick }) => {
  const { t } = useTranslation();

  return (
    <div className="projects__filter">
      <ul className="projects__filter-list" aria-label={t('filters.ariaLabel')}>
        {filters.map((filter) => (
          <li key={filter.id} className="projects__filter-list-item filter">
            <FilterButton
              active={activeFilter}
              currentBtn={filter.value}
              filterName={t(filter.label)}
              onClick={() => onFilterClick(filter.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

FilterList.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeFilter: PropTypes.string.isRequired,
  onFilterClick: PropTypes.func.isRequired,
};

export default memo(FilterList);
