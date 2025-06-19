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

        <div className="project__details-wrap nebo nebo--tl">
          {/* <h3 className="project-card__info-title">{title}</h3> */}

          <p className="project__details-desc">
            Teamed up with a designer to breathe life into a promotional webpage for our beloved show, Adventure Time. Delivered a fully responsive design with dynamic content capabilities, seamlessly integrating a newsletter feature to keep fans updated with the latest adventures.
          </p>

          <div className="project__details">
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
      </div>
    </motion.div>
  );
};

export default Project;