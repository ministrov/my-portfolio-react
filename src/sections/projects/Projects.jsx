import { useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import FilterButton from '../../components/filterButton/FilterButton';
import Heading from '../../components/heading/Heading';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import ProjectsList from '../../components/projectsList/ProjectsList';
// import { filters } from '../../helpers/mocks';
import { ActionTypes, initialState, projectsReducer } from './projectsReduce';
import './style.css';

const Projects = () => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(projectsReducer, initialState);
  let navigate = useNavigate();
  let location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const BREADCRUMBS = [
    { id: 1, name: t('breadcrumbs.home'), link: '/' },
    { id: 2, name: t('breadcrumbs.projects') },
  ];

  const filters = [
    { id: 1, name: 'All' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Next' },
    { id: 4, name: 'JavaScript' },
  ];

  const handleFilterClick = (name) => {
    dispatch({ type: ActionTypes.SET_FILTER, payload: name });

    queryParams.set('filter', name);
    navigate({
      search: queryParams.toString(),
    });
  };

  return (
    <section className="projects">
      <div className="container">
        <Breadcrumbs items={BREADCRUMBS} />
        <Heading
          title={t('heading.projects.name')}
          className="projects__title"
          slogan={t('heading.projects.subheading')}
        ></Heading>

        <div className="projects__filter">
          <ul className="projects__filter-list">
            {filters.map((filter) => (
              <li
                key={filter.id}
                className={'projects__filter-list-item filter'}
              >
                <FilterButton
                  active={state.activeFilter}
                  currentBtn={filter.name}
                  filterName={filter.name}
                  onClick={() => handleFilterClick(filter.name)}
                />
              </li>
            ))}
          </ul>
        </div>

        <ProjectsList projects={state.filteredProjects} />
      </div>
    </section>
  );
};

export default Projects;
