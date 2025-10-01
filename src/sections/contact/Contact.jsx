import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../components/modal/Modal';
import Heading from '../../components/heading/Heading';
import './style.css';

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <section className="contact">
      <div className="container">
        <Heading
          title={'Connect with me'}
          slogan={
            'Schedule a quick call to learn how Area can turn your regional data into a powerful advantage.'
          }
        />

        <div className="contact__btn-container">
          <button className="contact__btn" onClick={() => setIsOpen(true)}>
            {t('footer.reachOutButton')}
          </button>
        </div>
      </div>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        autoCloseDelay={15000}
      />
    </section>
  );
};

export default Contact;
