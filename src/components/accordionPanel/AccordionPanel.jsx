import { AnimatePresence, m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './style.css';

/** Кривая плавности для анимации раскрытия панели. */
const EASE = [0.25, 0.1, 0.25, 1];

/**
 * Панель ответа аккордеона с плавной анимацией высоты.
 * Использует AnimatePresence + Framer Motion для анимации height: 0 -> auto.
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
    <AnimatePresence initial={false}>
      {open && (
        <m.div
          key="answer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          style={{ overflow: 'hidden' }}
          id={`faq-answer-${item.id}`}
          role="region"
          aria-labelledby={`faq-question-${item.id}`}
        >
          <p className="faq__answer-text">{item.answer && t(item.answer)}</p>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default AccordionPanel;
