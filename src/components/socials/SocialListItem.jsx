import './style.css';

const SocialListItem = ({ social }) => {
  return (
    <li className="socials__item">
      <a
        href={social.path}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${social.name} (открывается в новой вкладке)`}
        className="socials__link"
        tabIndex={0} // Правильное расположение tabIndex
      >
        {social.icon}
      </a>
    </li>
  );
};

export default SocialListItem;
