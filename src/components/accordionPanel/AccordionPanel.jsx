import { useTranslation } from 'react-i18next';
import './style.css';

const AccordionPanel = ({ item }) => {
  const { t } = useTranslation();

  return <div className={'faq__answer'}>{item.answer && t(item.answer)}</div>;
};

export default AccordionPanel;
