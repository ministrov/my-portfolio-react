import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FilterButton from '../../components/filterButton/FilterButton';
import Heading from "../../components/heading/Heading";
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import ProjectsList from "../../components/projectsList/ProjectsList";
import { projects } from "../../data/projects";
import "./style.css";
import { filters } from '../../data/filters';

const Projects = () => {
  const storedList = JSON.parse(localStorage.getItem('list')) || projects;
  const [filteredProjects, setFilteredProjects] = useState(storedList);
  const [active, setActive] = useState('All');
  let navigate = useNavigate();
  let location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const BREADCRUMBS = [{ id: 1, name: "Home", link: "/" }, { id: 2, name: "Projects" }];

  const handleFilterClick = (name) => {
    if (name === 'All') {
      setFilteredProjects(storedList);
    } else {
      const filteredItems = projects.filter((project) => project.skills.includes(name));
      setFilteredProjects(filteredItems);
      localStorage.setItem('projects', JSON.stringify(filteredItems));
    }

    setActive(name);

    queryParams.set('filter', name);
    navigate({
      search: queryParams.toString()
    });
  }

  return (
    <section className="projects">
      <div className="container">
        <Breadcrumbs items={BREADCRUMBS}/>
        <Heading
          title={"Projects"}
          className="projects__title"
          slogan={
            "Unleash the power of code and create extraordinary digital experiences."
          }
        ></Heading>

        <div className="projects__filter">
          <ul className="projects__filter-list">
            {filters.map((filter) => (
              <li key={filter.id} className={"projects__filter-list-item filter"}>
                <FilterButton
                  active={active}
                  currentBtn={filter.name}
                  filterName={filter.name}
                  onClick={() => handleFilterClick(filter.name)}
                />
            </li>
            ))}
          </ul>
        </div>

        <ProjectsList 
          projects={filteredProjects}
        />
      </div>
    </section>
  );
};

export default Projects;
