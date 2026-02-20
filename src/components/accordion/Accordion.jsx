import { useState } from 'react';
import { LazyMotion, m, domAnimation } from 'framer-motion';
import { faqs } from '../../const';
import AccordionItem from '../accordionItem/AccordionItem';
import './style.css';

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.32,
      },
    },
  };

  const toggleItem = (id) => {
    setActiveIndex(activeIndex === id ? null : id);
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.ul
        className="faq__list"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
      >
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            item={faq}
            onClick={() => toggleItem(faq.id)}
            isActive={activeIndex === faq.id}
          />
        ))}
      </m.ul>
    </LazyMotion>
  );
};

export default Accordion;

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { faqs } from '../../const';
// import AccordionItem from '../accordionItem/AccordionItem';
// import './style.css';

// const Accordion = () => {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const listVariants = {
//     hidden: {},
//     visible: {
//       transition: {
//         staggerChildren: 0.32,
//       },
//     },
//   };

//   const toggleItem = (id) => {
//     setActiveIndex(activeIndex === id ? null : id);
//   };

//   return (
//     <motion.ul
//       className="faq__list"
//       variants={listVariants}
//       initial="hidden"
//       whileInView="visible"
//     >
//       {faqs.map((faq) => (
//         <AccordionItem
//           key={faq.id}
//           item={faq}
//           onClick={() => toggleItem(faq.id)}
//           isActive={activeIndex === faq.id}
//         />
//       ))}
//     </motion.ul>
//   );
// };

// export default Accordion;
