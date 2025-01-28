import "./style.css";

const Filter = () => {
  return (
    <div className="filter">
        <button className="filter__btn">All</button>
        <button className="filter__btn">Recent</button>
        <button className="filter__btn">First</button>
    </div>
  )
}

export default Filter