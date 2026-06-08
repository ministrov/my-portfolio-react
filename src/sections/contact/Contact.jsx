import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../components/modal/Modal';
import Heading from '../../components/heading/Heading';
import './style.css';

/** Задержка автоматического закрытия модального окна связи (мс). */
const MODAL_AUTO_CLOSE_DELAY = 15000;

/**
 * Секция "Контакты" с кнопкой для открытия модального окна связи.
 * @component
 * @returns {JSX.Element} Секция контактов с заголовком и кнопкой.
 */
const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  /** Открывает модальное окно связи. */
  const handleOpenModal = () => setIsOpen(true);

  /** Закрывает модальное окно связи. */
  const handleCloseModal = () => setIsOpen(false);

  return (
    <section className="contact">
      <div className="container">
        <Heading
          variant="display"
          title={t('heading.contact.name')}
          accent={t('heading.contact.accent')}
        />

        <div className="contact__btn-container">
          <button
            type="button"
            className="contact__btn"
            onClick={handleOpenModal}
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
