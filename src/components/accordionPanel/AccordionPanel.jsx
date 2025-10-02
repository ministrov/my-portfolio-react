import { useTranslation } from 'react-i18next';
import './style.css';

const AccordionPanel = ({ item, isOpen }) => {
  const { t } = useTranslation();

  return (
    <div className={`faq__answer ${isOpen ? 'open' : ''}`}>
      {item.answer && t(item.answer)}
    </div>
  );
};

export default AccordionPanel;
