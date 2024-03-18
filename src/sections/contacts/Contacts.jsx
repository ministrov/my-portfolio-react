import Heading from "../../components/heading/Heading";
import ContactsForm from "../../components/contactsForm/ContactsForm";
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

        <ContactsForm />
      </div>
    </section>
  );
};

export default Contacts;
