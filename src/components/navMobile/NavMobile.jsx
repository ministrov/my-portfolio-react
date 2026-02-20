import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Squash as Hamburger } from 'hamburger-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ToggleLang from '../toggleLang/ToggleLang';
import { routes } from '../../const';
import './style.css';

const NavMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);
  const { t } = useTranslation();

  const handleMenuToggle = (toggled) => {
    setOpen(toggled);
    document.body.style.overflow = toggled ? 'hidden' : 'auto';
  };

  const handleMenuClose = () => {
    setOpen(false);
    document.body.style.overflow = 'auto';
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
          label="Show menu"
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            tabIndex="-1"
            className="nav-mobile__wrapper"
          >
            <ul className="nav-mobile__list">
              {routes.map((route, idx) => {
                const { Icon } = route;

                return (
                  <motion.li
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 240,
                      damping: 28,
                      delay: 0.4 + idx / 5,
                    }}
                    key={route.title}
                    role="menuitem"
                    className="nav-mobile__item"
                    aria-label={t(route.title)}
                  >
                    <NavLink
                      to={route.href}
                      onClick={handleMenuClose}
                      className={'nav-mobile__link'}
                      aria-label={`${t(route.title)} ${t('Go to page')}`}
                    >
                      <span className="nav-mobile__title">
                        {t(route.title)}
                      </span>
                      <Icon className="nav-mobile__icon" color="#0058a7" />
                    </NavLink>
                  </motion.li>
                );
              })}
            </ul>

            <div className="nav-mobile__lang">
              <ToggleLang aria-label={t('Change language')} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavMobile;
