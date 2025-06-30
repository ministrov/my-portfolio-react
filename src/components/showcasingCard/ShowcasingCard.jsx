import './style.css';

const ShowcasingCard = ({ image, name }) => {
  return (
    <article className="showcasing-card">
      <img
        src={image}
        className="showcasing-card__image"
        alt={`Focusing on project ${name} illustration`}
      />
    </article>
  );
};

export default ShowcasingCard;
