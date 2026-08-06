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
 * @param {Object[]} props.breadcrumbs - Массив объектов хлебных крошек
 * @param {number} props.breadcrumbs[].id - Уникальный идентификатор элемента
 * @param {string} props.breadcrumbs[].name - Отображаемое название элемента
 * @param {string} [props.breadcrumbs[].link] - Ссылка; без неё элемент считается текущей страницей
 * @param {string} props.title - Основной заголовок
 * @param {string} props.accent - Акцентная часть заголовка с градиентом
 * @returns {JSX.Element} Заголовок секции проектов
 */
const ProjectsHeader = ({ breadcrumbs, title, accent }) => {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <Heading id="projects-heading" title={title} accent={accent} />
    </>
  );
};

export default memo(ProjectsHeader);
