import { memo } from 'react';
import PropTypes from 'prop-types';
import useBodyScrollLock from '../../hooks/useBodyScrollLock';
import useEscapeKey from './useEscapeKey';
import HamburgerButton from './HamburgerButton';
import MobileMenu from './MobileMenu';
import './style.css';

/**
 * Главный компонент мобильной навигации.
 * Управляет overflow страницы и обработкой клавиатуры для состояния меню,
 * которое ему передаёт родитель (`Header`) — фон хедера завязан на то же
 * состояние, поэтому им владеет он, а не этот компонент.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {boolean} props.isOpen - Флаг открытия меню.
 * @param {Function} props.onToggle - Функция переключения состояния меню.
 * @param {Function} props.onClose - Функция закрытия меню.
 * @returns {JSX.Element} Мобильное навигационное меню.
 *
 * @example
 * <NavMobile isOpen={isOpen} onToggle={handleMenuToggle} onClose={handleMenuClose} />
 */
const NavMobile = ({ isOpen, onToggle, onClose }) => {
  useBodyScrollLock(isOpen);
  useEscapeKey(isOpen, onClose);

  return (
    <div className="nav-mobile">
      <HamburgerButton isOpen={isOpen} onToggle={onToggle} />
      <MobileMenu isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

NavMobile.propTypes = {
  /** Флаг открытия меню */
  isOpen: PropTypes.bool.isRequired,
  /** Функция переключения состояния меню */
  onToggle: PropTypes.func.isRequired,
  /** Функция закрытия меню */
  onClose: PropTypes.func.isRequired,
};

export default memo(NavMobile);
