// import MainNav from '../../components/mainNav/MainNav';
import NavDesktop from '../../components/navDesktop/NavDesktop';
import Logo from '../../components/logo/Logo';
import './style.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav main-nav">
        <Logo />


        <NavDesktop />
        {/* <MainNav /> */}
      </nav>
    </header>
  );
};

export default Header;
