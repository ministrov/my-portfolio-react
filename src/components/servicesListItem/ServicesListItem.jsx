import { useTranslation } from 'react-i18next';
import { BsArrowDownRight } from 'react-icons/bs';
import './style.css';

const ServicesListItem = ({ service, open, onClick }) => {
  const { id, href, icon, title, description } = service;
  const { t } = useTranslation();

  return (
    <li className={`services__item ${open ? "services__expanded" : ""}`}>
      <div className="services__item-block">
        <div className="services__item-text text-outline">{`0${id}`}</div>
        <div className="services__arrow" href={href}>
          <BsArrowDownRight className="services__arrow-icon" />
        </div>
      </div>
      <div className="services__icon">{icon}</div>
      <h2 className="services__subheading">{title}</h2>
      <p className="services__description">{description}</p>

      <button
        className="services__more"
        onClick={(e) => onClick(e.target)}
        aria-expanded={open}
      >
        {open ? t('services.hide') : t('services.showMore')}
      </button>
    </li>
  );
};

export default ServicesListItem;
