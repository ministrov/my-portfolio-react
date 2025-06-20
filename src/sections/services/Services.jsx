import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ServicesListItem from '../../components/servicesListItem/ServicesListItem';
import Heading from '../../components/heading/Heading';
import { motion } from 'framer-motion';
import { SlGlobe } from 'react-icons/sl';
import { SiAffinitydesigner } from 'react-icons/si';
import { TbSeo } from 'react-icons/tb';
import './style.css';

const Services = () => {
  const [openCards, setOpenCards] = useState({});
  const { t } = useTranslation();

  console.log(openCards);

  const toggleExpand = (id) => {
    console.log(id);
    setOpenCards(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const services = [
    {
      id: 1,
      title: t('services.title.one'),
      description: t('services.description.one'),
      icon: <SlGlobe color="white" size={25} />,
    },
    {
      id: 2,
      title: t('services.title.two'),
      description: t('services.description.two'),
      icon: <SiAffinitydesigner color="white" size={25} />,
    },
    {
      id: 3,
      title: t('services.title.three'),
      description: t('services.description.three'),
      icon: <TbSeo color="white" size={25} />,
    },
  ];

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
