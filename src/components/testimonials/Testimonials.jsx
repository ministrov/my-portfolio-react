import Carousel from "../carousel/Carousel";
import Heading from "../heading/Heading";
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
    </section>
  );
};

export default Testimonials;
