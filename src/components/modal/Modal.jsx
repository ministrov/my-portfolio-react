import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Button from '../button/Button';
import SocialList from '../socials/SocialList';
import Backdrop from '../backdrop/Backdrop';
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
  if (!open) return null;

  return createPortal(
    <Backdrop>
      <motion.div
        className="modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__content">
          <h2>{t('modal.title')}</h2>
          <p>{t('modal.text')}</p>
          <div className="modal__socials">
            <SocialList />
          </div>
          <Button
            onClick={onClose}
            text={t('modal.close')}
            className={'modal__btn btn--theme'}
          />
        </div>
      </motion.div>
    </Backdrop>,
    document.getElementById('portal')
  );
};

export default Modal;
