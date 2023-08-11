import { motion } from 'framer-motion';
import './style.css';

const Button = ({ href, onClick }) => {

  return (
    <>
      {href ? (
        <motion.a
          href="#!"
          className="btn"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3 }}
        >
          Download CV
        </motion.a>
      ) : (
          <motion.button
            type='button'
            className="btn"
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Click Me
          </motion.button>
      )}
    </>
  );
}

export default Button;