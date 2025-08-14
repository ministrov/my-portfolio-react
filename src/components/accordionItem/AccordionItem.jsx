// import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AccordionButton from '../accordionButton/AccordionButton';
import AccordionPanel from '../accordionPanel/AccordionPanel';
import './style.css';

const AccordionItem = ({ item, isActive, onClick }) => {
  const { t } = useTranslation();

  return (
    <li
      className="faq__item"
    // initial={{ opacity: 0, height: 0 }}
    // animate={{
    //   opacity: 1,
    //   height: 'auto',
    //   // paddingBottom: 24
    // }}
    // exit={{ opacity: 0, height: 0 }}
    // transition={{ duration: 0.5, ease: 'easeInOut' }}
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
    </li>
  );
};

export default AccordionItem;
