import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
// import Button from '../button/Button';
import SocialList from '../socials/SocialList';
import './style.css';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 1.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

const Modal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const modalRef = useRef(null);
  const titleId = 'modal-title';

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();

    console.log(e.key);
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

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <motion.div
            ref={modalRef}
            className="modal"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <header className="modal__header">
              <h2>{t('modal.title')}</h2>

              <button
                className="modal-close"
                onClick={onClose}
                aria-label={t('modal.close')}
              >
                &times;
              </button>
            </header>

            <p>{t('modal.text')}</p>
            <div className="modal__socials">
              <SocialList />
            </div>
            {/* <Button
                onClick={onClose}
                text={t('modal.close')}
                className={'modal__btn btn--theme'}
              /> */}
            {/* <div className="modal__content">

            </div> */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById('portal')
  );
};

export default Modal;