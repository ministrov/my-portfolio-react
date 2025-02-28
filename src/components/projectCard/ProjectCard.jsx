import { NavLink } from "react-router-dom";
// import SkillComponet from "../skillComponent/SkillComponent";
import Image from "../image/Image";
import "./style.css";

const ProjectCard = ({ id, title, skills, img, wepImg, imageAlt }) => {
  return (
    <NavLink to={`/project/${id}`}>
      <article className="project__card project-card"  tabIndex={0}>
        <li className="project-card__item">
          <Image 
            className="project-card__image" 
            width={338} 
            height={224} 
            src={wepImg} 
            fallback={img} 
            alt={imageAlt}
          />
          
          <h4 className="project-card__title">{title}</h4>

          {/* <ul className="project-card__list">
            {skills.map((skill) => (
              <SkillComponet skillName={skill}/>
            ))}
          </ul> */}
        </li>
      </article>
    </NavLink>
  );
};

export default ProjectCard;
