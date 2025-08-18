import SocialItem from './SocialItem.jsx';
import { socials } from './socials.js';
import './style.css';

const SocialList = ({ className = 'socials__list', variant = 'white' }) => {
  return (
    <ul className={`socials ${className}`}>
      {socials.map((social) => (
        <SocialItem
          key={social.name}
          social={social}
          tabIndex={0}
          variant={variant}
        />
      ))}
    </ul>
  );
};

export default SocialList;