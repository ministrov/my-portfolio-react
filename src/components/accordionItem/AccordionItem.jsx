import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AccordionItemContext from './AccordionItemContext';
// AnimatePresence
import './style.css';

const AccordionItem = ({ item, index, children }) => {
  const { t } = useTranslation();

  return (
    <AccordionItemContext.Provider value={{ index }}>
      <li
        // className={`faq__item ${activeIndex === index ? 'faq__item--active' : ''
        //   }`}
        // key={item.id}
      >
        <motion.div
          className="faq__question"
        >
          <h3>{t(item.question)}</h3>

          {/* <motion.button
            onClick={() => toggleFAQ(index)}
            className="faq__icon"
            animate={{
              rotate: activeIndex === index ? "45deg" : "0deg",
              transition: { duration: 0.3, ease: "easeInOut" }
            }}
            aria-label={activeIndex === index ? t('faqs.close') : t('faqs.open')}
            aria-expanded={activeIndex === index}
            aria-controls="dropdown-menu"
          >
            <FaPlus />
          </motion.button> */}
        </motion.div>

        {/* <AnimatePresence>
          {activeIndex === index && (
            <motion.div
              id="dropdown-menu"
              className="faq__answer"
              initial={{ opacity: 0, height: 0, padding: 0 }}
              animate={{
                opacity: 1,
                height: 'auto',
                paddingTop: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 24
              }}
              exit={{ opacity: 0, height: 0, padding: 0 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            >
              {t(item.answer)}
            </motion.div>
          )}
        </AnimatePresence> */}
      </li>
      {children}
    </AccordionItemContext.Provider>
  );
};

export default AccordionItem;
