import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AccordionPanel from '../accordionPanel/AccordionPanel';
import AccordionButton from '../accordionButton/AccordionButton';
import './style.css';

const AccordionItem = ({ item, isActive, onClick }) => {
  const { t } = useTranslation();

  return (
    <motion.li
      className="faq__item"
      initial={false}
      animate={{
        maxHeight: isActive ? '1000px' : 'fit-content',
      }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }}
      // animate={{
      //   maxHeight: isActive ? '500px' : '94px',
      // }}
      // transition={{
      //   duration: isActive ? 0.6 : 0.5,
      //   ease: isActive ? [0.4, 0, 0.2, 1] : [0.4, 0, 0.2, 1],
      // }}
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
