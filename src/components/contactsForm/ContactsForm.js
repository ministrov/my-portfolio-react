// import { motion } from "framer-motion";
import "./style.css";

const ContactsForm = () => {
  return (
    // <motion.form
    //   action="#"
    //   initial={{ x: 50, opacity: 1 }}
    //   whileInView={{ x: 0, opacity: 1 }}
    //   transition={{ type: "tween", duration: 1 }}
    // >
    //   <input type="text" name="name" placeholder="Your Full Name" required />
    //   <input type="email" name="email" placeholder="Your Email" required />
    //   <textarea
    //     name="message"
    //     rows="7"
    //     placeholder="Your Message"
    //     required
    //   ></textarea>

    //   <motion.button
    //     type="submit"
    //     className="contacts__btn-submit btn"
    //     whileHover={{ scale: 1.1 }}
    //     whileTap={{ scale: 0.9 }}
    //   >
    //     Send me a message
    //   </motion.button>
    // </motion.form>
    <div className="contact__form-container">
      <form action="#" className="contact__form">
        <div className="contact__form-field">
          <label className="contact__form-label" htmlFor="name">
            Name
          </label>
          <input
            required
            placeholder="Enter Your Name"
            type="text"
            className="contact__form-input"
            name="name"
            id="name"
          />
        </div>
        <div className="contact__form-field">
          <label className="contact__form-label" htmlFor="email">
            Email
          </label>
          <input
            required
            placeholder="Enter Your Email"
            type="text"
            className="contact__form-input"
            name="email"
            id="email"
          />
        </div>
        <div className="contact__form-field">
          <label className="contact__form-label" htmlFor="message">
            Message
          </label>
          <textarea
            required
            cols="30"
            rows="10"
            className="contact__form-input"
            placeholder="Enter Your Message"
            name="message"
            id="message"
          ></textarea>
        </div>
        <button type="submit" className="btn btn--theme contact__btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactsForm;
