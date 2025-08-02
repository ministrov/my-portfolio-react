import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ToggleLang from '../toggleLang/ToggleLang';
import { routes } from '../../const';
import './style.css';

const NavDesktop = () => {
  const { t } = useTranslation();
  return (
    <div className="nav-wrapper">
      <ul className="nav-list">
        {routes.map((route) => {
          const { Icon, href, title } = route;
          return (
            <li key={title} className="nav-list__item">
              <NavLink to={href} className={'nav-list__link'}>
                <Icon size={24} />
                {t(title)}
              </NavLink>
            </li>
          );
        })}
      </ul>

      <ToggleLang className='nav__lang' />
    </div>
  );
};

export default NavDesktop;