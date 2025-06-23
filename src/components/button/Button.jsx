import { motion } from 'framer-motion';
import './style.css';

const Button = ({ href = null, text, icon, className = null }) => {
  return (
    <motion.a
      whileHover={{ scale: 1.05 }}
      className={`btn ${className}`}
      href={href}
      title="Opens in a new tab"
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
      <span className="btn__icon">{icon}</span>
    </motion.a>
  );
};

export default Button;
