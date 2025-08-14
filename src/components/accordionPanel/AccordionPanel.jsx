import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './style.css';

const AccordionPanel = ({ item }) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      <motion.div
        id="dropdown-menu"
        className="faq__answer"
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: 1,
          height: 'auto',
          // paddingBottom: 24
        }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {t(item.answer)}
      </motion.div>
    </AnimatePresence>
  );
}

export default AccordionPanel;