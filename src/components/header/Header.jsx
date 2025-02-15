import { useState } from "react";
import CountLikes from '../countLikes/CountLikes';
import Logo from "../logo/Logo";
import "./style.css";
import MainNav from '../mainNav/MainNav';

const Header = () => {
  const [active, setActive] = useState("nav-list");
  const [toggleIcon, setToggleIcon] = useState("nav__toggler");

  const toggleNav = () => {
    active === "nav-list"
      ? setActive("nav-list nav-list__active")
      : setActive("nav-list");

    /**
     * Toggle animation
     */

    toggleIcon === "nav__toggler"
      ? setToggleIcon("nav__toggler toggle")
      : setToggleIcon("nav__toggler");
  };

  return (
    <header className="header">
      <nav className="header__nav main-nav">
        <Logo className={"main-nav"}/>

        <CountLikes/>

        <MainNav active={active} />

        <div role='menu' onClick={toggleNav} className={toggleIcon} tabIndex={0}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
