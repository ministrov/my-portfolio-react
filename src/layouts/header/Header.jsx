import NavDesktop from '../../components/navDesktop/NavDesktop';
import NavMobile from '../../components/navMobile/NavMobile';
import Logo from '../../components/logo/Logo';
import './style.css';

const Header = () => {
  // const increament = (value) => {
  //   console.log('Function called', value);
  //   return value + 1;
  // };

  // const memo = (originalFn) => {
  //   const result = new Map();
  //   return (value) => {
  //     if (!result.has(value)) {
  //       result.set(value, originalFn(value));
  //     }
  //     return result.get(value);
  //   };
  // };

  // const memorizedIncreament = memo(increament);

  // console.log(memorizedIncreament(10));
  // console.log(memorizedIncreament(10));
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
