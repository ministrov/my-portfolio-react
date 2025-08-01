import { useTranslation } from 'react-i18next';
import AccordionButton from '../accordionButton/AccordionButton';
import AccordionPanel from '../accordionPanel/AccordionPanel';
import './style.css';

const AccordionItem = ({ item, isActive, onClick }) => {
  const { t } = useTranslation();

  return (
    <li
      className="faq__item"
    >
      <div
        className="faq__question"
        onClick={() => onClick(item.id)}
      >
        <h3>{t(item.question)}</h3>

        <AccordionButton
          isActive={isActive}
          onClick={() => onClick(item.id)}
          id={item.id}
        />
      </div>

      {isActive && <AccordionPanel item={item} />}
    </li>
  );
};

export default AccordionItem;
