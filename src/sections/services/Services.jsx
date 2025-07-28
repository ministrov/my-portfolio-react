import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ServicesItem from '../../components/servicesItem/ServicesItem';
import Heading from '../../components/heading/Heading';
import ServicesList from './ServicesList';
import { services } from '../../const';
import './style.css';

const Services = () => {
  const [openCards, setOpenCards] = useState({});
  const { t } = useTranslation();

  const toggleExpand = (id) => {
    setOpenCards(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  return (
    <section className="services">
      <h2 className="visually-hidden">Section for a services</h2>
      <div className="container">
        <Heading
          title={t('heading.myServices.name')}
          slogan={t('heading.myServices.subheading')}
          className="services__title"
        ></Heading>

        <ServicesList>
          {services.map((service) => (
            <ServicesItem
              key={service.id}
              service={service}
              open={openCards[service.id]}
              onClick={() => toggleExpand(service.id)}
            />
          ))}
        </ServicesList>
      </div>
    </section>
  );
};

export default Services;
