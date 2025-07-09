import './style.css';

const ShowcasingCard = ({ image, name }) => {
  return (
    <article className="showcasing-card">
      {/* Контейнер с фиксированным соотношением сторон */}
      <div className="showcasing-card__aspect-ratio">
        <img
          src={image}
          className="showcasing-card__image"
          alt={`Focusing on project ${name} illustration`}
          loading="lazy"
          decoding='async'
        />
      </div>
    </article>
  );
};

export default ShowcasingCard;
