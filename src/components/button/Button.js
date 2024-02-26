// import { motion } from 'framer-motion';
import './style.css';

const Button = ({ href, onClick, text, className }) => {

  return (
    <>
      {href ? (
        <a
          href={href}
          target="_blank"
          className={`btn ${className}`}
          rel="noreferrer"
        >
          { text }
        </a>
      ) : (
          <button
            type='button'
            className={`btn ${className}`}
            onClick={onClick}
          >
            { text }
          </button>
      )}
    </>
  );
}

export default Button;