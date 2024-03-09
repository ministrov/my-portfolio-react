import { FaQuoteRight } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";
import clientAvatar from "../../assets/png/john-doe.png";
import "./style.css";

const TestimonialCard = () => {
  return (
    <article className="testimonial-card">
      <div className="testimonial-card__top-left">
        <FaQuoteRight/>
      </div>
      <div className="testimonial-card__bottom-right">
        <FaQuoteLeft/>
      </div>
      <p className="testimonial-card__paragraph">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet.
      </p>
      <div className="testimonial-card__client-info">
        <div className="testimonial-card__client-picture">
          <img src={clientAvatar} alt="Client avatar in focus" />
        </div>
        <div className="testimonial-card__client-details">
          <h3 className="testimonial-card__client-details-title">Ronald Row</h3>
          <span className="testimonial-card__client-details-info">
            Designer, LLC Team
          </span>
        </div>
      </div>
    </article>
  );
};
export default TestimonialCard;
