import "./style.css";

const FilterButton = ({ onClick, filterName }) => {
  return (
    <button className="filter__btn" onClick={onClick}>{filterName}</button>
  )
}

export default FilterButton;