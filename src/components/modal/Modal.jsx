import { useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation, Trans } from 'react-i18next';
import SocialList from '../socials/SocialList';
import ModalSteps from '../modalSteps/ModalSteps';
import ModalPromo from '../modalPromo/ModalPromo';
import ModalBackdrop from './ModalBackdrop';
import ModalCloseButton from './ModalCloseButton';
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

  // Если портальный корень не найден, не рендерим ничего
  if (!portalRoot) {
    console.warn('Portal root (#portal) not found in DOM');
    return null;
  }

  return createPortal(
    <ModalBackdrop
      open={open}
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeyDown}
    >
      <div
        className="modal"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        tabIndex={0}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal__inner">
          <ModalCloseButton
            onClick={handleClose}
            ariaLabel={t('modal.close')}
            color="white"
          />

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
      </div>
    </ModalBackdrop>,
    portalRoot
  );
};

export default Modal;
