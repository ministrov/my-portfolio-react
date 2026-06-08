import PropTypes from 'prop-types';
import { memo } from 'react';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import Heading from '../../components/heading/Heading';
import './style.css';

/**
 * Заголовок секции проектов с хлебными крошками.
 * Отображает навигационную цепочку и заголовок с подзаголовком.
 *
 * @component
 * @param {Object} props - Свойства компонента
 * @param {Array} props.breadcrumbs - Массив объектов хлебных крошек
 * @param {string} props.title - Основной заголовок
 * @param {string} props.accent - Акцентная часть заголовка с градиентом
 * @returns {JSX.Element} Заголовок секции проектов
 */
const ProjectsHeader = ({ breadcrumbs, title, accent }) => {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <Heading
        variant="display"
        id="projects-heading"
        title={title}
        accent={accent}
      />
    </>
  );
};

ProjectsHeader.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      link: PropTypes.string,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  accent: PropTypes.string.isRequired,
};

export default memo(ProjectsHeader);
