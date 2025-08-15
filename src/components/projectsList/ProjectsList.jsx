import { useEffect, useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../projectCard/ProjectCard';
import './style.css';

const ProjectsList = ({ projects }) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    console.log(isInView);
  }, [isInView]);

  const variants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <ul className="projects__list" ref={ref}>
      {projects.map((project, index) => {
        const { id, title, overview, skills, ...rest } = project;

        return (
          <motion.li
            key={id}
            ref={ref}
            className="project-card__item"
            variants={variants}
            initial="initial"
            animate={isInView ? 'animate' : 'initial'}
            transition={{ duration: 0.5, delay: index * 0.6, ease: 'easeInOut' }}
            tabIndex={0}
          >
            <ProjectCard
              title={t(title)}
              overview={t(overview)}
              skills={skills ? skills.split(',') : []}
              {...rest}
            />
          </motion.li>
        )
      })}
    </ul>
  );
};

export default ProjectsList;
