import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { FaGithub } from 'react-icons/fa';
import Button from '../button/Button.jsx';
import Tag from '../tag/Tag';
import './style.css';

const ProjectCard = ({
  title,
  skills,
  img,
  isProduction,
  overview,
  year,
  role,
  infoTitle,
  yearText,
  roleText,
  demoLink,
  gitHubLink
}) => {

  const { t } = useTranslation();

  const isDesktop = typeof window !== 'undefined' &&
    window.matchMedia('(min-width: 768px)').matches;

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
      className="project-card__item"
      tabIndex={0}
    >
      <motion.div
        whileHover={
          isDesktop
            ? { scale: 1.02, transition: { duration: 0.7 } }
            : {}
        }
        className="project-card__image"
      >
        <img
          className={'project-card__img'}
          src={img}
          alt={`${title} project`}
          loading="lazy"
          decoding="async"
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
          <h4>{t(infoTitle)}</h4>

          <div className="project-card__info-box-table">
            <div className="project-card__info-box-table-row">
              <span>{yearText}</span>
              <span>{year}</span>
            </div>
            <div className="project-card__info-box-table-row">
              <span>{roleText}</span>
              <span>{role}</span>
            </div>
          </div>
        </div>

        <div className="project-card__tools">
          <div className="project-card__skills">
            <h4 className="project-card__tools-title">Project Tools</h4>
            <ul className="project-card__tools-list">
              {skills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </ul>
          </div>

          <div className="project-card__links">
            {demoLink && (
              <Button
                className={"project-card__link"}
                text={'Live Demo'}
                icon={<BsBoxArrowInUpRight width={20} height={20} />}
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
              />
            )}

            {gitHubLink && (
              <Button
                className={'project-card__link'}
                text={'See on Github'}
                icon={<FaGithub width={20} height={20} />}
                href={gitHubLink}
                target="_blank"
                rel="noopener noreferrer"
              />
            )}
          </div>
        </div>
      </div>
    </motion.li>
  );
};

export default ProjectCard;
