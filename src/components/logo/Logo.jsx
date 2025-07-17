import { VscTerminal } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import './style.css';

const Logo = ({ className = '' }) => {
  return (
    <div className={'logo'}>
      <VscTerminal className="logo__icon" size={36} color={'#0058a7'} />
      <Link to="/" className={`logo__link ${className}`}>
        {'AntoshkinDev'}
      </Link>
    </div>
  );
};

export default Logo;
