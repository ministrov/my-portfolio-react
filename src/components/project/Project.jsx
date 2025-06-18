import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Image from '../image/Image';
import './Project.css';

const Project = ({ project }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="project"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-testid="project"
    >
      <div className="project__content">
        <div className="project__image">
          <Image
            className="project__img"
            src={project.wepImg}
            fallback={project.img}
            alt={project.imageAlt}
            width={1200}
            height={700}
            loading="lazy"
          />
        </div>

        <div className="project__details">
          <h2 id="project__title">{project.title}</h2>
          <p className="project__description">{project.description}</p>

          <div className="project__technologies">
            <h3>{t('project-technologies')}:</h3>
            <div className="tags-container">
              {project.skills.split(',').map((skill, index) => (
                <span key={index} className="tech-tag">{skill}</span>
              ))}
            </div>
          </div>

          <div className="project__links"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default Project;