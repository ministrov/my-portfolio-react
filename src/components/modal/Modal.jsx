import { useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { IoCloseSharp } from 'react-icons/io5';
import { useTranslation, Trans } from 'react-i18next';
import SocialList from '../socials/SocialList';
import ModalSteps from '../modalSteps/ModalSteps';
import ModalPromo from '../modalPromo/ModalPromo';
import './style.css';

const Modal = ({ open, onClose, autoCloseDelay }) => {
  const { t } = useTranslation();
  const modalRef = useRef(null);
  const timerRef = useRef(null);
  const titleId = 'modal-title';

  const handleClose = useCallback(() => {
    onClose();
    document.body.style.overflow = 'unset';
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, [onClose]);

  const handleKeyDown = useCallback(
    (e) => {
      console.log(e.key);
      if (e.key === 'Escape') handleClose();
    },
    [handleClose]
  );

  const handleOpen = useCallback(() => {
    document.body.style.overflow = 'hidden';

    if (autoCloseDelay) {
      timerRef.current = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);
    }
  }, [handleClose, autoCloseDelay]);

  const handleModalToggle = () => {
    if (open) {
      handleClose();
      document.addEventListener('keydown', handleKeyDown);
    } else {
      handleOpen();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className="backdrop"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: 'easeInOut' }}
            ref={modalRef}
            className="modal"
            onClick={(e) => e.stopPropagation()}
            tabIndex={0}
          >
            <div className="modal__inner">
              <button
                className="modal__close"
                onClick={handleModalToggle}
                aria-label={t('modal.close')}
                type="button"
              >
                <IoCloseSharp color="white" />
              </button>

              <header className="modal__header">
                <p className="modal__title">
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.getElementById('portal')
  );
};

export default Modal;
