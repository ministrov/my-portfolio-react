import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import './style.css';

/**
 * Компонент элемента услуги для отображения в секции услуг.
 * Описание показывается целиком — оно короткое (2-3 предложения),
 * усечение с «Читать дальше» только добавляло лишний клик.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.service - Объект услуги.
 * @param {number} props.service.id - Уникальный идентификатор услуги.
 * @param {React.ReactNode} props.service.icon - Иконка услуги (React-элемент).
 * @param {string} props.service.title - Ключ перевода для заголовка услуги.
 * @param {string} props.service.description - Ключ перевода для описания услуги.
 * @returns {React.ReactElement} Элемент услуги.
 */
const ServicesItem = ({ service }) => {
  const { id, icon, title, description } = service;
  const { t } = useTranslation();
  const formattedId = String(id).padStart(2, '0');

  return (
    <>
      <div className="services__header">
        <div className="services__item-text text-outline">{formattedId}</div>
        <div className="services__icon">{icon}</div>
      </div>
      <div className="services__content">
        <h3 className="services__subheading">{t(title)}</h3>
        <p className="services__description">{t(description)}</p>
      </div>
    </>
  );
};

ServicesItem.propTypes = {
  /** Объект услуги */
  service: PropTypes.shape({
    /** Уникальный идентификатор */
    id: PropTypes.number.isRequired,
    /** Иконка услуги */
    icon: PropTypes.node.isRequired,
    /** Ключ перевода заголовка */
    title: PropTypes.string.isRequired,
    /** Ключ перевода описания */
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ServicesItem;
