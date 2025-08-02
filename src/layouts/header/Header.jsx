import NavDesktop from '../../components/navDesktop/NavDesktop';
import NavMobile from '../../components/navMobile/NavMobile';
import Logo from '../../components/logo/Logo';
import './style.css';

const Header = () => {
  return (
    <header className="header">
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
