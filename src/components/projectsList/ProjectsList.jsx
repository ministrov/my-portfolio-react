import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../projectCard/ProjectCard';
import './style.css';

const ProjectsList = ({ projects }) => {
  const { t } = useTranslation();

  const listVariants = {
    initial: { y: 50, opacity: 0, scale: 0.95 },
    animate: { y: 0, opacity: 1, scale: 1 },
  };

  return (
    <ul className="projects__list">
      {projects.map((project, index) => {
        const { id, title, overview, skills, ...rest } = project;
        const maxDelay = 0.6;
        const delay = Math.min(index * 0.15, maxDelay);

        return (
          <motion.li
            key={id}
            className="project-card__item"
            variants={listVariants}
            initial="initial"
            animate="animate"
            transition={{
              duration: 0.5,
              delay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            tabIndex={0}
          >
            <ProjectCard
              title={t(title)}
              overview={t(overview)}
              skills={skills ? skills.split(',') : []}
              {...rest}
            />
          </motion.li>
        );
      })}
    </ul>
  );
};

export default ProjectsList;
