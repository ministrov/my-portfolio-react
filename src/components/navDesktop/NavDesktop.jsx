import { memo } from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import ToggleLang from '../toggleLang/ToggleLang';
import { routes } from '../../const';
import './style.css';

/**
 * Элемент навигационного меню с корректным состоянием активности.
 * Использует useMatch для установки aria-current только у текущего маршрута.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {string} props.href - Путь маршрута.
 * @param {React.ComponentType} props.Icon - Компонент иконки.
 * @param {string} props.label - Переведённый текст ссылки.
 * @returns {JSX.Element} Ссылка навигации.
 */
const NavItem = ({ href, Icon, label }) => {
  const end = href === '/';
  const match = useMatch({ path: href, end });

  return (
    <NavLink
      to={href}
      end={end}
      className="nav-list__link"
      aria-current={match ? 'page' : undefined}
    >
      <Icon size={24} aria-hidden="true" />
      {label}
    </NavLink>
  );
};

NavItem.propTypes = {
  /** Путь маршрута */
  href: PropTypes.string.isRequired,
  /** Компонент иконки */
  Icon: PropTypes.elementType.isRequired,
  /** Переведённый текст ссылки */
  label: PropTypes.string.isRequired,
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
    <div className="nav-wrapper">
      <nav className="nav-main" aria-label={t('mainNav.ariaLabel')}>
        <ul className="nav-list">
          {routes.map(({ href, Icon, title }) => (
            <li key={href} className="nav-list__item">
              <NavItem href={href} Icon={Icon} label={t(title)} />
            </li>
          ))}
        </ul>
      </nav>
      <ToggleLang className="nav__lang" />
    </div>
  );
};

export default memo(NavDesktop);
