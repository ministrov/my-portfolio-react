import { motion } from "framer-motion";
import { FaPlus } from 'react-icons/fa6';
import './style.css';

const AccordionButton = ({ isActive, onClick, id }) => {
  return (
    <motion.button
      className="faq__icon"
      onClick={() => onClick(id)}
      animate={{
        rotate: isActive ? "45deg" : "0deg",
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
      aria-expanded={isActive}
      aria-controls={`panel-${id}`}
    >
      <FaPlus />
    </motion.button>
  );
};

export default AccordionButton;