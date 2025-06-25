import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ServicesListItem from '../../components/servicesListItem/ServicesListItem';
import Heading from '../../components/heading/Heading';
import { services } from './services';
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
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 1.4, duration: 0.7, ease: 'easeIn' },
          }}
          className="services__list"
        >
          {services.map((service) => (
            <ServicesListItem
              key={service.id}
              service={service}
              open={openCards[service.id]}
              onClick={() => toggleExpand(service.id)}
            />
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Services;
