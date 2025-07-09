import './style.css';

const ShowcasingCard = ({ image, name }) => {
  return (
    <article className="showcasing-card">
      <img
        src={image}
        width="100%"
        height="100%"
        className="showcasing-card__image"
        alt={`Focusing on project ${name} illustration`}
        loading="lazy"
        decoding='async'
      />
    </article>
  );
};

export default ShowcasingCard;
