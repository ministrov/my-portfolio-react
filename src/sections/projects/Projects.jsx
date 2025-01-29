import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FilterButton from '../../components/filterButton/FilterButton';
import Heading from "../../components/heading/Heading";
import ProjectsList from "../../components/projectsList/ProjectsList";
import { projects } from "../../data/projects";
import "./style.css";

const Projects = () => {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  let navigate = useNavigate();
  let location = useLocation();

  // console.log(history);
  console.log(location);
  console.log(navigate);

  const handleFilterClick = (name) => {
    if (name === 'All') {
      setFilteredProjects(projects);
    } else {
      const filteredItems = projects.filter((project) => project.skills.includes(name));
      setFilteredProjects(filteredItems);
    }
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
            <li className="projects__filter-list-item">
              <FilterButton
                filterName={'All'}
                onClick={() => handleFilterClick("All")}
              />
            </li>
            <li className="projects__filter-list-item">
              <FilterButton
                filterName={'React'}
                onClick={() => handleFilterClick("React")}
              />
            </li>
            <li className="projects__filter-list-item">
              <FilterButton
                filterName={"JavaScript"}
                onClick={() => handleFilterClick("JavaScript")}
              />
            </li>
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
