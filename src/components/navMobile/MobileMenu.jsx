import { LazyMotion, m, domAnimation, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ToggleLang from '../toggleLang/ToggleLang';
import { routes } from '../../const';
import MenuItem from './MenuItem';

/**
 * Компонент анимированного мобильного меню.
 * Отображается при открытии меню и содержит список ссылок и переключатель языка.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.isOpen - Флаг открытия меню
 * @param {Function} props.onClose - Функция закрытия меню
 * @returns {JSX.Element} Анимированное мобильное меню
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
            aria-label={t('Mobile navigation menu')}
          >
            <ul className="nav-mobile__list" role="menu">
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
              <ToggleLang aria-label={t('Change language')} />
            </div>
          </m.div>
        </LazyMotion>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;