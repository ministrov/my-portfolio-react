import './style.css';

const Button = ({ href = null, text, icon, className = null }) => {
  return (
    <a
      className={`btn ${className}`}
      href={href}
      target={href && "_blank"}
      rel="noopener noreferrer"
    >
      {text}
      <span className="btn__icon">{icon}</span>
    </a>
  );
};

export default Button;
