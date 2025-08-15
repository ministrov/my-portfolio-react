import { useState, useEffect } from 'react';
import NavDesktop from '../../components/navDesktop/NavDesktop';
import NavMobile from '../../components/navMobile/NavMobile';
import Logo from '../../components/logo/Logo';
import './style.css';

const Header = () => {
  const [headerBg, setHeaderBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setHeaderBg(true);
      if (window.scrollY < 100) setHeaderBg(false);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);
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
