import { NavLink } from "react-router-dom";
import './style.css';

const MainNav = ({ active }) => {
  return (
    <ul className={`main-nav__list ${active}`}>
        <li className="nav-list__item">
            <NavLink
                to="/"
                className={"nav-list__link"}
            >
                Home
            </NavLink>
        </li>
        <li className="nav-list__item">
            <NavLink
                to="/projects"
                className={({ isActive }) => isActive ? 'nav-list__link nav-list__link--active' : 'nav-list__link'}
            >
                Projects
            </NavLink>
        </li>
    </ul>
  )
}

export default MainNav;