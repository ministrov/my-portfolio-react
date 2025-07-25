import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// useLocation
import { BiHomeAlt2 } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import './style.css';

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
    <ul className="nav-list">
      {routes.map((route) => {
        const { Icon, href, title } = route;
        return (
          <li className="nav-list__item">
            <NavLink to={href} className={'nav-list__link'}>
              <Icon />
              {t(title)}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default NavDesktop;