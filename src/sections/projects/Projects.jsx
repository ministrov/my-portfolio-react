import { useState } from 'react';
import FilterButton from '../../components/filterButton/FilterButton';
import Heading from "../../components/heading/Heading";
import ProjectsList from "../../components/projectsList/ProjectsList";
import { projects } from "../../data/projects";
import { filters } from '../../data/filter';
import "./style.css";

const Projects = () => {
  const [fiteredProjects, setFilteredProjects] = useState(projects);

  const handleFilterClick = (name) => {
    const filteredItems = projects.filter((project) => project.skills.includes(name));

    setFilteredProjects(filteredItems);
  }
  return (
    <section className="projects">
      <div className="container">
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
              <li key={filter.id} className="projects__filter-list-item">
                <FilterButton
                  filterName={filter.name}
                  onClick={() => handleFilterClick(filter.name)}
                />
              </li>
            ))}
          </ul>
        </div>

        <ProjectsList 
          projects={fiteredProjects}
        />
      </div>
    </section>
  );
};

export default Projects;
