import { NavLink } from 'react-router-dom';
import './style.css';

const ProjectCard = ({ title, img, index }) => {
  return (
    <article className="project__card project-card">
      <NavLink to={`/project/${index}`}>
        <li className="project-card__item">
          <img src={img} className="project-card__image" alt={title} />
          <h3 className="project-card__title">{title}</h3>
        </li>
      </NavLink>
    </article>
  );
};

export default ProjectCard;
