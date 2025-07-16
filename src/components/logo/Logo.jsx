import { Link } from 'react-router-dom';
import logo from '../../assets/png/logo_bg.png';
import './style.css';

const Logo = ({ className = '' }) => {
  return (
    <div className={'logo'}>
      <Link to="/" className={`logo__link ${className}`}>
        {/* {'AntoshkinDEV'} */}
        <img src={logo} width={148} height={48} alt="Logo of Anton Zhilin" />
      </Link>
    </div>
  );
};

export default Logo;
