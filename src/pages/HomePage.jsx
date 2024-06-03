import { useState, useEffect } from "react";
import Promo from "../sections/promo/Promo";
import About from "../sections/about/About";
import Modal from "../components/modal/Modal";
import Contacts from "../sections/contacts/Contacts";
import Skills from "../sections/skills/Skills";
import Testimonials from "../sections/testimonials/Testimonials";
import ScrollToTop from "../components/scrollToTop/ScrollToTop";
import Faq from "../sections/faq/Faq";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onCloseHandler = (event) => {
    const target = event.target;

    if (target) setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const formatedDate = new Intl.DateTimeFormat("ru-Ru").format();

  useEffect(() => {
    console.log(formatedDate);
  }, [formatedDate]);

  return (
    <>
      <main
        className="home-page"
      >
        <h1 className="visually-hidden">Home page of the author</h1>

        <Promo setIsOpen={setIsOpen} />

        <About />

        <Skills />

        <Testimonials />

        <Faq/>

        <Contacts />

        <ScrollToTop/>
      </main>

      <Modal open={isOpen} onClose={onCloseHandler}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque alias
          maiores non deleniti nemo iure, ex accusantium harum perspiciatis
          reiciendis ipsam earum at, repellendus facere nisi quia asperiores
          minima fugit rerum illum perferendis!
        </p>

        <p>
          Quia aut, repellendus, qui pariatur voluptate ut in corporis, culpa
          eveniet deleniti eaque dolor cum repudiandae nostrum!
        </p>

        <div>
          {formatedDate}
        </div>
      </Modal>
    </>
  );
};

export default Home;
