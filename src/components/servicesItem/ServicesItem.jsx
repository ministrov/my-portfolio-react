import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import './style.css';

/**
 * Компонент элемента услуги для отображения в секции услуг.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.service - Объект услуги.
 * @param {number} props.service.id - Уникальный идентификатор услуги.
 * @param {React.ReactNode} props.service.icon - Иконка услуги (React-элемент).
 * @param {string} props.service.title - Ключ перевода для заголовка услуги.
 * @param {string} props.service.description - Ключ перевода для описания услуги.
 * @param {boolean} props.open - Флаг, указывающий, раскрыт ли элемент.
 * @param {Function} props.onClick - Обработчик клика по кнопке раскрытия/скрытия.
 * @returns {React.ReactElement} Элемент услуги.
 */
const ServicesItem = ({ service, open, onClick }) => {
  const { id, icon, title, description } = service;
  const { t } = useTranslation();
  const contentId = `service-content-${id}`;
  const formattedId = String(id).padStart(2, '0');
  const buttonLabel = open ? t('services.hide') : t('services.showMore');
  const ariaLabel = open ? t('services.ariaHide') : t('services.ariaShowMore');

  return (
    <>
      <div className="services__header">
        <div className="services__item-text text-outline">{formattedId}</div>
        <div className="services__icon">{icon}</div>
      </div>
      <div id={contentId} className="services__content">
        <h3 className="services__subheading">{t(title)}</h3>
        <p className="services__description">{t(description)}</p>
      </div>

      <button
        className="services__more"
        type="button"
        onClick={onClick}
        aria-expanded={open}
        aria-controls={contentId}
        aria-label={ariaLabel}
      >
        {buttonLabel}
      </button>
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
  /** Флаг раскрытого состояния */
  open: PropTypes.bool,
  /** Обработчик переключения */
  onClick: PropTypes.func.isRequired,
};

export default ServicesItem;
