import { useState } from 'react';
import { motion } from 'framer-motion';
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
            <motion.li
              className={`services__item ${openCards[service.id] ? "services__expanded" : ""}`}
              key={service.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: service.id * 0.3 }}
            >
              <ServicesItem
                service={service}
                open={openCards[service.id]}
                onClick={() => toggleExpand(service.id)}
              />
            </motion.li>
          ))}
        </ServicesList>
      </div>
    </section>
  );
};

export default Services;
