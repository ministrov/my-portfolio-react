import { easeInOut, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import Tag from '../tag/Tag';
import './style.css';

const ProjectCard = ({
  title,
  skills,
  img,
  overview,
  year,
  role,
  infoTitle,
  toolsTitle,
  yearText,
  roleText,
  demoLink,
  gitHubLink,
}) => {
  const { t } = useTranslation();

  const isDesktop =
    typeof window !== 'undefined' &&
    window.matchMedia('(min-width: 768px)').matches;

  return (
    <>
      <motion.div
        whileHover={
          isDesktop
            ? { scale: 1.02, transition: { duration: 0.5, easings: easeInOut } }
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
      </motion.div>

      <div className="project-card__info">
        <h3 className="project-card__info-title">{title}</h3>

        <p className="project-card__info-desc">{overview}</p>

        <div className="project-card__info-box">
          <h4>{t(infoTitle)}</h4>

          <div className="project-card__info-box-table">
            <div className="project-card__info-box-table-row">
              <span>{t(yearText)}</span>
              <span>{year}</span>
            </div>
            <div className="project-card__info-box-table-row">
              <span>{t(roleText)}</span>
              <span>{role}</span>
            </div>
          </div>
        </div>

        <div className="project-card__tools">
          <div className="project-card__skills">
            <h4 className="project-card__tools-title">{t(toolsTitle)}</h4>
            <ul className="project-card__tools-list">
              {skills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </ul>
          </div>

          <div className="project-card__links">
            {demoLink && (
              <a
                className={'project-card__link'}
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('projectCard.liveDemo', 'Default Text')}
                <span className="btn__icon">
                  <BsBoxArrowInUpRight width={20} height={20} />
                </span>
              </a>
            )}

            {gitHubLink && (
              <a
                className={'project-card__link'}
                href={gitHubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('projectCard.seeOnGithub', 'Default Text')}
                <span className="btn__icon">
                  <FaGithub width={20} height={20} />
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
