import { motion } from 'framer-motion';
import Project from '../components/project/Project';
import { projects } from '../helpers/projectsList';

const Projects = ({ title }) => {
  return (
    <motion.main
      className="projects"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="visually-hidden">Page about author's projects</h1>
      <div className="container">
        <h2 className="title-1">{title}</h2>
        <ul className="projects__list">
          {projects.map((project, index) =>
            <motion.div
              key={project.id}
              initial={{ opacity: 0, translateX: -50, translateY: -50 }}
              animate={{ opacity: 1, translateX: 0, translateY: 0 }}
              transition={{ duration: 1.3, delay: index * 0.3 }}
            >
              <Project
                title={project.title}
                img={project.img}
                index={index}
              />
            </motion.div>
            )}
        </ul>
      </div>
    </motion.main>
  )
}

export default Projects;
