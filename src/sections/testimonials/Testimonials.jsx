import Carousel from "../../components/carousel/Carousel";
import Heading from "../../components/heading/Heading";
import "./style.css";

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2 className="visually-hidden">Section for a Testimonials</h2>
      <div className="container">
        <Heading
          title={"Testimonials"}
          slogan={
            "Satisfied Clients Speak Out"
          }
          className="testimonials__header"
        ></Heading>

        <Carousel className="testimonials__carousel" />
      </div>
    </section>
  );
};

export default Testimonials;
