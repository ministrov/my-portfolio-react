import { Link } from 'react-router-dom';
import './style.css';

const Logo = ({ type = null, className }) => {
  return (
    <div className={`${className}__logo logo`}>
      <Link to="/" className={`logo__name ${type}`}>
        {'AntoshkinDEV'}
      </Link>
    </div>
  );
};

export default Logo;
