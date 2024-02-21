import { motion } from 'framer-motion';
import './style.css';

const Button = ({ href, onClick, text, className }) => {

  return (
    <>
      {href ? (
        <motion.a
          href={href}
          target="_blank"
          className={`btn ${className}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          { text }
        </motion.a>
      ) : (
          <motion.button
            type='button'
            className={`btn ${className}`}
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            { text }
          </motion.button>
      )}
    </>
  );
}

export default Button;