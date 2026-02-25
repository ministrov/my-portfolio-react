import { LazyMotion, m, domAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../projectCard/ProjectCard';
import './style.css';

const ProjectsList = ({ projects }) => {
  const { t } = useTranslation();

  const leftItemVariants = {
    hidden: { x: '-100vw', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  const rightItemVariants = {
    hidden: { x: '100vw', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.ul
        className="projects__list"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project) => {
          const { id, title, overview, skills, isReversed, ...rest } = project;

          return (
            <m.li
              key={id}
              className={`project-card__item ${
                isReversed ? 'project-card__item--reversed' : ''
              }`}
              variants={isReversed ? rightItemVariants : leftItemVariants}
              tabIndex={0}
            >
              <ProjectCard
                title={t(title)}
                overview={t(overview)}
                skills={skills ? skills.split(',') : []}
                {...rest}
              />
            </m.li>
          );
        })}
      </m.ul>
    </LazyMotion>
  );
};

export default ProjectsList;
