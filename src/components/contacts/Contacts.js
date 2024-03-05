import { motion } from "framer-motion";
import { FaTelegram } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import Heading from "../heading/Heading";
import ContactsForm from "../contactsForm/ContactsForm";
import "./style.css";

const Contacts = () => {
  return (
    <section className="contacts">
      <div className="container">
        <Heading
          title={"Keep in Touch"}
          className={
            "contacts__title heading-sec__main--lt heading-sec__sub--lt"
          }
          slogan={
            "Unleash the power of code and create extraordinary digital experiences."
          }
        ></Heading>
        <motion.div
          className="contacts__options"
          initial={{ x: -50, opacity: 1 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: "tween", duration: 1 }}
        >
          {/* Need to make a new component ContactsInfo where will be this article */}
          <article className="contacts__option">
            <MdEmail className="contacts__option-icon" />
            <h5>Email</h5>
            <h6>ministrov2018@gmail.com</h6>
            <a
              href="mailto: ministrov2018@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              Send a message
            </a>
          </article>

          <article className="contacts__option">
            <FaTelegram className="contacts__option-icon" />
            <h5>Telegram</h5>
            <h6>@antonyMinistrov</h6>
            <a
              href="https://t.me/antonyMinistrov"
              target="_blank"
              rel="noreferrer"
            >
              Send a message
            </a>
          </article>

          <article className="contacts__option">
            <RiWhatsappFill className="contacts__option-icon" />
            <h5>Whatsapp</h5>
            <h6>+7 (925) 739-86-12</h6>
            <a
              href="https://api.whatsapp.com/send?=+79257398612"
              target="_blank"
              rel="noreferrer"
            >
              Send a message
            </a>
          </article>
        </motion.div>

        <ContactsForm />
      </div>
    </section>
  );
};

export default Contacts;
