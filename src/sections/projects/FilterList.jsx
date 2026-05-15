import PropTypes from 'prop-types';
import { memo } from 'react';
import FilterButton from '../../components/filterButton/FilterButton';
import './style.css';

/**
 * Список фильтров для проектов.
 * Отображает кнопки фильтров и управляет активным состоянием.
 *
 * @component
 * @param {Object} props - Свойства компонента
 * @param {Array} props.filters - Массив объектов фильтров с id и name
 * @param {string} props.activeFilter - Активный фильтр (имя)
 * @param {Function} props.onFilterClick - Обработчик клика по фильтру
 * @returns {JSX.Element} Список фильтров
 */
const FilterList = ({ filters, activeFilter, onFilterClick }) => {
  return (
    <div className="projects__filter">
      <ul className="projects__filter-list" aria-label="Фильтры проектов">
        {filters.map((filter) => (
          <li key={filter.id} className="projects__filter-list-item filter">
            <FilterButton
              active={activeFilter}
              currentBtn={filter.name}
              filterName={filter.name}
              onClick={() => onFilterClick(filter.name)}
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
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeFilter: PropTypes.string.isRequired,
  onFilterClick: PropTypes.func.isRequired,
};

export default memo(FilterList);
