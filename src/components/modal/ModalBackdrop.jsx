import { AnimatePresence, LazyMotion, m, domAnimation } from 'framer-motion';
import './style.css';

/**
 * Компонент фона модального окна с анимацией появления/исчезновения
 * @param {Object} props - Свойства компонента
 * @param {boolean} props.open - Флаг видимости бэкдропа
 * @param {Function} props.onClick - Обработчик клика по бэкдропу
 * @param {Function} props.onKeyDown - Обработчик нажатия клавиш
 * @param {React.ReactNode} props.children - Дочерние элементы (контент модального окна)
 * @returns {JSX.Element|null} Рендер бэкдропа или null
 */
const ModalBackdrop = ({ open, onClick, onKeyDown, children }) => {
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
          onKeyDown={onKeyDown}
          role="presentation"
          tabIndex={-1}
          aria-label="Modal backdrop"
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

export default ModalBackdrop;