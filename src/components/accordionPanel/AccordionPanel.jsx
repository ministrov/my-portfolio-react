import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './style.css';

const AccordionPanel = ({ item, isOpen }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      id="dropdown-menu"
      className="faq__answer"
      initial={{ opacity: 0, height: 0 }}
      animate={isOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut', type: 'tween' }}
    >
      {item.answer && t(item.answer)}
    </motion.div>
  );
}

export default AccordionPanel;