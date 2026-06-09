import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import AccordionPanel from '../accordionPanel/AccordionPanel';
import AccordionButton from '../accordionButton/AccordionButton';
import './style.css';

/**
 * Варианты анимации для элемента аккордеона.
 * Определяет анимацию появления с пружинным эффектом.
 * @type {import('framer-motion').Variants}
 */
const itemVariants = {
  hidden: {
    x: '-100vw',
    y: 20,
    opacity: 0,
  },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 14,
    },
  },
};

/**
 * Элемент аккордеона, содержащий вопрос, кнопку переключения и панель ответа.
 * Поддерживает анимации, доступность с клавиатуры и локализацию.
 *
 * @component
 * @param {Object} props - Свойства компонента
 * @param {Object} props.item - Объект вопроса/ответа
 * @param {number} props.item.id - Уникальный идентификатор
 * @param {string} props.item.question - Ключ перевода для вопроса
 * @param {string} props.item.answer - Ключ перевода для ответа
 * @param {boolean} props.isActive - Флаг активности элемента (открыт/закрыт)
 * @param {Function} props.onClick - Обработчик клика, принимает id элемента
 * @returns {JSX.Element} Разметка элемента аккордеона
 */
const AccordionItem = ({ item, isActive, onClick }) => {
  const { t } = useTranslation();

  return (
    <m.li
      className={`faq__item${isActive ? ' faq__item--open' : ''}`}
      variants={itemVariants}
      aria-labelledby={`faq-question-${item.id}`}
    >
      <button
        className="faq__question"
        type="button"
        onClick={() => onClick(item.id)}
        aria-expanded={isActive}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-question-${item.id}`}
      >
        <h3>{t(item.question)}</h3>
        <AccordionButton isActive={isActive} />
      </button>

      <AccordionPanel item={item} open={isActive} />
    </m.li>
  );
};

export default AccordionItem;
