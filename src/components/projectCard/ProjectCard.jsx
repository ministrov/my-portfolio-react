import { NavLink } from "react-router-dom";
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import SkillComponet from "../skillComponent/SkillComponent";
import Image from "../image/Image";
import "./style.css";

const ProjectCard = ({ id, title, skills, img, wepImg, imageAlt }) => {
  return (
    <NavLink to={`/project/${id}`}>
      <motion.article 
        whileHover={{ scale: 1.04 , transition: 0.7 }}
        className="project__card project-card"  
        tabIndex={0}
      >
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

          <div className="project-card__skills">
            <h4 className="project-card__title">Tools:</h4>
            <ul className="project-card__list">
              {skills.map((skill) => (
                <SkillComponet
                  key={uuidv4()} 
                  skillName={skill}
                />
              ))}
            </ul> 
          </div>
        </li>
      </motion.article>
    </NavLink>
  );
};

export default ProjectCard;
