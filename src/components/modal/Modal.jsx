import { useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, LazyMotion, m, domAnimation } from 'framer-motion';
import { IoCloseSharp } from 'react-icons/io5';
import PropTypes from 'prop-types';
import ModalSteps from '../modalSteps/ModalSteps';
import './style.css';

/**
 * Компонент модального окна «Как мы будем работать».
 * Объясняет процесс сотрудничества и предлагает CTA-кнопку
 * для прокрутки к форме обратной связи.
 *
 * Рендерится в портал `#portal`. При открытии блокирует прокрутку фона,
 * переносит фокус в окно и закрывается по Escape; при закрытии возвращает
 * фокус на элемент, который его открыл.
 *
 * @component
 * @param {Object}   props
 * @param {boolean}  props.open           - Флаг открытия модального окна
 * @param {Function} props.onClose        - Колбек при закрытии
 * @param {number}   [props.autoCloseDelay] - Задержка авто-закрытия (мс)
 * @returns {JSX.Element|null}
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

  // Закрытие + прокрутка к форме контактов
  const handleCta = useCallback(() => {
    handleClose();
    requestAnimationFrame(() => {
      document
        .querySelector('.contact')
        ?.scrollIntoView({ behavior: 'smooth' });
    });
  }, [handleClose]);

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
              style={{ width: '100%', maxWidth: '560px' }}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
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
                  <IoCloseSharp size={16} color="currentColor" />
                </button>

                <header className="modal__header">
                  <span className="modal__eyebrow">{t('modal.eyebrow')}</span>
                  <h2 className="modal__title" id="modal-title">
                    {t('modal.title')}
                  </h2>
                  <p className="modal__meta">{t('modal.meta')}</p>
                </header>

                <ModalSteps />

                <button
                  className="modal__cta"
                  type="button"
                  onClick={handleCta}
                >
                  <span>{t('modal.cta')}</span>
                  <span className="modal__cta-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
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
  /** Колбек при закрытии */
  onClose: PropTypes.func.isRequired,
  /** Задержка авто-закрытия в миллисекундах */
  autoCloseDelay: PropTypes.number,
};

export default Modal;
