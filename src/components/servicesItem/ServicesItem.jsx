import { useTranslation } from 'react-i18next';
import { MdArrowForward } from 'react-icons/md';
import useGoToContacts from '../../hooks/useGoToContacts';
import './style.css';

/**
 * Строка услуги в типографском списке секции «Мои услуги» (не карточка —
 * см. JSDoc `Services`). Описание показывается целиком — оно короткое
 * (2-3 предложения), усечение с «Читать дальше» только добавляло лишний клик.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.service - Объект услуги.
 * @param {number} props.service.id - Уникальный идентификатор услуги.
 * @param {React.ReactNode} props.service.icon - Иконка услуги (React-элемент).
 * @param {string} props.service.title - Ключ перевода для заголовка услуги.
 * @param {string} props.service.description - Ключ перевода для описания услуги.
 * @returns {React.ReactElement} Строка услуги.
 */
const ServicesItem = ({ service }) => {
  const { icon, title, description } = service;
  const { t } = useTranslation();
  // Та же цель, что у CtaButton и «Контактов» в меню, — заголовок контактов
  const goToContacts = useGoToContacts();

  return (
    <>
      <div className="services__row-main">
        <span className="services__icon" aria-hidden="true">
          {icon}
        </span>
        <h3 className="services__name">{t(title)}</h3>
        <p className="services__description">{t(description)}</p>
      </div>

      <button type="button" className="services__cue" onClick={goToContacts}>
        {t('modal.cta')}
        <MdArrowForward className="services__cue-icon" aria-hidden="true" />
      </button>
    </>
  );
};

export default ServicesItem;
