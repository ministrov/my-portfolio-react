import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import './style.css';

const TestimonialCard = ({ avatar, content, user, profession }) => {
  return (
    <article className="testimonial-card">
      <div className="testimonial-card__quotes">
        <FaQuoteRight className="testimonial-card__quote testimonial-card__quote--top" />
        <FaQuoteLeft className="testimonial-card__quote testimonial-card__quote--bottom" />
      </div>
      <p className="testimonial-card__content">{content}</p>
      <div className="testimonial-card__client">
        <img
          src={avatar}
          className="testimonial-card__avatar"
          alt={`${user}, ${profession}`}
        />
        <div className="testimonial-card__client-info">
          <h3 className="testimonial-card__name">{user}</h3>
          <span className="testimonial-card__profession">{profession}</span>
        </div>
      </div>
    </article>
  );
};

export default TestimonialCard;
