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

  /**
   * Обработчик нажатия клавиши для доступности.
   * Активирует элемент при нажатии Enter или Пробела.
   *
   * @param {React.KeyboardEvent<HTMLDivElement>} e - Событие клавиатуры
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(item.id);
    }
  };

  return (
    <m.li
      className="faq__item"
      variants={itemVariants}
      aria-labelledby={`faq-question-${item.id}`}
    >
      <div
        className="faq__question"
        onClick={() => onClick(item.id)}
        role="button"
        tabIndex={0}
        aria-expanded={isActive}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-question-${item.id}`}
        onKeyDown={handleKeyDown}
      >
        <h3>{t(item.question)}</h3>
        <AccordionButton isActive={isActive} id={item.id} />
      </div>

      <AccordionPanel item={item} open={isActive} />
    </m.li>
  );
};

export default AccordionItem;
