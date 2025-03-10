import ProjectCard from "../projectCard/ProjectCard";
import { motion } from "framer-motion";
import "./style.css";

const ProjectsList = ({ projects }) => {
  return (
    <ul className="projects__list">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, translateX: -50, translateY: -50 }}
          animate={{ opacity: 1, translateX: 0, translateY: 0 }}
          transition={{ duration: 1.3, delay: index * 0.3 }}
        >
          <ProjectCard 
            id={project.id}
            title={project.title} 
            skills={project.skills.split(',')}
            img={project.img} 
            wepImg={project.webpImg} 
            imageAlt={project.title} 
          />
        </motion.div>
      ))}
    </ul>
  );
};

export default ProjectsList;
