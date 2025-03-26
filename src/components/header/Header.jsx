import CountLikes from '../countLikes/CountLikes';
import MainNav from '../mainNav/MainNav';
import Logo from "../logo/Logo";
import "./style.css";

const Header = () => {
  

  return (
    <header className="header">
      <nav className="header__nav main-nav">
        <Logo className={"main-nav"}/>

        <CountLikes/>

        <MainNav />
      </nav>
    </header>
  );
};

export default Header;
