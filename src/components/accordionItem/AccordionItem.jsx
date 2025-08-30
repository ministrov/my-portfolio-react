import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AccordionButton from '../accordionButton/AccordionButton';
import AccordionPanel from '../accordionPanel/AccordionPanel';
import './style.css';

const AccordionItem = ({ item, isActive, onClick }) => {
  const { t } = useTranslation();

  return (
    <motion.li
      className="faq__item"
      // layout
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div
        className="faq__question"
        onClick={() => onClick(item.id)}
        role="button"
        aria-expanded={isActive}
      >
        <h3>{t(item.question)}</h3>
        <AccordionButton isActive={isActive} />
      </div>

      <AccordionPanel item={item} isOpen={isActive} />
    </motion.li>
  );
};

export default AccordionItem;
