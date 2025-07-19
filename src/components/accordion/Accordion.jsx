import { useState } from "react";
import { AccordionContext } from "../../context/AccordionContext";

const Accordion = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <AccordionContext.Provider value={{ activeIndex, setActiveIndex }}>
      <ul className="faq__list">
        {children}
      </ul>
    </AccordionContext.Provider>
  )
}

export default Accordion;