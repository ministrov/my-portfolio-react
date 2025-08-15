import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AccordionButton from '../accordionButton/AccordionButton';
import AccordionPanel from '../accordionPanel/AccordionPanel';
import './style.css';

const AccordionItem = ({ item, index, isActive, onClick }) => {
  const { t } = useTranslation();

  return (
    <motion.li
      className="faq__item"
      initial={{
        y: 50, opacity: 0
      }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.6, ease: 'easeInOut' }}
    >
      <div
        className="faq__question"
        onClick={() => onClick(item.id)}
      >
        <h3>{t(item.question)}</h3>

        <AccordionButton
          isActive={isActive}
          id={item.id}
        />
      </div>

      {isActive && <AccordionPanel item={item} />}
    </motion.li>
  );
};

export default AccordionItem;
