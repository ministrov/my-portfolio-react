import { useParams } from 'react-router-dom';
import Heading from '../components/heading/Heading';
import Button from '../components/button/Button';
import ButtonGitHub from '../components/buttonGitHub/ButtonGitHub';
import { projects } from '../helpers/projectsList';
import { motion } from 'framer-motion';

const Project = () => {
  const {id} = useParams();
  const project = projects[id];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="visually-hidden">Page about single author's project</h1>
      <div className="container">
        <div className="project-details">
          <Button text={"Back to Projects"} className={"project-details__btn btn--theme btn--med"} href={'/projects'} />
          <Heading title={project.title} slogan={project.slogan} />
          <img src={project.imgBig} alt={project.title} className="project-details__cover" />
          <p className="project-detail__overview">
            Project Overview
          </p>

          <p className="project-detail__text-overview">{project.overview}</p>

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