import FilterButton from '../../components/filterButton/FilterButton';
import './style.css';

const FilterList = ({ filters, activeFilter, onFilterClick }) => {
  return (
    <div className="projects__filter">
      <ul className="projects__filter-list">
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

export default FilterList;
