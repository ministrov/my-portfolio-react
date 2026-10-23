import { memo } from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import { m } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { GoChevronRight } from 'react-icons/go';

/** Статичные начало/конец анимации элемента меню. */
const itemInitial = { scale: 0.95, opacity: 0 };
const itemAnimate = { scale: 1, opacity: 1 };
/** Параметры пружины без задержки (задержка вычисляется по индексу). */
const itemSpring = { type: 'spring', stiffness: 240, damping: 28 };

/**
 * Анимированная обёртка пункта мобильного меню: `<li>` с каскадным
 * появлением по индексу. Общая для пунктов-маршрутов (`MenuItem`) и
 * пункта-якоря «Контакты» в `MobileMenu`, поэтому каскад описан один раз.
 * Экспортируется компонент, а не объекты анимации: правило
 * `react-refresh/only-export-components` пропускает из файла компонента
 * только примитивные константы.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {number} props.index - Позиция пункта в меню, от неё задержка появления.
 * @param {React.ReactNode} props.children - Ссылка пункта.
 * @returns {JSX.Element} Анимированный `<li>` пункта меню.
 *
 * @example
 * <MenuItemFrame index={routes.length}>
 *   <a className="nav-mobile__link" href="#contact-heading">…</a>
 * </MenuItemFrame>
 */
export const MenuItemFrame = ({ index, children }) => (
  <m.li
    className="nav-mobile__item"
    initial={itemInitial}
    animate={itemAnimate}
    transition={{ ...itemSpring, delay: 0.4 + index / 5 }}
  >
    {children}
  </m.li>
);

/**
 * Элемент мобильного меню с анимацией и доступностью.
 * Справа — шеврон «›»: пункт ведёт дальше. Он декоративный и скрыт от
 * скринридера — смысл несёт подпись ссылки.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.route - Объект маршрута.
 * @param {string} props.route.href - Путь маршрута.
 * @param {string} props.route.title - Ключ перевода названия пункта.
 * @param {number} props.index - Индекс для расчёта задержки анимации.
 * @param {Function} props.onClick - Обработчик клика для закрытия меню.
 * @returns {JSX.Element} Анимированный элемент меню.
 *
 * @example
 * <MenuItem route={{ href: '/about', title: 'mainNav.about' }} index={0} onClick={onClose} />
 */
const MenuItem = ({ route, index, onClick }) => {
  const { t } = useTranslation();
  const { href, title } = route;
  const end = href === '/';
  const match = useMatch({ path: href, end });

  return (
    <MenuItemFrame index={index}>
      <NavLink
        to={href}
        end={end}
        onClick={onClick}
        className="nav-mobile__link"
        aria-current={match ? 'page' : undefined}
      >
        <span className="nav-mobile__title">{t(title)}</span>
        <GoChevronRight className="nav-mobile__icon" aria-hidden="true" />
      </NavLink>
    </MenuItemFrame>
  );
};

export default memo(MenuItem);
