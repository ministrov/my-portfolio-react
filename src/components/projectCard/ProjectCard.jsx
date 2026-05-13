import { useTranslation } from 'react-i18next';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import ButtonLink from '../buttonLink/ButtonLink';
import Tag from '../tag/Tag';
import './style.css';

/**
 * Компонент карточки проекта, отображающий информацию о проекте,
 * включая изображения, описание, метаданные, технологии и ссылки.
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {string} props.title - Заголовок проекта
 * @param {string[]} props.skills - Массив технологий/навыков
 * @param {string} props.img - URL изображения для десктопа
 * @param {string} props.imgTablet - URL изображения для планшета
 * @param {string} props.imgMobile - URL изображения для мобильного
 * @param {string} props.overview - Краткое описание проекта
 * @param {string} props.year - Год реализации
 * @param {string} props.role - Роль в проекте
 * @param {string} props.infoTitle - Заголовок блока информации (переводной ключ)
 * @param {string} props.toolsTitle - Заголовок блока технологий (переводной ключ)
 * @param {string} props.yearText - Текст для года (переводной ключ)
 * @param {string} props.roleText - Текст для роли (переводной ключ)
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

  // Константы для breakpoints (можно вынести в отдельный файл констант)
  const BREAKPOINTS = {
    MOBILE: 375,
    TABLET: 768,
  };

  return (
    <article className="project-card" aria-label={`Проект: ${title}`}>
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
            height="auto"
            alt={`${title} project`}
            loading="lazy"
            decoding="async"
            aria-hidden="false"
          />
        </picture>
      </div>

      <div className="project-card__info">
        <h3 className="project-card__info-title">{title}</h3>

        <p className="project-card__info-desc">{overview}</p>

        <div className="project-card__info-box">
          <h4>{t(infoTitle)}</h4>

          <div className="project-card__info-box-table" role="table">
            <div className="project-card__info-box-table-row" role="row">
              <span role="cell">{t(yearText)}</span>
              <span role="cell">{year}</span>
            </div>
            <div className="project-card__info-box-table-row" role="row">
              <span role="cell">{t(roleText)}</span>
              <span role="cell">{role}</span>
            </div>
          </div>
        </div>

        <div className="project-card__tools">
          <div className="project-card__skills">
            <h4 className="project-card__tools-title">{t(toolsTitle)}</h4>
            <ul className="project-card__tools-list" aria-label="Использованные технологии">
              {skills.map((skill) => (
                <li key={skill}>
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          </div>

          <div className="project-card__links">
            {demoLink && (
              <ButtonLink
                className="project-card__link"
                path={demoLink}
                text={t('projectCard.liveDemo', 'Live Demo')}
                icon={<BsBoxArrowInUpRight size={22} aria-hidden="true" />}
                target
                aria-label={`Открыть живой демо проекта ${title}`}
              />
            )}

            {gitHubLink && (
              <ButtonLink
                className="project-card__link"
                path={gitHubLink}
                text={t('projectCard.seeOnGithub', 'See on GitHub')}
                icon={<FaGithub size={22} aria-hidden="true" />}
                target
                aria-label={`Открыть репозиторий GitHub проекта ${title}`}
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
