import { memo } from 'react';
import { LazyMotion, m, domAnimation, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import ToggleLang from '../toggleLang/ToggleLang';
import { routes } from '../../const';
import MenuItem from './MenuItem';

/**
 * Анимированное мобильное меню-оверлей.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {boolean} props.isOpen - Флаг открытия меню.
 * @param {Function} props.onClose - Функция закрытия меню.
 * @returns {JSX.Element} Анимированное мобильное меню.
 */
const MobileMenu = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  return (
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
            aria-label={t('mainNav.ariaLabel')}
          >
            <ul className="nav-mobile__list">
              {routes.map((route, idx) => (
                <MenuItem
                  key={route.href}
                  route={route}
                  index={idx}
                  onClick={onClose}
                />
              ))}
            </ul>

            <div className="nav-mobile__lang">
              <ToggleLang />
            </div>
          </m.div>
        </LazyMotion>
      )}
    </AnimatePresence>
  );
};

MobileMenu.propTypes = {
  /** Флаг открытия меню */
  isOpen: PropTypes.bool.isRequired,
  /** Функция закрытия меню */
  onClose: PropTypes.func.isRequired,
};

export default memo(MobileMenu);
