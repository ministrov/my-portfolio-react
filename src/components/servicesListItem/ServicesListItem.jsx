import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsArrowDownRight } from 'react-icons/bs';
import './style.css';

const ServicesListItem = ({ service }) => {
  const [isOpen, setOpen] = useState(false);
  const { t } = useTranslation();

  const toggleExpand = () => {
    setOpen((current) => !current);
  };

  return (
    <li className={`services__item ${isOpen ? 'services__item--short' : ''}`}>
      <div className="services__item-block">
        <div className="services__item-text text-outline">{service.num}</div>
        <div className="services__arrow" href={service.href}>
          <BsArrowDownRight className="services__arrow-icon" />
        </div>
      </div>

      <div className="services__icon">{service.icon}</div>

      <h2 className="services__subheading">{service.title}</h2>

      <p className="services__description">{service.description}</p>

      <button
        className="services__more"
        onClick={toggleExpand}
        aria-expanded={isOpen}
      >
        {isOpen ? t('services.hide') : t('services.showMore')}
      </button>
    </li>
  );
};

export default ServicesListItem;
