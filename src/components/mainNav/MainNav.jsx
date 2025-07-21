import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import './style.css';

const MainNav = () => {
  const [active, setActive] = useState('nav-list');
  const [toggleIcon, setToggleIcon] = useState('nav__toggler');
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    if (active === 'nav-list nav-list__active') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [active]);

  useEffect(() => {
    setActive('nav-list');
    setToggleIcon('nav__toggler');
  }, [location.pathname]);

  const toggleNav = () => {
    active === 'nav-list'
      ? setActive('nav-list nav-list__active')
      : setActive('nav-list');

    toggleIcon === 'nav__toggler'
      ? setToggleIcon('nav__toggler toggle')
      : setToggleIcon('nav__toggler');
  };
  return (
    <div className="main-nav__list-wrapper">
      <ul className={`main-nav__list ${active}`}>
        <li className="nav-list__item">
          <NavLink to="/" className={'nav-list__link'}>
            {t('mainNav.home')}
          </NavLink>
        </li>
        <li className="nav-list__item">
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive
                ? 'nav-list__link nav-list__link--active'
                : 'nav-list__link'
            }
          >
            {t('mainNav.projects')}
          </NavLink>
        </li>
      </ul>

      <button onClick={toggleNav} className={`nav__toggler-button ${toggleIcon}`} type="button" aria-label="Открыть меню">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </button>
    </div>
  );
};

export default MainNav;
