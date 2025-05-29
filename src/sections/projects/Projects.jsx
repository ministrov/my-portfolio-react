import { useTranslation } from 'react-i18next';
import useProjectsFilter from '../../hooks/useProjectsFilter';
import ProjectsList from '../../components/projectsList/ProjectsList';
import ProjectsLayout from './ProjectsLayout';
import ProjectsHeader from './ProjectsHeader';
import FilterList from './FilterList';
import './style.css';

const Projects = () => {
  const { state, handleFilterClick } = useProjectsFilter();
  const { t } = useTranslation();
  const BREADCRUMBS = [
    { id: 1, name: t('breadcrumbs.home'), link: '/' },
    { id: 2, name: t('breadcrumbs.projects') },
  ];

  return (
    <ProjectsLayout>
      <ProjectsHeader
        breadcrumbs={BREADCRUMBS}
        title={t('heading.projects.name')}
        slogan={t('heading.projects.subheading')}
      />

      <FilterList
        filters={[]}
        activeFilter={state.activeFilter}
        onFilterClick={handleFilterClick}
      />

      <ProjectsList projects={state.filteredProjects} />
    </ProjectsLayout>
  );
};

export default Projects;
