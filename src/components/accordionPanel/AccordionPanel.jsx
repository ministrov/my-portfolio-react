// import { motion } from 'framer-motion';
// import { useTranslation } from 'react-i18next';
// import './style.css';

// const AccordionPanel = ({ item, isOpen }) => {
//   const { t } = useTranslation();

//   return (
//     <motion.div
//       id="dropdown-menu"
//       className="faq__answer"
//       initial={{ opacity: 0, height: 0 }}
//       animate={isOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
//       transition={{ duration: 0.5, ease: 'easeInOut', type: 'tween' }}
//     >
//       {item.answer && t(item.answer)}
//     </motion.div>
//   );
// }

// export default AccordionPanel;
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';
import './style.css';

const AccordionPanel = ({ item, isOpen }) => {
  const { t } = useTranslation();
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Измеряем высоту контента после монтирования и при изменении контента
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [item.answer, t]); // Добавляем t в зависимости, если переводы могут менять высоту

  const animationVariants = {
    open: {
      opacity: 1,
      height: contentHeight,
      transition: {
        height: { duration: 0.5, ease: 'easeInOut' },
        opacity: { duration: 0.5, delay: 0.05 },
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        height: { duration: 0.5, ease: 'easeInOut' },
        opacity: { duration: 0.5 },
      },
    },
  };

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={`accordion-panel-${item.id}`}
          className="faq__answer"
          variants={animationVariants}
          initial="closed"
          animate="open"
          exit="closed"
          role="region"
          aria-labelledby={`accordion-button-${item.id}`}
        >
          <div className="faq__answer-content" ref={contentRef}>
            {item.answer && t(item.answer)}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccordionPanel;
