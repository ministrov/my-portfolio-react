import Project from "../project/Project";
import { projects } from "../../helpers/projectsList";
import { motion } from "framer-motion";
import "./style.css";

const ProjectsList = () => {
  return (
    <ul className="projects__list">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, translateX: -50, translateY: -50 }}
          animate={{ opacity: 1, translateX: 0, translateY: 0 }}
          transition={{ duration: 1.3, delay: index * 0.3 }}
        >
          <Project title={project.title} img={project.img} index={index} />
        </motion.div>
      ))}
    </ul>
  );
};

export default ProjectsList;
