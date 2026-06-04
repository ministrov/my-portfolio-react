import { memo } from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

/** Статичные начало/конец анимации элемента меню. */
const itemInitial = { scale: 0.95, opacity: 0 };
const itemAnimate = { scale: 1, opacity: 1 };
/** Параметры пружины без задержки (задержка вычисляется по индексу). */
const itemSpring = { type: 'spring', stiffness: 240, damping: 28 };

/**
 * Элемент мобильного меню с анимацией и доступностью.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.route - Объект маршрута { href, title, Icon }.
 * @param {number} props.index - Индекс для расчёта задержки анимации.
 * @param {Function} props.onClick - Обработчик клика для закрытия меню.
 * @returns {JSX.Element} Анимированный элемент меню.
 */
const MenuItem = ({ route, index, onClick }) => {
  const { t } = useTranslation();
  const { Icon, href, title } = route;
  const end = href === '/';
  const match = useMatch({ path: href, end });

  return (
    <m.li
      className="nav-mobile__item"
      initial={itemInitial}
      animate={itemAnimate}
      transition={{ ...itemSpring, delay: 0.4 + index / 5 }}
    >
      <NavLink
        to={href}
        end={end}
        onClick={onClick}
        className="nav-mobile__link"
        aria-current={match ? 'page' : undefined}
      >
        <span className="nav-mobile__title">{t(title)}</span>
        <Icon className="nav-mobile__icon" color="#0058a7" aria-hidden="true" />
      </NavLink>
    </m.li>
  );
};

MenuItem.propTypes = {
  /** Объект маршрута */
  route: PropTypes.shape({
    href: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    Icon: PropTypes.elementType.isRequired,
  }).isRequired,
  /** Индекс для расчёта задержки анимации */
  index: PropTypes.number.isRequired,
  /** Обработчик клика для закрытия меню */
  onClick: PropTypes.func.isRequired,
};

export default memo(MenuItem);
