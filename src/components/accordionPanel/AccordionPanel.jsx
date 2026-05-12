import { useTranslation } from 'react-i18next';
import './style.css';

/**
 * Панель ответа аккордеона, отображающая контент при открытии элемента.
 * Поддерживает плавное появление/скрытие через CSS-классы и локализацию.
 *
 * @component
 * @param {Object} props - Свойства компонента
 * @param {Object} props.item - Объект вопроса/ответа
 * @param {string} props.item.answer - Ключ перевода для ответа
 * @param {boolean} props.open - Флаг открытого состояния панели
 * @returns {JSX.Element} Разметка панели ответа
 */
const AccordionPanel = ({ item, open }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`faq__answer ${open ? 'open' : ''}`}
      id={`faq-answer-${item.id}`}
      role="region"
      aria-labelledby={`faq-question-${item.id}`}
      aria-hidden={!open}
    >
      {item.answer && t(item.answer)}
    </div>
  );
};

export default AccordionPanel;
