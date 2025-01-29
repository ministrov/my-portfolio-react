import { useState, useEffect } from "react";
import Promo from "../sections/promo/Promo";
import About from "../sections/about/About";
import Modal from "../components/modal/Modal";
import Skills from "../sections/skills/Skills";
import Testimonials from "../sections/testimonials/Testimonials";
import ScrollToTop from "../components/scrollToTop/ScrollToTop";
import Faq from "../sections/faq/Faq";
import Services from "../sections/services/Services";
import Statistics from "../sections/statistics/Statistics";
// import MyCheckBox from '../components/myCheckBox/MyCheckBox';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const formatedDate = new Intl.DateTimeFormat("ru-Ru").format();

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

  return (
    <>
      <main
        className="home-page"
      >
        <h1 className="visually-hidden">Home page of the author</h1>

        <Promo setIsOpen={setIsOpen} />

        <Statistics />

        <About />

        <Services />

        <Skills />

        <Testimonials />

        <Faq/>

        {/* <MyCheckBox/> */}

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
