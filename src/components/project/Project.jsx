import { motion } from 'framer-motion';
// import { useTranslation } from 'react-i18next';
import Image from '../image/Image';
import './Project.css';

const Project = ({ project }) => {
  // const { t } = useTranslation();

  return (
    <motion.div
      className="project"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-testid="project"
    >
      <div className="project__content">
        <div className="project__image nebo nebo--br">
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

        <div className="project__details nebo nebo--tl">
          <h4>Project Info</h4>

          <div className="project__details-table">
            <div className="project__details-table-row">
              <span>Year</span>
              <span>2023</span>
            </div>
            <div className="project__details-table-row">
              <span>Role</span>
              <span>Front-end Developer</span>
            </div>
          </div>
        </div>
          <div className="project__links"></div>
      </div>
    </motion.div>
  );
};

export default Project;