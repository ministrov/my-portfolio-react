import { motion } from 'framer-motion';
import { FaTelegram } from 'react-icons/fa';
import { RiWhatsappFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import Heading from '../heading/Heading';
import './style.css';

const Contact = ( { title, text } ) => {
  return (
    <section className="contacts">
      <div className="container">
        <Heading title={"Keep in Touch"} className="contacts__title" slogan={"Unleash the power of code and create extraordinary digital experiences."}></Heading>
        <motion.div
          className="contacts__options"
          initial={{ x: -50, opacity: 1 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: 'tween', duration: 1 }}
        >
          {/* need to redo articles, icons and headings */}
          <article className="contacts__option">
            <MdEmail className="contacts__option-icon"/>
            <h5>Email</h5>
            <h6>ministrov2018@gmail.com</h6>
            <a href="mailto: ministrov2018@gmail.com" target="_blank" rel="noreferrer">Send a message</a>
          </article>

          <article className="contacts__option">
            <FaTelegram className="contacts__option-icon" />
            <h5>Telegram</h5>
            <h6>@antonyMinistrov</h6>
            <a href="https://t.me/antonyMinistrov" target="_blank" rel="noreferrer">Send a message</a>
          </article>

          <article className="contacts__option">
            <RiWhatsappFill className="contacts__option-icon"/>
            <h5>Whatsapp</h5>
            <h6>+7 (925) 739-86-12</h6>
            <a href="https://api.whatsapp.com/send?=+79257398612" target="_blank" rel="noreferrer">Send a message</a>
          </article>
        </motion.div>

        <motion.form
          action="#"
          initial={{ x: 50, opacity: 1 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: 'tween', duration: 1 }}
        >
          <input type="text" name="name" placeholder="Your Full Name" required />
          <input type="email" name="email" placeholder="Your Email" required/>
          <textarea name="message" rows="7" placeholder="Your Message" required></textarea>

          <motion.button
            type="submit"
            className="contacts__btn-submit btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Send me a message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}

export default Contact;