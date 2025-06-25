import SocialListItem from './SocialListItem.jsx';
import { socials } from './socials.js';
import './style.css';

const SocialList = ({ className }) => {
  return (
    <ul className={`${className} socials`}>
      {socials.map((social) => (
        <SocialListItem tabIndex={0} key={social.name} social={social} />
      ))}
    </ul>
  );
};

export default SocialList;
