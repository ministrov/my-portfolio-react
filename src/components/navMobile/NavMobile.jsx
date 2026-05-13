import { useState, useRef, useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Squash as Hamburger } from 'hamburger-react';
import { LazyMotion, m, domAnimation, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ToggleLang from '../toggleLang/ToggleLang';
import { routes } from '../../const';
import './style.css';

/**
 * Компонент мобильного навигационного меню с анимациями и доступностью.
 * Включает гамбургер-кнопку для открытия/закрытия меню, анимированный список ссылок
 * и переключатель языка. Использует Framer Motion для плавных анимаций.
 *
 * @component
 * @example
 * return (
 *   <NavMobile />
 * )
 *
 * @returns {JSX.Element} Мобильное навигационное меню
 */
const NavMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);
  const { t } = useTranslation();

  /**
   * Обработчик переключения состояния меню с управлением overflow body
   * @param {boolean} toggled - Новое состояние меню (открыто/закрыто)
   */
  const handleMenuToggle = useCallback((toggled) => {
    setOpen(toggled);
  }, []);

  /**
   * Закрытие меню и восстановление прокрутки body
   */
  const handleMenuClose = useCallback(() => {
    setOpen(false);
  }, []);

  // Управление overflow body при открытии/закрытии меню
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Очистка при размонтировании
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Обработка нажатия Escape для закрытия меню
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        handleMenuClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen, handleMenuClose]);

  // Конфигурация анимации для элементов списка
  const listItemAnimation = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: {
      type: 'spring',
      stiffness: 240,
      damping: 28,
    },
  };

  return (
    <div className="nav-mobile" ref={ref}>
      <div className="nav-mobile__buttons">
        <Hamburger
          toggled={isOpen}
          size={28}
          toggle={handleMenuToggle}
          color="#0058a7"
          hideOutline={false}
          label={isOpen ? t('Hide menu') : t('Show menu')}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation-menu"
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <LazyMotion features={domAnimation}>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              tabIndex="-1"
              className="nav-mobile__wrapper"
              id="mobile-navigation-menu"
              role="dialog"
              aria-modal="true"
              aria-label={t('Mobile navigation menu')}
            >
              <ul className="nav-mobile__list" role="menu">
                {routes.map((route, idx) => {
                  const { Icon, href, title } = route;

                  return (
                    <m.li
                      {...listItemAnimation}
                      transition={{
                        ...listItemAnimation.transition,
                        delay: 0.4 + idx / 5,
                      }}
                      key={href}
                      role="menuitem"
                      className="nav-mobile__item"
                      aria-label={t(title)}
                    >
                      <NavLink
                        to={href}
                        onClick={handleMenuClose}
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
                })}
              </ul>

              <div className="nav-mobile__lang">
                <ToggleLang aria-label={t('Change language')} />
              </div>
            </m.div>
          </LazyMotion>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavMobile;