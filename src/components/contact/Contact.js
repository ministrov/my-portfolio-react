import { FaTelegram } from 'react-icons/fa';
import { RiWhatsappFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import './style.css';

const Contact = () => {
  return (
    <section className="contacts">
      <h2 className="visually-hidden">Contact's information</h2>
      <div className="container">
        <h3 className="title-2">Get in Touch</h3>
        <h5 className="title-1">Contact Me</h5>
      </div>

      <div className="container contacts__container">
        <div className="contacts__options">
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
        </div>

        <form action="#">
          <input type="text" name="name" placeholder="Your Full Name" required />
          <input type="email" name="email" placeholder="Your Email" required/>
          <textarea name="message" rows="7" placeholder="Your Message" required></textarea>

          <button type="submit" className="contacts__btn-submit btn">Send me a message</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;