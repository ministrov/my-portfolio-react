import { memo } from 'react';
import useMenuControl from './useMenuControl';
import useBodyOverflow from './useBodyOverflow';
import useEscapeKey from './useEscapeKey';
import HamburgerButton from './HamburgerButton';
import MobileMenu from './MobileMenu';
import './style.css';

/**
 * Главный компонент мобильной навигации.
 * Координирует состояние меню, управление overflow и обработку клавиатуры.
 *
 * @component
 * @returns {JSX.Element} Мобильное навигационное меню.
 *
 * @example
 * <NavMobile />
 */
const NavMobile = () => {
  const { isOpen, handleMenuToggle, handleMenuClose } = useMenuControl();

  useBodyOverflow(isOpen);
  useEscapeKey(isOpen, handleMenuClose);

  return (
    <div className="nav-mobile">
      <HamburgerButton isOpen={isOpen} onToggle={handleMenuToggle} />
      <MobileMenu isOpen={isOpen} onClose={handleMenuClose} />
    </div>
  );
};

export default memo(NavMobile);
