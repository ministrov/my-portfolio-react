import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// useLocation
import { BiHomeAlt2 } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import './style.css';
import { ToggleLang } from '../toggleLang/ToggleLang';

export const routes = [
  {
    title: "mainNav.home",
    href: "/",
    Icon: BiHomeAlt2,
  },
  {
    title: "mainNav.projects",
    href: "/projects",
    Icon: FiSearch,
  }
];

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

      <ToggleLang />
    </div>
  );
};

export default NavDesktop;