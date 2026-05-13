import { useRef } from 'react';
import useMenuControl from './useMenuControl';
import useBodyOverflow from './useBodyOverflow';
import useEscapeKey from './useEscapeKey';
import HamburgerButton from './HamburgerButton';
import MobileMenu from './MobileMenu';
import './style.css';

/**
 * Главный компонент мобильной навигации.
 * Координирует состояние меню, управление overflow и обработку клавиатуры.
 * Использует декомпозицию на подкомпоненты для улучшения читаемости и поддерживаемости.
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
  const ref = useRef(null);
  const { isOpen, handleMenuToggle, handleMenuClose } = useMenuControl();

  // Управление overflow body
  useBodyOverflow(isOpen);

  // Обработка клавиши Escape
  useEscapeKey(isOpen, handleMenuClose);

  return (
    <div className="nav-mobile" ref={ref}>
      <HamburgerButton
        isOpen={isOpen}
        onToggle={handleMenuToggle}
      />

      <MobileMenu
        isOpen={isOpen}
        onClose={handleMenuClose}
      />
    </div>
  );
};

export default NavMobile;