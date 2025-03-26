import { useState } from "react";
import { NavLink } from "react-router-dom";
import './style.css';

const MainNav = () => {
    const [active, setActive] = useState("nav-list");
    const [toggleIcon, setToggleIcon] = useState("nav__toggler");

    const toggleNav = () => {
        active === "nav-list"
        ? setActive("nav-list nav-list__active")
        : setActive("nav-list");

        /**
         * Toggle animation
         */

        toggleIcon === "nav__toggler"
        ? setToggleIcon("nav__toggler toggle")
        : setToggleIcon("nav__toggler");
    };
    return (
        <div className="main-nav__list-wrapper">
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
                    to="/blog"
                    className={"nav-list__link"}
                >
                    Blog
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

        <div role='menu' onClick={toggleNav} className={toggleIcon} tabIndex={0}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
            </div>
        </div>
    )
}

export default MainNav;