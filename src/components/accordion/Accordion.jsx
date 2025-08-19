import { useState } from "react";
import { faqs } from "../../const";
import AccordionItem from "../accordionItem/AccordionItem";
import './style.css';

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (id) => {
    setActiveIndex(activeIndex === id ? null : id);
  };

  return (
    <ul className="faq__list">
      {faqs.map((faq) => (
        <li
          key={faq.id}
          className="faq__item"
        >
          <AccordionItem
            item={faq}
            onClick={() => toggleItem(faq.id)}
            isActive={activeIndex === faq.id}
          />
        </li>
      ))}
    </ul>
  )
}

export default Accordion;