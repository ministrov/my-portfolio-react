import './style.css';

const SocialListItem = ({ social, varient = 'white' }) => {
  return (
    <li className="socials__item">
      <a
        href={social.path}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${social.name} (открывается в новой вкладке)`}
        className={`socials__link socials__link--${varient}`}
        tabIndex={0}
      >
        {social.icon}
      </a>
    </li>
  );
};

export default SocialListItem;
