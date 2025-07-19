import { useContext } from "react";
import { AccordionContext, AccordionItemContext } from "./AccordionContext";

const AccordionButton = ({ children }) => {
  const { activeIndex, setActiveIndex } = useContext(AccordionContext);
  const { index } = useContext(AccordionItemContext);
  const isExpanded = activeIndex === index;

  return (
    <button
      onClick={() => setActiveIndex(isExpanded ? null : index)}
      aria-expanded={isExpanded}
      aria-controls={`panel-${index}`}
    >
      {children}
    </button>
  );
};

export default AccordionButton;