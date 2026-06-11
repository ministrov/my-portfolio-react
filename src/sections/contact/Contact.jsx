import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdEmail, MdLocationOn, MdAccessTime } from 'react-icons/md';
import Modal from '../../components/modal/Modal';
import Heading from '../../components/heading/Heading';
import SocialList from '../../components/socials/SocialList';
import ContactForm from '../../components/contactForm/ContactForm';
import './style.css';

/** Задержка автоматического закрытия модального окна связи (мс). */
const MODAL_AUTO_CLOSE_DELAY = 15000;

/**
 * Секция "Контакты" — двухколоночный layout с карточкой информации и формой обратной связи.
 * Модальное окно «4 шага» доступно через вторичный CTA внизу левой карточки.
 *
 * @component
 * @returns {JSX.Element}
 */
const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  /** Открывает модальное окно заказа. */
  const handleOpenModal = () => setIsOpen(true);

  /** Закрывает модальное окно заказа. */
  const handleCloseModal = () => setIsOpen(false);

  return (
    <section className="contact" aria-labelledby="contact-heading">
      <div className="container">
        <Heading
          variant="display"
          id="contact-heading"
          title={t('heading.contact.name')}
          accent={t('heading.contact.accent')}
        />

        <div className="contact__layout">
          {/* Левый блок: контактные детали */}
          <div className="contact__info">
            <p className="contact__info-subtitle">
              {t('contactForm.info.subtitle')}
            </p>

            <ul className="contact__info-list">
              <li className="contact__info-item">
                <MdEmail aria-hidden="true" />
                <a
                  href={`mailto:${t('contactForm.info.email').trim()}`}
                  title={`Send email to ${t('contactForm.info.email')}`}
                >
                  {t('contactForm.info.email')}
                </a>
              </li>
              <li className="contact__info-item">
                <MdLocationOn aria-hidden="true" />
                <span>{t('contactForm.info.location')}</span>
              </li>
              <li className="contact__info-item">
                <MdAccessTime aria-hidden="true" />
                <span>{t('contactForm.info.hours')}</span>
              </li>
            </ul>

            <SocialList variant="blue" className="contact__socials" />

            <button
              type="button"
              className="contact__order-btn"
              onClick={handleOpenModal}
            >
              {t('contactForm.info.orderLink')}
              <span aria-hidden="true"> →</span>
            </button>
          </div>

          {/* Правый блок: форма */}
          <div className="contact__form-wrap">
            <ContactForm />
          </div>
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
