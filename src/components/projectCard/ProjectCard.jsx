import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import { BREAKPOINTS } from '../../const';
import ButtonLink from '../buttonLink/ButtonLink';
import Tag from '../tag/Tag';
import './style.css';

/**
 * Компонент карточки проекта, отображающий информацию о проекте,
 * включая изображения, описание, метаданные, технологии и ссылки.
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {string} props.title - Заголовок проекта (уже переведённая строка)
 * @param {string[]} props.skills - Массив технологий/навыков
 * @param {string} props.img - URL изображения для десктопа
 * @param {string} [props.imgTablet] - URL изображения для планшета
 * @param {string} [props.imgMobile] - URL изображения для мобильного
 * @param {string} props.overview - Краткое описание проекта (уже переведённая строка)
 * @param {string} [props.year] - Год реализации
 * @param {string} [props.role] - Роль в проекте
 * @param {string} [props.infoTitle] - Заголовок блока информации (переводной ключ)
 * @param {string} [props.toolsTitle] - Заголовок блока технологий (переводной ключ)
 * @param {string} [props.yearText] - Текст для года (переводной ключ)
 * @param {string} [props.roleText] - Текст для роли (переводной ключ)
 * @param {string} [props.demoLink] - Ссылка на живой демо-проект
 * @param {string} [props.gitHubLink] - Ссылка на репозиторий GitHub
 * @returns {JSX.Element} Карточка проекта
 */
const ProjectCard = ({
  title,
  skills = [],
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
    <article
      className="project-card"
      aria-label={t('projectCard.ariaLabel', { title })}
    >
      <div className="project-card__image">
        <picture>
          <source
            media={`(max-width: ${BREAKPOINTS.MOBILE}px)`}
            type="image/webp"
            srcSet={imgMobile}
            sizes="100vw"
          />
          <source
            media={`(max-width: ${BREAKPOINTS.TABLET}px)`}
            type="image/webp"
            srcSet={imgTablet}
            sizes="100vw"
          />
          <img
            className="project-card__img"
            src={img}
            width={658}
            height={536}
            alt={t('projectCard.imgAlt', { title })}
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

          <dl className="project-card__info-box-table">
            <div className="project-card__info-box-table-row">
              <dt>{t(yearText)}</dt>
              <dd>{year}</dd>
            </div>
            <div className="project-card__info-box-table-row">
              <dt>{t(roleText)}</dt>
              <dd>{role}</dd>
            </div>
          </dl>
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
                className="project-card__link"
                path={demoLink}
                text={t('projectCard.liveDemo')}
                icon={<BsBoxArrowInUpRight size={22} aria-hidden="true" />}
                target
                aria-label={t('projectCard.demoAriaLabel', { title })}
              />
            )}

            {gitHubLink && (
              <ButtonLink
                className="project-card__link"
                path={gitHubLink}
                text={t('projectCard.seeOnGithub')}
                icon={<FaGithub size={22} aria-hidden="true" />}
                target
                aria-label={t('projectCard.githubAriaLabel', { title })}
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

ProjectCard.propTypes = {
  /** Заголовок проекта (уже переведённая строка) */
  title: PropTypes.string.isRequired,
  /** Массив технологий/навыков */
  skills: PropTypes.arrayOf(PropTypes.string),
  /** URL изображения для десктопа */
  img: PropTypes.string.isRequired,
  /** URL изображения для планшета */
  imgTablet: PropTypes.string,
  /** URL изображения для мобильного */
  imgMobile: PropTypes.string,
  /** Краткое описание проекта (уже переведённая строка) */
  overview: PropTypes.string.isRequired,
  /** Год реализации */
  year: PropTypes.string,
  /** Роль в проекте */
  role: PropTypes.string,
  /** Заголовок блока информации (переводной ключ) */
  infoTitle: PropTypes.string,
  /** Заголовок блока технологий (переводной ключ) */
  toolsTitle: PropTypes.string,
  /** Текст для года (переводной ключ) */
  yearText: PropTypes.string,
  /** Текст для роли (переводной ключ) */
  roleText: PropTypes.string,
  /** Ссылка на живой демо-проект */
  demoLink: PropTypes.string,
  /** Ссылка на репозиторий GitHub */
  gitHubLink: PropTypes.string,
};

export default ProjectCard;
