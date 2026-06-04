import { memo } from 'react';
import { Squash as Hamburger } from 'hamburger-react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

/**
 * Компонент кнопки гамбургера для мобильного меню.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {boolean} props.isOpen - Текущее состояние меню (открыто/закрыто).
 * @param {Function} props.onToggle - Функция переключения состояния меню.
 * @returns {JSX.Element} Кнопка гамбургера с доступностью.
 */
const HamburgerButton = ({ isOpen, onToggle }) => {
  const { t } = useTranslation();

  return (
    <div className="nav-mobile__buttons">
      <Hamburger
        toggled={isOpen}
        size={28}
        toggle={onToggle}
        color="#0058a7"
        hideOutline={false}
        label={isOpen ? t('mainNav.hideMenu') : t('mainNav.showMenu')}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-menu"
      />
    </div>
  );
};

HamburgerButton.propTypes = {
  /** Текущее состояние меню */
  isOpen: PropTypes.bool.isRequired,
  /** Функция переключения состояния меню */
  onToggle: PropTypes.func.isRequired,
};

export default memo(HamburgerButton);
