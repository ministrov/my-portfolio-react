import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import Tag from '../tag/Tag';
import './style.css';

const ProjectCard = ({
  id,
  title,
  skills,
  img,
  imageAlt,
  isProduction,
  year,
  role,
  custom
}) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.3 }
    }
  };
  return (
    <motion.li
      variants={variants}
      initial={'hidden'}
      whileInView={'visible'}
      custom={custom}
      className="project-card__item"
      tabIndex={0}
    >
      <motion.div
        whileHover={
          window.matchMedia('(min-width: 768px)').matches
            ? { scale: 1.04, transition: { duration: 0.7 } }
            : {}
        }
        className="project-card__image"
      >
        <NavLink to={`/project/${id}`} className={'project-card__link'}>
          <img
            className={"project-card__img"}
            src={img}
            width={486}
            height={347}
            alt={imageAlt}
          />
        </NavLink>

        {isProduction ? (
          <div className="project-card__tag-box">
            <Tag color={'red'}>{'Production'}</Tag>
          </div>
        ) : (
          <div className="project-card__tag-box">
            <Tag color={'purple'}>{'Pet project'}</Tag>
          </div>
        )}
      </motion.div>

      <div className="project-card__info">
        <h3 className="project-card__info-title">{title}</h3>

        <p className="project-card__info-desc">
          Teamed up with a designer to breathe life into a promotional webpage for our beloved show, Adventure Time. Delivered a fully responsive design with dynamic content capabilities, seamlessly integrating a newsletter feature to keep fans updated with the latest adventures.
        </p>

        <div className="project-card__info-box">
          <h4>Project Info</h4>

          <div className="projcet-card__info-box-table">
            <div className="projcet-card__info-box-table-row">
              <span>Year</span>
              <span>{year}</span>
            </div>
            <div className="projcet-card__info-box-table-row">
              <span>Role</span>
              <span>{role}</span>
            </div>
          </div>
        </div>

        <div className="project-card__tools">
          <h4 className="project-card__tools-title">Project Tools</h4>
          <ul className="project-card__tools-list">
            {skills.map((skill, index) => (
              <Tag key={`id - ${index}`}>{skill}</Tag>
            ))}
          </ul>
        </div>
      </div>
    </motion.li>
  );
};

export default ProjectCard;
