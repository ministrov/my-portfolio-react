import { BsArrowDownRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { services } from "../../data/services";
import "./style.css";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="services">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' }
          }}
        >
          {services.map((service, index) => (
            <div key={index}>
              {/* Top */}
              <div>
                <div>{service.num}</div>
              </div>
              <Link href={service.href}>
                <BsArrowDownRight />
              </Link>

              {/* Title */}

              <h2>{service.title}</h2>

              {/* Description */}
              <p>{service.description}</p>

              {/* Border */}
              <div className="services__border"></div>
            </div>
          ))
          }
        </motion.div>
      </div>
    </div>
  )
}

export default Services