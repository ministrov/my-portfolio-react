import { useTranslation } from 'react-i18next';
import { useMemo, memo } from 'react';
import useProjectsFilter from '../../hooks/useProjectsFilter';
import ProjectsList from '../../components/projectsList/ProjectsList';
import ProjectsLayout from './ProjectsLayout';
import ProjectsHeader from './ProjectsHeader';
import FilterList from './FilterList';
import { filters } from '../../const';

/**
 * Секция проектов портфолио.
 * Управляет фильтрацией проектов, отображает заголовок, фильтры и список проектов.
 *
 * @component
 * @returns {JSX.Element} Секция проектов
 */
const Projects = () => {
  const { state, handleFilterClick } = useProjectsFilter();
  const { t } = useTranslation();

  // Мемоизация хлебных крошек для предотвращения пересоздания при каждом рендере
  const breadcrumbs = useMemo(
    () => [
      { id: 1, name: t('breadcrumbs.home'), link: '/' },
      { id: 2, name: t('breadcrumbs.projects') },
    ],
    [t]
  );

  return (
    <ProjectsLayout>
      <ProjectsHeader
        breadcrumbs={breadcrumbs}
        title={t('heading.projects.name')}
        slogan={t('heading.projects.subheading')}
      />

      <FilterList
        filters={filters}
        activeFilter={state.activeFilter}
        onFilterClick={handleFilterClick}
      />

      <ProjectsList projects={state.filteredProjects} />
    </ProjectsLayout>
  );
};

export default memo(Projects);
