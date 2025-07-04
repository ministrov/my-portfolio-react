import { motion } from 'framer-motion';
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { FaGithub } from 'react-icons/fa';
import Button from '../button/Button.jsx';
import Tag from '../tag/Tag';
import './style.css';

const ProjectCard = ({
  title,
  skills,
  img,
  imageAlt,
  isProduction,
  overview,
  year,
  role,
  custom,
  demoLink,
  gitHubLink
}) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.3 },
    },
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
            ? { scale: 1.02, transition: { duration: 0.7 } }
            : {}
        }
        className="project-card__image"
      >
        <img
          className={'project-card__img'}
          src={img}
          width={486}
          height={347}
          alt={imageAlt}
        />

        {isProduction ? (
          <div className="project-card__tag-box">
            <Tag color={'red'}>{'Production'}</Tag>
          </div>
        ) : (
          <div className="project-card__tag-box">
            <Tag>{'Pet project'}</Tag>
          </div>
        )}
      </motion.div>

      <div className="project-card__info">
        <h3 className="project-card__info-title">{title}</h3>

        <p className="project-card__info-desc">{overview}</p>

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
          <div className="project-card__skills">
            <h4 className="project-card__tools-title">Project Tools</h4>
            <ul className="project-card__tools-list">
              {skills.map((skill, index) => (
                <Tag key={`id - ${index}`}>{skill}</Tag>
              ))}
            </ul>
          </div>

          <div className="project-card__links">
            {demoLink && (
              <Button
                className={"project-card__link"}
                text={'Live Demo'}
                icon={<BsBoxArrowInUpRight width={20} height={20} />}
                href={demoLink || null}
              />
            )}

            {gitHubLink && (
              <Button
                className={'project-card__link'}
                text={'See on Github'}
                icon={<FaGithub width={20} height={20} />}
                href={gitHubLink || null}
              />
            )}
          </div>
        </div>
      </div>
    </motion.li>
  );
};

export default ProjectCard;
