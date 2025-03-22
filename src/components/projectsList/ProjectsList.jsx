import ProjectCard from "../projectCard/ProjectCard";
// import { motion } from "framer-motion";
import "./style.css";

const ProjectsList = ({ projects }) => {
  return (
    <ul className="projects__list">
      {projects.map((project, index) => (
        <ProjectCard 
            id={project.id}
            title={project.title} 
            skills={project.skills.split(',')}
            img={project.img} 
            wepImg={project.webpImg} 
            imageAlt={project.title} 
          />
      ))}
    </ul>
  );
};

export default ProjectsList;
