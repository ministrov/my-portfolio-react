import "./style.css";

const FilterButton = ({ onClick, filterName, ...props }) => {
  return (
    <button {...props} className="filter__btn" onClick={onClick}>{filterName}</button>
  )
}

export default FilterButton;