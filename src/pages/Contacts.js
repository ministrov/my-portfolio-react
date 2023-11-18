import { motion } from 'framer-motion';
import Contact from '../components/contact/Contact';
import map from '../img/content-map.png';
import Heading from '../components/heading/Heading';

const Contacts = ({ title }) => {
  return (
    <motion.main
      className="contacts"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="visually-hidden">Author's contact page</h1>

      <div className="container">
        <Heading className="contacts__header title-1">{title}</Heading>

        <div className="content-list-wrapper">
          <ul className="content-list">
            <li className="content-list__item">
              <h3 className="title-2">Location</h3>
              <p>Moscow, Russia</p>
            </li>
            <li className="content-list__item">
              <h3 className="title-2">Telegram / WhatsApp</h3>
              <p><a href="tel:+79257398612">+7 (925) 739-86-12</a></p>
            </li>
            <li className="content-list__item">
              <h3 className="title-2">Email</h3>
              <p><a href="mailto:ministrov2018@gmail.com">ministrov2018@gmail.com</a></p>
            </li>
          </ul>
        </div>

        <div className="contacts-map">
          <img src={map} alt="Map of the city" />
        </div>

        <div className="keep-in-touch">
          <Contact title={'Keep in touch'} text={'Write to me'}/>
        </div>
      </div>
    </motion.main>
  )
}

export default Contacts;