import { Link } from "react-router-dom";
import "./style.css";

const Logo = ({ type = null }) => {
  return (
    <div className="main-nav__logo logo">
      <Link to="/" className={`logo__name ${type}`}>
        Anton Zhilin
      </Link>
    </div>
  );
};

export default Logo;
