import { useTranslation } from 'react-i18next';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import ButtonLink from '../buttonLink/ButtonLink';
import Tag from '../tag/Tag';
import './style.css';

const ProjectCard = ({
  title,
  skills,
  img,
  imgTablet,
  imgMobile,
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

  return (
    <>
      <div className="project-card__image">
        <picture>
          <source
            media="(max-width: 375px)"
            type="image/webp"
            srcSet={imgMobile}
          />
          <source
            media="(max-width: 768px)"
            type="image/webp"
            srcSet={imgTablet}
          />
          <img
            className={'project-card__img'}
            src={img}
            width={658}
            height={'auto'}
            alt={`${title} project`}
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>

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
              <ButtonLink
                className={'project-card__link'}
                path={demoLink}
                text={t('projectCard.liveDemo', 'Default Text')}
                children={() => <BsBoxArrowInUpRight width={20} height={20} />}
              />
            )}

            {gitHubLink && (
              <ButtonLink
                className={'project-card__link'}
                path={gitHubLink}
                text={t('projectCard.seeOnGithub', 'Default Text')}
                children={() => <FaGithub width={20} height={20} />}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
