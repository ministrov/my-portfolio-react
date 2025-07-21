import { useState } from "react";
import { AccordionContext } from "../../context/AccordionContext";
import { faqs } from "../../sections/faq/faqs";
import AccordionItem from "../accordionItem/AccordionItem";
import './style.css';

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (id) => {
    setActiveIndex(activeIndex === id ? null : id);
  };

  return (
    <AccordionContext.Provider value={{ activeIndex, setActiveIndex }}>
      <ul className="faq__list">
        {faqs.map(faq => (
          <AccordionItem
            key={faq.id}
            item={faq}
            onClick={() => toggleItem(faq.id)}
            isActive={activeIndex === faq.id}
          />
        ))}
      </ul>
    </AccordionContext.Provider>
  )
}

export default Accordion;