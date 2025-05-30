import { v4 as uuidv4 } from 'uuid';
import { FaSquareWhatsapp } from 'react-icons/fa6';
import { FaGithub, FaTelegram, FaVk } from 'react-icons/fa';
import SocialListItem from './SocialListItem.jsx';
import './style.css';

const socials = [
  { icon: <FaGithub />, path: 'https://github.com/ministrov' },
  { icon: <FaTelegram />, path: 'https://t.me/antonzhilin83' },
  { icon: <FaVk />, path: 'https://vk.com/feed' },
  { icon: <FaSquareWhatsapp />, path: 'https://t.me/antonzhilin83' },
];

const SocialList = ({ className }) => {
  return (
    <ul className={`${className} socials`}>
      {socials.map((social) => (
        <SocialListItem tabIndex={0} key={uuidv4()} social={social} />
      ))}
    </ul>
  );
};

export default SocialList;
