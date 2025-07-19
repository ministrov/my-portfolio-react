import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AccordionContext } from '../../context/AccordionContext';
import AccordionItemContext from './AccordionItemContext';
import AccordionButton from '../accordionButton/AccordionButton';
import AccordionPanel from '../accordionPanel/AccordionPanel';
import './style.css';

const AccordionItem = ({ item, index }) => {
  const { activeIndex } = useContext(AccordionContext);
  const { t } = useTranslation();

  return (
    <AccordionItemContext.Provider value={{ index }}>
      <li
        className={`faq__item ${activeIndex === index ? 'faq__item--active' : ''
          }`}
      >
        <div
          className="faq__question"
        >
          <h3>{t(item.question)}</h3>

          <AccordionButton />
        </div>

        <AccordionPanel />
      </li>
    </AccordionItemContext.Provider>
  );
};

export default AccordionItem;
