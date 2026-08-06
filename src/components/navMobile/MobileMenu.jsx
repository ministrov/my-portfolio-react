import { memo, useEffect, useRef } from 'react';
import { LazyMotion, m, domAnimation, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import ToggleLang from '../toggleLang/ToggleLang';
import CtaButton from '../ctaButton/CtaButton';
import { routes } from '../../const';
import MenuItem from './MenuItem';

/**
 * Анимированное мобильное меню-оверлей.
 *
 * При открытии переносит фокус в меню, при закрытии возвращает его
 * на элемент, который меню открыл (обычно кнопку-гамбургер) — иначе
 * `aria-modal="true"` вводит в заблуждение вспомогательные технологии,
 * которые считают остальную страницу неактивной, а фокус туда всё
 * ещё может попасть.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {boolean} props.isOpen - Флаг открытия меню.
 * @param {Function} props.onClose - Функция закрытия меню.
 * @returns {JSX.Element} Анимированное мобильное меню.
 */
const MobileMenu = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const menuRef = useRef(null);
  const lastFocusedRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    lastFocusedRef.current = document.activeElement;
    menuRef.current?.focus();

    return () => {
      if (lastFocusedRef.current instanceof HTMLElement) {
        lastFocusedRef.current.focus();
      }
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <LazyMotion features={domAnimation}>
          <m.div
            ref={menuRef}
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

            <div className="nav-mobile__footer">
              <CtaButton
                variant="block"
                className="nav-mobile__cta"
                onClick={onClose}
              />
              <div className="nav-mobile__lang">
                <ToggleLang />
              </div>
            </div>
          </m.div>
        </LazyMotion>
      )}
    </AnimatePresence>
  );
};

export default memo(MobileMenu);
