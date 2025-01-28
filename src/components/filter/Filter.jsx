import "./style.css";

const Filter = ({ onClick, filterName }) => {
  return (
    <div className="filter">
        <button className="filter__btn" onClick={onClick}>{filterName}</button>
    </div>
  )
}

export default Filter