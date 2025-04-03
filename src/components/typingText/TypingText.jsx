import { motion } from 'framer-motion';
import spliteStringRegExp from '../../utils/stplitStringRegExp';
import './style.css';

const charVariants = {
  hidden: { opacity: 0 },
  reveal: { opacity: 1 },
};

const TypingText = ({ className, text }) => {
  const textChars = spliteStringRegExp(text);

  return (
    <motion.strong
      className={className}
      initial="hidden"
      whileInView="reveal"
      transition={{ staggerChildren: 0.02 }}
    >
      {textChars.map((char, index) => (
        <motion.span
          key={index + 1}
          transition={{ duration: 0.5 }}
          variants={charVariants}
        >
          {char}
        </motion.span>
      ))}
    </motion.strong>
  );
};

export default TypingText;
