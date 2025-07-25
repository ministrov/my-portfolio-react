import { ToggleLang } from '../../components/toggleLang/ToggleLang';
import MainNav from '../../components/mainNav/MainNav';
import Logo from '../../components/logo/Logo';
import './style.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav main-nav">
        <Logo />

        <div className="main-nav__block">
          <MainNav />

          <ToggleLang />
        </div>
      </nav>
    </header>
  );
};

export default Header;
