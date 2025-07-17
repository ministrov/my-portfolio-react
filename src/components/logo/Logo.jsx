import { VscTerminalCmd } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import './style.css';

const Logo = ({ className = '', color = '#0058a7' }) => {
  return (
    <Link to="/" className={`logo logo__link ${className}`}>
      <VscTerminalCmd className="logo__icon" size={38} color={color} />
      <span className="logo__text">{'AntoshkinDev'}</span>
    </Link>
  );
};

export default Logo;
