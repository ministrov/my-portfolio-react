import { memo } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Компонент кнопки гамбургера для мобильного меню.
 *
 * Кнопка — нативный `<button>`: роль, фокус, Enter и пробел даёт браузер.
 * Открытое состояние рисует CSS по `aria-expanded` (см. style.css), отдельного
 * класса-переключателя нет; клик передаёт `onToggle` следующее состояние.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {boolean} props.isOpen - Текущее состояние меню (открыто/закрыто).
 * @param {Function} props.onToggle - Функция переключения состояния меню.
 * @returns {JSX.Element} Кнопка гамбургера с доступностью.
 *
 * @example
 * <HamburgerButton isOpen={isOpen} onToggle={handleMenuToggle} />
 */
const HamburgerButton = ({ isOpen, onToggle }) => {
  const { t } = useTranslation();

  return (
    <div className="nav-mobile__buttons">
      <button
        className="nav-mobile__burger"
        type="button"
        onClick={() => onToggle(!isOpen)}
        aria-label={isOpen ? t('mainNav.hideMenu') : t('mainNav.showMenu')}
        aria-controls="mobile-navigation-menu"
        aria-expanded={isOpen}
      >
        <span className="nav-mobile__burger-line nav-mobile__burger-line--first"></span>
        <span className="nav-mobile__burger-line nav-mobile__burger-line--second"></span>
        <span className="nav-mobile__burger-line nav-mobile__burger-line--third"></span>
      </button>
    </div>
  );
};

export default memo(HamburgerButton);
