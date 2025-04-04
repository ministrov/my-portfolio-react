import { Link } from 'react-router-dom';
import './style.css';

const SocialListItem = ({ social, ...props }) => {
  return (
    <li {...props} className="socials__item">
      <Link
        to={social.path}
        target="_blank"
        aria-label="Go to link path"
        className="socials__link"
      >
        {social.icon}
      </Link>
    </li>
  );
};

export default SocialListItem;
