import { useState } from "react";
// import { motion } from 'framer-motion';
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
      {faqs.map((faq, index) => (
        <li
          key={faq.id}
          className="faq__item"
        // initial={{
        //   y: 50, opacity: 0
        // }}
        // animate={{ y: 0, opacity: 1 }}
        // whileInView={{ y: 0, opacity: 1 }}
        // transition={{ duration: 0.5, delay: index * 0.6, ease: 'easeInOut' }}
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