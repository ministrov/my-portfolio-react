import { FaTelegram } from 'react-icons/fa';
import { RiWhatsappFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import './style.css';

const Contact = () => {
  return (
    <section className="contacts">
      <div className="container">
        <h2>Get in Touch</h2>
        <h5>Contact Me</h5>
      </div>

      <div className="container contacts__container">
        <div className="contacts__options">
          <article className="contacts__option">
            <MdEmail/>
            <h4>Email</h4>
            <h5>ministrov2018@gmail.com</h5>
            <a href="mailto: ministrov2018@gmail.com" target="_blank" rel="noreferrer">Send a message</a>
          </article>

          <article className="contacts__option">
            <FaTelegram />
            <h4>Telegram</h4>
            <h5>@antonyMinistrov</h5>
            <a href="https://t.me/antonyMinistrov" target="_blank" rel="noreferrer">Send a message</a>
          </article>

          <article className="contacts__option">
            <RiWhatsappFill />
            <h4>Whatsapp</h4>
            <h5>+7 (925) 739-86-12</h5>
            <a href="https://api.whatsapp.com/send?=+79257398612" target="_blank" rel="noreferrer">Send a message</a>
          </article>
        </div>

        <form action="#"></form>
      </div>
    </section>
  );
}

export default Contact;