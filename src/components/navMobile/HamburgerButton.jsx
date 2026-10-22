import { memo, useRef } from 'react';
import { Squash as Hamburger } from 'hamburger-react';
import { useTranslation } from 'react-i18next';

/**
 * Компонент кнопки гамбургера для мобильного меню.
 *
 * `hamburger-react` рендерит `<div role="button">`, который переключается по
 * keyup Enter, а пункты меню срабатывают по keydown. Без защиты Enter на пункте
 * закрывал меню, фокус возвращался на бургер, и тот же keyup открывал меню
 * снова. Поэтому keyup Enter пропускается к бургеру, только если keydown был
 * на нём же: обёртка ловит оба события в фазе погружения, раньше бургера.
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
  const isEnterDownOnBurgerRef = useRef(false);

  /**
   * Запоминает, что Enter нажат, пока фокус на бургере.
   * @param {React.KeyboardEvent} event - Событие keydown в фазе погружения.
   */
  const handleKeyDownCapture = (event) => {
    if (event.key === 'Enter') isEnterDownOnBurgerRef.current = true;
  };

  /**
   * Не пускает к бургеру keyup Enter, чей keydown был на другом элементе.
   * @param {React.KeyboardEvent} event - Событие keyup в фазе погружения.
   */
  const handleKeyUpCapture = (event) => {
    if (event.key !== 'Enter') return;
    if (!isEnterDownOnBurgerRef.current) event.stopPropagation();
    isEnterDownOnBurgerRef.current = false;
  };

  /** Сбрасывает флаг, если фокус ушёл с бургера между keydown и keyup. */
  const handleBlurCapture = () => {
    isEnterDownOnBurgerRef.current = false;
  };

  return (
    <div
      className="nav-mobile__buttons"
      onKeyDownCapture={handleKeyDownCapture}
      onKeyUpCapture={handleKeyUpCapture}
      onBlurCapture={handleBlurCapture}
    >
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

export default memo(HamburgerButton);
