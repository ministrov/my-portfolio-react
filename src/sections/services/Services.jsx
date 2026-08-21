import { useTranslation } from 'react-i18next';
import ServicesItem from '../../components/servicesItem/ServicesItem';
import Heading from '../../components/heading/Heading';
import ServicesList from './ServicesList';
import { services } from '../../const';
import './style.css';

/**
 * Компонент секции услуг
 * @returns {JSX.Element} Секция услуг
 */
const Services = () => {
  const { t } = useTranslation();

  // Если услуг нет, не рендерим список
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section className="services" aria-labelledby="services-heading">
      <div className="container">
        <Heading
          id="services-heading"
          title={t('heading.myServices.name')}
          accent={t('heading.myServices.accent')}
        />

        <ServicesList>
          {services.map((service) => (
            <li className="services__row" key={service.id}>
              <ServicesItem service={service} />
            </li>
          ))}
        </ServicesList>
      </div>
    </section>
  );
};

export default Services;
