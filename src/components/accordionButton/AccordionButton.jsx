import { LazyMotion, m, domAnimation } from 'framer-motion';
import { FaPlus } from 'react-icons/fa6';
import './style.css';

/**
 * Кнопка аккордеона с анимированной иконкой плюса/минуса.
 * Вращается на 45 градусов при открытии, обеспечивая визуальную обратную связь.
 *
 * @component
 * @param {Object} props - Свойства компонента
 * @param {boolean} props.isActive - Флаг активного состояния (открыт/закрыт)
 * @param {number} props.id - Идентификатор связанного элемента (для accessibility)
 * @returns {JSX.Element} Разметка анимированной кнопки
 */
const AccordionButton = ({ isActive, id }) => {
  /**
   * Варианты анимации иконки.
   * Определяет вращение иконки в зависимости от состояния.
   * @type {import('framer-motion').Variants}
   */
  const iconVariants = {
    open: { rotate: 45 },
    closed: { rotate: 0 },
  };

  const ariaLabel = isActive ? 'Свернуть раздел' : 'Развернуть раздел';

  return (
    <LazyMotion features={domAnimation}>
      <m.button
        type="button"
        className="faq__button"
        variants={iconVariants}
        animate={isActive ? 'open' : 'closed'}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        aria-expanded={isActive}
        aria-controls={`faq-answer-${id}`}
        aria-label={ariaLabel}
        title={ariaLabel}
      >
        <FaPlus aria-hidden="true" />
      </m.button>
    </LazyMotion>
  );
};

export default AccordionButton;
