import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Promo from "../sections/promo/Promo";
import About from "../sections/about/About";
import Modal from "../components/modal/Modal";
import Skills from "../sections/skills/Skills";
import Testimonials from "../sections/testimonials/Testimonials";
import ScrollUp from "../components/scrollUp/scrollUp";
import Faq from "../sections/faq/Faq";
import Services from "../sections/services/Services";
import Statistics from "../sections/statistics/Statistics";

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
      <Helmet>
        <title>A Home page of Anton Zhilin professional portfolio</title>
        <meta
          name="description"
          content="A Home page of the frontend developer portfolio about developing a stunning apps and web applications"
          data-rh="true"
        />
        <link rel="canonical" href="/" />
      </Helmet>

      <h1 className="visually-hidden">Home page of the author</h1>

      <Promo setIsOpen={setIsOpen} />

      <Statistics />

      <About />

      <Services />

      <Skills />

      <Testimonials />

      <Faq/>

      <ScrollUp/>

      <Modal 
        open={isOpen} 
        formatedDate={formatedDate} 
        onClose={onCloseHandler}
      />
    </>
  );
};

export default Home;
