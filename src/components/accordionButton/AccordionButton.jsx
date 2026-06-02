import { m } from 'framer-motion';
import { FaPlus } from 'react-icons/fa6';
import './style.css';

/**
 * Варианты анимации иконки.
 * Определяет вращение иконки в зависимости от состояния.
 * @type {import('framer-motion').Variants}
 */
const iconVariants = {
  open: { rotate: 45 },
  closed: { rotate: 0 },
};

/**
 * Презентационная иконка-индикатор для кнопки аккордеона.
 * Анимированно вращается на 45 градусов при открытии, давая визуальную обратную связь.
 * Не является интерактивным элементом: всё взаимодействие и ARIA-атрибуты
 * обрабатывает родительский элемент `faq__question`. Скрыта от скринридеров (`aria-hidden`).
 *
 * @component
 * @param {Object} props - Свойства компонента
 * @param {boolean} props.isActive - Флаг активного состояния (открыт/закрыт)
 * @returns {JSX.Element} Разметка анимированной иконки
 */
const AccordionButton = ({ isActive }) => {
  return (
    <m.span
      className="faq__button"
      aria-hidden="true"
      variants={iconVariants}
      animate={isActive ? 'open' : 'closed'}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <FaPlus />
    </m.span>
  );
};

export default AccordionButton;
