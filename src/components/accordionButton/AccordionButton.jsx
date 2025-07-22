import { motion } from "framer-motion";
import { FaPlus } from 'react-icons/fa6';
import './style.css';

const AccordionButton = ({ isActive, onClick, id }) => {
  const ariaLabel = isActive ? "Collapse section" : "Expand section";

  return (
    <motion.button
      className="faq__icon"
      onClick={onClick}
      animate={{
        rotate: isActive ? "45deg" : "0deg",
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
      aria-expanded={isActive}
      aria-controls={`panel-${id}`}
      aria-label={ariaLabel}
      tabIndex={0}
      role={"button"}
    >
      <FaPlus />
    </motion.button>
  );
};

export default AccordionButton;