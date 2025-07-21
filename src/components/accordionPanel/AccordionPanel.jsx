import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AccordionContext } from '../../context/AccordionContext';
import { AccordionItemContext } from '../../context/AccordionContext';

const AccordionPanel = ({ item }) => {
  const { activeIndex } = useContext(AccordionContext);
  const { index } = useContext(AccordionItemContext);
  const { t } = useTranslation();

  return (
    <AnimatePresence>
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
    </AnimatePresence>
  );
}

export default AccordionPanel;