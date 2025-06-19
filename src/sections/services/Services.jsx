import { useTranslation } from 'react-i18next';
import ServicesListItem from '../../components/servicesListItem/ServicesListItem';
// import ExpandableCard from '../../components/ExpandableCard/ExpandableCard';
import Heading from '../../components/heading/Heading';
import { motion } from 'framer-motion';
import { SlGlobe } from 'react-icons/sl';
import { SiAffinitydesigner } from 'react-icons/si';
import { TbSeo } from 'react-icons/tb';
import './style.css';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      num: '01',
      title: t('services.title.one'),
      description: t('services.description.one'),
      href: '',
      icon: <SlGlobe color="white" size={25} />,
    },
    {
      num: '02',
      title: t('services.title.two'),
      description: t('services.description.two'),
      href: '',
      icon: <SiAffinitydesigner color="white" size={25} />,
    },
    {
      num: '03',
      title: t('services.title.three'),
      description: t('services.description.three'),
      href: '',
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
            <ServicesListItem key={service.num} service={service} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Services;
