import './style.css';

const FilterButton = ({ onClick, filterName, active, currentBtn }) => {
  return (
    <button
      className={`filter__btn ${
        active === currentBtn ? 'filter__btn--active' : ''
      }`}
      onClick={onClick}
      type="button"
    >
      {filterName}
    </button>
  );
};

export default FilterButton;
