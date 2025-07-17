import { Link } from 'react-router-dom';
import './style.css';

const Logo = ({ className = '' }) => {
  return (
    <div className={'logo'}>
      <Link to="/" className={`logo__link ${className}`}>
        {'AntoshkinDev'}
      </Link>
    </div>
  );
};

export default Logo;
