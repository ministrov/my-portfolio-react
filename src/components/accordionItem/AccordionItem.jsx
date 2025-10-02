import { useTranslation } from 'react-i18next';
import AccordionPanel from '../accordionPanel/AccordionPanel';
import AccordionButton from '../accordionButton/AccordionButton';
import './style.css';

const AccordionItem = ({ item, isActive, onClick }) => {
  const { t } = useTranslation();

  return (
    <li className={`faq__item ${isActive ? 'open' : ''}`}>
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
    </li>
  );
};

export default AccordionItem;
