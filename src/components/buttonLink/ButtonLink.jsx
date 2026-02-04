import './style.css';

const ButtonLink = ({ className, path, text, icon }) => {
  return (
    <a
      className={`link ${className}`}
      href={path}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
      <span className="link__icon">{icon}</span>
    </a>
  );
};

export default ButtonLink;
