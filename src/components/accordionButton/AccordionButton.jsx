import { useContext } from "react";
import { motion } from "framer-motion";
import { FaPlus } from 'react-icons/fa6';
import { AccordionContext, AccordionItemContext } from "../../context/AccordionContext";
import './style.css';

const AccordionButton = () => {
  const { activeIndex, setActiveIndex } = useContext(AccordionContext);
  const { index } = useContext(AccordionItemContext);
  const isExpanded = activeIndex === index;

  return (
    <motion.button
      className="faq__icon"
      onClick={() => setActiveIndex(isExpanded ? null : index)}
      animate={{
        rotate: activeIndex === index ? "45deg" : "0deg",
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
      aria-expanded={isExpanded}
      aria-controls={`panel-${index}`}
    >
      <FaPlus />
    </motion.button>
  );
};

export default AccordionButton;