import { useParams } from 'react-router-dom';
import ButtonGitHub from '../components/buttonGitHub/ButtonGitHub';
import { projects } from '../helpers/projectsList';
import { motion } from 'framer-motion';

const Project = () => {
  const {id} = useParams();
  const project = projects[id];

  return (
    <motion.main
      className="project"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="visually-hidden">Page about single author's project</h1>
      <div className="container">
        <div className="project-details">
          <h2 className="title-1">{project.title}</h2>
          <img src={project.imgBig} alt={project.title} className="project-details__cover" />
            <div className="project-details__desc">
              <p>Skills: {project.skills}</p>
            </div>
          {project.gitHubLink && (
            <ButtonGitHub link="https://github.com" />
          )}
        </div>
      </div>
    </motion.main>
  )
}

export default Project;