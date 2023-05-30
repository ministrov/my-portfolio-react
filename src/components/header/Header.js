import './style.css';
import pic from './pic1.jpeg';

const Header = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <h1 className="header__title">
          <strong>Hi, my name is <em>Anton</em></strong><br />
          a frontend developer
        </h1>
        <div className="header__text">
          <p>with passion for learning and creating.</p>
        </div>
        <a href="#!" className="btn">Download CV</a>
      </div>
      <div className="header__image-wrapper">
        <img src={pic} className="header__image" alt="Avatar img"/>
      </div>
    </header>
  )
}

export default Header;