import { Link } from 'react-router-dom';
import logo from './logo.png';
import './style.css';

const Logo = ({ className = '' }) => {
  return (
    <div className={'logo'}>
      <Link to="/" className={`logo__link ${className}`}>
        <img src={logo} width={248} height={48} alt="Logo of Anton Zhilin" />
      </Link>
    </div>
  );
};

export default Logo;
