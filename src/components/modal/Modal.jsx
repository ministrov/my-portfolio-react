import { useRef, useCallback, useEffect } from 'react';
import { AnimatePresence, LazyMotion, m, domAnimation } from 'framer-motion';
import { createPortal } from 'react-dom';
import { IoCloseSharp } from 'react-icons/io5';
import { useTranslation, Trans } from 'react-i18next';
import SocialList from '../socials/SocialList';
import ModalSteps from '../modalSteps/ModalSteps';
import ModalPromo from '../modalPromo/ModalPromo';
import './style.css';

/**
 * Компонент модального окна с анимацией, авто-закрытием и доступностью
 * @param {Object} props - Свойства компонента
 * @param {boolean} props.open - Флаг открытия модального окна
 * @param {Function} props.onClose - Функция обратного вызова при закрытии
 * @param {number} [props.autoCloseDelay] - Задержка автоматического закрытия в миллисекундах
 * @returns {JSX.Element|null} Портальный рендер модального окна или null
 */
const Modal = ({ open, onClose, autoCloseDelay }) => {
  const { t } = useTranslation();
  const modalRef = useRef(null);
  const timerRef = useRef(null);
  const portalRoot = typeof document !== 'undefined' ? document.getElementById('portal') : null;

  // Единая функция закрытия с очисткой таймера и восстановлением overflow
  const handleClose = useCallback(() => {
    onClose();
    document.body.style.overflow = 'unset';
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [onClose]);

  // Управление overflow и таймером через useEffect
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      if (autoCloseDelay) {
        timerRef.current = setTimeout(() => {
          handleClose();
        }, autoCloseDelay);
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    // Очистка при размонтировании или изменении open
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      // Восстанавливаем overflow только если компонент размонтируется при открытом состоянии
      if (open) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [open, autoCloseDelay, handleClose]);

  // Обработчик клика по бэкдропу
  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  // Обработчик нажатия клавиш (только Escape)
  const handleBackdropKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      handleClose();
    }
  }, [handleClose]);

  // Обработчик клика по кнопке закрытия
  const handleCloseButtonClick = useCallback(() => {
    handleClose();
  }, [handleClose]);

  // Если портальный корень не найден, не рендерим ничего
  if (!portalRoot) {
    console.warn('Portal root (#portal) not found in DOM');
    return null;
  }

  // Константы анимации
  const animationTransition = {
    delay: 0.4,
    duration: 0.5,
    ease: 'easeInOut',
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className="backdrop"
          onClick={handleBackdropClick}
          onKeyDown={handleBackdropKeyDown}
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
              ref={modalRef}
              className="modal"
              onClick={(e) => e.stopPropagation()}
              tabIndex={0}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <div className="modal__inner">
                <button
                  className="modal__close"
                  onClick={handleCloseButtonClick}
                  aria-label={t('modal.close')}
                  type="button"
                  data-testid="modal-close-button"
                >
                  <IoCloseSharp color="white" />
                </button>

                <header className="modal__header">
                  <p className="modal__title" id="modal-title">
                    <Trans
                      i18nKey="modal.title"
                      components={{ highlighed: <span /> }}
                    />
                  </p>
                  <ModalPromo />
                </header>

                <ModalSteps />

                <footer className="modal__footer">
                  <p className="modal__text">{t('modal.text')}</p>
                  <div className="modal__socials">
                    <SocialList />
                  </div>
                </footer>
              </div>
            </m.div>
          </LazyMotion>
        </div>
      )}
    </AnimatePresence>,
    portalRoot
  );
};

export default Modal;
