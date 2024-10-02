import { Link } from "react-router-dom";
import { BsArrowDownRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { services } from "../../data/services";
import "./style.css";

const Services = () => {
  return (
    <section className="services">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' }
          }}
          className="services__list"
        >
          {services.map((service, index) => (
            <div key={index}
              className="services__item"
            >
              {/* Top */}
              <div className="services__item-block">
                <div className="services__item-text text-outline">{service.num}</div>
                <Link className="services__item-link" href={service.href}>
                  <BsArrowDownRight className="services__item-icon"/>
                </Link>
              </div>

              {/* Title */}

              <h2 className="services__subheading">{service.title}</h2>

              {/* Description */}
              <p className="services__description">{service.description}</p>

              {/* Border */}
              <div className="services__border"></div>
            </div>
          ))
          }
        </motion.div>
      </div>
    </section>
  )
}

export default Services