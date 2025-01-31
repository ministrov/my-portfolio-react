import { Link } from "react-router-dom";
import "./style.css";

const SocialListItem = ({ social }) => {
  return (
    <li className="socials__item">
        <Link to={social.path} target='_blank' className="socials__link">
        {social.icon}
        </Link>
    </li>
  )
}

export default SocialListItem