import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import NavDesktop from '../../components/navDesktop/NavDesktop';
import NavMobile from '../../components/navMobile/NavMobile';
import Logo from '../../components/logo/Logo';
import ToggleLang from '../../components/toggleLang/ToggleLang';
import './style.css';

/**
 * Компонент заголовка сайта с изменяемым фоном при прокрутке.
 * Три зоны: логотип слева, навигация по центру, действия справа
 * (переключатель языка, CTA «Обсудить проект», мобильный бургер).
 * Фон меняется при прокрутке страницы ниже порогового значения.
 *
 * @component
 * @example
 * return <Header />
 */
const Header = () => {
  const SCROLL_THRESHOLD = 40;
  const { t } = useTranslation();
  const [headerBg, setHeaderBg] = useState(false);

  const handleScroll = useCallback(() => {
    setHeaderBg(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  // Плавный скролл к секции контактов (как в модальном окне)
  const handleCta = useCallback(() => {
    document.querySelector('.contact')?.scrollIntoView({ behavior: 'smooth' });
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

        <NavDesktop />

        <div className="header__actions">
          <ToggleLang className="nav__lang" />
          <button className="header__cta" type="button" onClick={handleCta}>
            <span>{t('modal.cta')}</span>
            <span className="header__cta-arrow" aria-hidden="true">
              →
            </span>
          </button>
          <NavMobile />
        </div>
      </nav>
    </header>
  );
};

export default Header;
