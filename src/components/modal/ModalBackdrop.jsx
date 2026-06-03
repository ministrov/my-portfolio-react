import { AnimatePresence, LazyMotion, m, domAnimation } from 'framer-motion';
import PropTypes from 'prop-types';
import './style.css';

/**
 * Компонент фона модального окна с анимацией появления/исчезновения.
 * Декоративный оверлей (`role="presentation"`): клик по нему закрывает окно,
 * а закрытие с клавиатуры обрабатывает сам `Modal` (Escape на document).
 *
 * @component
 * @param {Object} props - Свойства компонента
 * @param {boolean} props.open - Флаг видимости бэкдропа
 * @param {Function} props.onClick - Обработчик клика по бэкдропу
 * @param {React.ReactNode} props.children - Дочерние элементы (контент модального окна)
 * @returns {JSX.Element|null} Рендер бэкдропа или null
 */
const ModalBackdrop = ({ open, onClick, children }) => {
  // Константы анимации
  const animationTransition = {
    delay: 0.4,
    duration: 0.5,
    ease: 'easeInOut',
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="backdrop"
          onClick={onClick}
          role="presentation"
          data-testid="modal-backdrop"
        >
          <LazyMotion features={domAnimation}>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={animationTransition}
            >
              {children}
            </m.div>
          </LazyMotion>
        </div>
      )}
    </AnimatePresence>
  );
};

ModalBackdrop.propTypes = {
  /** Флаг видимости бэкдропа */
  open: PropTypes.bool,
  /** Обработчик клика по бэкдропу */
  onClick: PropTypes.func,
  /** Дочерние элементы (контент модального окна) */
  children: PropTypes.node,
};

export default ModalBackdrop;
