import { useState } from 'react';
import { motion } from 'framer-motion';
import { faqs } from '../../const';
import AccordionItem from '../accordionItem/AccordionItem';
import './style.css';

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.42, // элементы по очереди
      },
    },
  };

  const toggleItem = (id) => {
    setActiveIndex(activeIndex === id ? null : id);
  };

  return (
    <motion.ul
      className="faq__list"
      variants={listVariants}
      initial="hidden"
      whileInView="visible"
      // viewport={{ once: true, amount: 0.2 }}
    >
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.id}
          item={faq}
          onClick={() => toggleItem(faq.id)}
          isActive={activeIndex === faq.id}
        />
      ))}
    </motion.ul>
  );
};

export default Accordion;
