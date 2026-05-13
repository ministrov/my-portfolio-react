import { LazyMotion, m, domAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../projectCard/ProjectCard';
import './style.css';

/**
 * Анимационные варианты для элементов списка (левая сторона)
 * @constant
 */
const leftItemVariants = {
  hidden: { x: '-100vw', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

/**
 * Анимационные варианты для элементов списка (правая сторона)
 * @constant
 */
const rightItemVariants = {
  hidden: { x: '100vw', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

/**
 * Анимационные варианты для контейнера списка
 * @constant
 */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

/**
 * Компонент списка проектов с анимациями.
 * Отображает переданные проекты в виде списка карточек с поочерёдной анимацией.
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {Array} props.projects - Массив объектов проектов
 * @returns {JSX.Element} Список проектов с анимациями
 */
const ProjectsList = ({ projects = [] }) => {
  const { t } = useTranslation();

  /**
   * Преобразует строку навыков в массив, обрабатывая краевые случаи
   * @param {string|Array} skillsData - Навыки в виде строки или массива
   * @returns {Array} Массив навыков
   */
  const parseSkills = (skillsData) => {
    if (!skillsData) return [];
    if (Array.isArray(skillsData)) return skillsData;
    if (typeof skillsData === 'string') return skillsData.split(',').map(s => s.trim());
    return [];
  };

  // Если проектов нет, отображаем сообщение
  if (!projects.length) {
    return (
      <div className="projects__empty" role="status" aria-live="polite">
        <p>{t('projectsList.noProjects', 'No projects available.')}</p>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.ul
        className="projects__list"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        role="list"
        aria-label={t('projectsList.ariaLabel', 'List of projects')}
      >
        {projects.map((project) => {
          const { id, title, overview, skills, isReversed, ...rest } = project;
          const parsedSkills = parseSkills(skills);

          return (
            <m.li
              key={id}
              className={`project-card__item ${
                isReversed ? 'project-card__item--reversed' : ''
              }`}
              variants={isReversed ? rightItemVariants : leftItemVariants}
              tabIndex={0}
              role="listitem"
              aria-label={t(title)}
            >
              <ProjectCard
                title={t(title)}
                overview={t(overview)}
                skills={parsedSkills}
                {...rest}
              />
            </m.li>
          );
        })}
      </m.ul>
    </LazyMotion>
  );
};

export default ProjectsList;
