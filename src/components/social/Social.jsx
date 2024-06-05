import { Link } from "react-router-dom";
import { socials } from "../../data/socials.js";
import "./style.css";

const Social = () => {
  return (
    <ul className="socials">
      {socials.map((social, index) => (
        <li key={index} className="main-footer__item socials__item">
          <Link href={social.path} className="socials__link">
            {social.icon}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Social