import { VscTerminalCmd } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import './style.css';

const Logo = ({ className = '', color = '#0058a7' }) => {
  return (
    <div className={'logo'}>
      <VscTerminalCmd className="logo__icon" size={38} color={color} />
      <Link to="/" className={`logo__link ${className}`}>
        {'AntoshkinDev'}
      </Link>
    </div>
  );
};

export default Logo;
