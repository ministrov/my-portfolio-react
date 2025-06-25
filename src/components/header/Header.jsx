import { PiHeartbeatLight } from 'react-icons/pi';
import { ToggleLang } from '../toggleLang/ToggleLang';
import MainNav from '../mainNav/MainNav';
import Logo from '../logo/Logo';
import './style.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav main-nav">
        <Logo />

        <div className="main-nav__likes likes">
          <PiHeartbeatLight size={45} color="#0062b9" />
        </div>

        <div className="main-nav__block">
          <MainNav />

          <ToggleLang />
        </div>
      </nav>
    </header>
  );
};

export default Header;
