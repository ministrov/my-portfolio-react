import { useTranslation } from 'react-i18next';
import './style.css';

const ServicesItem = ({ service, open, onClick }) => {
  const { id, icon, title, description } = service;
  const { t } = useTranslation();
  const contentId = `service-content-${id}`;

  return (
    <>
      <div className="services__header">
        <div className="services__item-text text-outline">{`0${id}`}</div>
        <div className="services__icon">{icon}</div>
      </div>
      <div className="services__content">
        <h3 className="services__subheading">{t(title)}</h3>
        <p className="services__description">{t(description)}</p>
      </div>

      <button
        className="services__more"
        type="button"
        onClick={onClick}
        aria-expanded={open ? 'true' : 'false'}
        aria-controls={contentId}
      >
        {open ? t('services.hide') : t('services.showMore')}
      </button>
    </>
  );
};

export default ServicesItem;
