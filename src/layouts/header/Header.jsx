import { useState, useEffect, useCallback } from 'react';
import NavDesktop from '../../components/navDesktop/NavDesktop';
import NavMobile from '../../components/navMobile/NavMobile';
import useMenuControl from '../../components/navMobile/useMenuControl';
import Logo from '../../components/logo/Logo';
import ToggleLang from '../../components/toggleLang/ToggleLang';
import CtaButton from '../../components/ctaButton/CtaButton';
import useMediaQuery from '../../hooks/useMediaQuery';
import './style.css';

/**
 * Мобильная раскладка хедера — тот же запрос, по которому CSS показывает
 * бургер и шторку меню (`header/style.css`, `navDesktop/style.css`).
 */
const MOBILE_MENU_QUERY = '(max-width: 767px)';

/**
 * Компонент заголовка сайта с изменяемым фоном при прокрутке.
 * Три зоны: логотип слева, навигация по центру, действия справа
 * (переключатель языка, CTA «Обсудить проект», мобильный бургер).
 * Фон меняется при прокрутке страницы ниже порогового значения, а также
 * остаётся сплошным, пока открыто мобильное меню — иначе сквозь прозрачный
 * хедер видна прокручивающаяся страница позади оверлея.
 *
 * Состояние мобильного меню владеется здесь (а не в `NavMobile`), потому
 * что оно нужно и хедеру (фон), и самому меню.
 *
 * Меню закрывается само, когда раскладка перестаёт быть мобильной (поворот
 * планшета, зум): CSS прячет шторку, а состояние «открыто» иначе держало бы
 * скролл страницы заблокированным. Условие — отрицание того же запроса, что
 * в CSS, а не `(min-width: 768px)`: на дробной ширине 767,5 px не совпадает
 * ни один из двух, и меню осталось бы открытым при скрытой шторке.
 *
 * @component
 * @example
 * return <Header />
 */
const Header = () => {
  const SCROLL_THRESHOLD = 40;
  const [scrolled, setScrolled] = useState(false);
  const { isOpen, handleMenuToggle, handleMenuClose } = useMenuControl();
  const isMobileLayout = useMediaQuery(MOBILE_MENU_QUERY);

  // Корректировка состояния прямо при рендере, без эффекта: React сразу
  // перерисует хедер с закрытым меню, и кадра с открытым меню вне мобильной
  // раскладки не будет.
  if (isOpen && !isMobileLayout) handleMenuClose();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const showHeaderBg = scrolled || isOpen;

  return (
    <header className={`header ${showHeaderBg ? 'header--bg' : ''}`}>
      <nav className="header__nav nav">
        <Logo />

        <NavDesktop />

        <div className="header__actions">
          <ToggleLang className="nav__lang" />
          <CtaButton variant="pill" />
          <NavMobile
            isOpen={isOpen}
            onToggle={handleMenuToggle}
            onClose={handleMenuClose}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
