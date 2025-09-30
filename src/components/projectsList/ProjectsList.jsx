import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../projectCard/ProjectCard';
import './style.css';

const ProjectsList = ({ projects }) => {
  const { t } = useTranslation();

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <ul className="projects__list" variants={containerVariants}>
      {projects.map((project) => {
        const { id, title, overview, skills, isReversed, ...rest } = project;

        return (
          <motion.li
            key={id}
            className={`project-card__item ${
              isReversed ? 'project-card__item--reversed' : ''
            }`}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
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
