import { useState } from "react";
import Carousel from "../../components/carousel/Carousel";
import Heading from "../../components/heading/Heading";
import "./style.css";

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="container">
        <Heading
          title={"Testimonials"}
          slogan={
            "Unleash the power of code and create extraordinary digital experiences."
          }
          className="testimonials__header"
        ></Heading>

        <Carousel className="testimonials__carousel" />
      </div>

      <Lesson/>
    </section>
  );
};

const Lesson = () => {
  const [isLogoVisible, setIsLogoVisible] = useState(false);

  const toggleLogo = () => {
    setIsLogoVisible((current) => !current);
  };

  return (
    <div className="wrapper">
      <div>
        <h2>Do you want to see React Logo?</h2>
        <input type="radio" name="logo" checked={isLogoVisible} onChange={toggleLogo} />
        Yes
        <input type="radio" name="logo" checked={isLogoVisible} onChange={toggleLogo} />
        No
      </div>

      {isLogoVisible && (
        <div>
          {/* <img src={avatar} alt="Some picture in focus"/> */}
        </div>
      )}
    </div>
  );
};

export default Testimonials;
