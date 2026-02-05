import { NavLink } from 'react-router-dom';
import './style.css';

const ButtonLink = ({ className, path, text, icon, target = false }) => {
  return (
    <NavLink
      className={`button-link ${className}`}
      to={path}
      target={target ? '_blank' : '_self'}
      rel="noopener noreferrer"
    >
      {text}
      <span className="button-link__icon">{icon}</span>
    </NavLink>
  );
};

export default ButtonLink;
