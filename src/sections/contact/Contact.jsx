import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../components/modal/Modal';
import Heading from '../../components/heading/Heading';
import './style.css';

/**
 * Секция "Контакты" с кнопкой для открытия модального окна связи.
 * @component
 * @returns {JSX.Element} Секция контактов с заголовком и кнопкой.
 */
const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  /** Задержка автоматического закрытия модального окна в миллисекундах */
  const MODAL_AUTO_CLOSE_DELAY = 15000;

  /**
   * Обработчик открытия модального окна.
   * Устанавливает состояние isOpen в true.
   */
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  /**
   * Обработчик закрытия модального окна.
   * Устанавливает состояние isOpen в false.
   */
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <section className="contact">
      <div className="container">
        <Heading
          title={t('heading.contact.name')}
          slogan={t('heading.contact.subheading')}
        />

        <div className="contact__btn-container">
          <button
            type="button"
            className="contact__btn"
            onClick={handleOpenModal}
            aria-label={t('footer.reachOutButton')}
          >
            {t('footer.reachOutButton')}
          </button>
        </div>
      </div>

      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        autoCloseDelay={MODAL_AUTO_CLOSE_DELAY}
      />
    </section>
  );
};

export default Contact;
