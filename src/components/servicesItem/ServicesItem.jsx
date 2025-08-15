import { useTranslation } from 'react-i18next';
import './style.css';

const ServicesItem = ({ service, open, onClick }) => {
  const { id, icon, title, description } = service;
  const { t } = useTranslation();

  return (

    <>
      <div className="services__item-text text-outline">{`0${id}`}</div><div className="services__icon">{icon}</div><h3 className="services__subheading">{t(title)}</h3><p className="services__description">{t(description)}</p><button
        className="services__more"
        onClick={onClick}
        aria-expanded={open}
      >
        {open ? t('services.hide') : t('services.showMore')}
      </button>
    </>
  );
};

export default ServicesItem;