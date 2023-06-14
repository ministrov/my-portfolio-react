import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ButtonDarkMode from '../buttonDarkMode/ButtonDarkMode';
import './style.css';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const Navbar = () => {
  const activeLink = "nav-list__link nav-list__link--active";
  const normalLink = "nav-list__link";

  const [active, setActive] = useState('nav-list');
  const [toggleIcon, setToggleIcon] = useState('nav__toggler')

  const navToggler = () => {
    active === 'nav-list' ? setActive('nav-list nav-list__active') : setActive('nav-list');

    /**
     * Toggle animation
     */

    toggleIcon === 'nav__toggler' ? setToggleIcon('nav__toggler toggle') : setToggleIcon('nav__toggler');
  }

  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-row">
          <NavLink to="/" className="logo">
            <strong>Anton Zhilin's</strong> portfolio
          </NavLink>

          <ErrorBoundary>
            <ButtonDarkMode />
          </ErrorBoundary>

          <ul className={active}>
            <li className="nav-list__item">
              <NavLink to="/" className={({ isActive }) => isActive ? activeLink : normalLink}>
                Home
              </NavLink>
            </li>
            <li className="nav-list__item">
              <NavLink to="/projects" className={({ isActive }) => isActive ? activeLink : normalLink}>
                Projects
              </NavLink>
            </li>
            <li className="nav-list__item">
              <NavLink to="/contacts" className={({ isActive }) => isActive ? activeLink : normalLink}>
                Contacts
              </NavLink>
            </li>
            <li className="nav-list__item">
              <NavLink to="/about" className={({ isActive }) => isActive ? activeLink : normalLink}>
                About
              </NavLink>
            </li>
          </ul>

          <div onClick={navToggler} className={toggleIcon}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;