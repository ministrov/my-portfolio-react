import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './style.css';

/**
 * Карточка отзыва клиента: цитата, аватар-заглушка с инициалами,
 * имя и должность. Текст цитаты и должности резолвится из i18n по ключам.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {string} props.quote - i18n-ключ текста отзыва.
 * @param {string} props.name - Имя клиента (литерал, имя собственное).
 * @param {string} props.position - i18n-ключ должности/компании.
 * @param {string} props.initials - Инициалы для аватара-заглушки.
 * @param {string} props.accent - HEX-цвет фона аватара (динамический inline-стиль).
 * @returns {React.ReactElement} Карточка отзыва.
 *
 * @example
 * <TestimonialCard
 *   quote="testimonials.michael.quote"
 *   name="Michael Johnson"
 *   position="testimonials.michael.position"
 *   initials="MJ"
 *   accent="#0058a7"
 * />
 */
const TestimonialCard = ({ quote, name, position, initials, accent }) => {
  const { t } = useTranslation();

  return (
    <figure className="testimonial-card">
      <blockquote className="testimonial-card__quote">{t(quote)}</blockquote>
      <figcaption className="testimonial-card__author">
        <span
          className="testimonial-card__avatar"
          style={{ backgroundColor: accent }}
          aria-hidden="true"
        >
          {initials}
        </span>
        <span className="testimonial-card__meta">
          <span className="testimonial-card__name">{name}</span>
          <span className="testimonial-card__position">{t(position)}</span>
        </span>
      </figcaption>
    </figure>
  );
};

TestimonialCard.propTypes = {
  /** i18n-ключ текста отзыва */
  quote: PropTypes.string.isRequired,
  /** Имя клиента (литерал, имя собственное) */
  name: PropTypes.string.isRequired,
  /** i18n-ключ должности/компании */
  position: PropTypes.string.isRequired,
  /** Инициалы для аватара-заглушки */
  initials: PropTypes.string.isRequired,
  /** HEX-цвет фона аватара */
  accent: PropTypes.string.isRequired,
};

export default TestimonialCard;
