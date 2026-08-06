import { memo } from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { routes } from '../../const';
import './style.css';

/**
 * Элемент навигационного меню с корректным состоянием активности.
 * Использует useMatch для установки aria-current только у текущего маршрута.
 * Иконка маршрута здесь не отображается (см. `routes` в `const/`) — она
 * используется только в мобильном меню (`navMobile/MenuItem.jsx`).
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {string} props.href - Путь маршрута.
 * @param {string} props.label - Переведённый текст ссылки.
 * @returns {JSX.Element} Ссылка навигации.
 */
const NavItem = ({ href, label }) => {
  const end = href === '/';
  const match = useMatch({ path: href, end });

  return (
    <NavLink
      to={href}
      end={end}
      className="nav-list__link"
      aria-current={match ? 'page' : undefined}
    >
      {label}
    </NavLink>
  );
};

/**
 * Компонент навигационного меню для десктопной версии.
 * Отображает список маршрутов с иконками и переключатель языка.
 *
 * @component
 * @returns {JSX.Element} Навигационное меню для десктопного интерфейса.
 *
 * @example
 * <NavDesktop />
 */
const NavDesktop = () => {
  const { t } = useTranslation();

  return (
    <nav className="nav-main" aria-label={t('mainNav.ariaLabel')}>
      <ul className="nav-list">
        {routes.map(({ href, title }) => (
          <li key={href} className="nav-list__item">
            <NavItem href={href} label={t(title)} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default memo(NavDesktop);
