// import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Promo from "../sections/promo/Promo";
import About from "../sections/about/About";
// import Modal from "../components/modal/Modal";
import Skills from "../sections/skills/Skills";
import Advertisement from "../sections/advertisement/Advertisement";
import Testimonials from "../sections/testimonials/Testimonials";
import Faq from "../sections/faq/Faq";
import Services from "../sections/services/Services";
import Statistics from "../sections/statistics/Statistics";
// import { useFetchData } from "../hooks/useFetchData";

const Home = () => {
  // const { data, loading, error } = useFetchData("https://dummyjson.com/users");

  // const [isOpen, setIsOpen] = useState(false);
  // It needs for opening a modal window
  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }

  //   let timeout = setTimeout(() => {
  //     setIsOpen(true);
  //   }, 30000);

  //   return () => {
  //     document.body.style.overflow = "auto";
  //     clearTimeout(timeout);
  //   };

  // }, [isOpen]);

  return (
    <>
      <Helmet>
        <title>A Home page of Anton Zhilin professional portfolio</title>
        <meta
          name="description"
          content="A Home page of the frontend developer portfolio about developing a stunning apps and web applications"
          data-rh="true"
        />
        <meta
          name="keywords"
          content="HTML, web layout, outsourcing, development, web developer, Figma, PSD, frontend, order"
        />
        <link rel="canonical" href="/" />
      </Helmet>
      <section className="main-page">
        <h1 className="visually-hidden">Home page of the author portfolio</h1>

        {/* {loading && <div>Loading....</div>}

        {error && <div>Error: {error}</div>} */}

        <Promo />

        <Statistics />

        <About />

        <Services />

        <Skills />

        <Advertisement />

        <Testimonials />

        <Faq />

        {/* <Modal 
        open={isOpen}
        onClose={() => setIsOpen(false)}
      /> */}
      </section>
    </>
  );
};

export default Home;
