import { useState, useEffect, useCallback } from 'react';
import NavDesktop from '../../components/navDesktop/NavDesktop';
import NavMobile from '../../components/navMobile/NavMobile';
import Logo from '../../components/logo/Logo';
import './style.css';

/**
 * Компонент заголовка сайта с изменяемым фоном при прокрутке.
 * Отображает логотип и навигацию (десктопную и мобильную).
 * Фон меняется при прокрутке страницы ниже порогового значения.
 *
 * @component
 * @example
 * return <Header />
 */
const Header = () => {
  const SCROLL_THRESHOLD = 40;
  const [headerBg, setHeaderBg] = useState(false);

  const handleScroll = useCallback(() => {
    setHeaderBg(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <header className={`header ${headerBg ? 'header--bg' : ''}`}>
      <nav className="header__nav nav">
        <Logo />

        <div className="nav__wrapper">
          <NavMobile />
          <NavDesktop />
        </div>
      </nav>
    </header>
  );
};

export default Header;
