import { useState } from 'react';
import { faqs } from '../../const';
import AccordionItem from '../accordionItem/AccordionItem';
import './style.css';

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (id) => {
    setActiveIndex(activeIndex === id ? null : id);
  };

  return (
    <ul className="faq__list">
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.id}
          item={faq}
          onClick={() => toggleItem(faq.id)}
          isActive={activeIndex === faq.id}
        />
      ))}
    </ul>
  );
};

export default Accordion;
