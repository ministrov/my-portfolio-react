import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
import { socials } from "../../data/socials.js";
import "./style.css";

const SocialList = ({ className }) => {
  return (
    <ul className={`${className} socials`}>
      {socials.map((social) => (
        <li key={uuidv4()} className="main-footer__item socials__item">
          <Link to={social.path} target='_blank' className="socials__link">
            {social.icon}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default SocialList;