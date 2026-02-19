import { Trans } from 'react-i18next';
import './style.css';

const AdvantagesItem = ({ text, icon, altText, ...props }) => {
  return (
    <li className="advantages__item" {...props}>
      <img
        className="advantages__item-img"
        src={icon}
        width="56"
        height="56"
        alt={altText}
      />
      <p className="advantages__item-text">
        <Trans i18nKey={text} components={{ hightlight: <strong /> }} />
      </p>
    </li>
  );
};

export default AdvantagesItem;
