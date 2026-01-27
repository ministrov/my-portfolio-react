import { useTranslation } from 'react-i18next';
import './style.css';

const AccordionPanel = ({ item, open }) => {
  const { t } = useTranslation();

  return (
    <div className={`faq__answer ${open ? 'open' : ''}`}>
      {item.answer && t(item.answer)}
    </div>
  );
};

export default AccordionPanel;
