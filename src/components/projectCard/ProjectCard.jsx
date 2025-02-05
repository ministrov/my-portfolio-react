import { NavLink } from "react-router-dom";
import Image from '../image/Image';
import "./style.css";

const ProjectCard = ({ title, img, wepImg, index, imageAlt }) => {
  return (
    <NavLink to={`/project/${index}`}>
      <article className="project__card project-card"  tabIndex={0}>
        <li className="project-card__item">
          <Image className="project-card__image" width={338} height={224} src={wepImg} fallback={img} alt={imageAlt}/>
          {/* <img src={img} className="project-card__image"  alt={imageAlt} /> */}
          <h4 className="project-card__title">{title}</h4>
        </li>
      </article>
    </NavLink>
  );
};

export default ProjectCard;
