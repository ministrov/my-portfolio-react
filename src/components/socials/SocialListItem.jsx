import './style.css';

const SocialListItem = ({ social, className = '' }) => {
  return (
    <li className="socials__item">
      <a
        href={social.path}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${social.name} (открывается в новой вкладке)`}
        className={`socials__link ${className}`}
        tabIndex={0}
      >
        {social.icon}
      </a>
    </li>
  );
};

export default SocialListItem;
