import { Squash as Hamburger } from 'hamburger-react';
import { useTranslation } from 'react-i18next';

/**
 * Компонент кнопки гамбургера для мобильного меню.
 * Обеспечивает доступность и интерактивность переключения состояния меню.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.isOpen - Текущее состояние меню (открыто/закрыто)
 * @param {Function} props.onToggle - Функция переключения состояния меню
 * @returns {JSX.Element} Кнопка гамбургера с доступностью
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
        label={isOpen ? t('Hide menu') : t('Show menu')}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-menu"
      />
    </div>
  );
};

export default HamburgerButton;