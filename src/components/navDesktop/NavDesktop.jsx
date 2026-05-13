import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ToggleLang from '../toggleLang/ToggleLang';
import { routes } from '../../const';
import './style.css';

/**
 * Компонент навигационного меню для десктопной версии.
 * Отображает список маршрутов с иконками и переключатель языка.
 * Использует React Router для навигации и react-i18next для локализации.
 *
 * @component
 * @example
 * return (
 *   <NavDesktop />
 * )
 *
 * @returns {JSX.Element} Навигационное меню для десктопного интерфейса
 */
const NavDesktop = () => {
  const { t } = useTranslation();

  return (
    <div className="nav-wrapper">
      <nav className="nav-main" aria-label="Основная навигация">
        <ul className="nav-list">
          {routes.map((route) => {
            const { Icon, href, title } = route;
            return (
              <li key={href} className="nav-list__item">
                <NavLink
                  to={href}
                  className="nav-list__link"
                  aria-current="page"
                >
                  <Icon size={24} aria-hidden="true" />
                  {t(title)}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <ToggleLang className="nav__lang" />
    </div>
  );
};

export default NavDesktop;
