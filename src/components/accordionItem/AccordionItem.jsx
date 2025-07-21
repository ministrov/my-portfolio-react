// import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AccordionItemContext } from '../../context/AccordionContext';
import AccordionButton from '../accordionButton/AccordionButton';
import AccordionPanel from '../accordionPanel/AccordionPanel';
import './style.css';

const AccordionItem = ({ item, isActive, index }) => {
  // const { activeIndex } = useContext(AccordionContext);
  const { t } = useTranslation();

  return (
    <AccordionItemContext.Provider value={{ index }}>
      <li
        className={`faq__item ${isActive === index ? 'faq__item--active' : ''
          }`}
      >
        <div
          className="faq__question"
        >
          <h3>{t(item.question)}</h3>

          <AccordionButton />
        </div>

        <AccordionPanel item={item}/>
      </li>
    </AccordionItemContext.Provider>
  );
};

export default AccordionItem;
