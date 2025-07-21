import { useState } from "react";
import { AccordionContext } from "../../context/AccordionContext";
import { faqs } from "../../sections/faq/faqs";
import AccordionItem from "../accordionItem/AccordionItem";
import './style.css';

const Accordion = () => {
  // const [activeIndex, setActiveIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  // const { index } = useContext(AccordionItemContext);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };
  // if (activeIndex === index) {
  //   setActiveIndex(-1);
  // } else {
  //   setActiveIndex(index);
  // }

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