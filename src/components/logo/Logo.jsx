import { NavLink } from "react-router-dom";
import "./style.css";

const Logo = () => {
  return (
    <div className="main-nav__logo logo">
      <NavLink to="/" className="logo__name">
        Anton Zhilin
      </NavLink>
    </div>
  );
};

export default Logo;
