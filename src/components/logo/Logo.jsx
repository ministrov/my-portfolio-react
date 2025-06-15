import { Link } from 'react-router-dom';
import './style.css';

const Logo = ({ className = null }) => {
  return (
    <div className={'logo'}>
      <Link to="/" className={`logo__link ${className}`}>
        {'AntoshkinDEV'}
      </Link>
    </div>
  );
};

export default Logo;
