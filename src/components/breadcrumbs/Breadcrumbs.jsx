// import { RxDoubleArrowRight } from "react-icons/rx";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import "./style.css";

const Breadcrumbs = ({ items, ...props}) => {
  return (
    <div className="breadcrumbs" {...props}>
      {items.map((item) => {
        return item.link ? (
          <div key={item.link} className="item">
            <Link
              href={item.isCategory ? `/category/${item.link}` : item.link}
              className="link"
            >
              {" "}
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