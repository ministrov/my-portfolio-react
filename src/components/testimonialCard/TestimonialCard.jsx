import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaQuoteLeft } from 'react-icons/fa';
import './style.css';

/**
 * Карточка отзыва: цитата, декоративная иконка кавычек и тип проекта.
 * Отзыв не привязан к конкретному человеку или компании — вместо имени
 * показывается тип проекта (`context`), чтобы не выдумывать личности.
 * Текст цитаты и типа проекта резолвится из i18n по ключам.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {string} props.quote - i18n-ключ текста отзыва.
 * @param {string} props.context - i18n-ключ типа проекта (например, «Клиент · Корпоративный сайт»).
 * @param {string} props.accent - HEX-цвет иконки цитаты (динамический inline-стиль).
 * @returns {React.ReactElement} Карточка отзыва.
 *
 * @example
 * <TestimonialCard
 *   quote="testimonials.cards.one.quote"
 *   context="testimonials.cards.one.context"
 *   accent="#0058a7"
 * />
 */
const TestimonialCard = ({ quote, context, accent }) => {
  const { t } = useTranslation();

  return (
    <figure className="testimonial-card">
      <FaQuoteLeft
        className="testimonial-card__icon"
        style={{ color: accent }}
        aria-hidden="true"
      />
      <blockquote className="testimonial-card__quote">{t(quote)}</blockquote>
      <figcaption className="testimonial-card__context">
        {t(context)}
      </figcaption>
    </figure>
  );
};

TestimonialCard.propTypes = {
  /** i18n-ключ текста отзыва */
  quote: PropTypes.string.isRequired,
  /** i18n-ключ типа проекта */
  context: PropTypes.string.isRequired,
  /** HEX-цвет иконки цитаты */
  accent: PropTypes.string.isRequired,
};

export default TestimonialCard;
