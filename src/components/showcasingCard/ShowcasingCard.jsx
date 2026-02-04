import { useTranslation } from 'react-i18next';
import './style.css';

const ShowcasingCard = ({ name, image, tabletImg, mobileImg }) => {
  const { t } = useTranslation();

  return (
    <article className="showcasing-card">
      <h2 className="showcasing-card__name">{t(name)}</h2>
      <div className="showcasing-card__aspect-ratio">
        <picture>
          <source
            media="(max-width: 375px)"
            type="image/webp"
            srcSet={mobileImg}
          />
          <source
            media="(max-width: 768px)"
            type="image/webp"
            srcSet={tabletImg}
          />

          <img
            src={image}
            width={1253}
            height={787}
            className="showcasing-card__image"
            alt={`Focusing on project ${name} illustration`}
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
    </article>
  );
};

export default ShowcasingCard;
