import { motion } from 'framer-motion';
import spliteStringRegExp from '../../utils/spliteStringRegExp';

const charVariants = {
  hidden: { opacity: 0 },
  reveal: { opacity: 1 },
};

const TypingText = ({ className, text }) => {
  const characters = spliteStringRegExp(text);

  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="reveal"
      transition={{ staggerChildren: 0.02 }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index + 1}
          transition={{ duration: 0.5 }}
          variants={charVariants}
        >
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default TypingText;
