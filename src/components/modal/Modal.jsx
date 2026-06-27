import { useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation, Trans } from 'react-i18next';
import { AnimatePresence, LazyMotion, m, domAnimation } from 'framer-motion';
import { IoCloseSharp } from 'react-icons/io5';
import PropTypes from 'prop-types';
import SocialList from '../socials/SocialList';
import ModalSteps from '../modalSteps/ModalSteps';
import ModalPromo from '../modalPromo/ModalPromo';
import './style.css';

/**
 * Компонент модального окна с анимацией, авто-закрытием и доступностью.
 * Рендерится в портал `#portal`. При открытии блокирует прокрутку фона,
 * переносит фокус в окно и закрывается по Escape; при закрытии возвращает
 * фокус на элемент, который его открыл.
 *
 * @component
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
  // Элемент, на который вернём фокус при закрытии (триггер открытия)
  const lastFocusedRef = useRef(null);
  const portalRoot =
    typeof document !== 'undefined' ? document.getElementById('portal') : null;

  // Единая функция закрытия с очисткой таймера и восстановлением overflow
  const handleClose = useCallback(() => {
    onClose();
    document.body.style.overflow = 'unset';
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [onClose]);

  // Блокировка прокрутки фона и авто-закрытие по таймеру
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = 'unset';
      return undefined;
    }

    document.body.style.overflow = 'hidden';
    if (autoCloseDelay) {
      timerRef.current = setTimeout(handleClose, autoCloseDelay);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      document.body.style.overflow = 'unset';
    };
  }, [open, autoCloseDelay, handleClose]);

  // Закрытие по Escape — слушаем на document, чтобы работало независимо от фокуса
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, handleClose]);

  // Перенос фокуса в окно при открытии и возврат на триггер при закрытии
  useEffect(() => {
    if (!open) return undefined;

    lastFocusedRef.current = document.activeElement;
    modalRef.current?.focus();

    return () => {
      if (lastFocusedRef.current instanceof HTMLElement) {
        lastFocusedRef.current.focus();
      }
    };
  }, [open]);

  // Закрытие по клику на бэкдроп (не на само окно)
  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose]
  );

  if (!portalRoot) {
    console.warn('Portal root (#portal) not found in DOM');
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className="backdrop"
          onClick={handleBackdropClick}
          role="presentation"
          data-testid="modal-backdrop"
        >
          <LazyMotion features={domAnimation}>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: 'easeInOut' }}
            >
              <div
                className="modal"
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
              >
                <button
                  className="modal__close"
                  onClick={handleClose}
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

Modal.propTypes = {
  /** Флаг открытия модального окна */
  open: PropTypes.bool.isRequired,
  /** Функция обратного вызова при закрытии */
  onClose: PropTypes.func.isRequired,
  /** Задержка автоматического закрытия в миллисекундах */
  autoCloseDelay: PropTypes.number,
};

export default Modal;
