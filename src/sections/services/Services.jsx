import ServicesListItem from '../../components/servicesListItem/ServicesListItem';
import { motion } from 'framer-motion';
import { services } from '../../helpers/mocks/services';
import './style.css';

const Services = () => {
  return (
    <section className="services">
      <h2 className="visually-hidden">Section for a services</h2>
      <div className="container">
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
