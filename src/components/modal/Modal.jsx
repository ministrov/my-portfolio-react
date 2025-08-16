import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { IoCloseSharp } from "react-icons/io5";
import { useTranslation } from 'react-i18next';
import SocialList from '../socials/SocialList';
import './style.css';

const Modal = ({ open, onClose, autoCloseDelay }) => {
  const { t } = useTranslation();
  const modalRef = useRef(null);
  const timerRef = useRef(null);
  const titleId = 'modal-title';

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [open, handleKeyDown]);


  useEffect(() => {
    if (!open || !autoCloseDelay) return;

    timerRef.current = setTimeout(() => {
      onClose();
    }, autoCloseDelay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [open, autoCloseDelay, onClose]);

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
            <header className="modal__header">
              <p className="modal__slogan">{t('modal.title')}</p>

              <button
                className="modal__close"
                onClick={onClose}
                aria-label={t('modal.close')}
                tabIndex={0}
              >
                <IoCloseSharp
                  color='white'
                />
              </button>
            </header>

            <p className="modal__text">{t('modal.text')}</p>
            <div className="modal__socials">
              <SocialList />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.getElementById('portal')
  );
};

export default Modal;