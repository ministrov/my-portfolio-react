import { NavLink } from "react-router-dom";
import "./style.css";

const ProjectCard = ({ title, img, index, imageAlt }) => {
  return (
    <NavLink to={`/project/${index}`} tabIndex={0}>
      <article className="project__card project-card">
        <li className="project-card__item">
          <img src={img} className="project-card__image" width={338} height={224} alt={imageAlt} />
          <h3 className="project-card__title">{title}</h3>
        </li>
      </article>
    </NavLink>
  );
};

export default ProjectCard;
