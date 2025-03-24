import { v4 as uuidv4 } from 'uuid';
import SocialListItem from './SocialListItem.jsx';
import { socials } from '../../helpers/mocks/socials.js';
import "./style.css";

const SocialList = ({ className }) => {
  return (
    <ul className={`${className} socials`}>
      {socials.map((social) => (
        <SocialListItem 
          tabIndex={0}
          key={uuidv4()} 
          social={social}
        />
      ))}
    </ul>
  )
}

export default SocialList;