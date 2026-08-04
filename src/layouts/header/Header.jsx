import { useState, useEffect, useCallback } from 'react';
import NavDesktop from '../../components/navDesktop/NavDesktop';
import NavMobile from '../../components/navMobile/NavMobile';
import useMenuControl from '../../components/navMobile/useMenuControl';
import Logo from '../../components/logo/Logo';
import ToggleLang from '../../components/toggleLang/ToggleLang';
import CtaButton from '../../components/ctaButton/CtaButton';
import './style.css';

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
 * @component
 * @example
 * return <Header />
 */
const Header = () => {
  const SCROLL_THRESHOLD = 40;
  const [scrolled, setScrolled] = useState(false);
  const { isOpen, handleMenuToggle, handleMenuClose } = useMenuControl();

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
