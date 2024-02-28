import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ButtonDarkMode from '../darkModeToggler/DarkModeToggler';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import Logo from '../logo/Logo';
import './style.css';

const Header = () => {
  const activeLink = "nav-list__link nav-list__link--active";
  const normalLink = "nav-list__link";

  const [active, setActive] = useState("nav-list");
  const [toggleIcon, setToggleIcon] = useState("nav__toggler");

  const navToggler = () => {
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
    <header className="header">
      <nav className="header__nav main-nav">
        <Logo />

        <div className="main-nav__right-menu">
          <ErrorBoundary>
            <ButtonDarkMode />
          </ErrorBoundary>

          <ul className={`main-nav__list ${active}`}>
            <li className="nav-list__item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-list__item">
              <NavLink to="./index.html#about" className="nav-list__link">
                About
              </NavLink>
            </li>
            <li className="nav-list__item">
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                Projects
              </NavLink>
            </li>
          </ul>
        </div>

        <div onClick={navToggler} className={toggleIcon}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
