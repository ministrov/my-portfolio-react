import './style.css';

const ButtonLink = ({ className, path, text, children }) => {
  return (
    <a
      className={`link ${className}`}
      href={path}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
      <span className="link__icon">{children}</span>
    </a>
  );
};

export default ButtonLink;
