import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const AccordionPanel = ({ item, isActive }) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          id="dropdown-menu"
          className="faq__answer"
          initial={{ opacity: 0, height: 0, padding: 0 }}
          animate={{
            opacity: 1,
            height: 'auto',
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