import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import "./style.css";

const Breadcrumbs = ({ items, ...props}) => {
  return (
    <div className="breadcrumbs" {...props} aria-label="breadcrumbs">
      {items.map((item) => {
        return item.link ? (
          <div key={item.id} className="item">
            <Link
              to={`${item.link}`}
              className="link"
            >
              {item.name}
            </Link>
            <MdOutlineKeyboardArrowRight className='arrow-right' color='#0062b9' />
          </div>
        ) : (
          <span key={item.name} className="curent">
            {item.name}
          </span>
        );
      })}
    </div>
  )
}

export default Breadcrumbs;