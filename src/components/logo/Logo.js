import { NavLink } from 'react-router-dom';
import avatar from '../../assets/png/my-photo.png';
import './style.css';

const Logo = () => {
  return (
    <div className="main-nav__logo logo">
      <NavLink to="/" className="logo__link">
        <img className="logo__avatar" src={avatar} width="45" height="45" alt="Портрет автора в миниатюре"/>
      </NavLink>
      <NavLink to="/" className="logo__name">
        Anton Zhilin
      </NavLink>
    </div>
  );
};

export default Logo;
