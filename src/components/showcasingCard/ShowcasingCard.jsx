import './style.css';

const ShowcasingCard = ({ image, name }) => {
  return (
    <article className="showcasing-card">
      <div className="showcasing-card__aspect-ratio">
        <img
          src={image}
          width={1200}
          height={500}
          className="showcasing-card__image"
          alt={`Focusing on project ${name} illustration`}
          loading="lazy"
          decoding="async"
        />
      </div>
    </article>
  );
};

export default ShowcasingCard;
