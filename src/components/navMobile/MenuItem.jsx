import { NavLink } from 'react-router-dom';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';

/**
 * Компонент элемента меню с анимацией и доступностью.
 * Отображает ссылку навигации с иконкой и текстом.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.route - Объект маршрута { href, title, Icon }
 * @param {number} props.index - Индекс элемента для анимации задержки
 * @param {Function} props.onClick - Обработчик клика для закрытия меню
 * @returns {JSX.Element} Анимированный элемент меню
 */
const MenuItem = ({ route, index, onClick }) => {
  const { t } = useTranslation();
  const { Icon, href, title } = route;

  const animation = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: {
      type: 'spring',
      stiffness: 240,
      damping: 28,
      delay: 0.4 + index / 5,
    },
  };

  return (
    <m.li
      {...animation}
      key={href}
      role="menuitem"
      className="nav-mobile__item"
      aria-label={t(title)}
    >
      <NavLink
        to={href}
        onClick={onClick}
        className="nav-mobile__link"
        aria-label={`${t(title)} ${t('Go to page')}`}
        aria-current="page"
      >
        <span className="nav-mobile__title">
          {t(title)}
        </span>
        <Icon
          className="nav-mobile__icon"
          color="#0058a7"
          aria-hidden="true"
        />
      </NavLink>
    </m.li>
  );
};

export default MenuItem;