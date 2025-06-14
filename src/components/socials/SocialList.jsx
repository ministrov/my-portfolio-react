import { FaSquareWhatsapp } from 'react-icons/fa6';
import { FaGithub, FaTelegram, FaVk } from 'react-icons/fa';
import SocialListItem from './SocialListItem.jsx';
import './style.css';

const socials = [
  { icon: <FaGithub />, name: 'github', path: 'https://github.com/ministrov' },
  { icon: <FaTelegram />, name: 'telegram', path: 'https://t.me/antonzhilin83' },
  { icon: <FaVk />, name: 'vk', path: 'https://vk.com/feed' },
  { icon: <FaSquareWhatsapp />, name: 'whatsapp', path: 'https://t.me/antonzhilin83' },
];

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
