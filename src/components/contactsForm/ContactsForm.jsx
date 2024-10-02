import "./style.css";

const ContactsForm = () => {
  return (
    <div className="contact__form-container">
      <form
        action="#"
        className="contact__form"
      >
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
        <button type="submit" className="btn btn--theme">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactsForm;
