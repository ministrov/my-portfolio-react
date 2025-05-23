import { useTranslation } from 'react-i18next';
import { FaQuoteRight } from 'react-icons/fa';
import { FaQuoteLeft } from 'react-icons/fa';
import clientAvatar from '../../assets/png/john-doe.png';
import './style.css';

const TestimonialCard = ({ content }) => {
  const { t } = useTranslation();
  return (
    <article className="testimonial-card">
      <div className="testimonial-card__top-left">
        <FaQuoteRight />
      </div>
      <div className="testimonial-card__bottom-right">
        <FaQuoteLeft />
      </div>
      <p className="testimonial-card__paragraph">{content}</p>
      <div className="testimonial-card__client-info">
        <div className="testimonial-card__client-picture">
          <img
            src={clientAvatar}
            width={125}
            height={125}
            alt="Client avatar in focus"
          />
        </div>
        <div className="testimonial-card__client-details">
          <h3 className="testimonial-card__client-details-title">
            {t('testimonials.user.name')}
          </h3>
          <span className="testimonial-card__client-details-info">
            {t('testimonials.user.profession')}
          </span>
        </div>
      </div>
    </article>
  );
};
export default TestimonialCard;
