import './style.css';

const Button = ({ href = null, children, icon, className = null }) => {
  return (
    <a
      className={`btn ${className}`}
      href={href}
      target={href && "_blank"}
      rel="noopener noreferrer"
    >
      {children}
      <span className="btn__icon">{icon}</span>
    </a>
  );
};

export default Button;
