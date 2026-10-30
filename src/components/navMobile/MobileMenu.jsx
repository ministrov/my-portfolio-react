import { memo, useCallback, useEffect, useRef } from 'react';
import { LazyMotion, m, domAnimation, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { GoChevronRight } from 'react-icons/go';
import ToggleLang from '../toggleLang/ToggleLang';
import CtaButton from '../ctaButton/CtaButton';
import useGoToContacts, {
  CONTACT_HEADING_ID,
} from '../../hooks/useGoToContacts';
import { routes } from '../../const';
import cvPdf from '../../assets/pdfs/my-cv.pdf';
import MenuItem, { MenuItemFrame } from './MenuItem';

/**
 * Анимированное мобильное меню-оверлей.
 *
 * Состав сверху вниз: маршруты из `routes`, пункт «Контакты», затем
 * футер — «Скачать резюме» (главное действие: работа важнее фриланса),
 * контурная «Обсудить проект» и строка «Язык сайта» с переключателем.
 *
 * «Контакты» — отдельный `<li>`, а не запись в `routes`: иначе пункт
 * появился бы и в десктопном меню как `NavLink`. Это якорь, а не маршрут:
 * клик закрывает меню и ведёт к заголовку контактов через
 * `useGoToContacts`, как `CtaButton`: где секция есть — прокрутка
 * (мгновенная при `prefers-reduced-motion`), где нет (404) — переход на
 * главную к контактам. Анимацию появления пункт берёт из `MenuItemFrame` и
 * продолжает каскад маршрутов.
 *
 * Подпись «Язык сайта» — видимый текст без связи с переключателем:
 * у `ToggleLang` своё доступное имя («Переключить язык интерфейса»),
 * а `aria-labelledby` заменил бы его или, когда в T07 переключатель
 * станет группой, дал бы вложенную группу с двойной озвучкой.
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
 *
 * @example
 * <MobileMenu isOpen={isOpen} onClose={handleMenuClose} />
 */
const MobileMenu = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const goToContacts = useGoToContacts();
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

  // Сначала закрываем меню, затем переход к контактам — хук откладывает его
  // на следующий кадр, когда блокировка скролла страницы уже снята.
  const handleContactsClick = useCallback(
    (event) => {
      event.preventDefault();
      onClose();
      goToContacts();
    },
    [onClose, goToContacts]
  );

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

              <MenuItemFrame index={routes.length}>
                <a
                  className="nav-mobile__link"
                  href={`#${CONTACT_HEADING_ID}`}
                  onClick={handleContactsClick}
                >
                  <span className="nav-mobile__title">
                    {t('mainNav.contacts')}
                  </span>
                  <GoChevronRight
                    className="nav-mobile__icon"
                    aria-hidden="true"
                  />
                </a>
              </MenuItemFrame>
            </ul>

            <div className="nav-mobile__footer">
              <div className="nav-mobile__actions">
                <a
                  className="nav-mobile__cv"
                  href={cvPdf}
                  download="Anton_Zhilin_CV.pdf"
                >
                  {t('hero.btn')}
                  <span aria-hidden="true">↓</span>
                </a>
                <CtaButton
                  variant="outline"
                  className="nav-mobile__cta"
                  onClick={onClose}
                />
              </div>
              <div className="nav-mobile__lang">
                <span className="nav-mobile__lang-label">
                  {t('mainNav.siteLanguage')}
                </span>
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
