import { motion } from 'framer-motion';
import "./style.css";

const Button = ({ href, onClick, text, className }) => {
  return (
    <>
      {href ? (
        <motion.a 
          whileHover={{ scale: 1.05 }}
          className={`btn ${className}`}
          href={href}  
          rel="noreferrer"
        >
          {text}
        </motion.a>
      ) : (
        <motion.button 
          whileHover={{ scale: 1.05 }}
          className={`btn ${className}`}
          type="button"  
          onClick={onClick}
        >
          {text}
        </motion.button>
      )}
    </>
  );
};

export default Button;
