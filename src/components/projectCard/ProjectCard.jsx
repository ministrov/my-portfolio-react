import { NavLink } from "react-router-dom";
import "./style.css";

const ProjectCard = ({ title, img, index, imageAlt }) => {
  return (
    <NavLink to={`/project/${index}`}>
      <article className="project__card project-card"  tabIndex={0}>
        <li className="project-card__item">
          <img src={img} className="project-card__image" width={338} height={224} alt={imageAlt} />
          <h3 className="project-card__title">{title}</h3>
        </li>
      </article>
    </NavLink>
  );
};

export default ProjectCard;
