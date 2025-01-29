import { useState } from 'react';
// import Button from '../../components/button/Button';
import FilterButton from '../../components/filterButton/FilterButton';
import Heading from "../../components/heading/Heading";
import ProjectsList from "../../components/projectsList/ProjectsList";
import { projects } from "../../data/projects";
import "./style.css";

const Projects = () => {
  // eslint-disable-next-line no-unused-vars
  const [list, setList] = useState(projects);
  const [fiteredProjects, setFilteredProjects] = useState([]);

  const handleFilterClick = (name) => {
    if (name === 'All') {
      setFilteredProjects(list);
    } else {
      const filteredItems = list.filter((project) => project.skills.includes(name));
      setFilteredProjects(filteredItems);
    }
    
  }

  // const resetFilter = () => {
  //   setFilteredProjects(projects);
  // };

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

          {/* <Button className={'btn--theme'} onClick={resetFilter} text={'Reset'} /> */}
        </div>

        <ProjectsList 
          projects={fiteredProjects}
        />
      </div>
    </section>
  );
};

export default Projects;
