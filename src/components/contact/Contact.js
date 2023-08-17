import { motion } from 'framer-motion';
import { FaTelegram } from 'react-icons/fa';
import { RiWhatsappFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import './style.css';

const Contact = ( { title, text } ) => {
  return (
    <section className="contacts">
      <h2 className="visually-hidden">Contact's information</h2>
      <div className="container">
        <h3 className="title-2">{title}</h3>
        <h5 className="title-1">{text}</h5>
      </div>

      <div className="container contacts__container">
        <motion.div
          className="contacts__options"
          initial={{ x: -50, opacity: 1 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: 'tween', duration: 1 }}
        >
          <article className="contacts__option">
            <MdEmail className="contacts__option-icon"/>
            <h4>Email</h4>
            <h5>ministrov2018@gmail.com</h5>
            <a href="mailto: ministrov2018@gmail.com" target="_blank" rel="noreferrer">Send a message</a>
          </article>

          <article className="contacts__option">
            <FaTelegram className="contacts__option-icon" />
            <h4>Telegram</h4>
            <h5>@antonyMinistrov</h5>
            <a href="https://t.me/antonyMinistrov" target="_blank" rel="noreferrer">Send a message</a>
          </article>

          <article className="contacts__option">
            <RiWhatsappFill className="contacts__option-icon"/>
            <h4>Whatsapp</h4>
            <h5>+7 (925) 739-86-12</h5>
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