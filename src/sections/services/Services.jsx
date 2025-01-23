import ServicesListItem from '../../components/servicesListItem/ServicesListItem';
import { motion } from "framer-motion";
import { services } from "../../data/services";
import "./style.css";

const Services = () => {
  return (
    <section className="services">
      <div className="container">
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' }
          }}
          className="services__list"
        >
          {services.map((service) => (
              <ServicesListItem
                key={service.num} 
                service={service} 
              />
            ))
          }
        </motion.ul>
      </div>
    </section>
  )
}

export default Services;