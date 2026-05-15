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
 * @param {string} props.slogan - Подзаголовок (слоган)
 * @returns {JSX.Element} Заголовок секции проектов
 */
const ProjectsHeader = ({ breadcrumbs, title, slogan }) => {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <Heading
        id="projects-heading"
        title={title}
        className="projects__title"
        slogan={slogan}
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
  slogan: PropTypes.string.isRequired,
};

export default memo(ProjectsHeader);
