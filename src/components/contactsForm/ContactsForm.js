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
    <div class="contact__form-container">
      <form action="#" class="contact__form">
        <div class="contact__form-field">
          <label class="contact__form-label" for="name">
            Name
          </label>
          <input
            required
            placeholder="Enter Your Name"
            type="text"
            class="contact__form-input"
            name="name"
            id="name"
          />
        </div>
        <div class="contact__form-field">
          <label class="contact__form-label" for="email">
            Email
          </label>
          <input
            required
            placeholder="Enter Your Email"
            type="text"
            class="contact__form-input"
            name="email"
            id="email"
          />
        </div>
        <div class="contact__form-field">
          <label class="contact__form-label" for="message">
            Message
          </label>
          <textarea
            required
            cols="30"
            rows="10"
            class="contact__form-input"
            placeholder="Enter Your Message"
            name="message"
            id="message"
          ></textarea>
        </div>
        <button type="submit" class="btn btn--theme contact__btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactsForm;
